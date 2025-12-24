'use client';

import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface PhotoGalleryProps {
  config: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

export default function PhotoGallery({ config, onUpdate }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<string[]>(config.photos || []);

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhotos = [...photos, url];
      setPhotos(newPhotos);
      onUpdate({ ...config, photos: newPhotos });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onUpdate({ ...config, photos: newPhotos });
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <h3 className="text-white font-semibold mb-4">Photo Gallery</h3>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square">
            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover rounded" />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <label className="aspect-square border-2 border-dashed border-white/30 rounded flex items-center justify-center cursor-pointer hover:border-white/50 transition-colors">
          <ImageIcon className="text-white/60" size={24} />
          <input type="file" accept="image/*" onChange={handleAddPhoto} className="hidden" />
        </label>
      </div>
    </div>
  );
}

