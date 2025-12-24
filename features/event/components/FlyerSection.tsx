'use client';

import FlyerPreview from './FlyerPreview';
import ImageUploadButton from './ImageUploadButton';

export default function FlyerSection() {
  return (
    <div className="space-y-6">
      <FlyerPreview />
      <ImageUploadButton type="background" />
    </div>
  );
}

