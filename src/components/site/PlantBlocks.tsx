import { useMemo, useState } from "react";
import { ArrowRight, Check, MousePointerClick, ShieldAlert } from "lucide-react";

import { SectionShell } from "./SectionShell";
import { RiskLogicStrip } from "./RiskLogicStrip";
import {
  plantBlocksByType,
  plantTypes,
  zoneBLabel,
  zoneMeta,
  type PlantBlock,
  type PlantType,
} from "./plantMapData";

function BlockLabel({ block }: { block: PlantBlock }) {
  const { x, y, w, h } = block.shape;
  const cx = x + w / 2;
  const lines = block.lines;
  const compact = h < 90;
  const iconSize = compact ? 18 : 22;
  const textOffset = compact ? 6 : iconSize / 2 + 6;
  const startY = y + h / 2 - ((lines.length - 1) * 15) / 2 + 5 + textOffset;
  const Icon = block.icon;
  return (
    <>
      {compact ? (
        <Icon
          x={x + 10}
          y={y + 10}
          width={iconSize}
          height={iconSize}
          strokeWidth={1.75}
          className="pointer-events-none text-navy"
          aria-hidden
        />
      ) : (
        <Icon
          x={cx - iconSize / 2}
          y={y + h / 2 - ((lines.length - 1) * 15) / 2 - iconSize - 2}
          width={iconSize}
          height={iconSize}
          strokeWidth={1.75}
          className="pointer-events-none text-navy"
          aria-hidden
        />
      )}
      <text
        x={cx}
        y={startY}
        textAnchor="middle"
        className="pointer-events-none fill-foreground text-base font-medium"
      >
        {lines.map((line, i) => (
          <tspan key={line} x={cx} dy={i === 0 ? 0 : 15}>
            {line}
          </tspan>
        ))}
      </text>
    </>
  );
}

export function PlantBlocks() {
  const [plantType, setPlantType] = useState<PlantType>("thermal");
  const [activeId, setActiveId] = useState<string>("perimeter");

  const blocks = plantBlocksByType[plantType];
  const fence = blocks[0]!;
  const innerBlocks = useMemo(() => blocks.slice(1), [blocks]);
  const active = blocks.find((b) => b.id === activeId) ?? fence;

  const zoneLegend = (z: PlantBlock["zone"]) =>
    z === "B" ? zoneBLabel[plantType] : zoneMeta[z].label;

  return (
    <SectionShell
      id="plant-blocks"
      eyebrow="Section 04"
      title="Security Zones & Critical Plant Assets"
      intro="An interactive zonal schematic of the asset. Select any block to see its risk exposure and the surveillance and security controls mapped to it."
      tone="tint"
    >
      <div className="print-hidden mb-6 flex flex-wrap items-center gap-3">
        <span className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Plant type
        </span>
        <div
          role="tablist"
          aria-label="Select plant type"
          className="inline-flex rounded-lg border border-hairline bg-surface p-1 shadow-card"
        >
          {plantTypes.map((t) => {
            const selected = t.id === plantType;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setPlantType(t.id);
                  setActiveId("perimeter");
                }}
                className={`rounded-md px-4 py-2 text-base font-semibold transition-colors ${
                  selected
                    ? "bg-navy text-navy-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_27rem]">
        <div className="rounded-xl border border-hairline bg-surface p-4 shadow-card md:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {(Object.keys(zoneMeta) as Array<PlantBlock["zone"]>).map((z) => (
              <span key={z} className="flex items-center gap-2 text-base text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-[3px] border border-hairline"
                  style={{ background: zoneMeta[z].fill }}
                />
                {zoneLegend(z)}
              </span>
            ))}
            <span className="print-hidden ml-auto flex items-center gap-1.5 text-base text-muted-foreground">
              <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
              Click a block
            </span>
          </div>

          <svg
            viewBox="0 0 1000 620"
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label="Interactive power plant block diagram"
            className="mx-auto h-auto w-full max-w-[900px] select-none"
          >
            <defs>
              <pattern id="plantGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M40 0H0V40"
                  fill="none"
                  stroke="var(--hairline)"
                  strokeWidth="1"
                  opacity="0.7"
                />
              </pattern>
            </defs>
            <rect x="0" y="0" width="1000" height="620" fill="url(#plantGrid)" />

            {/* Perimeter fence — clickable */}
            <g
              role="button"
              tabIndex={0}
              aria-pressed={activeId === fence.id}
              aria-label={fence.name}
              className="cursor-pointer outline-none"
              onClick={() => setActiveId(fence.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(fence.id);
                }
              }}
            >
              <rect
                x={fence.shape.x}
                y={fence.shape.y}
                width={fence.shape.w}
                height={fence.shape.h}
                rx="10"
                fill="none"
                stroke={activeId === fence.id ? "var(--brand)" : "var(--navy)"}
                strokeWidth={activeId === fence.id ? 6 : 3}
                strokeDasharray="14 8"
              />
              <rect
                x={fence.shape.x}
                y={fence.shape.y}
                width={fence.shape.w}
                height={fence.shape.h}
                rx="10"
                fill="none"
                stroke="transparent"
                strokeWidth="18"
                style={{ pointerEvents: "stroke" }}
              />
              <text
                x={fence.shape.x + 14}
                y={fence.shape.y - 10}
                className="pointer-events-none fill-muted-foreground text-base font-semibold uppercase tracking-[0.16em]"
              >
                Plant boundary and perimeter
              </text>
            </g>

            {/* Blocks */}
            {innerBlocks.map((block) => {
              const selected = block.id === activeId;
              return (
                <g
                  key={block.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  aria-label={block.name}
                  className="cursor-pointer outline-none [&:hover>rect]:stroke-brand"
                  onClick={() => setActiveId(block.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(block.id);
                    }
                  }}
                >
                  <rect
                    x={block.shape.x}
                    y={block.shape.y}
                    width={block.shape.w}
                    height={block.shape.h}
                    rx="8"
                    fill={zoneMeta[block.zone].fill}
                    stroke={selected ? "var(--brand)" : "var(--hairline)"}
                    strokeWidth={selected ? 3.5 : 1.5}
                    className="transition-[stroke,filter] duration-200"
                    style={selected ? { filter: "brightness(1.03)" } : undefined}
                  />
                  <BlockLabel block={block} />
                </g>
              );
            })}

            {/* Off-site connector */}
            <path
              d="M820 320 H850"
              stroke="var(--navy)"
              strokeWidth="2"
              strokeDasharray="6 5"
              fill="none"
            />
          </svg>
        </div>

        {/* Detail panel */}
        <aside
          aria-live="polite"
          className="flex h-fit flex-col rounded-xl border border-hairline bg-navy p-6 text-navy-foreground shadow-lift lg:sticky lg:top-24"
        >
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-brand">
            Zone {active.zone} · {active.zoneLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-snug">{active.name}</h3>
          <p className="mt-2.5 text-base leading-relaxed text-navy-muted">{active.why}</p>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="flex items-center gap-1.5 text-base font-semibold uppercase tracking-[0.16em] text-navy-muted">
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden /> Key exposures
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {active.risks.map((r) => (
                <li key={r} className="flex gap-2 text-base leading-relaxed">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-base font-semibold uppercase tracking-[0.16em] text-navy-muted">
              Mapped solutions
            </p>
            <ul className="mt-2.5 space-y-2">
              {active.solutions.map((s) => (
                <li key={s} className="flex gap-2 text-base leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <RiskLogicStrip />

    </SectionShell>
  );
}
