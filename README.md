<img width="2562" height="2167" alt="image" src="https://github.com/user-attachments/assets/a4ea4504-c77f-4e3b-aa96-1bf5e95b1652" />
# Let's Hang - Event Flyer Creation Webapp

A Next.js application for creating and customizing event flyers with real-time preview, form management, draft saving, and event publishing capabilities.

## Features

- **Event Creation**: Create events with name, date/time, location, description, and tickets
- **Flyer Customization**: Upload and change flyer images and background images
- **Modular System**: Add customizable modules (Photo Gallery, Links, Questionnaires, Announcements, etc.)
- **Draft Saving**: Save event drafts for later editing
- **Real-time Preview**: See changes to your event flyer in real-time
- **Mock Backend**: Uses Recoil for state management with easy backend integration

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Recoil
- **Language**: TypeScript
- **Date Picker**: react-datepicker
- **Icons**: lucide-react

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
letshang/
├── app/
│   ├── layout.tsx          # Root layout with Recoil provider
│   ├── page.tsx            # Main event creation page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Header with Cancel, New event, Save Draft
│   ├── FlyerSection.tsx     # Flyer preview section
│   ├── EventForm.tsx        # Event form fields
│   ├── ModuleSelector.tsx   # Module selection modal
│   ├── modules/             # Customizable module components
│   └── ...
├── state/
│   ├── atoms.ts             # Recoil atoms
│   └── api.ts               # Mock backend functions
└── lib/
    └── types.ts             # TypeScript interfaces
```

## Backend Integration

The application uses Recoil for state management with mock backend functions. To integrate with a real backend:

1. Open `state/api.ts`
2. Replace the Recoil state updates with actual API calls
3. Each function is structured for easy replacement (1-2 lines per function)

Example:
```typescript
// Current (mock)
export const saveDraft = (event: Event, setEvent: SetterOrUpdater<Event>) => {
  setEvent({ ...event, status: 'draft' });
};

// Real backend
export const saveDraft = async (event: Event) => {
  return fetch('/api/drafts', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' }
  });
};
```

## Module System

The application supports customizable modules that can be added to events:

- **Photo Gallery**: Upload and display photos
- **Links**: Add/edit/remove links
- **Questionnaires**: Create questionnaires for guests
- **Announcements**: Post updates and messages
- **Text Blasts**: Send text messages (UI only)
- **Invite**: Personal invitation system (UI only)
- **New Section**: Custom content section

Modules are stored in the event state and rendered dynamically based on their type.

## License

MIT

