import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaHandHolding } from "react-icons/fa6";
import { GiDeliveryDrone } from "react-icons/gi";

const HowItWorks = () => {
    const features = [
        {
            icon: <FaHandHolding className="w-12 h-12 text-lime-600" />,
            title: "Book Pick & Drop",
            desc: "Schedule a pickup from your home or office — quick, simple, and hassle-free.",
        },
        {
            icon: <RiMotorbikeFill className="w-12 h-12 text-lime-600" />,
            title: "Fast Rider Collection",
            desc: "Our riders collect your parcel within minutes and ensure safe handling.",
        },
        {
            icon: <TbTruckDelivery className="w-12 h-12 text-lime-600" />,
            title: "Smart Delivery Hub",
            desc: "Packages are sorted and processed at our hub for faster and accurate delivery.",
        },
        {
            icon: <GiDeliveryDrone className="w-12 h-12 text-lime-600" />,
            title: "On-Time Delivery",
            desc: "Your parcel reaches the destination on time with live tracking updates.",
        },
    ];

    return (
        <section className="py-16 bg-gray-50 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
                How <span className="text-lime-600">It Works</span>?
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-7 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="p-4 rounded-full bg-lime-100 shadow-sm">
                                {feature.icon}
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-gray-700">
                            {feature.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;