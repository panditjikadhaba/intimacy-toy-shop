
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { FilterBar } from '@/components/FilterBar';
import { products } from '@/data/products';
import type { Product } from '@/types/product';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(product => {
      if (product.features.toLowerCase().includes('dildo')) cats.add('dildo');
      else if (product.features.toLowerCase().includes('vibrat')) cats.add('vibrator');
      else if (product.features.toLowerCase().includes('masturbat')) cats.add('masturbator');
      else if (product.features.toLowerCase().includes('spray') || product.features.toLowerCase().includes('cream')) cats.add('enhancement');
      else if (product.features.toLowerCase().includes('doll')) cats.add('doll');
      else cats.add('accessory');
    });
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.features.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      const price = product.minPrice;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const features = product.features.toLowerCase();
        matchesCategory = features.includes(selectedCategory) ||
                         (selectedCategory === 'enhancement' && (features.includes('spray') || features.includes('cream'))) ||
                         (selectedCategory === 'accessory' && !features.includes('dildo') && !features.includes('vibrat') && !features.includes('masturbat') && !features.includes('spray') && !features.includes('cream') && !features.includes('doll'));
      }
      
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [searchTerm, priceRange, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl font-light text-white mb-6 tracking-wide">
            Luxe
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
              Intimacy
            </span>
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of premium intimate wellness products, 
            designed for your pleasure and satisfaction.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-purple-300 text-xl">No products found matching your criteria</div>
            <p className="text-purple-400 mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Index;
