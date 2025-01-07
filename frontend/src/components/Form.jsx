import cNames from "../utils/cNames";

export default function Form({
  children,
  className,
  bgColor = "dark",
  border = "dark",
  title,
  ...props
}) {
  return (
    <form
      id="form"
      style={{ boxShadow: "-5px -5px 8px 1px rgba(24,24,7,1)" }}
      className={cssForm({ bgColor, border }, className)}
      {...props}
    >
      <h1 className="text-center text-2xl font-extrabold bg-zinc-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
        {title}
      </h1>
      <div className="p-4">{children}</div>
    </form>
  );
}

const cssForm = cNames(
  { base: "min-w-72 rounded-sm text-lg relative" },
  {
    bgColor: {
      dark: "bg-zinc-900",
    },
    border: {
      dark: "border border-zinc-800",
    },
  }
);
