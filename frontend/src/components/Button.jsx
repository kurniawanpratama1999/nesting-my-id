import cNames from '../utils/cNames';

export default function Button({
  type = 'button',
  label = 'Button Name',
  bgColor = 'default',
  width = 'full',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonCss({ width, bgColor }, className)}
      {...props}>
      {label}
    </button>
  );
}

const buttonCss = cNames(
  { base: 'rounded-sm py-2 font-semibold' },
  {
    width: {
      full: 'w-full',
      fit: 'w-fit',
    },
    bgColor: {
      default: 'bg-black text-white active:bg-black/80 hover:bg-black/70',
      gray: 'bg-gray-400 text-gray-900 active:bg-gray-600/80 hover:bg-gray-500',
      red: 'bg-red-400 text-red-900 active:bg-red-400/80 hover:bg-red-500',
      emerald:
        'bg-emerald-400 text-emerald-900 active:bg-emerald-400/80 hover:bg-emerald-500',
      blue: 'bg-blue-400 text-blue-900 active:bg-blue-400/80 hover:bg-blue-500',
      yellow:
        'bg-yellow-400 text-yellow-900 active:bg-yellow-400/80 hover:bg-yellow-500',
      amber:
        'bg-amber-400 text-amber-900 active:bg-amber-400/80 hover:bg-amber-500',
    },
  }
);
