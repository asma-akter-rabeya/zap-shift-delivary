import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;

    return (
        <div className="min-w-96 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 relative">

            {/* Soft Floating Quote Icon */}
            <div className="absolute -top-1.5 -left-3 bg-primary/90 text-white p-3 rounded-xl shadow-md">
                <FaQuoteLeft className="text-lg" />
            </div>

            {/* Review Text */}
            <p className="text-gray-700 leading-relaxed mt-4">
                {testimonial}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-6"></div>

            {/* User Info */}
            <div className="flex items-center gap-4">
                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 shadow-sm">
                    <img
                        src={user_photoURL}
                        alt={userName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Name + Role */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{userName}</h3>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
