'use client';

import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { uploadImage } from '@/state/api';
import { Image as ImageIcon } from 'lucide-react';

interface ImageUploadButtonProps {
  type: 'flyer' | 'background';
}

export default function ImageUploadButton({ type }: ImageUploadButtonProps) {
  const [event, setEvent] = useRecoilState(eventState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(`[ImageUploadButton] 🔘 Button clicked - type: ${type}`, {
      buttonType: type,
      willUpload: type === 'background' ? 'BACKGROUND (for gradient colors)' : 'FLYER (for preview)',
      timestamp: new Date().toISOString(),
    });
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`[ImageUpload] 📤 Uploading ${type} image:`, {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        fileType: file.type,
        timestamp: new Date().toISOString(),
      });
      const imageUrl = await uploadImage(file, type, setEvent, event);
      console.log(`[ImageUpload] ✅ ${type} image uploaded successfully:`, {
        imageUrl,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="flex items-center gap-3 px-6 py-4 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/15 text-white rounded-2xl transition-all duration-200 text-base font-medium w-full justify-center shadow-lg"
      >
        <ImageIcon size={20} className="text-white/80" />
        <span>Change background</span>
      </button>
    </>
  );
}

