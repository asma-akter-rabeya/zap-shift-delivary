import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';
import { LuArrowUpRight } from 'react-icons/lu';

const ArrowIcon = () => (
    <span
        className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center ml-2"
        aria-hidden="true"
        role="img"
    >
        <LuArrowUpRight size={16} />
    </span>
);

const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                {/* Slide 1 */}
                <div className="relative">
                    <img src={bannerImg1} alt="Banner 1" />
                    <div className="flex gap-1.5 absolute md:bottom-20 md:left-20 sm:bottom-10 sm:left-10">
                        <button className="btn bg-primary flex items-center">
                            <span>Trace Your Parcel</span>
                            <ArrowIcon />
                        </button>

                        <button className="btn">
                            Be a Rider
                        </button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative">
                    <img src={bannerImg2} alt="Banner 2" />
                    <div className="flex gap-1.5 absolute md:bottom-20 md:left-20 sm:bottom-10 sm:left-10">
                        <button className="btn bg-primary flex items-center">
                            <span>Trace Your Parcel</span>
                            <ArrowIcon />
                        </button>

                        <button className="btn">
                            Be a Rider
                        </button>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative">
                    <img src={bannerImg3} alt="Banner 3" />
                    <div className="flex gap-1.5 absolute md:bottom-20 md:left-20 sm:bottom-10 sm:left-10">
                        <button className="btn bg-primary flex items-center">
                            <span>Trace Your Parcel</span>
                            <ArrowIcon />
                        </button>

                        <button className="btn">
                            Be a Rider
                        </button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
