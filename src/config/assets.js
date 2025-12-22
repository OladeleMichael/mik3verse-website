/* ====================================================================
   ASSET CONFIGURATION
   ====================================================================
   
   ⚠️  IMPORTANT: Update this configuration when deploying to production!
   
   This file controls where all static assets (images, videos) are loaded from.
   
   CONFIGURATION OPTIONS:
   
   1. Environment Variable (RECOMMENDED):
      Set VITE_ASSETS_BASE_URL in your .env.production file:
      
      VITE_ASSETS_BASE_URL=https://your-bucket-name.s3.your-region.amazonaws.com
   
   2. Hardcoded Fallback:
      If no environment variable is set, it uses the default S3 bucket below.
      Update the URL in this file if you're using a different bucket.
   
   DEPLOYMENT NOTES:
   - Current default bucket: mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com
   - All assets are in the /assets/ subdirectory
   - Structure: /assets/videography/, /assets/fitness/, /assets/tech/, /assets/shared/
   
   ================================================================== */

// S3 bucket URL for all static assets
// Override this by setting VITE_ASSETS_BASE_URL environment variable
export const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL || 'https://mik3verse-portfolio-assets.s3.eu-north-1.amazonaws.com';

// Helper function to get asset URL
export const getAssetUrl = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${ASSETS_BASE_URL}/${cleanPath}`;
};
