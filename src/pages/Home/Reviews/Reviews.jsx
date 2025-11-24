import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    // console.log(reviews);
    return (
        <div className='my-10'>
            <div className='text-center mb-20'>
                <h3 className="text-4xl font-bold mb-4">
                    What Our <span className="text-primary">Customers</span> Say
                </h3>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Real experiences from people who trusted us — see why thousands choose our service every day.
                </p>

                <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>


            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={4}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 300,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <ReviewCard review={review}></ReviewCard>
                    </SwiperSlide>)
                }
            </Swiper>

        </div>
    );
};

export default Reviews;