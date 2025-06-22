
import { X } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-400/30">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(product.features)}`}>
            {product.sku}
          </div>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Product Details */}
          {product.details && (
            <div>
              <h3 className="text-purple-300 text-sm uppercase tracking-wide mb-2">Specifications</h3>
              <div className="text-white text-lg font-mono bg-white/5 rounded-lg p-4">
                {product.details}
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="text-purple-300 text-sm uppercase tracking-wide mb-2">Features</h3>
            <div className="text-white text-xl leading-relaxed bg-white/5 rounded-lg p-4">
              {product.features}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-purple-300 text-sm uppercase tracking-wide mb-2">Price Range</h3>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {product.minPrice === product.maxPrice 
                ? `${product.minPrice} AED`
                : `${product.minPrice}-${product.maxPrice} AED`
              }
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-6 border-t border-purple-400/20">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-center">
              <h4 className="text-white text-lg font-medium mb-2">Intereste in this product?</h4>
              <p className="text-purple-100 text-sm">Contact us for availability and ordering information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
