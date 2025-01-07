import React from "react";
import cNames from "../utils/cNames";

const cssLoadingMessage = cNames(
  {
    base: "top-16 border-b pb-2 text-lg italic",
  },
  {
    isLoading: {
      true: "fixed",
      false: "hidden",
    },

    isCorrect: {
      true: "text-green-400 border-green-400",
      false: "text-red-400 border-red-400",
      null: "text-gray-300 border-gray-300",
    },
  }
);

const LoadingMessage = ({ children, isLoading = false, isCorrect = null }) => {
  return (
    <p className={cssLoadingMessage({ isLoading, isCorrect })}>{children}</p>
  );
};

export default LoadingMessage;
