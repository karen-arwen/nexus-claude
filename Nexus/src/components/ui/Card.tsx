import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'flat' | 'gradient';
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl',
        variant === 'default' && 'card-premium',
        variant === 'glass' && 'card-glass',
        variant === 'flat' && 'bg-bg-elevated border border-border',
        variant === 'gradient' && 'gradient-rose text-white shadow-premium-lg',
        interactive && 'hover-lift cursor-pointer',
        className,
      )}
      {...rest}
    />
  ),
);
Card.displayName = 'Card';

export const CardHeader = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5 pb-3', className)} {...rest} />
);

export const CardBody = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5', className)} {...rest} />
);

export const CardFooter = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5 pt-3 border-t border-border-subtle', className)} {...rest} />
);

export const CardTitle = ({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-semibold text-text-secondary', className)} {...rest} />
);

export const CardDescription = ({
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-text-muted', className)} {...rest} />
);
