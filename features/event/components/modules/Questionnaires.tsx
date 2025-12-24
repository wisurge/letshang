'use client';

interface QuestionnairesProps {
  config: Record<string, any>;
  onUpdate: (config: Record<string, any>) => void;
}

export default function Questionnaires({ config, onUpdate }: QuestionnairesProps) {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <h3 className="text-white font-semibold mb-4">Questionnaires</h3>
      <p className="text-white/70 text-sm">
        Create questionnaires for your event. Hosts can create questions and view responses.
      </p>
      <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded transition-colors">
        Create Questionnaire
      </button>
    </div>
  );
}

