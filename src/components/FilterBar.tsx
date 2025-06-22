
interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: FilterBarProps) => {
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-purple-300 hover:bg-white/20'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-purple-300 hover:bg-white/20'
            }`}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="flex items-center gap-4 min-w-[300px]">
        <span className="text-purple-300 text-sm whitespace-nowrap">Price Range:</span>
        <div className="flex items-center gap-2 flex-1">
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            className="flex-1 accent-purple-500"
          />
          <span className="text-purple-300 text-sm whitespace-nowrap">
            {priceRange[0]}-{priceRange[1]} AED
          </span>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="flex-1 accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
};
