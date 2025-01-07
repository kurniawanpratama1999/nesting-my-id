import cNames from "../../utils/cNames";

const cssDiv = cNames(
  { base: "w-64 h-40 p-2 rounded-md" },
  {
    bgColor: {
      default: "bg-gray-600",
      red: "bg-red-600 shadow-md shadow-red-400",
      emerald: "bg-emerald-600 shadow-md shadow-emerald-400",
      blue: "bg-blue-600 shadow-md shadow-blue-400",
      yellow: "bg-yellow-600 shadow-md shadow-yellow-400",
      amber: "bg-amber-600 shadow-md shadow-amber-400",
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
      <h1 className="text-lg font-semibold border-b-2 border-black/20 mb-2 pb-2">{title}</h1>
      <p className="text-md">{description}</p>
    </div>
  );
};

export default Comp_Card;
