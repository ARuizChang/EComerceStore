import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const { addToCart } = useCartStore();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else if (window.innerWidth < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= featuredProducts.length - itemsPerPage ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? featuredProducts.length - itemsPerPage : prevIndex - itemsPerPage
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

    return (
        <div className='py-12'>
            <div className='container mx-auto px-4'>
                <h2 className='text-center text-4xl sm:text-5xl font-bold text-cyan-400 mb-8'>Featured Products</h2>
                <div className='relative'>
                    <div className='overflow-hidden'>
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {featuredProducts?.map((product) => (
                                <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
                                    <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden h-full transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 border border-cyan-500/20'>
                                        <div className='overflow-hidden'>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                                            />
                                        </div>
                                        <div className='p-6'>
                                            <h3 className='text-xl font-bold mb-2 text-white'>{product.name}</h3>
                                            <p className='text-cyan-300 font-semibold mb-4'>
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className='w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 
												flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/30'
                                            >
                                                <ShoppingCart className='w-5 h-5 mr-2' />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={prevSlide}
                        disabled={isStartDisabled}
                        className={`absolute top-1/2 -left-6 transform -translate-y-1/2 p-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 ${isStartDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className='w-6 h-6 text-white' />
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={isEndDisabled}
                        className={`absolute top-1/2 -right-6 transform -translate-y-1/2 p-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 ${isEndDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Next Slide"
                    >
                        <ChevronRight className='w-6 h-6 text-white' />
                    </button>
                </div>
                {/* Pagination Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(featuredProducts.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index * itemsPerPage)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index * itemsPerPage ? "bg-cyan-600 scale-125" : "bg-gray-400"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;