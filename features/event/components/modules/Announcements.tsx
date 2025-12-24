'use client';

interface AnnouncementsProps {
  config: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

export default function Announcements({ config, onUpdate }: AnnouncementsProps) {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <h3 className="text-white font-semibold mb-4">Announcements</h3>
      <p className="text-white/70 text-sm mb-4">
        Post updates & messages to keep your guests informed.
      </p>
      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded transition-colors">
        Create Announcement
      </button>
    </div>
  );
}

