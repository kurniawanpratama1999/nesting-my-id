import { useState } from "react";
import cNames from "../utils/cNames";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
export default function Input({
  type = "text",
  lock = false,
  placeholder = "placeholder",
  bgColor = "default",
  outlineColor = "emerald",
  isPassword = false,
  ReactIcon = FaEye,
  htmlFor = "input",
  title = "title",
  classNameLabel = "",
  classNameInput = "",
  ...props
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <label
      htmlFor={htmlFor}
      className={cssLabel({ bgColor, outlineColor }, classNameLabel)}
    >
      <p className="absolute -top-[10px] left-3 text-sm italic bg-zinc-900 px-2 capitalize font-semibold text-gray-300">
        {title}
      </p>
      {!isPassword ? (
        <input
          type={type}
          name={htmlFor}
          className={cssInput({ lock }, classNameInput)}
          spellCheck="false"
          autoComplete="off"
          {...props}
        />
      ) : (
        <input
          type={isShowPassword ? "text" : "password"}
          name={htmlFor}
          className={cssInput({ lock }, classNameInput)}
          spellCheck="false"
          autoComplete="off"
          {...props}
        />
      )}

      {isPassword ? (
        isShowPassword ? (
          <FaEye
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="mx-2 cursor-pointer text-gray-300"
          />
        ) : (
          <FaEyeSlash
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="mx-2 cursor-pointer text-gray-300"
          />
        )
      ) : (
        false
      )}
    </label>
  );
}

const cssLabel = cNames(
  {
    base: "outline outline-1 outline-gray-300 flex items-center pt-4 pb-2 relative rounded-sm",
    space: "mb-5",
    focus: "focus-within:outline-2",
  },
  {
    bgColor: {
      default: "bg-transparent",
      dark: "bg-gray-400",
      light: "bg-white",
    },
    outlineColor: {
      emerald:
        "focus-within:outline-emerald-400 [&_p]:focus-within:text-emerald-400",
      blue: "focus-within:outline-blue-400 [&_p]:focus-within:text-blue-400",
    },
  }
);

const cssInput = cNames(
  { base: "grow bg-zinc-900 text-gray-300 px-3 ", nonactive: "border-none outline-none" },
  {
    lock: {
      true: "readOnly",
    },
  }
);
