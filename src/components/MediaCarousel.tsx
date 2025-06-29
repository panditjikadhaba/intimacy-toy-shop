import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Video, Image as ImageIcon, Play, Pause } from 'lucide-react';
import { getVideoUrl, getProductImages } from '@/utils/mediaUtils';
import type { Product } from '@/types/product';

interface MediaCarouselProps {
  product: Product;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

export const MediaCarousel = ({ 
  product, 
  autoPlay = false, 
  showControls = true,
  className = ""
}: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const videoUrl = getVideoUrl(product.sku);
  const images = getProductImages(product.sku);
  
  // Create media array with video first (if available), then images
  const mediaItems = [];
  if (videoUrl) {
    mediaItems.push({ type: 'video', url: videoUrl });
  }
  images.forEach(img => {
    mediaItems.push({ type: 'image', url: img });
  });

  const totalItems = mediaItems.length;

  useEffect(() => {
    if (autoPlay && videoRef.current && currentIndex === 0 && videoUrl) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(() => {
          // Autoplay failed, which is normal
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, currentIndex, videoUrl]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleVideoPlay = () => setIsVideoPlaying(true);
  const handleVideoPause = () => setIsVideoPlaying(false);
  const handleVideoLoad = () => setIsVideoLoaded(true);

  if (totalItems === 0) {
    return (
      <div className={`bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20 ${className}`}>
        <div className="text-center text-purple-300">
          <ImageIcon className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 opacity-50" />
          <p className="text-xs md:text-sm opacity-50">Media coming soon</p>
        </div>
      </div>
    );
  }

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className={`relative group ${className}`}>
      <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
        {currentMedia.type === 'video' ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onLoadedData={handleVideoLoad}
              preload="metadata"
              muted
              loop
              playsInline
            >
              <source src={currentMedia.url} type="video/mp4" />
            </video>
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={toggleVideoPlay}
                className={`bg-black/50 backdrop-blur-sm rounded-full p-3 transition-opacity duration-300 ${
                  isVideoPlaying && isVideoLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
              >
                {isVideoPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {/* Video Label */}
            <div className="absolute top-2 left-2">
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <Video className="w-3 h-3" />
                Video
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={currentMedia.url}
              alt={`${product.sku} - Image ${currentIndex + (videoUrl ? 0 : 1)}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Image Label */}
            <div className="absolute top-2 left-2">
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                Photo {currentIndex + (videoUrl ? 0 : 1)}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {showControls && totalItems > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Media Counter */}
        {totalItems > 1 && (
          <div className="absolute bottom-2 right-2">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-white text-xs font-medium">
                {currentIndex + 1} / {totalItems}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showControls && totalItems > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === index 
                  ? 'border-purple-400 ring-2 ring-purple-400/50' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              {media.type === 'video' ? (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
              ) : (
                <img
                  src={media.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};