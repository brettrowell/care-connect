# BridgeCare

Cross-platform care-handoff app for families and caregivers of special-needs children. Single source of truth for patient profile, communication cues, event logging, supplies, emergencies, and temporary handoff links.

See **[BRIDGECARE.md](./BRIDGECARE.md)** for full product and technical spec.

## Tech stack

- **Mobile:** React Native CLI (bare workflow) 0.75+ — no Expo
- **Web:** React 18 + Vite + react-native-web
- **UI:** React Native Paper + Emotion (no Tailwind/NativeWind)
- **Navigation:** React Navigation 7 (native) / React Router 6 (web)
- **Data:** TanStack Query v5, Supabase (Auth, Postgres, RLS, Storage)

## Prerequisites

- Node 18+
- iOS: Xcode 14+, CocoaPods, iOS 15+ simulator or device
- Android: Android Studio, SDK 28+, device or emulator
- Supabase account

## Setup

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Run the initial migration:
   - In Supabase Dashboard → SQL Editor, run the contents of `supabase/migrations/0001_initial_schema.sql`.
3. Copy the project URL and anon key from Settings → API.

### 3. Environment variables

**Web (Vite):** create `.env` in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Mobile (React Native):** create `.env` or use react-native-config / Xcode scheme / `gradle.properties`:

- `EXPO_PUBLIC_SUPABASE_URL` (or same as above if you use a dotenv loader)
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

For a quick test without a dotenv loader, you can hardcode in `src/api/supabase.ts` (do not commit secrets).

### 4. Run web

```bash
npm run web
# or
pnpm web
```

Open [http://localhost:3000](http://localhost:3000). Sign up with email/password (Supabase Auth).

### 5. Run mobile (iOS)

```bash
cd ios && pod install && cd ..
npm run ios
```

Use a simulator or device. Ensure `.env` or build-time env is set so the app has Supabase URL and anon key.

### 6. Run mobile (Android)

```bash
npm run android
```

## Project structure

```
src/
├── api/           # Supabase client, queries, mutations
├── components/    # common, caregiver, owner
├── contexts/     # CurrentGroupContext
├── hooks/        # useAuth, useCurrentGroup, useLogEvent, usePermissions
├── navigation/   # MobileNavigator, WebRouter
├── screens/      # Login, GroupSelector, Dashboard, LogEvent, Emergency, Supplies, etc.
├── theme/        # Emotion/Paper theme (light/dark)
├── types/        # Supabase/DB types
└── utils/        # formatters, offline queue placeholder
```

## MVP features

1. Auth + group/patient selector  
2. Role-based dashboard (caregiver vs owner)  
3. Quick event logging (feeding, meds, seizure, vomit, etc.) with optional supply deduction  
4. Communication dictionary view/edit  
5. Emergency protocols screen  
6. Temporary handoff link/QR (signed URL, expiry)  
7. Basic supply inventory + low-stock alert  

## Security

- Data scoped by group/patient; RLS enforces membership and role.
- Handoff links are read-only and time-limited.
- Use HTTPS and secure env handling in production.

## Deployment

- **Web:** Build with `npm run web:build` and deploy the `dist/` output to Vercel, Netlify, or any static host. Set `VITE_SUPABASE_*` in the build environment.
- **Mobile:** Build with React Native CLI for iOS (Xcode archive) and Android (release bundle/apk) and submit to App Store / Play Store when ready.

## License

Private / unlicensed unless otherwise specified.
