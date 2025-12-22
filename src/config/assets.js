// Asset Configuration
// S3 bucket URL for all static assets
// Can be overridden via environment variable VITE_ASSETS_BASE_URL
export const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com';

// Helper function to get asset URL
export const getAssetUrl = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${ASSETS_BASE_URL}/${cleanPath}`;
};
