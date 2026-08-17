import { create } from 'zustand';

/**
 * UI store — controla overlays globais (command palette, drawers, modals).
 * Mantido separado dos data stores pra não acoplar UI state com domínio.
 */
interface UIState {
  // Command palette
  cmdkOpen: boolean;
  openCmdk: () => void;
  closeCmdk: () => void;
  toggleCmdk: () => void;

  // Notifications drawer
  notifOpen: boolean;
  openNotif: () => void;
  closeNotif: () => void;
  toggleNotif: () => void;

  // Quest create modal
  questCreateOpen: boolean;
  openQuestCreate: () => void;
  closeQuestCreate: () => void;

  // Focus timer floating widget
  focusOpen: boolean;
  openFocus: () => void;
  closeFocus: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  cmdkOpen: false,
  openCmdk: () => set({ cmdkOpen: true }),
  closeCmdk: () => set({ cmdkOpen: false }),
  toggleCmdk: () => set({ cmdkOpen: !get().cmdkOpen }),

  notifOpen: false,
  openNotif: () => set({ notifOpen: true }),
  closeNotif: () => set({ notifOpen: false }),
  toggleNotif: () => set({ notifOpen: !get().notifOpen }),

  questCreateOpen: false,
  openQuestCreate: () => set({ questCreateOpen: true }),
  closeQuestCreate: () => set({ questCreateOpen: false }),

  focusOpen: false,
  openFocus: () => set({ focusOpen: true }),
  closeFocus: () => set({ focusOpen: false }),
}));
