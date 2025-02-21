import bannerImg from "../images/image1.webp";


const Banner = () => {
  return (
    <section className=' h-[400px] md:h-[450px] lg:h-[650px] bg-[#F7ECB4] relative' style={{
      backgroundImage: `url(${bannerImg.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: "115% auto",
      backgroundPosition: "0px center",
    }} >

      <div className="px-3 md:px-14 lg:px-24 flex flex-col absolute bottom-[18%] lg:bottom-[38%]">
        <h3 className="italic font-normal text-lg text-gray_color uppercase ">100% organic</h3>
        <h1 className="font-semibold text-4xl lg:text-[48px] text-[#253237] leading-none mt-2">Live Organic</h1>
        <h1 className="font-semibold text-4xl lg:text-[48px] text-[#253237] leading-none mt-2">For Live Healthy</h1>

        <h4 className="text-black_color font-normal text-[18px] lg:text-[20px] mt-5">A Great Variety Of Care fully Stored Citruses</h4>
      </div>
    </section>
  );
};

export default Banner;
