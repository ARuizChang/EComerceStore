import { useEffect } from 'react';
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProducts from '../components/FeaturedProducts';

const categories = [
  {
    href: "/electronics",
    name: "Electronics",
    imageUrl: "/technology.jpg"
  },
  {
    href: "/footwear",
    name: "Footwear",
    imageUrl: "/shoes.jpg"
  },
  {
    href: "/nutrition",
    name: "Nutrition",
    imageUrl: "/nutrition.jpg"
  },
  {
    href: "/sports",
    name: "Sports Equipment",
    imageUrl: "/fitness.jpg"
  },
  {
    href: "/health",
    name: "Health and Wellness",
    imageUrl: "/oil.jpg"
  },
  {
    href: "/accessories",
    name: "Sport Accessories",
    imageUrl: "waterBottle.jpg"
  },
];

const HomePage = () => {
  const {
    fetchFeaturedProducts,
    products,
    isLoading
  } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-cyan-400 mb-4 animate-fade-in-up">
          Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-text">Categories</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem
              category={category}
              key={category.name}
            />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts
            featuredProducts={products}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;