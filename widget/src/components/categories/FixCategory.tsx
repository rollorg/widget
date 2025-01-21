function FixCategory(props: { className?: string }) {
  return (
    <div
      className={`
        bg-red-500 rounded-full p-1 text-gray-100 flex justify-center items-center
        ${props.className ? props.className : "w-10"}
     `}
    >
      Fix
    </div>
  );
}

export default FixCategory;
