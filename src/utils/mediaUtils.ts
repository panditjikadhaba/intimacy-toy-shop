// Utility function to get video URL for a product
export const getVideoUrl = (sku: string): string | null => {
  // Convert SKU to lowercase and handle different formats
  const normalizedSku = sku.toLowerCase().replace(':', '');
  
  // Handle special cases for SKU naming
  let videoFileName = normalizedSku;
  
  // Special case for NO:03A -> no03_1
  if (normalizedSku === 'no03a') {
    videoFileName = 'no03_1';
  }
  
  // Check if video exists (we'll assume it exists based on the file list)
  const videoPath = `/videos/${videoFileName}.mp4`;
  
  // List of available videos based on the uploaded files
  const availableVideos = [
    'no01', 'no02', 'no03', 'no03_1', 'no04', 'no05', 'no05a', 'no07', 'no07a',
    'no08', 'no09', 'no10', 'no10a', 'no11', 'no12', 'no13', 'no14', 'no15',
    'no16', 'no17', 'no18', 'no19', 'no20', 'no21', 'no22', 'no23', 'no122',
    'no177', 'no277', 'no377', 'no477', 'v01', 'v02', 'v03', 'v04', 'v05',
    'v06', 'v07', 'v08', 'v09', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15',
    'v16', 'v17', 'v18', 'v19', 'v20'
  ];
  
  if (availableVideos.includes(videoFileName)) {
    return videoPath;
  }
  
  return null;
};

// Utility function to get photo URL for a product (placeholder for future use)
export const getPhotoUrl = (sku: string): string | null => {
  // This can be implemented when photos are added
  return null;
};