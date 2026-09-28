'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utilities/cn';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Box = { l: number; t: number; r: number; b: number };
type Point = { x: number; y: number };
type Geo = {
  w: number;
  h: number;
  s: number;
  wide: boolean;
  btn: Box;
  text: Box;
  icon: Box;
};
type NoteId =
  'radius' | 'content' | 'icon' | 'spacing' | 'interaction' | 'focus';

type Note = {
  id: NoteId;
  label: string;
  text: string;
  row: 'top' | 'bottom';
  side: 'left' | 'right';
  dx: number;
  dy: number;
};

const NOTES: Note[] = [
  {
    id: 'radius',
    label: 'Radio de borde',
    text: 'Define la forma visual y mantiene la coherencia entre variantes.',
    row: 'top',
    side: 'left',
    dx: -84,
    dy: -61,
  },
  {
    id: 'content',
    label: 'Contenido',
    text: 'La etiqueta principal que comunica la acción.',
    row: 'top',
    side: 'left',
    dx: -49,
    dy: -176,
  },
  {
    id: 'icon',
    label: 'Icono',
    text: 'Elemento visual opcional que refuerza la acción.',
    row: 'top',
    side: 'right',
    dx: 113,
    dy: -150,
  },
  {
    id: 'spacing',
    label: 'Espaciado',
    text: 'El relleno (padding) interno uniforme mantiene el botón equilibrado en todos los tamaños.',
    row: 'bottom',
    side: 'left',
    dx: -73,
    dy: 82,
  },
  {
    id: 'interaction',
    label: 'Área de interacción',
    text: 'Mantiene el área enlazada o clickeable clara y predecible.',
    row: 'bottom',
    side: 'right',
    dx: 50,
    dy: 128,
  },
  {
    id: 'focus',
    label: 'Anillo de enfoque',
    text: 'Proporciona un estado de interacción visible para la navegación por teclado.',
    row: 'bottom',
    side: 'right',
    dx: 89,
    dy: 96,
  },
];

const CLIP_ID = 'anatomy-button-clip';
const MARKER_INSET = 26;

const toBox = (el: Element, origin: DOMRect): Box => {
  const r = el.getBoundingClientRect();
  return {
    l: r.left - origin.left,
    t: r.top - origin.top,
    r: r.right - origin.left,
    b: r.bottom - origin.top,
  };
};

function getAnchors({ btn, text, icon, s }: Geo): Record<NoteId, Point> {
  const r = 16 * s;
  const ring = 4 * s;
  const hit = 12 * s;
  const c = Math.SQRT1_2;

  return {
    radius: { x: btn.l + r - r * c, y: btn.t + r - r * c },
    content: { x: (text.l + text.r) / 2, y: text.t - 3 },
    icon: { x: (icon.l + icon.r) / 2, y: icon.t - 3 },
    spacing: { x: (btn.l + text.l) / 2, y: btn.b },
    interaction: { x: (btn.l + btn.r) / 2, y: btn.b + hit },
    focus: { x: btn.r - r + (r + ring) * c, y: btn.b - r + (r + ring) * c },
  };
}

function getEnd(n: Note, p: Point, g: Geo): Point {
  if (g.wide) return { x: p.x + n.dx, y: p.y + n.dy };
  return { x: p.x, y: n.row === 'top' ? MARKER_INSET : g.h - MARKER_INSET };
}

