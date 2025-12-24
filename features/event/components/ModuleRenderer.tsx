'use client';

import { Module } from '../types';
import PhotoGallery from './modules/PhotoGallery';
import Links from './modules/Links';
import Questionnaires from './modules/Questionnaires';
import Announcements from './modules/Announcements';
import TextBlasts from './modules/TextBlasts';
import Invite from './modules/Invite';
import NewSection from './modules/NewSection';

interface ModuleRendererProps {
  module: Module;
  onUpdate: (config: Record<string, any>) => void;
}

export default function ModuleRenderer({ module, onUpdate }: ModuleRendererProps) {
  const handleUpdate = (config: Record<string, any>) => {
    onUpdate(config);
  };

  switch (module.type) {
    case 'photoGallery':
      return <PhotoGallery config={module.config} onUpdate={handleUpdate} />;
    case 'links':
      return <Links config={module.config} onUpdate={handleUpdate} />;
    case 'questionnaires':
      return <Questionnaires config={module.config} onUpdate={handleUpdate} />;
    case 'announcements':
      return <Announcements config={module.config} onUpdate={handleUpdate} />;
    case 'textBlasts':
      return <TextBlasts config={module.config} onUpdate={handleUpdate} />;
    case 'invite':
      return <Invite config={module.config} onUpdate={handleUpdate} />;
    case 'newSection':
      return <NewSection config={module.config} onUpdate={handleUpdate} />;
    default:
      return null;
  }
}

