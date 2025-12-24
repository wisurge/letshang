'use client';

import { useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { getAvailableModules, addModule } from '@/state/api';
import { X, Search, Heart, List, Image, Link as LinkIcon, MessageSquare, Send, UserPlus, FileText } from 'lucide-react';
import { AvailableModule } from '../types';

interface ModuleSelectorProps {
  onClose: () => void;
}

export default function ModuleSelector({ onClose }: ModuleSelectorProps) {
  const [event, setEvent] = useRecoilState(eventState);
  const [searchQuery, setSearchQuery] = useState('');
  const availableModules = getAvailableModules();

  const filteredModules = useMemo(() => {
    if (!searchQuery) return availableModules;
    const query = searchQuery.toLowerCase();
    return availableModules.filter(
      (module) =>
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query)
    );
  }, [searchQuery, availableModules]);

  const handleAddModule = (module: AvailableModule) => {
    addModule(module.type, setEvent, event);
    onClose();
  };

  const getModuleIcon = (iconName: string) => {
    const iconClass = "w-8 h-8 text-white/80";
    switch (iconName) {
      case 'IconList':
        return <List className={iconClass} />;
      case 'IconNewSection':
        return <FileText className={iconClass} />;
      case 'Photos':
        return <Image className={iconClass} />;
      case 'Links':
        return <LinkIcon className={iconClass} />;
      case 'Announcements':
        return <MessageSquare className={iconClass} />;
      case 'TextBlasts':
        return <Send className={iconClass} />;
      case 'Invite':
        return <UserPlus className={iconClass} />;
      default:
        return <div className="w-8 h-8 bg-white/20 rounded"></div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-black/30 backdrop-blur-2xl rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <h2 className="text-2xl font-light text-white">Customize</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-xl flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              placeholder="Search for features, specific tool, section, settings, anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-base"
            />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-6">
          <div className="space-y-3">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                onClick={() => handleAddModule(module)}
                className="flex items-start gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-all duration-200 border border-white/10 hover:border-white/20"
              >
                {getModuleIcon(module.icon)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                      module.price === 'Free' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {module.price}
                    </span>
                    <span className="text-white/50">
                      {module.usageCount.toLocaleString()} events
                    </span>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Heart size={14} />
                      <span>{module.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-white/20 rounded-lg mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

