/**
 * Placeholder for offline queue and sync.
 * MVP: React Query persist + retry handles most cases.
 * Phase 2: Queue mutations when navigator.onLine is false and replay on online.
 */

const QUEUE_KEY = 'bridgecare_offline_queue';

export interface QueuedMutation {
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
}

export function getOfflineQueue(): QueuedMutation[] {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(QUEUE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToOfflineQueue(mutation: Omit<QueuedMutation, 'id' | 'createdAt'>): void {
  const queue = getOfflineQueue();
  queue.push({
    ...mutation,
    id: `q_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  });
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }
}

export function removeFromOfflineQueue(id: string): void {
  const queue = getOfflineQueue().filter((q) => q.id !== id);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }
}

export function clearOfflineQueue(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(QUEUE_KEY);
  }
}
