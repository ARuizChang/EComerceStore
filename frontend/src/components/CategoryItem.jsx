import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-3xl shadow-2xl group transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
      <Link to={`/category${category.href}`} className="block w-full h-full">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Vibrant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 z-10" />
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
          <h3 className="text-4xl font-bold mb-3 drop-shadow-2xl">{category.name}</h3>
          <p className="text-gray-200 text-sm font-medium bg-black bg-opacity-30 px-4 py-2 rounded-full inline-flex items-center gap-2 hover:bg-opacity-50 transition-all duration-300">
            Explore {category.name} <span className="text-lg">→</span>
          </p>
        </div>
        {/* Hover Effect: Shine */}
        <div className="absolute inset-0 bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-15" />
      </Link>
    </div>
  );
};

export default CategoryItem;