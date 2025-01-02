export default function Typograph({
  label = 'text',
  className = '',
  ...props
}) {
  return (
    <p className={className} {...props}>
      {label}
    </p>
  );
}
