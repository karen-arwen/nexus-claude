import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';
import { Toaster } from 'sonner';
import { OverlaysRoot } from '@/components/overlays/OverlaysRoot';
import { useUIStore } from '@/stores/uiStore';

export const AppShell = () => {
  const openQuestCreate = useUIStore((s) => s.openQuestCreate);

  return (
    <div className="min-h-screen flex bg-bg text-text-primary">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 pb-24 lg:pb-8">
          <Outlet />
        </main>

        <BottomNav onCreateClick={openQuestCreate} />
      </div>

      {/* Global overlays */}
      <OverlaysRoot />

      {/* Toasts */}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            toast:
              '!bg-bg-elevated !text-text-primary !border-border !shadow-premium-lg',
          },
        }}
      />
    </div>
  );
};
