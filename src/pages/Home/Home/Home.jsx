import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Reviews from '../Reviews/Reviews';
import FAQ from '../FAQ/FAQ';

const reviewsPromise = fetch('/reveiws.json').then(res => res.json())

const Home = () => {
    return (
        <div className='space-y-8'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <WhyChooseUs></WhyChooseUs>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;