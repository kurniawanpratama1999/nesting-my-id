import cNames from "../../utils/cNames";

const cssDiv = cNames(
  { base: "w-64 h-40 p-2 border rounded-md" },
  {
    bgColor: {
      default: "bg-gray-300 text-gray-900 border-black",
      red: "bg-red-300 text-red-900 border-red-900",
      emerald: "bg-emerald-300 text-emerald-900 border-emerald-900",
      blue: "bg-blue-300 text-blue-900 border-blue-900",
      yellow: "bg-yellow-200 text-yellow-900 border-yellow-900",
      amber: "bg-amber-300 text-amber-900 border-amber-900",
    },
  }
);

const Comp_Card = ({
  title = "Title Card",
  description = "Description Card",
  bgColor = "default",
}) => {
  return (
    <div className={cssDiv({ bgColor })}>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-md">{description}</p>
    </div>
  );
};

export default Comp_Card;
