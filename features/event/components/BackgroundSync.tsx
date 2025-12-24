'use client';

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { backgroundColorsState } from '@/state/atoms';
import { useBackgroundColors } from '../hooks/useBackgroundColors';

/**
 * BackgroundSync Component
 * 
 * This component:
 * 1. Triggers color extraction when background image changes (via useBackgroundColors hook)
 * 2. Syncs extracted colors to CSS variables on the document root
 * 3. Updates the body background gradient dynamically
 * 
 * Must be placed in the root layout to ensure global background updates.
 * This is the single source of truth for background color application.
 */
export default function BackgroundSync() {
  // Extract colors from image when it changes
  useBackgroundColors();
  
  // Read extracted colors from Recoil
  const backgroundColors = useRecoilValue(backgroundColorsState);
  
  useEffect(() => {
    console.log(`[BackgroundSync] 🚀 Component initialized`, {
      currentColors: backgroundColors ? {
        color1: backgroundColors.color1,
        color2: backgroundColors.color2,
        color3: backgroundColors.color3,
      } : 'default',
      timestamp: new Date().toISOString(),
    });
  }, []); // Only on mount
  
  // Log when backgroundColors state changes
  useEffect(() => {
    console.log(`[BackgroundSync] 📊 Background colors state changed:`, {
      hasColors: !!backgroundColors,
      colors: backgroundColors ? {
        color1: backgroundColors.color1,
        color2: backgroundColors.color2,
        color3: backgroundColors.color3,
      } : null,
      timestamp: new Date().toISOString(),
    });
  }, [backgroundColors]);
  
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    
    if (backgroundColors) {
      console.log(`[BackgroundSync] 🎨 Updating CSS variables with extracted colors:`, {
        color1: backgroundColors.color1,
        color2: backgroundColors.color2,
        color3: backgroundColors.color3,
        timestamp: new Date().toISOString(),
      });
      
      // Apply extracted colors to CSS variables
      root.style.setProperty('--gradient-color-1', backgroundColors.color1);
      root.style.setProperty('--gradient-color-2', backgroundColors.color2);
      root.style.setProperty('--gradient-color-3', backgroundColors.color3);
      root.style.setProperty('--gradient-color-1-rgba', backgroundColors.color1Rgba);
      root.style.setProperty('--gradient-color-2-rgba', backgroundColors.color2Rgba);
      root.style.setProperty('--gradient-color-3-rgba', backgroundColors.color3Rgba);
      
      // Verify CSS variables were set
      const verifyColor1 = root.style.getPropertyValue('--gradient-color-1');
      const verifyColor2 = root.style.getPropertyValue('--gradient-color-2');
      const verifyColor3 = root.style.getPropertyValue('--gradient-color-3');
      
      console.log(`[BackgroundSync] ✅ Background gradient updated successfully!`, {
        appliedColors: {
          '--gradient-color-1': backgroundColors.color1,
          '--gradient-color-2': backgroundColors.color2,
          '--gradient-color-3': backgroundColors.color3,
        },
        verifiedValues: {
          '--gradient-color-1': verifyColor1,
          '--gradient-color-2': verifyColor2,
          '--gradient-color-3': verifyColor3,
        },
        allApplied: verifyColor1 && verifyColor2 && verifyColor3,
        timestamp: new Date().toISOString(),
      });
      
      console.log(`[BackgroundSync] 🎨 GRADIENT KEY COLORS APPLIED:`, {
        'Primary (color1)': backgroundColors.color1,
        'Secondary (color2)': backgroundColors.color2,
        'Tertiary (color3)': backgroundColors.color3,
        'RGBA Primary': backgroundColors.color1Rgba,
        'RGBA Secondary': backgroundColors.color2Rgba,
        'RGBA Tertiary': backgroundColors.color3Rgba,
      });
    } else {
      console.log(`[BackgroundSync] 🔄 Resetting to default background colors`);
      
      // Reset to default colors when no background image
      root.style.setProperty('--gradient-color-1', '#667eea');
      root.style.setProperty('--gradient-color-2', '#764ba2');
      root.style.setProperty('--gradient-color-3', '#f093fb');
      root.style.setProperty('--gradient-color-1-rgba', 'rgba(102, 126, 234, 0.4)');
      root.style.setProperty('--gradient-color-2-rgba', 'rgba(118, 75, 162, 0.4)');
      root.style.setProperty('--gradient-color-3-rgba', 'rgba(240, 147, 251, 0.4)');
      
      console.log(`[BackgroundSync] ✅ Default background colors applied`, {
        timestamp: new Date().toISOString(),
      });
    }
  }, [backgroundColors]);
  
  // This component doesn't render anything - it only syncs state to CSS
  return null;
}

