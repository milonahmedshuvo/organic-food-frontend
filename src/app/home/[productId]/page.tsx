/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Image from "next/image";
import {SetStateAction, useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from '../../../images/product1.webp'
import img2 from '../../../images/product6.webp'
import img3 from '../../../images/product3.webp'
import img4 from '../../../images/product2.webp'
import { FaStar } from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import { BiMinus } from "react-icons/bi";





const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};







const page = () => {
  const [product, setProduct] = useState<any>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const thumbnails = [
    img1,
    img2,
    img3,
    img4,
  ];

  const handleThumbnailClick = (index: SetStateAction<number>) => {
    setSelectedThumbnail(index);
  };


  const [quantity, setQuantity] = useState(1);

console.log(product?.data)
  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); 
    if (id) {
      fetch(`http://localhost:5000/api/v1/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, []);

  


  
  return (
    <div className="px-3 md:px-14 lg:px-24 mt-28">


        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-8">
        {/*f coloumn carousel */}
        <div>
          <div className="">
            <div className="h-[328px] md:h-[460px] rounded bg-bgcolor">
              <Image
                src={product?.data.image}
                height={50}
                width={500}
                alt="Main Image"
                className="h-full"
              // className="w-full h-96 object-cover"
              />
            </div>

            <div className=" mt-5">
              <Carousel
                swipeable={true}
                draggable={true}
                responsive={responsive}
                ssr={true}
                infinite={false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={"desktop"}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px mx-1 gap-1"
              >
                {thumbnails.map((thumbnail, index) => (
                  <Image
                    key={index}
                    height={100}
                    width={100}
                    src={thumbnail}
                    alt={`Thumbnail ${index}`}
                    className={` w-32 h-28 rounded-xl cursor-pointer  ${selectedThumbnail === index
                      ? "bg-[#E0DCF8]"
                      : "bg-[#ECE9FE]"
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </Carousel>
            </div>
          </div>




        </div>

        {/* 2nd coloumn */}
        <div>
          <div>
            <span className="text-white py-2 text-lg rounded-[2px] px-8 bg-primary_color">New Arrival</span>
            <h1 className="text-[33px] mt-5 text-black_color font-semibold">
              {product?.data.name}
            </h1>
            <div className="flex gap-[6px] mt-4 items-center">
              <FaStar className="text-[#FFCF11] text-[24px]"></FaStar>
              <FaStar className="text-[#FFCF11] text-[24px]"></FaStar>
              <FaStar className="text-[#FFCF11] text-[24px]"></FaStar>
              <FaStar className="text-[#FFCF11] text-[24px]"></FaStar>
              <FaStar className="text-[#DFDFDF] text-[24px]"></FaStar>
              <p>(4.0)</p>
              <p className="text-textBlue pl-3">121 reviews</p>

            </div>
            <h1 className="text-[28px] text-black_color font-semibold mt-5 border-b pb-4">BDT {product?.data.price} </h1>
          </div>

          {/* size  */}

          <div className="">
            <div className="mt-4">
              
            <p className="text-black_color">{product?.data.description} </p>


              {/* <p className="text-rose-600 my-5">It is 7 pice available</p> */}

              <div className="mt-5">
          
                <div className="flex bg-[#ECE9FE] items-center justify-between px-3 w-32 py-2 mt-2 rounded-full">
                  <BiMinus onClick={() => setQuantity(quantity - 1)}></BiMinus>
                  <span className="text-lg">{quantity}</span>
                  <PiPlus onClick={() => setQuantity(quantity + 1)}></PiPlus>
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-1 mt-7 gap-4 md:gap-8">
                

                <button className="w-full px-10 rounded-lg py-[6px] border-2 text-[16px] bg-primary_color duration-500 border-primary_color tracking-wide text-white">
                  Add to cart
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>


      


    </div>
  )
}

export default page