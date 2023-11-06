import type { ComponentProps, FC } from "react";

const TypethingsIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 512 512"
    {...props}
  >
    <rect
      id="r4"
      width="512"
      height="512"
      x="0"
      y="0"
      fill="url(#r5)"
      stroke="#FFF"
      strokeOpacity="100%"
      strokeWidth="0"
      paintOrder="stroke"
      rx="128"
    ></rect>
    <clipPath>
      <use xlinkHref="#r4"></use>
    </clipPath>
    <defs>
      <linearGradient
        id="r5"
        gradientTransform="rotate(45)"
        gradientUnits="userSpaceOnUse"
        style={{
          WebkitTransformOrigin: "center center",
          transformOrigin: "center center",
        }}
      >
        <stop stopColor="#C796AB"></stop>
        <stop offset="1" stopColor="#2F33EC"></stop>
      </linearGradient>
      <radialGradient
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(0 512 -512 0 256 0)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff"></stop>
        <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
      </radialGradient>
    </defs>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="352"
      height="352"
      x="80"
      y="80"
      fill="#f5f5f5"
      alignmentBaseline="middle"
      color="#FFF"
      viewBox="0 0 256 256"
    >
      <path d="M224 80l-96 56-96-56 96-56z" opacity="0.2"></path>
      <path d="M230.91 172a8 8 0 01-2.91 10.91l-96 56a8 8 0 01-8.06 0l-96-56A8 8 0 0136 169.09l92 53.65 92-53.65a8 8 0 0110.91 2.91zM220 121.09l-92 53.65-92-53.65a8 8 0 00-8 13.82l96 56a8 8 0 008.06 0l96-56a8 8 0 10-8.06-13.82zM24 80a8 8 0 014-6.91l96-56a8 8 0 018.06 0l96 56a8 8 0 010 13.82l-96 56a8 8 0 01-8.06 0l-96-56A8 8 0 0124 80zm23.88 0L128 126.74 208.12 80 128 33.26z"></path>
    </svg>
  </svg>
);

export default TypethingsIcon;
