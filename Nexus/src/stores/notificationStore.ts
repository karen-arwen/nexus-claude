import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppNotification } from '@/types';
import { mockNotifications } from '@/lib/mock';

interface NotificationState {
  items: AppNotification[];
  add: (n: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
  unreadCount: () => number;
}

const newId = () =>
  `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      items: mockNotifications,

      add: (n) =>
        set({
          items: [
            {
              ...n,
              id: newId(),
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...get().items,
          ].slice(0, 100),
        }),

      markRead: (id) =>
        set({
          items: get().items.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }),

      markAllRead: () =>
        set({ items: get().items.map((n) => ({ ...n, read: true })) }),

      clear: () => set({ items: [] }),

      unreadCount: () => get().items.filter((n) => !n.read).length,
    }),
    { name: 'nexus-notifications' },
  ),
);
