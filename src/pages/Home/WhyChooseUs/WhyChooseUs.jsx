import React from 'react';
import live from '../../../assets/live-tracking.png';
import safe from '../../../assets/safe-delivery.png';
import delivery from '../../../assets/safe-delivery.png';

const features = [
    {
        img: live,
        title: 'Live Parcel Tracking',
        desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
        img: safe,
        title: '100% Safe Delivery',
        desc: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.'
    },
    {
        img: delivery,
        title: '24/7 Call Center Support',
        desc: 'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.'
    },
];

const WhyChooseUs = () => {
    return (
        <section className="w-11/12 mx-auto py-16">
            <h2 className="text-4xl font-bold text-center mb-10">
                Why <span className="text-lime-800">Choose Us?</span>
            </h2>

            <div className="space-y-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-6 bg-white shadow-md rounded-xl p-6 border-l-4 border-primary hover:shadow-xl transition"
                    >
                        {/* Image Section */}
                        <div className="min-w-28 border-dashed border-r">
                            <img
                                src={feature.img}
                                alt={feature.title}
                                className="w-24 h-24 object-contain"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
