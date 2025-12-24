'use client';

import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { Pencil } from 'lucide-react';
import { useRef } from 'react';
import { uploadImage } from '@/state/api';

export default function FlyerPreview() {
  const [event, setEvent] = useRecoilState(eventState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`[FlyerPreview] 📝 Uploading FLYER image (this does NOT change background gradient):`, {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        timestamp: new Date().toISOString(),
      });
      await uploadImage(file, 'flyer', setEvent, event);
      console.log(`[FlyerPreview] ℹ️ Note: To change BACKGROUND GRADIENT, use the "Change background" button below!`);
    }
  };

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
      {/* Image preview - fits container */}
      <img
        src={event.flyerImageUrl || '/placeholder.png'}
        alt="Flyer preview"
        className="w-full h-full object-cover"
      />
      {/* Edit icon in bottom right - minimal */}
      <button
        onClick={handleEditClick}
        className="absolute bottom-6 right-6 w-9 h-9 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Pencil size={16} className="text-white/90" />
      </button>
    </div>
  );
}

