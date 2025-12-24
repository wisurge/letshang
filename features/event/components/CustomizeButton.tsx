'use client';

import { useState } from 'react';
import { Image, Link as LinkIcon, Megaphone, Users, Square } from 'lucide-react';
import ModuleSelector from './ModuleSelector';

export default function CustomizeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Content card */}
      <div 
        className="card-background relative rounded-3xl shadow-2xl flex flex-col"
        style={{
          borderRadius: '16px',
          height: '242px',
          padding: '24px',
        }}
      >

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Icons positioned around the text */}
          <div className="relative flex-1 flex items-center justify-center">
            {/* Top-left: Dice/Squares icon */}
            <div className="absolute top-4 left-4 text-white/25">
              <div className="flex gap-1.5">
                <Square size={14} fill="currentColor" className="opacity-60" />
                <Square size={14} fill="currentColor" className="opacity-60" />
              </div>
            </div>

            {/* Left side: Megaphone */}
            <div className="absolute left-4 top-1/3 text-white/25">
              <Megaphone size={22} />
            </div>

            {/* Left side below: People with mic */}
            <div className="absolute left-4 top-2/3 text-white/25">
              <Users size={22} />
            </div>

            {/* Top-right: Chain link */}
            <div className="absolute top-4 right-4 text-white/25">
              <LinkIcon size={18} />
            </div>

            {/* Right side: Image/Gallery */}
            <div className="absolute right-4 top-1/3 text-white/25">
              <Image size={22} />
            </div>

            {/* Bottom-right: RSVP text */}
            <div className="absolute bottom-4 right-6 text-white/35 font-bold text-xs tracking-widest">
              RSVP
            </div>

            {/* Center text */}
            <div className="text-center px-8">
              <h3 className="text-2xl font-extralight text-white/80 mb-2 tracking-tight">
                Customize your
              </h3>
              <h3 className="text-2xl font-extralight text-white/80 tracking-tight">
                event your way
              </h3>
            </div>
          </div>

          {/* Button at bottom */}
          <div className="mt-auto w-full">
            <button
              onClick={() => setIsOpen(true)}
              className="btn-translucent w-full flex items-center justify-center gap-3 px-8 py-2 text-white rounded-2xl shadow-lg font-medium hover:scale-105 active:scale-95"
              style={{
                minHeight: '36px',
              }}
            >
              <span className="text-2xl">🎨</span>
              <span className="text-base">Customize</span>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && <ModuleSelector onClose={() => setIsOpen(false)} />}
    </>
  );
}

