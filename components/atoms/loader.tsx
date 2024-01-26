interface LoaderProps {
  size?: string;
  color?: string;
}

export function Loader({
  size = "h-8 w-8",
  color = "border-purple-500",
}: LoaderProps) {
  return (
    <div className="inline">
      <div
        className={`animate-spin rounded-full ${size} border-t-2 border-b-2 ${color}`}
      ></div>
    </div>
  );
}
