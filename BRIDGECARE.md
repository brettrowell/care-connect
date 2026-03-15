# BridgeCare — Product & Technical Specification

## 1. Project Overview & Value Proposition

**BridgeCare** is a cross-platform single-source-of-truth app that helps parents and caregivers of special-needs children avoid "resetting" when handing off care to new people. It centralizes:

- **Patient profile** — demographics, diagnoses, communication cues
- **Communication dictionary** — how this child expresses needs (non-verbal cues, G-tube signals, etc.)
- **Daily event logging** — feeding, meds, seizures, vomiting, custom events with optional media
- **Meds & nutrition** — prescriptions, schedules, what was given and when
- **Supplies inventory** — reorder thresholds, low-stock alerts
- **Emergencies** — protocols, baselines, step-by-step guides
- **Handoff summaries** — temporary links/QR for read-only access so new caregivers get context fast

**Value proposition:** Reduce stress and errors during care handoffs by giving every caregiver instant access to the same, up-to-date information—even offline—with strong privacy and role-based access.

---

## 2. Target Users & User Stories

### Target Users

| Role | Description |
|------|-------------|
| **Parent/Guardian (Owner)** | Primary decision-maker; creates group, adds patients, invites others, manages supplies and emergency protocols. |
| **Guardian** | Same privileges as Owner (e.g., second parent). |
| **Provider** | Clinician/therapist; read-heavy, may log events and view handoff; limited admin. |
| **Caregiver** | Day-to-day care; logs events, views communication dictionary, follows emergency protocols. |
| **Family** | Extended family; read-only or limited log (e.g., visits). |
| **Guest** | Temporary read-only via time-limited handoff link; no login required. |

### User Stories (MVP Focus)

**As a parent (Owner):**
- I can create a care group and add my child as a patient so that I can invite caregivers.
- I can edit my child’s communication dictionary so that new caregivers know how they communicate.
- I can see a dashboard of recent events and low-stock supplies so that I stay informed.
- I can generate a temporary handoff link/QR so that a new nurse gets read-only access without an account.

**As a caregiver:**
- I can open the app and quickly log “feeding done” or “med given” with one hand so that I don’t forget and the parent sees it.
- I can log an event and optionally attach a photo and deduct from a supply so that inventory stays accurate.
- I can view the communication dictionary and emergency protocols offline so that I know what to do when the internet is bad.

**As a provider:**
- I can view the patient profile and recent timeline so that I have context before a visit.
- I can log a therapy or clinical event so that it appears in the shared timeline.

**As a guest (handoff link):**
- I can open a link on my phone and see a read-only handoff summary (profile, recent events, emergency steps) so that I can care safely without creating an account.

---

## 3. Detailed Feature List (MVP vs Phase 2)

### MVP (Priority Order)

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Auth + Group/Patient selector** | Sign up/in (Supabase Auth). Create/join group; select active patient. |
| 2 | **Role-based Dashboard** | Caregiver: quick-log buttons + recent timeline. Owner: same + supplies alerts, handoff actions. |
| 3 | **Quick event logging** | Event types: feeding, med given, seizure, vomit, custom. Optional media, notes; optional supply deduction. Optimistic UI + offline queue. |
| 4 | **Communication Dictionary** | View/edit list of cues (e.g., “Pulls ear = pain”). Used by caregivers during handoff. |
| 5 | **Emergency Protocols** | View protocols; export to PDF. Baselines and step-by-step stored in DB. |
| 6 | **Temporary Handoff link/QR** | Owner generates signed URL or public view with expiry; read-only summary for guests. |
| 7 | **Basic supply inventory** | List supplies, current quantity, reorder threshold; low-stock alert on dashboard; deduct on event when linked. |

### Phase 2

- Appointments (patient_appointments), equipment (patient_equipment).
- Care providers, pharmacies, insurance, prescriptions (full CRUD).
- Medical expenses, documents (with attachments).
- OneSignal push notifications (med reminders, low-stock, handoff viewed).
- Realtime sync indicators and conflict handling.
- Multi-patient dashboard and filters.

---

## 4. Roles & Permissions Matrix

| Permission | Owner | Guardian | Provider | Caregiver | Family | Guest |
|------------|:----:|:--------:|:--------:|:---------:|:------:|:----:|
| Create/edit group | ✓ | ✓ | — | — | — | — |
| Add/remove members | ✓ | ✓ | — | — | — | — |
| Add/edit patient profile | ✓ | ✓ | Read | Read | Read | Read (handoff) |
| Edit communication dictionary | ✓ | ✓ | Read | Read | Read | Read (handoff) |
| Log events | ✓ | ✓ | ✓ | ✓ | Optional | — |
| Deduct supplies | ✓ | ✓ | ✓ | ✓ | — | — |
| Manage supplies inventory | ✓ | ✓ | Read | Read | — | — |
| Manage emergency protocols | ✓ | ✓ | Read | Read | Read | Read (handoff) |
| Generate handoff link | ✓ | ✓ | — | — | — | — |
| View handoff (read-only) | — | — | — | — | — | ✓ (with link) |
| View dashboard (role-based) | ✓ | ✓ | ✓ | ✓ | ✓ | — |

---

## 5. UI/UX Guidelines

- **Thumb zone:** Primary actions in bottom 1/3 of screen; large tap targets.
- **Touch targets:** Minimum **48×48 dp** for all interactive elements.
- **Contrast:** WCAG AA minimum (4.5:1 for normal text, 3:1 for large text and UI components).
- **Dark/light mode:** Full support via theme; system preference or in-app toggle.
- **One-handed flows:** Critical actions (e.g., “Log feeding”) achievable in 1–2 taps.
- **Voice-to-text:** Where possible (e.g., notes in event log) to reduce typing for tired caregivers.
- **Responsive breakpoints (web):**  
  - Mobile: &lt; 600px  
  - Tablet: 600px–960px  
  - Desktop: &gt; 960px  
