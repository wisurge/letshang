'use client';

import { useState } from 'react';
import { User, ArrowRight, Check } from 'lucide-react';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export default function PhoneNumberInput({ value, onChange, onSave }: PhoneNumberInputProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
    
    // Validate phone number (10 digits)
    const digits = formatted.replace(/\D/g, '');
    setIsValid(digits.length === 10 || digits.length === 0);
    setIsSaved(false);
  };

  const handleSave = () => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 10) {
      onSave();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const digits = value.replace(/\D/g, '');
  const canSave = digits.length === 10;
  const showValidation = digits.length > 0 && digits.length < 10;

  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-3 px-5 py-4 material-ultrathin rounded-2xl ${
        isValid ? '' : 'border-red-400/50'
      } ${isSaved ? 'border-green-400/50 bg-green-500/10' : ''}`}>
        <User size={22} className={`${isSaved ? 'text-green-400' : isValid ? 'text-white/50' : 'text-red-400/70'}`} />
          <input
            type="tel"
            placeholder="Enter phone number to save the draft"
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={17} // (XXX) XXX-XXXX format
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
          />
        {isSaved ? (
          <Check size={20} className="text-green-400" />
        ) : (
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`flex items-center justify-center transition-all duration-200 ${
              canSave
                ? 'cursor-pointer hover:opacity-80'
                : 'cursor-not-allowed opacity-50'
            }`}
          >
            <ArrowRight size={20} className="text-white/70" />
          </button>
        )}
      </div>
      {showValidation && !isValid && (
        <p className="text-red-400/70 text-sm px-5">
          Please enter a valid 10-digit phone number
        </p>
      )}
      {isSaved && (
        <p className="text-green-400 text-sm px-5 animate-pulse">
          Draft saved successfully!
        </p>
      )}
    </div>
  );
}

