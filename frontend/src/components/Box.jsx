import cNames from "../utils/cNames";

const cssBox = cNames(
  {
    base: 'min-h-14 w-full',
  },
  {
    display: {
      flex: 'flex',
      grid: 'grid',
      static: 'static',
      absolute: 'absolute',
      fixed: 'fixed',
      relative: 'relative',
      hidden: 'hidden',
    },
  }
);

export default function Box({
  children,
  display = 'flex',
  className,
  ...props
}) {
  return (
    <div className={cssBox({ display }, className)} {...props}>
      {children}
    </div>
  );
}
