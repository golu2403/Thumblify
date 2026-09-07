import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

// Get all thumbnails for the logged-in user
export const getUsersThumbnails = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user session" });
        }

        // Find all thumbnails for the user, sorted by creation date (newest first)
        const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });

        res.json({ thumbnails });
    } catch (error) {
        console.error("Error fetching user thumbnails:", error);
        res.status(500).json({
            message: "Failed to fetch thumbnails",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

// Get a single thumbnail by ID
export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        // Find thumbnail and verify ownership
        const thumbnail = await Thumbnail.findOne({ _id: id, userId });

        if (!thumbnail) {
            return res.status(404).json({ message: "Thumbnail not found or unauthorized" });
        }

        res.json({ thumbnail });
    } catch (error) {
        console.error("Error fetching thumbnail:", error);
        res.status(500).json({
            message: "Failed to fetch thumbnail",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

// Update a thumbnail
export const updateThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;
        const { title, description, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        // Find thumbnail and verify ownership
        const thumbnail = await Thumbnail.findOne({ _id: id, userId });

        if (!thumbnail) {
            return res.status(404).json({ message: "Thumbnail not found or unauthorized" });
        }

        // Update only the provided fields
        if (title) thumbnail.title = title;
        if (description) thumbnail.description = description;
        if (style) thumbnail.style = style;
        if (aspect_ratio) thumbnail.aspect_ratio = aspect_ratio;
        if (color_scheme) thumbnail.color_scheme = color_scheme;
        if (text_overlay !== undefined) thumbnail.text_overlay = text_overlay;

        await thumbnail.save();

        res.json({
            message: "Thumbnail updated successfully",
            thumbnail,
        });
    } catch (error) {
        console.error("Error updating thumbnail:", error);
        res.status(500).json({
            message: "Failed to update thumbnail",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
