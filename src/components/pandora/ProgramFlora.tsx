import type { Program } from "@/src/content/programs";

const floraColors: Record<Program["flora"], string> = {
  crystal: "text-bio-400",
  mushroom: "text-sprite-100",
  blossom: "text-flora-500",
  fern: "text-bio-400",
  berries: "text-flora-500",
  petals: "text-sprite-100",
};

export function ProgramFlora({ variant }: { variant: Program["flora"] }) {
  const shared = (
    <>
      <path
        className="flora-line flora-line--quiet"
        d="M160 278C158 218 162 148 160 67"
      />
      <path
        className="flora-line flora-line--quiet"
        d="M160 213C121 187 95 157 75 122"
      />
      <path
        className="flora-line flora-line--quiet"
        d="M160 177C198 148 221 116 236 82"
      />
      <circle className="flora-node" cx="160" cy="211" r="4" />
      <circle className="flora-node" cx="160" cy="177" r="3" />
    </>
  );

  const forms = {
    crystal: (
      <>
        <path className="flora-fill" d="M160 32l32 58-32 45-32-45z" />
        <path
          className="flora-fill flora-fill--quiet"
          d="M83 85l36 43-18 45-43-29z"
        />
        <path
          className="flora-fill flora-fill--quiet"
          d="M238 64l24 46-30 39-33-34z"
        />
      </>
    ),
    mushroom: (
      <>
        <path
          className="flora-line"
          d="M70 150c0-42 29-71 68-71s68 29 68 71H70z"
        />
        <path
          className="flora-line flora-line--quiet"
          d="M111 150c8 22 6 59-4 83h59c-11-26-12-60-3-83"
        />
        <path
          className="flora-line"
          d="M180 190c0-27 19-46 46-46s46 19 46 46h-92z"
        />
      </>
    ),
    blossom: (
      <>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            className="flora-fill flora-fill--quiet"
            cx="160"
            cy="78"
            rx="20"
            ry="48"
            transform={`rotate(${angle} 160 112)`}
          />
        ))}
        <circle className="flora-node" cx="160" cy="112" r="14" />
      </>
    ),
    fern: (
      <>
        <path className="flora-line" d="M160 255C144 193 151 124 183 49" />
        {[86, 116, 146, 176, 206].map((y, index) => (
          <path
            key={y}
            className="flora-line flora-line--quiet"
            d={`M${157 - index * 2} ${y + 26}C120 ${y + 8} 96 ${y + 4} 70 ${y}`}
          />
        ))}
        {[83, 113, 143, 173].map((y, index) => (
          <path
            key={y}
            className="flora-line flora-line--quiet"
            d={`M${165 + index * 3} ${y + 22}C204 ${y + 6} 224 ${y + 2} 252 ${y}`}
          />
        ))}
      </>
    ),
    berries: (
      <>
        {[86, 116, 145, 177, 210].map((y, index) => (
          <g key={y}>
            <circle className="flora-fill" cx={115 - index * 2} cy={y} r="12" />
            <circle
              className="flora-fill flora-fill--quiet"
              cx={207 + index}
              cy={y + 8}
              r="9"
            />
          </g>
        ))}
      </>
    ),
    petals: (
      <>
        {[74, 126, 180].map((x, index) => (
          <g key={x} transform={`translate(${x} ${90 + index * 25})`}>
            <ellipse
              className="flora-fill flora-fill--quiet"
              cx="0"
              cy="0"
              rx="20"
              ry="38"
            />
            <ellipse
              className="flora-fill flora-fill--quiet"
              cx="30"
              cy="8"
              rx="20"
              ry="38"
              transform="rotate(62 30 8)"
            />
            <circle className="flora-node" cx="13" cy="10" r="7" />
          </g>
        ))}
      </>
    ),
  };

  return (
    <svg
      className={`program-flora ${floraColors[variant]}`}
      viewBox="0 0 320 320"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="flora-orbit" cx="160" cy="160" r="122" />
      <circle
        className="flora-orbit flora-orbit--inner"
        cx="160"
        cy="160"
        r="95"
      />
      {shared}
      {forms[variant]}
      <path className="flora-ground" d="M45 279c63-14 151-14 230 0" />
    </svg>
  );
}
