'use client';

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { eventState } from '@/state/atoms';
import { updateEvent, saveDraft } from '@/state/api';
import DatePicker from './DatePicker';
import CustomizeButton from './CustomizeButton';
import PhoneNumberInput from '@/components/shared/PhoneNumberInput';
import LocationSelect from '@/components/shared/LocationSelect';
import { DollarSign, Users, Image as ImageIcon, Link as LinkIcon, X, Shield, Megaphone, FileText, MessageSquare, UserPlus, Square } from 'lucide-react';
import { addModule } from '@/state/api';
import { AdditionalField } from '../types';

interface FeatureButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  moduleType?: 'photoGallery' | 'announcements' | 'questionnaires' | 'textBlasts' | 'invite' | 'newSection';
  isField?: boolean;
}

export default function EventForm() {
  const [event, setEvent] = useRecoilState(eventState);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  // Track used features based on existing fields and modules
  const usedFeatures = new Set<string>();
  if (event.additionalFields.some(f => f.type === 'capacity')) usedFeatures.add('capacity');
  if (event.additionalFields.some(f => f.type === 'link')) usedFeatures.add('links');
  if (event.additionalFields.some(f => f.type === 'privacy')) usedFeatures.add('privacy');
  if (event.modules.some(m => m.type === 'photoGallery')) usedFeatures.add('photoGallery');
  if (event.modules.some(m => m.type === 'announcements')) usedFeatures.add('announcements');
  if (event.modules.some(m => m.type === 'questionnaires')) usedFeatures.add('questionnaires');
  if (event.modules.some(m => m.type === 'textBlasts')) usedFeatures.add('textBlasts');
  if (event.modules.some(m => m.type === 'invite')) usedFeatures.add('invite');
  if (event.modules.some(m => m.type === 'newSection')) usedFeatures.add('newSection');

  const handleLocationChange = (value: string) => {
    updateEvent({ location: value }, setEvent, event);
  };

  const handleCostChange = (value: string) => {
    const cost = value === '' ? null : parseFloat(value);
    updateEvent({ costPerPerson: cost }, setEvent, event);
  };

  const handleDescriptionChange = (value: string) => {
    updateEvent({ description: value }, setEvent, event);
  };

  const handleSaveDraft = () => {
    // Save draft with phone number
    if (phoneNumber) {
      saveDraft(event, setEvent);
      // In real app, would also save phone number association
      console.log('Saving draft for phone:', phoneNumber);
    }
  };

  const handleAddCapacity = () => {
    const newField: AdditionalField = {
      id: `capacity-${Date.now()}`,
      type: 'capacity',
      value: '',
    };
    updateEvent(
      { additionalFields: [...event.additionalFields, newField] },
      setEvent,
      event
    );
  };

  const handleAddPhotoGallery = () => {
    addModule('photoGallery', setEvent, event);
  };

  const handleAddLinks = () => {
    const newField: AdditionalField = {
      id: `link-${Date.now()}`,
      type: 'link',
      value: '',
    };
    updateEvent(
      { additionalFields: [...event.additionalFields, newField] },
      setEvent,
      event
    );
  };

  const handleAddPrivacy = () => {
    const newField: AdditionalField = {
      id: `privacy-${Date.now()}`,
      type: 'privacy',
      value: '',
    };
    updateEvent(
      { additionalFields: [...event.additionalFields, newField] },
      setEvent,
      event
    );
  };

  const handleAddAnnouncements = () => {
    addModule('announcements', setEvent, event);
  };

  const handleAddQuestionnaires = () => {
    addModule('questionnaires', setEvent, event);
  };

  const handleAddTextBlasts = () => {
    addModule('textBlasts', setEvent, event);
  };

  const handleAddInvite = () => {
    addModule('invite', setEvent, event);
  };

  const handleAddNewSection = () => {
    addModule('newSection', setEvent, event);
  };

  const handleAddAnotherLink = () => {
    const newField: AdditionalField = {
      id: `link-${Date.now()}`,
      type: 'link',
      value: '',
    };
    updateEvent(
      { additionalFields: [...event.additionalFields, newField] },
      setEvent,
      event
    );
  };

  const handleAdditionalFieldChange = (fieldId: string, value: string) => {
    const updatedFields = event.additionalFields.map((field) =>
      field.id === fieldId ? { ...field, value } : field
    );
    updateEvent({ additionalFields: updatedFields }, setEvent, event);
  };

  const handleRemoveAdditionalField = (fieldId: string) => {
    const updatedFields = event.additionalFields.filter((field) => field.id !== fieldId);
    updateEvent({ additionalFields: updatedFields }, setEvent, event);
  };

  return (
    <div className="space-y-10">
      {/* Name your event heading */}
      <h2 className="text-5xl font-bold text-white/95 mb-6 tracking-tight">Name your event</h2>

      {/* Phone number input for draft saving - inline in form */}
      <PhoneNumberInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        onSave={handleSaveDraft}
      />

      {/* Date, Location, Cost - grouped in card */}
      <div className="material-ultrathin rounded-2xl overflow-visible relative z-0">
        <div className="relative">
          <DatePicker />
        </div>
        
        <div className="h-px bg-white/10 mx-4"></div>
        
        <div className="relative">
          <LocationSelect
            value={event.location}
            onChange={handleLocationChange}
          />
        </div>
        
        <div className="h-px bg-white/10 mx-4"></div>
        
        <div className="flex items-center gap-3 px-5 py-4 transition-all duration-200">
          <DollarSign size={22} className="text-white/50" />
          <input
            type="number"
            placeholder="Cost per person"
            value={event.costPerPerson || ''}
            onChange={(e) => handleCostChange(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
          />
        </div>
      </div>

      {/* Description - in card */}
      <div className="material-ultrathin rounded-2xl p-5 hover:material-ultrathin-hover transition-all duration-200 relative" style={{ zIndex: -1 }}>
        <textarea
          placeholder="Describe your event"
          value={event.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          rows={5}
          className="w-full bg-transparent text-white placeholder-white/50 focus:outline-none resize-none text-base leading-relaxed"
        />
      </div>

      {/* Additional Fields - dynamically rendered below description */}
      {/* Capacity fields */}
      {event.additionalFields
        .filter((field) => field.type === 'capacity')
        .map((field) => (
          <div key={field.id} className="material-ultrathin rounded-2xl overflow-hidden" style={{ zIndex: -1 }}>
            <div className="flex items-center gap-3 px-5 py-4 transition-all duration-200">
              <Users size={22} className="text-white/50" />
              <input
                type="number"
                placeholder="Capacity"
                value={field.value}
                onChange={(e) => handleAdditionalFieldChange(field.id, e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
              />
              <button
                onClick={() => handleRemoveAdditionalField(field.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Remove field"
              >
                <X size={18} className="text-white/50 hover:text-white/80" />
              </button>
            </div>
          </div>
        ))}

      {/* Link fields - grouped together */}
      {event.additionalFields.filter((field) => field.type === 'link').length > 0 && (
        <div className="material-ultrathin rounded-2xl overflow-hidden" style={{ zIndex: -1 }}>
          {event.additionalFields
            .filter((field) => field.type === 'link')
            .map((field, index, linkFields) => (
              <div key={field.id}>
                <div className="flex items-center gap-3 px-5 py-4 transition-all duration-200">
                  <LinkIcon size={22} className="text-white/50" />
                  <input
                    type="url"
                    placeholder="Add link"
                    value={field.value}
                    onChange={(e) => handleAdditionalFieldChange(field.id, e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
                  />
                  <button
                    onClick={() => handleRemoveAdditionalField(field.id)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Remove field"
                  >
                    <X size={18} className="text-white/50 hover:text-white/80" />
                  </button>
                </div>
                {index < linkFields.length - 1 && <div className="h-px bg-white/10 mx-4"></div>}
              </div>
            ))}
          {/* Add another link button - bottom center, no border, no background */}
          <div className="flex justify-center py-3">
            <button
              onClick={handleAddAnotherLink}
              className="bg-transparent text-white/60 hover:text-white/90 text-sm font-medium transition-colors focus:outline-none"
            >
              Add another link
            </button>
          </div>
        </div>
      )}

      {/* Privacy field */}
      {event.additionalFields
        .filter((field) => field.type === 'privacy')
        .map((field) => (
          <div key={field.id} className="material-ultrathin rounded-2xl overflow-hidden" style={{ zIndex: -1 }}>
            <div className="flex items-center gap-3 px-5 py-4 transition-all duration-200">
              <Shield size={22} className="text-white/50" />
              <input
                type="text"
                placeholder="Privacy level"
                value={field.value}
                onChange={(e) => handleAdditionalFieldChange(field.id, e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
              />
              <button
                onClick={() => handleRemoveAdditionalField(field.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Remove field"
              >
                <X size={18} className="text-white/50 hover:text-white/80" />
              </button>
            </div>
          </div>
        ))}

      {/* Additional Features */}
      <div className="flex flex-wrap gap-3" style={{ zIndex: -1 }}>
          {(() => {
            const allFeatures: FeatureButton[] = [
              {
                id: 'photoGallery',
                label: 'Photo gallery',
                icon: <ImageIcon size={18} className="text-white/70" />,
                onClick: handleAddPhotoGallery,
                moduleType: 'photoGallery',
              },
              {
                id: 'links',
                label: 'Links',
                icon: <LinkIcon size={18} className="text-white/70" />,
                onClick: handleAddLinks,
                isField: true,
              },
              {
                id: 'privacy',
                label: 'Privacy',
                icon: <Shield size={18} className="text-white/70" />,
                onClick: handleAddPrivacy,
              },
              {
                id: 'announcements',
                label: 'Announcements',
                icon: <Megaphone size={18} className="text-white/70" />,
                onClick: handleAddAnnouncements,
                moduleType: 'announcements',
              },
              {
                id: 'questionnaires',
                label: 'Questionnaires',
                icon: <FileText size={18} className="text-white/70" />,
                onClick: handleAddQuestionnaires,
                moduleType: 'questionnaires',
              },
              {
                id: 'textBlasts',
                label: 'Text blasts',
                icon: <MessageSquare size={18} className="text-white/70" />,
                onClick: handleAddTextBlasts,
                moduleType: 'textBlasts',
              },
              {
                id: 'invite',
                label: 'Invite',
                icon: <UserPlus size={18} className="text-white/70" />,
                onClick: handleAddInvite,
                moduleType: 'invite',
              },
              {
                id: 'newSection',
                label: 'New section',
                icon: <Square size={18} className="text-white/70" />,
                onClick: handleAddNewSection,
                moduleType: 'newSection',
              },
            ];

            // Filter out used features
            const availableFeatures = allFeatures.filter(feature => !usedFeatures.has(feature.id));
            
            // Show 3 by default, or all if showAllFeatures is true
            const visibleFeatures = showAllFeatures 
              ? availableFeatures 
              : availableFeatures.slice(0, 3);

            return (
              <>
                {visibleFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={feature.onClick}
                    className="px-5 py-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/15 rounded-xl text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-md"
                  >
                    {feature.icon}
                    <span>+ {feature.label}</span>
                  </button>
                ))}
                {!showAllFeatures && availableFeatures.length > 3 && (
                  <button
                    onClick={() => setShowAllFeatures(true)}
                    className="px-5 py-3 text-white/50 hover:text-white/80 text-sm transition-colors"
                  >
                    Show more
                  </button>
                )}
              </>
            );
          })()}
      </div>

      {/* Customize */}
      <CustomizeButton />
    </div>
  );
}

