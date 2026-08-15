import { Pulse } from "../scroll/Pulse";

export function GlowTree({ variant }: { variant: "groves" | "souls" }) {
  return (
    <Pulse className={`glow-tree glow-tree--${variant}`}>
      <svg viewBox="0 0 720 620" aria-hidden="true" focusable="false">
        <path
          className="tree-trunk"
          d="M360 574C312 480 384 414 348 323C326 267 306 208 342 72"
        />
        <path
          className="tree-trunk tree-trunk--quiet"
          d="M360 574C410 478 336 423 382 314C406 257 424 190 390 64"
        />
        <path className="tree-branch" d="M350 333C274 298 212 232 142 144" />
        <path className="tree-branch" d="M375 313C458 285 514 218 576 126" />
        <path className="tree-branch" d="M338 250C286 212 266 144 256 74" />
        <path className="tree-branch" d="M388 237C438 193 465 124 478 58" />
        <path className="tree-root" d="M360 568C280 552 197 561 78 602" />
        <path className="tree-root" d="M360 568C435 548 534 558 650 598" />
        <path className="tree-root" d="M360 565C344 585 326 598 295 611" />
        <path className="tree-root" d="M360 565C383 586 405 600 434 614" />
        {[142, 256, 342, 390, 478, 576].map((x, index) => (
          <circle
            key={x}
            className={
              index % 2 ? "tree-light tree-light--violet" : "tree-light"
            }
            cx={x}
            cy={[144, 74, 72, 64, 58, 126][index]}
            r={index % 3 === 0 ? 10 : 7}
          />
        ))}
      </svg>
    </Pulse>
  );
}
