'use client';

import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { backgroundColorsState, BackgroundColors } from '@/state/atoms';

/**
 * Extracts dominant colors from an image and converts them to hex format
 * Uses Canvas API to sample pixels and calculate average colors
 */
const extractColorsFromImage = async (imageUrl: string): Promise<BackgroundColors> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Only set crossOrigin for external URLs, not blob URLs
    if (!imageUrl.startsWith('blob:') && !imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    
    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      reject(new Error('Image loading timeout'));
    }, 10000); // 10 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      
      console.log(`[ColorExtraction] 🖼️ Image loaded:`, {
        url: imageUrl.substring(0, 50) + '...',
        dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
        complete: img.complete,
        timestamp: new Date().toISOString(),
      });
      
      // Ensure image is fully loaded
      if (!img.complete || img.naturalWidth === 0) {
        reject(new Error('Image not fully loaded'));
        return;
      }
      
      try {
        console.log(`[ColorExtraction] 🎨 Starting color extraction...`);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Sample at reasonable resolution for performance
        canvas.width = 200;
        canvas.height = 200;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Sample pixels from different regions
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;
        
        // Sample from three regions: top-left, center, bottom-right
        const regions = [
          { x: 0, y: 0, width: Math.floor(width * 0.4), height: Math.floor(height * 0.4) }, // Top-left
          { x: Math.floor(width * 0.3), y: Math.floor(height * 0.3), width: Math.floor(width * 0.4), height: Math.floor(height * 0.4) }, // Center
          { x: Math.floor(width * 0.6), y: Math.floor(height * 0.6), width: Math.floor(width * 0.4), height: Math.floor(height * 0.4) }, // Bottom-right
        ];
        
        const colors = regions.map((region) => {
          let r = 0, g = 0, b = 0, count = 0;
          
          // Sample pixels in the region (every 2nd pixel for performance)
          for (let y = region.y; y < region.y + region.height && y < height; y += 2) {
            for (let x = region.x; x < region.x + region.width && x < width; x += 2) {
              const index = (y * width + x) * 4; // RGBA format: 4 values per pixel
              if (index + 2 < data.length) {
                r += data[index];
                g += data[index + 1];
                b += data[index + 2];
                count++;
              }
            }
          }
          
          if (count === 0) {
            // Fallback to default color if no pixels sampled
            return { r: 102, g: 126, b: 234 };
          }
          
          return {
            r: Math.floor(r / count),
            g: Math.floor(g / count),
            b: Math.floor(b / count),
          };
        });
        
        // Convert to hex
        const toHex = (n: number) => {
          const hex = Math.max(0, Math.min(255, n)).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
        
        const color1 = `#${toHex(colors[0].r)}${toHex(colors[0].g)}${toHex(colors[0].b)}`;
        const color2 = `#${toHex(colors[1].r)}${toHex(colors[1].g)}${toHex(colors[1].b)}`;
        const color3 = `#${toHex(colors[2].r)}${toHex(colors[2].g)}${toHex(colors[2].b)}`;
        
        // Create rgba versions with 0.4 alpha for radial gradients
        const color1Rgba = `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0.4)`;
        const color2Rgba = `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.4)`;
        const color3Rgba = `rgba(${colors[2].r}, ${colors[2].g}, ${colors[2].b}, 0.4)`;
        
        const extractedColors = {
          color1,
          color2,
          color3,
          color1Rgba,
          color2Rgba,
          color3Rgba,
        };
        
        console.log(`[ColorExtraction] ✅ Colors extracted successfully:`, {
          color1,
          color2,
          color3,
          timestamp: new Date().toISOString(),
        });
        
        resolve(extractedColors);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      clearTimeout(timeout);
      console.error('Image load error:', error);
      reject(new Error('Failed to load image'));
    };
    
    // Set src after setting up handlers
    img.src = imageUrl;
  });
};

/**
 * Hook to extract and store background colors from the uploaded background image
 * Automatically processes the image when backgroundImageUrl changes
 */
export const useBackgroundColors = () => {
  const [event] = useRecoilState(eventState);
  const setBackgroundColors = useSetRecoilState(backgroundColorsState);
  
  useEffect(() => {
    let isCancelled = false;
    
    console.log(`[useBackgroundColors] 🔍 Effect triggered`, {
      backgroundImageUrl: event.backgroundImageUrl || 'null',
      hasUrl: !!event.backgroundImageUrl,
      urlType: event.backgroundImageUrl?.startsWith('blob:') ? 'blob' : event.backgroundImageUrl?.startsWith('http') ? 'http' : 'other',
      timestamp: new Date().toISOString(),
    });
    
    if (event.backgroundImageUrl) {
      console.log(`[useBackgroundColors] 🔄 Background image URL detected:`, {
        url: event.backgroundImageUrl.substring(0, 50) + '...',
        fullUrl: event.backgroundImageUrl,
        timestamp: new Date().toISOString(),
        willStartExtraction: true,
      });
      
      // Add a small delay to ensure blob URL is ready
      const timeoutId = setTimeout(() => {
        if (isCancelled) {
          console.log(`[useBackgroundColors] ⏹️ Extraction cancelled (URL changed)`);
          return;
        }
        
        console.log(`[useBackgroundColors] 🚀 Starting color extraction process...`);
        extractColorsFromImage(event.backgroundImageUrl!)
          .then((colors) => {
            if (isCancelled) {
              console.log(`[useBackgroundColors] ⏹️ Extraction result ignored (URL changed)`);
              return;
            }
            console.log(`[useBackgroundColors] ✅ Colors extracted and stored in state:`, {
              color1: colors.color1,
              color2: colors.color2,
              color3: colors.color3,
              timestamp: new Date().toISOString(),
            });
            setBackgroundColors(colors);
          })
          .catch((error) => {
            if (isCancelled) {
              console.log(`[useBackgroundColors] ⏹️ Extraction error ignored (URL changed)`);
              return;
            }
            console.error(`[useBackgroundColors] ❌ Failed to extract colors:`, {
              error: error.message,
              imageUrl: event.backgroundImageUrl?.substring(0, 50) + '...',
              timestamp: new Date().toISOString(),
            });
            // Fallback to default colors on error
            setBackgroundColors(null);
          });
      }, 100); // 100ms delay to ensure blob URL is ready
      
      return () => {
        isCancelled = true;
        clearTimeout(timeoutId);
      };
    } else {
      console.log(`[useBackgroundColors] 🔄 Background image URL cleared, resetting colors`);
      // Reset to null when no background image
      setBackgroundColors(null);
    }
  }, [event.backgroundImageUrl, setBackgroundColors]);
};

