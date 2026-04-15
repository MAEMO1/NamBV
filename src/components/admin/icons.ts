import {
  BarChart3,
  CalendarClock,
  CalendarDays,
  FileText,
  FolderKanban,
  Images,
  Layout,
  type LucideIcon,
  Settings2,
} from 'lucide-react';

import type { ModuleKey } from './types';

export const moduleIcons: Record<ModuleKey, LucideIcon> = {
  analytics: BarChart3,
  quotes: FileText,
  appointments: CalendarDays,
  content: Layout,
  projects: FolderKanban,
  assets: Images,
  settings: Settings2,
  availability: CalendarClock,
};

export const moduleLabels: Record<ModuleKey, string> = {
  analytics: 'Overzicht',
  quotes: 'Offertes',
  appointments: 'Afspraken',
  content: 'Content',
  projects: 'Projecten',
  assets: 'Beeldbank',
  settings: 'Instellingen',
  availability: 'Beschikbaarheid',
};

export const moduleOrder: ReadonlyArray<ModuleKey> = [
  'analytics',
  'quotes',
  'appointments',
  'content',
  'projects',
  'assets',
  'settings',
  'availability',
];
