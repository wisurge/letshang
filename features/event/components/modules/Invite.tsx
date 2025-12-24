'use client';

interface InviteProps {
  config: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

export default function Invite({ config, onUpdate }: InviteProps) {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <h3 className="text-white font-semibold mb-4">Invite</h3>
      <p className="text-white/70 text-sm mb-4">
        Personally invite each and every guest within seconds.
      </p>
      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded transition-colors">
        Invite Guests
      </button>
    </div>
  );
}

