'use client';

import { useState } from 'react';
import { Link as LinkIcon, Plus, X } from 'lucide-react';

interface LinksProps {
  config: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

export default function Links({ config, onUpdate }: LinksProps) {
  const [links, setLinks] = useState<LinkItem[]>(config.links || []);

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: '',
      url: '',
    };
    const newLinks = [...links, newLink];
    setLinks(newLinks);
    onUpdate({ ...config, links: newLinks });
  };

  const handleUpdateLink = (id: string, field: 'title' | 'url', value: string) => {
    const newLinks = links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setLinks(newLinks);
    onUpdate({ ...config, links: newLinks });
  };

  const handleRemoveLink = (id: string) => {
    const newLinks = links.filter((link) => link.id !== id);
    setLinks(newLinks);
    onUpdate({ ...config, links: newLinks });
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <LinkIcon size={20} />
          Links
        </h3>
        <button
          onClick={handleAddLink}
          className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded transition-colors"
        >
          <Plus size={16} />
          Add Link
        </button>
      </div>
      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.id} className="flex gap-2">
            <input
              type="text"
              placeholder="Title"
              value={link.title}
              onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="url"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={() => handleRemoveLink(link.id)}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

