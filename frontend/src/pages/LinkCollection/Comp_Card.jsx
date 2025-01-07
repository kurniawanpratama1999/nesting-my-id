import { BiDotsHorizontalRounded, BiPlusCircle } from "react-icons/bi";
import Comp_Actions from "./Comp_Actions";
import { useState } from "react";
import { NavLink } from "react-router";

export default function Comp_Card({ collection, colIndex, user }) {
  const [isCloseActions, setIsCloseActions] = useState(false);
  const colors = {
    1: "bg-yellow-600",
    2: "bg-emerald-600",
    3: "bg-purple-600",
    4: "bg-red-600",
    5: "bg-blue-600",
  };

  const bgColor = colors[colIndex + (1 % 5)];
  return (
    <div className="max-[411px]:w-full w-48 h-60 overflow-hidden rounded-md bg-zinc-700 relative flex flex-col shadow-md border border-gray-400">
      {collection.link ? (
        <>
          <button
            onClick={() => setIsCloseActions(true)}
            className="absolute right-1 top-1 border border-white rounded-full p-1 bg-black/50 hover:bg-black/70 text-white"
          >
            <BiDotsHorizontalRounded />
          </button>
          <Comp_Actions
            link={collection.link}
            user={user}
            isCloseActions={isCloseActions}
            setIsCloseActions={setIsCloseActions}
          />
          <div
            style={{ letterSpacing: ".2rem" }}
            className={`${bgColor} w-full h-1/3 flex items-center justify-center text-2xl italic`}
          >
            <NavLink to={collection.link} className='hover:underline underline-offset-8 hover:font-semibold'>
              {collection.link || "Empty Link"}
            </NavLink>
          </div>
          <p className="px-3 mt-2 break-words line-clamp-4">
            {collection.description}
          </p>
          <div className="text-xs border-t border-black/30 mt-auto flex px-3 justify-between py-1 font-semibold">
            <p title="updated at" className="text-blue-300 select-none">
              {collection?.updated_at}
            </p>
            <p title="expired in" className="text-red-300 select-none">
              {collection?.expired_in}
            </p>
          </div>
        </>
      ) : (
        <NavLink
          to="/create"
          className="h-full bg-amber-200 text-amber-800 flex flex-col items-center justify-center"
        >
          <BiPlusCircle className="text-5xl" />
          <p>Create New Link</p>
        </NavLink>
      )}
    </div>
  );
}
