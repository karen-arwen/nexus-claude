import { NavLink } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { MOBILE_NAV } from './nav-config';
import { cn } from '@/lib/cn';

interface BottomNavProps {
  onCreateClick?: () => void;
}

export const BottomNav = ({ onCreateClick }: BottomNavProps) => {
  // 4 tabs + FAB central = grid de 5 colunas, FAB no slot do meio
  const left = MOBILE_NAV.slice(0, 2);
  const right = MOBILE_NAV.slice(2);

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 inset-x-0 z-40',
        'bg-bg-elevated/95 backdrop-blur-xl',
        'border-t border-border-subtle',
        'safe-bottom',
      )}
    >
      <div className="grid grid-cols-5 h-16 max-w-2xl mx-auto px-2">
        {left.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 transition-colors',
                isActive ? 'text-primary' : 'text-text-muted',
              )
            }
          >
            <Icon className="size-[22px]" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}

        {/* FAB central — criar quest */}
        <div className="flex items-center justify-center">
          <button
            onClick={onCreateClick}
            aria-label="Criar quest"
            className={cn(
              'size-14 -mt-6 rounded-full',
              'gradient-rose text-white',
              'shadow-premium-lg shadow-glow-rose',
              'flex items-center justify-center',
              'active:scale-95 transition-transform',
            )}
          >
            <Plus className="size-6" />
          </button>
        </div>

        {right.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 transition-colors',
                isActive ? 'text-primary' : 'text-text-muted',
              )
            }
          >
            <Icon className="size-[22px]" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
