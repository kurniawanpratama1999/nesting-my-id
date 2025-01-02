import cNames from '../utils/cNames';

export default function Wrapper({
  children,
  display = 'default',
  position = 'default',
  border = 'default',
  bgColor = 'default',
  className = '',
  ...props
}) {
  return (
    <div
      className={cssWrapper({ display, position, border, bgColor }, className)}
      {...props}>
      {children}
    </div>
  );
}

const cssWrapper = cNames(
  { base: 'w-full' },
  {
    display: {
      default: 'flex',
      block: 'block',
      flex: 'flex',
      grid: 'grid',
      inlineBlock: 'inline-block',
      inlineFlex: 'inline-flex',
      inline: 'inline',
    },
    position: {
      default: 'relative',
      relative: 'relative',
      static: 'static',
      absolute: 'absolute',
      fixed: 'fixed',
    },
    border: {
      default: 'border',
      sm: 'border',
      lg: 'border-2',
      xl: 'border-4',
      'sm-b': 'border-b',
      'lg-b': 'border-b-2',
      'xl-b': 'border-b-4',
      'sm-t': 'border-t',
      'lg-t': 'border-t-2',
      'xl-t': 'border-t-4',
      none: 'border-none',
    },
    bgColor: {
      default: 'bg-transparent',
      emerald: 'bg-emerald-200',
      yellow: 'bg-yellow-200',
      red: 'bg-red-200',
      blue: 'bg-blue-200',
      gray: 'bg-gray-200',
    },
  }
);
