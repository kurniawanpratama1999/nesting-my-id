import { IconCollection } from "../CreateAndUpdate/Comp_PopupLogo";

export default function Comp_Card({ collections }) {
  const ICON =
    IconCollection?.[collections.logo]?.icon || IconCollection.site.icon;
  const STYLE =
    IconCollection?.[collections.logo]?.color || IconCollection.site.color;
  return (
    <a
      href={collections.url}
      className={`w-full flex bg-gray-300 rounded-md overflow-hidden outline outline-1`}>
      <div className={`min-w-24 h-24 ${STYLE} grid place-items-center`}>
        <ICON className='text-5xl' />
      </div>
      <div className={`p-2`}>
        <p className='break-words line-clamp-1 text-sm text-gray-500'>
          {collections.url}
        </p>
        <p className='break-words line-clamp-2 font-semibold'>
          {collections.details}
        </p>
      </div>
    </a>
  );
}
