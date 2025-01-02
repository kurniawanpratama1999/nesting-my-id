import cNames from '../utils/cNames';

export default function Container({
  children,
  width = 'default',
  height = 'default',
  display = 'default',
  position = 'default',
  className = '',
  ...props
}) {
  return (
    <div
      className={cssContainer({ width, height, display, position }, className)}
      {...props}>
      {children}
    </div>
  );
}

const cssContainer = cNames(
  { base: 'p-2 bg-gray-300' },
  {
    width: {
      default: 'w-full',
      full: 'w-full',
      fit: 'w-fit',
    },
    height: {
      default: 'min-h-[calc(100vh-3.5rem)]',
      full: 'min-h-full',
      fit: 'h-fit',
    },
    display: {
      default: 'flex',
      flex: 'flex',
      grid: 'grid',
      inlineFlex: 'inline-flex',
      block: 'block',
      inline: 'inline',
      inlineBlock: 'inline-block',
    },
    position: {
      default: 'static',
      absolute: 'absolute',
      static: 'static',
      fixed: 'fixed',
      relative: 'relative',
    },
  }
);
