'use client';

import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { updateEvent } from '@/state/api';
import Header from '@/components/shared/Header';
import FlyerSection from '@/features/event/components/FlyerSection';
import EventForm from '@/features/event/components/EventForm';
import GoLiveButton from '@/features/event/components/GoLiveButton';
import ModuleRenderer from '@/features/event/components/ModuleRenderer';

export default function Home() {
  const [event, setEvent] = useRecoilState(eventState);

  const handleModuleUpdate = (moduleId: string, config: Record<string, any>) => {
    const updatedModules = event.modules.map((module) =>
      module.id === moduleId ? { ...module, config } : module
    );
    updateEvent({ modules: updatedModules }, setEvent, event);
  };

  return (
    <main className="min-h-screen p-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 mt-12">
          {/* Left Column - Flyer Preview */}
          <div className="flex flex-col lg:col-span-4">
            <FlyerSection />
          </div>
          
          {/* Right Column - Event Form */}
          <div className="flex flex-col space-y-10 lg:col-span-6">
            <EventForm />
            <div className="mt-4">
              <GoLiveButton />
            </div>
          </div>
        </div>

        {/* Modules Section */}
        {event.modules.length > 0 && (
          <div className="mt-12 lg:col-span-2 space-y-6">
            {event.modules.map((module) => (
              <ModuleRenderer
                key={module.id}
                module={module}
                onUpdate={(config) => handleModuleUpdate(module.id, config)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