- **Loading & errors:** Skeleton/loading states; clear error messages with retry.
- **Offline:** Clear indicator when offline; queue actions and sync when online.

---

## 6. Full Database Schema (PostgreSQL / Supabase)

### Core Entities (Simplified)

```sql
-- Groups: one per "care circle" (e.g., one family)
groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- memberships: user ↔ group with role
memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner','guardian','provider','caregiver','family')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- patients: one per care recipient
patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- patient_profiles: extended info (1:1 with patient)
patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL UNIQUE REFERENCES patients(id) ON DELETE CASCADE,
  diagnoses TEXT[],
  communication_dictionary JSONB DEFAULT '[]',  -- [{ "cue": "...", "meaning": "..." }]
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- patient_daily_events: all loggable events
patient_daily_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL,  -- 'feeding'|'med_given'|'seizure'|'vomit'|'custom'|...
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  data JSONB DEFAULT '{}',  -- type-specific (e.g., amount_ml, med_name)
  notes TEXT,
  media_urls TEXT[] DEFAULT '{}',
  consumed_supply_id UUID REFERENCES patient_supplies(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- care_providers, pharmacies, insurance_plans (flattened)
care_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

insurance_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  member_id TEXT,
  group_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  pharmacy_id UUID REFERENCES pharmacies(id),
  prescribed_by UUID REFERENCES care_providers(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- appointments, equipment (Phase 2 heavy use)
patient_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  provider_id UUID REFERENCES care_providers(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

patient_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  model_serial TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- supplies: per-patient inventory
patient_supplies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  current_quantity INT NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'each',
  reorder_threshold INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- medical_expenses, documents (Phase 2)
medical_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  amount_cents INT NOT NULL,
  description TEXT,
  occurred_at DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- emergencies: protocols + baselines
emergencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]',  -- [{ "order": 1, "text": "..." }]
  baselines JSONB DEFAULT '{}',  -- e.g., usual seizure duration, rescue meds
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- handoff tokens: signed / public view with expiry
handoff_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- attachments: Supabase Storage paths (optional generic table)
attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,  -- 'event'|'document'|...
  entity_id UUID NOT NULL,
  storage_path TEXT NOT NULL,
  filename TEXT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### RLS Policy Examples

- **groups:** User can SELECT/UPDATE/DELETE only if they have a membership row for that group (and for DELETE, only if role is owner/guardian).
- **memberships:** User can SELECT memberships for groups they belong to; INSERT/UPDATE/DELETE only if they are owner/guardian of that group; users can read their own membership.
- **patients:** User can SELECT/INSERT/UPDATE/DELETE only if they have a membership in the patient’s group with a role that has permission (see matrix).
- **patient_daily_events:** User can SELECT/INSERT if they have membership in the patient’s group with event-logging permission; UPDATE/DELETE only owner/guardian (or same as your insert policy if you allow edit).
- **patient_supplies:** Read/write for owner/guardian/caregiver/provider in that group; deduct (UPDATE current_quantity) allowed when logging an event that references the supply.
- **handoff_tokens:** Only owner/guardian can INSERT/SELECT/DELETE for their group’s patients. Public read-only view for handoff summary uses token in URL: allow SELECT on patients + related data when `token` matches and `expires_at > now()` (via Postgres function or service role for that specific endpoint).

---

## 7. Architecture Diagram (Text-Based)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         BridgeCare Clients                               │
├──────────────────────────────┬──────────────────────────────────────────┤
│  React Native (iOS/Android)   │  React (Vite) + react-native-web         │
│  React Navigation (Native     │  React Router (BrowserRouter)             │
│   Stack + Bottom Tabs)        │  Same components via react-native-web    │
├──────────────────────────────┴──────────────────────────────────────────┤
│  Shared: React Native Paper • Emotion (createTheme / useTheme)           │
│  React Query (persist: AsyncStorage / localForage) • Offline queue       │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Supabase                                                                │
│  ├── Auth (email/password, magic link)                                   │
│  ├── PostgreSQL (RLS per group/patient/role)                             │
│  ├── Storage (media, PDFs)                                               │
│  └── Realtime (optional for live updates)                                │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
              [Auth]            [PostgREST]        [Storage]
```

---

## 8. Security & HIPAA-Adjacent Considerations

- **Data siloing:** All data scoped by `group_id` and `patient_id`; RLS enforces membership and role.
- **Auth:** Supabase Auth; no anonymous write access. Handoff is read-only and time-limited.
- **Transport:** HTTPS only; Supabase uses TLS.
- **Sensitive fields:** Store only what’s needed; no SSN in MVP. Insurance member IDs and PHI in DB; restrict columns in RLS if needed.
- **Audit:** Consider `created_by` / `updated_at` on sensitive tables; log handoff token creation and access for Phase 2.
- **Device:** Recommend device passcode/biometric; app does not store credentials in plain text (handled by Supabase).
- **Disclaimer:** BridgeCare is not a HIPAA-covered entity by default; if used in a covered context, BAA and additional safeguards would be required.

---

## 9. Deployment Plan

- **Web:** Build React SPA (Vite); deploy to **Vercel** or **Netlify**. Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- **Mobile:** React Native CLI build; **App Store** and **Play Store** later. Use EAS Build (optional) or local builds; same Supabase keys in env.
- **Supabase:** One project for dev/staging; production project for live. Run migrations via Supabase CLI or dashboard.
- **OneSignal:** Configure for iOS/Android and web push when Phase 2 notifications are added.

---

*End of BRIDGECARE.md*
