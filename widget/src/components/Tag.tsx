function Tag({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {

  return (
    <div
      className={`${className}`}
    >
      <span>{name}</span>
    </div>
  );
}

export default Tag;
