interface CategoryIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export default function CategoryIcon({
  width = 24,
  height = 24,
  fill = "currentColor",
}: CategoryIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top-left rounded square */}
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="2"
        ry="2"
        fill={fill}
      />

      {/* Top-right rounded square */}
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="2"
        ry="2"
        fill={fill}
      />

      {/* Bottom-left rounded square */}
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="2"
        ry="2"
        fill={fill}
      />

      {/* Bottom-right rounded square */}
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="2"
        ry="2"
        fill={fill}
      />
    </svg>
  );
}
