import { CommandPalette } from './CommandPalette';
import { NotificationsDrawer } from './NotificationsDrawer';
import { QuestCreateModal } from './QuestCreateModal';
import { FocusTimer } from './FocusTimer';

/**
 * Renderiza todos os overlays globais.
 * Cada um lê seu próprio state do uiStore.
 */
export const OverlaysRoot = () => (
  <>
    <CommandPalette />
    <NotificationsDrawer />
    <QuestCreateModal />
    <FocusTimer />
  </>
);
