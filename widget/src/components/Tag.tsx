import { useMemo } from "react";

function Tag({
  name,
  colour,
  border,
  className,
}: {
  name: string;
  colour: string;
  border?: string;
  className?: string;
}) {
  const borderStyle = useMemo(() => {
    switch (border) {
      case "top-right":
        return "rounded-tr-[15000px]";
      case "bottom-right":
        return "rounded-br-[15000px]";

      default:
        return "rounded-full";
    }
  }, [border]);

  return (
    <div
      className={`${className} ${colour} text-xs text-gray-100 w-auto py-2 px-4 mr-2 rounded-l-full ${borderStyle} flex justify-center items-center`}
    >
      <span>{name}</span>
    </div>
  );
}

export default Tag;
