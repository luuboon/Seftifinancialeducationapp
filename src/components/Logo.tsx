export function Logo({ size = "normal" }: { size?: "small" | "normal" | "large" }) {
  const dimensions = {
    small: { width: "w-16", height: "h-16" },
    normal: { width: "w-24", height: "h-24" },
    large: { width: "w-32", height: "h-32" }
  };

  const { width, height } = dimensions[size];

  return (
    <div className={`${width} ${height} flex items-center justify-center`}>
      <img 
        src="/icon.png" 
        alt="SEFTI Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
