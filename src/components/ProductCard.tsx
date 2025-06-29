import { useState, useRef, useEffect } from 'react';
import { Image, ShoppingCart, Video, Share2 } from 'lucide-react';
import { getVideoUrl } from '@/utils/mediaUtils';
import { ShareButton } from '@/components/ShareButton';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (features: string) => {
    const f = features.toLowerCase();
    if (f.includes('dildo')) return 'from-pink-500 to-rose-500';
    if (f.includes('vibrat')) return 'from-purple-500 to-violet-500';
    if (f.includes('masturbat')) return 'from-blue-500 to-indigo-500';
    if (f.includes('spray') || f.includes('cream')) return 'from-green-500 to-emerald-500';
    if (f.includes('doll')) return 'from-amber-500 to-orange-500';
    return 'from-gray-500 to-slate-500';
  };

  const videoUrl = getVideoUrl(product.sku);

  // Intersection Observer for autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle autoplay logic
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (isInView || isHovered) {
        videoRef.current.play().catch(() => {
          // Autoplay failed, which is normal for some browsers
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isInView, isHovered, videoUrl]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsHovered(true);
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsHovered(false), 2000); // Keep playing for 2 seconds after touch
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
  };

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 h-full flex flex-col relative">
        
        {/* Share Button - Top Right */}
        <div className="absolute top-3 right-3 z-10" onClick={handleShareClick}>
          <ShareButton product={product} />
        </div>

        {/* Media Section */}
        <div className="mb-4 h-40 md:h-48 bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20 relative overflow-hidden">
          {videoUrl ? (
            <div className="relative w-full h-full">
              <video 
                ref={videoRef}
                className="w-full h-full object-contain rounded-lg"
                preload="metadata"
                muted
                loop
                playsInline
                onError={() => console.log('Video failed to load:', videoUrl)}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              
              {/* Video overlay when not playing */}
              <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${isHovered || isInView ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Video className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="absolute top-2 left-2">
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Video Available
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-purple-300">
              <Image className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs md:text-sm opacity-50">Media coming soon</p>
            </div>
          )}
        </div>

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
          {videoUrl ? 'Tap to view video & details →' : 'Tap to view details →'}
        </div>
      </div>
    </div>
  );
};