import { cn } from '@/lib/cn';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  className?: string;
  animated?: boolean;
}

const sizes = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

const variants = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  gradient: 'gradient-sunset',
};

export const ProgressBar = ({
  value,
  max = 100,
  label,
  showValue,
  size = 'md',
  variant = 'primary',
  className,
  animated,
}: ProgressBarProps) => {
  const ratio = Math.max(0, Math.min(1, value / max));
  const pct = ratio * 100;

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-mono text-text-secondary">
              {Math.round(value)}
              {max !== 100 && `/${max}`}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden bg-border-subtle',
          sizes[size],
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variants[variant],
            animated && 'animate-pulse-soft',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
