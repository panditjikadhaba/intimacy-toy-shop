
import { useState } from 'react';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (features: string) => {
    const f = features.toLowerCase();
    if (f.includes('dildo')) return 'from-pink-500 to-rose-500';
    if (f.includes('vibrat')) return 'from-purple-500 to-violet-500';
    if (f.includes('masturbat')) return 'from-blue-500 to-indigo-500';
    if (f.includes('spray') || f.includes('cream')) return 'from-green-500 to-emerald-500';
    if (f.includes('doll')) return 'from-amber-500 to-orange-500';
    return 'from-gray-500 to-slate-500';
  };

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 h-full">
        {/* SKU Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(product.features)} mb-4`}>
          {product.sku}
        </div>

        {/* Product Details */}
        {product.details && (
          <div className="text-purple-300 text-sm mb-2 font-mono">
            {product.details}
          </div>
        )}

        {/* Features */}
        <h3 className="text-white text-lg font-medium mb-4 line-clamp-3 leading-relaxed">
          {product.features}
        </h3>

        {/* Price */}
        <div className="mt-auto">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {product.minPrice === product.maxPrice 
              ? `${product.minPrice} AED`
              : `${product.minPrice}-${product.maxPrice} AED`
            }
          </div>
        </div>

        {/* Hover Effect */}
        <div className={`mt-4 text-purple-300 text-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          Click to view details →
        </div>
      </div>
    </div>
  );
};
