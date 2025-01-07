import React from "react";
import { useNavigate } from "react-router";

export default function Comp_Actions({
  isCloseActions,
  setIsCloseActions,
  link,
}) {
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsCloseActions(false);
  };
  const handleUpdate = () => {
    setIsCloseActions(false);
    navigate(`/update/${link}`);
  };
  const handleCopy = () => {
    setIsCloseActions(false);
  };
  const handleClose = () => {
    setIsCloseActions(false);
  };
  return (
    <div
      className={`absolute h-full flex flex-col bg-transparent top-0 left-0 w-full [&_button]:py-2 [&_button]:border-y [&_button]:border-gray-200 font-semibold text-white/80 [&_button]:transition-all rounded-md ${
        isCloseActions ? "block" : "hidden"
      }`}
    >
      <button
        onClick={() => handleUpdate()}
        className="bg-blue-700 hover:bg-blue-600"
      >
        Update
      </button>
      <button
        onClick={() => handleCopy()}
        className="bg-green-700 hover:bg-green-600"
      >
        Copy
      </button>
      <button
        onClick={() => handleDelete()}
        className="bg-red-700 hover:bg-red-600"
      >
        Delete
      </button>
      <div
        onClick={() => handleClose()}
        className="grow bg-white/20 backdrop-blur-sm"
      ></div>
    </div>
  );
}
