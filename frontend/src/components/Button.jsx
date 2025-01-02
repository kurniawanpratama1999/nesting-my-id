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
      gray: 'bg-gray-700 text-gray-200 active:bg-gray-600/80 hover:bg-gray-500',
      red: 'bg-red-600 text-red-200 active:bg-red-600/80 hover:bg-red-500',
      emerald:
        'bg-emerald-600 text-emerald-200 active:bg-emerald-600/80 hover:bg-emerald-500',
      blue: 'bg-blue-600 text-blue-200 active:bg-blue-600/80 hover:bg-blue-500',
      yellow:
        'bg-yellow-600 text-yellow-200 active:bg-yellow-600/80 hover:bg-yellow-500',
      amber:
        'bg-amber-600 text-amber-200 active:bg-amber-600/80 hover:bg-amber-500',
    },
  }
);
