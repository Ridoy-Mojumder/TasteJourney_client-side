import { useState } from 'react';
import { Link } from 'react-router-dom';

// CarouselMain Component
export const CarouselMain = () => {
    const [currentSlider, setCurrentSlider] = useState(0);
    const sliders = [
        { img: "https://i.ibb.co/XVzLnzB/traditional-georgian-cuisine-food-khinkali-chahokhbili-phali-lobio-local-sauces-135427-5785.jpg", tags: "Room" },
        { img: "https://i.ibb.co/3W08zpv/georgian-cuisine-large-laid-table-different-dishes-whole-family-day-off-135427-5801.jpg", tags: "Room" },
        { img: "https://i.ibb.co/PFwhBKt/cozy-interior-cafe-warm-yellow-light-chandeliers-checkered-sofas-105751-8453.jpg", tags: "Room" },
        { img: "https://i.ibb.co/zVTCwbS/traditional-georgian-cuisine-food-khinkali-chahokhbili-phali-lobio-local-sauces-135427-5792.jpg", tags: "Room" },
        { img: "https://i.ibb.co/LR9z5DX/dinner-table-with-foods-soft-drinks-restaurant-114579-3319.jpg", tags: "Room" }
    ];

    const nextSlider = () => {
        setCurrentSlider((current) => (current === sliders.length - 1 ? 0 : current + 1));
    };

    return (
        <div className="sm:w-1/2 h-[540px] md:h-[670px] flex items-center relative overflow-hidden">
            <button onClick={nextSlider} className="absolute flex justify-center items-center right-2 top-1/2 bg-white rounded-full z-50 w-6 h-6 md:w-8 md:h-8">
                <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(180)">
                    <path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
                </svg>
            </button>
            <div className="ease-linear duration-300 flex gap-[2%]" style={{ transform: `translateX(-${currentSlider * 52}%)` }}>
                {sliders.map((slide, index) => (
                    <div key={index} className={`${currentSlider === index ? 'h-[580px]' : 'h-[480px]'} min-w-[50%] bg-black/30 relative duration-200`}>
                        <img src={slide.img} className="w-full h-full" alt={slide.tags} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Carousel2 Component
export const Carousel2 = () => {
    return (
        <div className=" mx-auto h-[540px] lg:h-[670px] px-3 lg:px-10 flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-5 lg:gap-10 relative">
            <div className="bg-[#f3f9fc] w-full absolute left-0 h-[540px] lg:h-[670px] -z-40"></div>
            <div className="w-2/3 lg:w-1/3 text-center lg:text-left space-y-2 lg:space-y-5 py-5">
                <h1 className="text-lg md:text-2xl lg:text-[40px] font-bold">50+ delectable dishes crafted</h1>
                <p className="text-[#616161] text-xs md:text-lg">Embark on a gastronomic adventure like no other at TasteJourney.</p>
                <Link to='/allFoods'>
                    <button className="font-bold py-2 xl:py-3 text-xs md:text-base lg:text-lg xl:text-xl hover:scale-95 duration-300 px-4 lg:px-10 text-white bg-[#45bfca]">See All Food</button>
                </Link>
            </div>
            <CarouselMain />
        </div>
    );
};

// BannerSection Component
const BannerSection = () => {
    return (
        <div className=''>
            <Carousel2 />
        </div>
    );
};

export default BannerSection;
