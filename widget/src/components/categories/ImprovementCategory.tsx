function ImprovementCategory(props: { className?: string }) {
  return (
    <div
      className={`bg-purple-500 rounded-full p-1 text-gray-100 flex justify-center items-center ${
        props.className ? props.className : "w-28"
      }`}
    >
      Improvement
    </div>
  );
}

export default ImprovementCategory;
