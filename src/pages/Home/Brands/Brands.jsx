import React from 'react';
import Marquee from 'react-fast-marquee';
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start from "../../../assets/brands/star.png";

const brandLogos = [amazon, casio, moonstar, randstad, start];

const Brands = () => {
    return (
        <div className="my-10">
        <h2 className="font-extrabold text-2xl text-secondary text-center my-5">
            We've helped thousands of sales teams
        </h2>
      <Marquee>
        {brandLogos.map((logo, index) => (
          <div className="px-20" key={index}>
            <img src={logo} alt="" />
          </div>
        ))}
      </Marquee>
    </div>
    );
};

export default Brands;