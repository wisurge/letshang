'use client';

interface FormFieldProps {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FormField({ icon, placeholder, value, onChange }: FormFieldProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 focus-within:bg-white/10 transition-colors">
      <span className="text-2xl">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
      />
    </div>
  );
}

