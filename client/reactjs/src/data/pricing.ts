import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI Thumbnails/month",
            "Basic Templates",
            "Standard resolution ",
            "No Watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited AI Thumbnails",
            "Premium Templates",
            "4K resolution",
            "A/B Testing",
            "priority email support",
            "Custom styles and branding",
            "Brand kit analysis",
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "API access",
            "Team collaboration",
            "Custom Branding",
            "Dedicated account manager",
        ],
        mostPopular: false
    }
];