import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import HowItWorks from '../HowItWorks/HowItWorks';
import Features from '../Features/Features';
import CourierHero from '../CourierHero/CourierHero';
import FAQ from '../FAQ/FAQ';
import Brands from '../Brands/Brands';
import Review from '../Review/Review';
import axios from 'axios';

const Home = () => {
    const [reviews, setReviews] = React.useState([]);

    useEffect(() => {
        axios.get('/reviews.json')
        .then(res => setReviews(res.data))
    }, []);

    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <OurServices/>
            <Brands/>
            <Features/>
            <CourierHero/>
            <Review reviews={reviews}/>
            <FAQ/>
        </div>
    );
};

export default Home;