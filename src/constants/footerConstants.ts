export type FooterLink = {
    name: string;
    href: string;
};

export type FooterSection = {
    title: string;
    links: FooterLink[];
};

export const FOOTER_CONSTANTS = {
    company: {
        name: "Logieman",
        description:
            "Effortless transportation solutions for shippers and carriers across regions.",
        logo: {
            src: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/logo.png",
            alt: "Logieman",
        },
        copyrightPrefix: "©",
        year: new Date().getFullYear(),
    },
    navigation: [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#" },
                { name: "How it works", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "Downloads", href: "#" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Press", href: "#" },
                { name: "Contact", href: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Blog", href: "#" },
                { name: "Help Center", href: "#" },
                { name: "API", href: "#" },
                { name: "Status", href: "#" },
            ],
        },
    ] as FooterSection[],
    social: [
        { name: "X", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "LinkedIn", href: "#" },
        { name: "Instagram", href: "#" },
        { name: "Facebook", href: "#" },
    ],
    ariaLabels: {
        footerNavigation: "Footer",
        socialLinks: "Social links",
    },
} as const;

export type FooterNavItem = (typeof FOOTER_CONSTANTS)["navigation"][number]["links"][number];
