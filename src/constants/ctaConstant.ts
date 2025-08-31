export const CTA_CONSTANTS = {
    section: {
        id: "cta",
        eyebrow: "Ready to move smarter?",
        title: "Streamline your logistics today",
        description:
            "Join shippers and carriers who trust us for faster matching, real-time tracking, and fewer empty miles.",
        primary: {
            label: "Get started free",
            href: "https://dashboard.logieman.com/signup",
        },
        secondary: {
            label: "Talk to sales",
            href: "mailto:sales@logieman.com",
        },
        footnote: "No credit card required. Free plan available.",
        stats: [
            { label: "Avg. faster matching", value: "3×" },
            { label: "On-time deliveries", value: "98%" },
            { label: "Monthly shipments", value: "25k+" },
        ],
    },
} as const;

export type CtaStatsItem = (typeof CTA_CONSTANTS)["section"]["stats"][number];
