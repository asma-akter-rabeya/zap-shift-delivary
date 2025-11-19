import React from "react";
import {
    MdDeliveryDining,
    MdLocalShipping
} from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaWarehouse } from "react-icons/fa";
import { RiBuilding2Line, RiRefund2Line } from "react-icons/ri";

const services = [
    {
        icon: <MdDeliveryDining className="text-4xl text-lime-600" />,
        title: "Express & Standard Delivery",
        desc: "Fast and secure delivery across major cities. Express service in Dhaka delivers within 4–6 hours."
    },
    {
        icon: <TbWorld className="text-4xl text-lime-600" />,
        title: "Nationwide Delivery",
        desc: "Reliable countrywide coverage with home delivery in all districts within 48–72 hours."
    },
    {
        icon: <FaWarehouse className="text-4xl text-lime-600" />,
        title: "Fulfillment Solution",
        desc: "Inventory management, order processing, packaging and complete backend logistics support."
    },
    {
        icon: <MdLocalShipping className="text-4xl text-lime-600" />,
        title: "Cash on Home Delivery",
        desc: "Secure cash-on-delivery (COD) services across Bangladesh with guaranteed safety."
    },
    {
        icon: <RiBuilding2Line className="text-4xl text-lime-600" />,
        title: "Corporate Logistics Service",
        desc: "Tailored corporate solutions including warehouse management and contract logistics."
    },
    {
        icon: <RiRefund2Line className="text-4xl text-lime-600" />,
        title: "Parcel Return Service",
        desc: "Reverse logistics for easy product returns and exchanges for online retailers."
    },
];

const OurServices = () => {
    return (
        <div className="py-16 bg-secondary rounded-2xl">
            <h3 className="text-4xl font-bold text-center text-white mb-3">
                Our Services
            </h3>

            <p className="text-center text-white w-10/12 mx-auto mb-12">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments — we deliver on time, every time.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl shadow-md 
                        ${index === 1 ? "bg-primary" : "bg-white"} 
                        `}
                    >
                        <div className="flex justify-center mb-4">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurServices;