export default function ButtonAnatomy() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const btn = btnRef.current;
    const text = textRef.current;
    const icon = btn?.querySelector('svg');
    if (!stage || !btn || !text || !icon) return;

    const measure = () => {
      const o = stage.getBoundingClientRect();
      setGeo({
        w: o.width,
        h: o.height,
        s: btn.getBoundingClientRect().width / btn.offsetWidth,
        wide: window.matchMedia('(min-width: 1024px)').matches,
        btn: toBox(btn, o),
        text: toBox(text, o),
        icon: toBox(icon, o),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(btn);
    return () => observer.disconnect();
  }, []);

  const anchors = geo ? getAnchors(geo) : null;
  const r = geo ? 16 * geo.s : 0;
  const hit = geo ? 12 * geo.s : 0;

  return (
    <section id="anatomy" className="border-border bg-background border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <header className="border-border mb-12 flex flex-col gap-4 border-b pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-foreground-subtle mb-3 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
              <span className="bg-surface text-primary rounded px-1.5 py-0.5">
                03
              </span>
              <span className="text-border" aria-hidden="true">
                ·
              </span>
              <span>Anatomía Del Botón</span>
            </div>
            <h2 className="text-accent">
              Construido a partir de piezas simples
            </h2>
            <p className="text-foreground-muted mt-2 max-w-xl">
              Una mirada más cercana a la estructura detrás del componente y los
              elementos que hacen que cada interacción sea coherente.
            </p>
          </div>
          <div className="border-border bg-surface inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5 md:self-auto">
            <span className="bg-accent h-2 w-2 rounded-full" />
            <span className="text-primary font-mono text-[11px] tracking-wide uppercase">
              Specimen · size lg · focus
            </span>
          </div>
        </header>

        <div className="relative">
          {/* ESCENARIO: botón real ampliado + anotaciones medidas sobre el DOM */}
          <div ref={stageRef} inert className="relative h-75 w-full lg:h-150">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.6] sm:scale-[2]">
              <Button
                ref={btnRef}
                variant="primary"
                size="lg"
                icon="arrowright"
                iconPosition="right"
                tabIndex={-1}
                className="ring-primary ring-offset-background ring-2 ring-offset-2"
              >
                <span ref={textRef}>Vista previa</span>
              </Button>
            </div>

            {geo && anchors && (
              <svg
                aria-hidden="true"
                width={geo.w}
                height={geo.h}
                className="absolute inset-0 overflow-visible"
              >
                <defs>
                  <clipPath id={CLIP_ID}>
                    <rect
                      x={geo.btn.l}
                      y={geo.btn.t}
                      width={geo.btn.r - geo.btn.l}
                      height={geo.btn.b - geo.btn.t}
                      rx={r}
                    />
                  </clipPath>
                </defs>

                {/* Spacing: bandas de padding horizontal con su valor real */}
                <g clipPath={`url(#${CLIP_ID})`}>
                  <rect
                    x={geo.btn.l}
                    y={geo.btn.t}
                    width={geo.text.l - geo.btn.l}
                    height={geo.btn.b - geo.btn.t}
                    style={{ fill: 'var(--primary-foreground)' }}
                    opacity={0.14}
                  />
                  <rect
                    x={geo.icon.r}
                    y={geo.btn.t}
                    width={geo.btn.r - geo.icon.r}
                    height={geo.btn.b - geo.btn.t}
                    style={{ fill: 'var(--primary-foreground)' }}
                    opacity={0.14}
                  />
                </g>
                {[
                  {
                    x: (geo.btn.l + geo.text.l) / 2,
                    v: geo.text.l - geo.btn.l,
                  },
                  {
                    x: (geo.icon.r + geo.btn.r) / 2,
                    v: geo.btn.r - geo.icon.r,
                  },
                ].map((pad) => (
                  <text
                    key={pad.x}
                    x={pad.x}
                    y={(geo.btn.t + geo.btn.b) / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-mono"
                    style={{ fill: 'var(--primary-foreground)', fontSize: 10 }}
                  >
                    {Math.round(pad.v / geo.s)}
                  </text>
                ))}

                {/* Marcas sobre las partes: content, icon, radius, interaction */}
                <g
                  className="stroke-accent fill-none"
                  strokeWidth={1.25}
                  strokeDasharray="3 3"
                >
                  <rect
                    x={geo.text.l - 4}
                    y={geo.text.t - 3}
                    width={geo.text.r - geo.text.l + 8}
                    height={geo.text.b - geo.text.t + 6}
                    rx={3}
                  />
                  <rect
                    x={geo.icon.l - 3}
                    y={geo.icon.t - 3}
                    width={geo.icon.r - geo.icon.l + 6}
                    height={geo.icon.b - geo.icon.t + 6}
                    rx={3}
                  />
                  <rect
                    x={geo.btn.l - hit}
                    y={geo.btn.t - hit}
                    width={geo.btn.r - geo.btn.l + hit * 2}
                    height={geo.btn.b - geo.btn.t + hit * 2}
                    rx={r + hit}
                  />
                </g>
                <g className="stroke-accent fill-none" strokeWidth={1.25}>
                  <path
                    d={`M${geo.btn.l} ${geo.btn.t + r}A${r} ${r} 0 0 1 ${geo.btn.l + r} ${geo.btn.t}`}
                  />
                  <line
                    x1={geo.btn.l + r}
                    y1={geo.btn.t + r}
                    x2={anchors.radius.x}
                    y2={anchors.radius.y}
                  />
                </g>
                <circle
                  cx={geo.btn.l + r}
                  cy={geo.btn.t + r}
                  r={2.5}
                  className="fill-accent"
                />

                {/* Líneas guía y marcadores */}
                {NOTES.map((n, i) => {
                  const p = anchors[n.id];
                  const e = getEnd(n, p, geo);
                  const d = geo.wide
                    ? `M${p.x} ${p.y}V${e.y}H${e.x}`
                    : `M${p.x} ${p.y}V${e.y}`;

                  return (
                    <g key={n.id} className="text-foreground-subtle">
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        strokeOpacity={0.7}
                        initial={reduceMotion ? false : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                      <circle cx={p.x} cy={p.y} r={3} className="fill-accent" />
                      {geo.wide ? (
                        <circle cx={e.x} cy={e.y} r={2.5} fill="currentColor" />
                      ) : (
                        <>
                          <circle
                            cx={e.x}
                            cy={e.y}
                            r={10}
                            className="fill-background stroke-current"
                            strokeWidth={1}
                          />
                          <text
                            x={e.x}
                            y={e.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="fill-foreground font-mono"
                            style={{ fontSize: 10 }}
                          >
                            {i + 1}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          {/* TEXTOS: una sola lista. En lg se posiciona junto a cada línea; debajo de lg es la leyenda */}
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            {NOTES.map((n, i) => {
              let style: React.CSSProperties | undefined;
              if (geo?.wide && anchors) {
                const e = getEnd(n, anchors[n.id], geo);
                style =
                  n.side === 'left'
                    ? { right: geo.w - e.x + 12, top: e.y - 8 }
                    : { left: e.x + 12, top: e.y - 8 };
              }

              return (
                <li
                  key={n.id}
                  style={style}
                  className={cn(
                    'flex gap-3 lg:absolute lg:block lg:w-48',
                    n.side === 'left' && 'lg:text-right',
                    !geo && 'lg:invisible',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="border-border text-foreground-subtle mt-px grid size-5 shrink-0 place-items-center rounded-full border font-mono text-[10px] lg:hidden"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-primary font-mono text-[11px] leading-5 tracking-wide uppercase">
                      {n.label}
                    </p>
                    <p className="text-foreground-muted mt-1 text-sm leading-relaxed">
                      {n.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
