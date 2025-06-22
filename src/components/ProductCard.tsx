
import { useState } from 'react';
import { Image, Video, ShoppingCart } from 'lucide-react';
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
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 h-full flex flex-col">
        {/* Media Section */}
        {product.photo ? (
          <div className="relative mb-4 rounded-lg overflow-hidden bg-white/5">
            <img 
              src={product.photo} 
              alt={product.sku}
              className="w-full h-40 md:h-48 object-cover"
            />
            {product.video && (
              <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2">
                <Video className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 h-40 md:h-48 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
            <div className="text-center text-purple-300">
              <Image className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs md:text-sm opacity-50">Photo coming soon</p>
            </div>
          </div>
        )}

        {/* SKU Badge */}
        <div className={`inline-block px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(product.features)} mb-3 md:mb-4 self-start`}>
          {product.sku}
        </div>

        {/* Product Details */}
        {product.details && (
          <div className="text-purple-300 text-xs md:text-sm mb-2 font-mono">
            {product.details}
          </div>
        )}

        {/* Features */}
        <h3 className="text-white text-sm md:text-lg font-medium mb-3 md:mb-4 line-clamp-3 leading-relaxed flex-grow">
          {product.features}
        </h3>

        {/* Price */}
        <div className="mt-auto">
          <div className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {product.minPrice === product.maxPrice 
              ? `${product.minPrice} AED`
              : `${product.minPrice}-${product.maxPrice} AED`
            }
          </div>
          
          {/* Quick Buy Button - Mobile */}
          <div className="md:hidden">
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-medium">
              <ShoppingCart className="w-3 h-3" />
              Cash on Delivery
            </div>
          </div>
        </div>

        {/* Hover Effect - Desktop */}
        <div className={`mt-4 text-purple-300 text-sm transition-opacity duration-300 hidden md:block ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          Tap to view details →
        </div>
      </div>
    </div>
  );
};
