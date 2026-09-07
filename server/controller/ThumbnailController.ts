import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import axios from "axios";

const aspectRatioMap: Record<string, { w: number; h: number }> = {
    "16:9": { w: 1280, h: 720 },
    "1:1": { w: 800, h: 800 },
    "9:16": { w: 720, h: 1280 },
};

// ✅ FREE - No API key needed
const generateImageWithPollinations = async (
    prompt: string,
    style: string,
    aspect_ratio: string,
    color_scheme: string,
    text_overlay: string
): Promise<string> => {

    const dim = aspectRatioMap[aspect_ratio] || aspectRatioMap["16:9"];

    const fullPrompt = `YouTube thumbnail ${prompt} ${style} ${color_scheme} professional high quality`;

    const encodedPrompt = encodeURIComponent(fullPrompt);

    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${dim.w}&height=${dim.h}&model=flux&nologo=true`;

    console.log("Fetching from Pollinations:", imageUrl);

    // Just confirm the image actually generates (status 200) —
    // no need to download bytes since we're not re-uploading anywhere
    const response = await axios({
        method: "GET",
        url: imageUrl,
        responseType: "arraybuffer",
        timeout: 120000,
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
        maxRedirects: 5,
    });

    console.log("Image fetched, status:", response.status);

    // ✅ No Cloudinary — Pollinations URL is stable and publicly accessible,
    // so we store it directly
    return imageUrl;
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
        } = req.body;

        if (!userId || !title || !user_prompt || !style || !aspect_ratio) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        console.log("Generating thumbnail for:", user_prompt);

        const imageUrl = await generateImageWithPollinations(
            user_prompt,
            style,
            aspect_ratio,
            color_scheme || "vibrant",
            text_overlay || ""
        );

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            image_url: imageUrl,
            isGenerating: false,
        });

        return res.status(201).json({
            message: "Thumbnail generated successfully",
            thumbnail,
        });

    } catch (error: any) {
        console.error("Error generating thumbnail:", error?.message);

        if (error?.code === "ENOTFOUND") {
            return res.status(500).json({
                message: "Network error - check internet connection",
                error: error.message,
            });
        }

        if (error?.code === "ECONNABORTED") {
            return res.status(500).json({
                message: "Request timeout - try again",
                error: error.message,
            });
        }

        res.status(500).json({
            message: "Failed to generate thumbnail",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        const thumbnail = await Thumbnail.findOne({ _id: id, userId });

        if (!thumbnail) {
            return res.status(404).json({
                message: "Thumbnail not found or unauthorized",
            });
        }

        // No Cloudinary asset to delete — just remove the DB record
        await Thumbnail.findByIdAndDelete(id);
        res.json({ message: "Thumbnail deleted successfully" });

    } catch (error) {
        console.error("Error deleting thumbnail:", error);
        res.status(500).json({
            message: "Failed to delete thumbnail",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};