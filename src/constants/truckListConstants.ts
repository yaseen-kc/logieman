export type FleetItem = {
    name: string;
    imageSrc: string;
};

export type TruckListData = {
    title: string;
    description: string;
    fleet: FleetItem[];
};

export const TRUCK_LIST_CONSTANTS: TruckListData = {
    title: "Choose from a reliable fleet",
    description:
        "With a vast fleet selection accessible through our app, Logieman guarantees secure and punctual transportation of all commercial goods.",
    fleet: [
        { name: "Harbin", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_1.webp" },
        { name: "Fourgon", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_2.webp" },
        { name: "Benne", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_3.webp" },
        { name: "Camion", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_4.webp" },
        { name: "Benne", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_5.webp" },
        { name: "Towtruck", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_6.webp" },
        { name: "Citerne", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_7.webp" },
        { name: "Porte-engins", imageSrc: "https://www.camio.app/assets/png/fleets/fleet_8.webp" },
    ],
};

