import { useState, useRef } from 'react';
import { Upload, X, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaUploaderProps {
  onPhotoUpload: (url: string) => void;
  onVideoUpload: (url: string) => void;
  currentPhoto?: string;
  currentVideo?: string;
}

export const MediaUploader = ({ 
  onPhotoUpload, 
  onVideoUpload, 
  currentPhoto, 
  currentVideo 
}: MediaUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For demo purposes, we'll create a local URL
      // In production, you'd upload to a cloud service like Cloudinary, AWS S3, etc.
      const url = URL.createObjectURL(file);
      onPhotoUpload(url);
    } catch (error) {
      console.error('Photo upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For demo purposes, we'll create a local URL
      // In production, you'd upload to a cloud service
      const url = URL.createObjectURL(file);
      onVideoUpload(url);
    } catch (error) {
      console.error('Video upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload */}
      <div className="border-2 border-dashed border-purple-300/30 rounded-lg p-6">
        <div className="text-center">
          <Image className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <h3 className="text-white font-medium mb-2">Product Photo</h3>
          
          {currentPhoto ? (
            <div className="relative inline-block">
              <img 
                src={currentPhoto} 
                alt="Product" 
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => onPhotoUpload('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-purple-300 text-sm">Upload a product photo</p>
              <Button
                onClick={() => photoInputRef.current?.click()}
                disabled={uploading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Choose Photo'}
              </Button>
            </div>
          )}
          
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Video Upload */}
      <div className="border-2 border-dashed border-purple-300/30 rounded-lg p-6">
        <div className="text-center">
          <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <h3 className="text-white font-medium mb-2">Product Video</h3>
          
          {currentVideo ? (
            <div className="relative inline-block">
              <video 
                src={currentVideo} 
                className="w-32 h-32 object-cover rounded-lg"
                controls
              />
              <button
                onClick={() => onVideoUpload('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-purple-300 text-sm">Upload a product video (optional)</p>
              <Button
                onClick={() => videoInputRef.current?.click()}
                disabled={uploading}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Choose Video'}
              </Button>
            </div>
          )}
          
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};