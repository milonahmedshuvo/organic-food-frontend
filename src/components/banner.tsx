import bannerImg from "../images/image1.webp";


const Banner = () => {
  return (
    <section className=' h-[200px] md:h-[650px]' style={{
      backgroundImage: `url(${bannerImg.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: "115% auto", // Zoom in to crop right side
      backgroundPosition: "0px center", // Move image to left
    }} >
    </section>
  );
};

export default Banner;
