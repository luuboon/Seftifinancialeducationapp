import { Leaf } from "lucide-react";

export function Logo({ size = "normal" }: { size?: "small" | "normal" | "large" }) {
  const dimensions = {
    small: { container: "w-10 h-10", icon: 16 },
    normal: { container: "w-16 h-16", icon: 24 },
    large: { container: "w-24 h-24", icon: 36 }
  };

  const { container, icon } = dimensions[size];

  return (
    <div className={`${container} rounded-full bg-gradient-to-br from-[#FF4D00] to-[#E64500] flex items-center justify-center shadow-lg relative`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/20"></div>
      <span className="text-white z-10 relative" style={{ fontSize: icon }}>S</span>
      <Leaf className="absolute bottom-1 right-1 text-[#FFB800]" size={icon * 0.5} />
    </div>
  );
}
