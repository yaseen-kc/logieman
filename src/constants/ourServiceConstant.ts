export type ServiceItem = {
    name: string;
    description: string;
    image: string; // alt text / description
    imageSrc: string;
};

export type OurServiceData = {
    title: string;
    description: string;
    services: ServiceItem[];
};

export const OUR_SERVICES_DATA: OurServiceData = {
    title: "Our services",
    description:
        "Logieman gives you yet another opportunity to earn new customers and increase your income. By registering on the app, you can receive nearby orders from the comfort of your own home, and even set your own price for the trip.",
    services: [
        {
            name: "House & personal moving",
            description:
                "Truck rental for house relocation and transportation of personal items.",
            image: "Green armchair with a lamp",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/house-and-personal-moving.webp",
        },
        {
            name: "Construction materials",
            description: "Transport solutions for all types of construction materials.",
            image: "Wooden planks and concrete blocks",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/construction-materials.webp",
        },
        {
            name: "Commercial merchandise",
            description:
                "Transport commercial goods, no matter the size or quantity.",
            image: "Hand truck with stacked boxes and bags",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/commercial-merchandise.webp",
        },
        {
            name: "Appliances",
            description:
                "Ensuring all household appliances reach their destination intact and on time.",
            image: "Stacked cardboard boxes with household appliances",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/appliances.webp",
        },
        {
            name: "Hydrocarbons & chemicals",
            description:
                "Safe transportation of chemical materials.",
            image: "Red and blue chemical barrels",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/hydrocarbons-and-chemicals.webp",
        },
        {
            name: "Heavy equipment",
            description:
                "Specialized transport of machinery and industrial equipment.",
            image: "Concrete mixer and generator machinery",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/heavy-equipment.webp",
        },
        {
            name: "Tow truck",
            description:
                "Reliable assistance for vehicle towing, anytime anywhere.",
            image: "Flatbed tow truck",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/tow-truck.webp",
        },
        {
            name: "Water",
            description:
                "Various sizes of water trucks accessible through the app.",
            image: "Truck carrying a water tank container",
            imageSrc: "https://yaseen-personal-work.s3.ap-south-1.amazonaws.com/media/our-services/water-truck.webp",
        },
    ],
};


