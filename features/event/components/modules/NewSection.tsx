'use client';

import { useState } from 'react';

interface NewSectionProps {
  config: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

export default function NewSection({ config, onUpdate }: NewSectionProps) {
  const [title, setTitle] = useState(config.title || '');
  const [content, setContent] = useState(config.content || '');

  const handleTitleChange = (value: string) => {
    setTitle(value);
    onUpdate({ ...config, title: value });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    onUpdate({ ...config, content: value });
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <h3 className="text-white font-semibold mb-4">New Section</h3>
      <input
        type="text"
        placeholder="Section Title"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full mb-3 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <textarea
        placeholder="Add a custom section to showcase anything you want on your event page."
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
      />
    </div>
  );
}

