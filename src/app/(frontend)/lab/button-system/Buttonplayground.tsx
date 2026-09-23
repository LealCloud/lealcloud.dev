'use client';

import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button';
import type { SocialIconName, UiIconName } from '@/lib/icon-map';
import { useEffect, useRef, useState } from 'react';
import { DraggableSlider } from './DraggableSlider';

type IconOption = 'none' | UiIconName | SocialIconName;
type IconPosition = 'left' | 'right';
type Width = 'auto' | 'full';
type PreviewState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
type Tone = 'primary' | 'secondary' | 'accent';

const VARIANT_OPTIONS: { value: ButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'accent', label: 'Accent' },
  { value: 'social', label: 'Social' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'disabled', label: 'Disabled' },
];

const SIZE_ORDER: ButtonSize[] = ['sm', 'md', 'lg'];

const ICON_OPTIONS: { value: IconOption; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'arrowright', label: 'Arrow right' },
  { value: 'anglesLeft', label: 'Angles left' },
  { value: 'anglesRight', label: 'Angles right' },
  { value: 'branch', label: 'Branch' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'validation', label: 'Validation' },
  { value: 'solid', label: 'Solid' },
  { value: 'growth', label: 'Growth' },
  { value: 'bulb', label: 'Bulb' },
  { value: 'lab', label: 'Lab' },
  { value: 'alert', label: 'Alert' },
  { value: 'text', label: 'Text' },
  { value: 'user', label: 'User' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
];

const ICON_POSITION_OPTIONS: { value: IconPosition; label: string }[] = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
];

const WIDTH_OPTIONS: { value: Width; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'full', label: 'Full' },
];

const STATE_OPTIONS: { value: PreviewState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'hover', label: 'Hover' },
  { value: 'active', label: 'Active' },
  { value: 'focus', label: 'Focus' },
  { value: 'disabled', label: 'Disabled' },
];

const HOVER_OVERRIDE: Partial<Record<ButtonVariant, string>> = {
  primary: '!bg-primary-hover',
  secondary: '!bg-secondary-hover',
  accent: '!bg-accent-hover',
  social: '!bg-surface-hover',
  ghost: '!bg-surface-hover !text-foreground',
};

const ACTIVE_OVERRIDE: Partial<Record<ButtonVariant, string>> = {
  primary: '!scale-95 !brightness-95',
  secondary: '!scale-95 !brightness-95',
  accent: '!scale-95 !brightness-95',
  social: '!scale-95',
  ghost: '!scale-95 !bg-surface-active',
};

const TONE_SELECTED_CLASSES: Record<Tone, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
};

const TONE_BORDER_CLASSES: Record<Tone, string> = {
  primary: 'border-l-primary',
  secondary: 'border-l-secondary',
  accent: 'border-l-accent',
};

const TONE_TEXT_CLASSES: Record<Tone, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
};

interface ControlGroupProps {
  label: string;
  tone: Tone;
  children: React.ReactNode;
}

function ControlGroup({ label, tone, children }: ControlGroupProps) {
  return (
    <div className={`border-l-2 pl-4 ${TONE_BORDER_CLASSES[tone]}`}>
      <span
        className={`mb-2 block font-mono text-xs tracking-wide uppercase ${TONE_TEXT_CLASSES[tone]}`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  tone: Tone;
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  tone,
}: SegmentedControlProps<T>) {
  return (
    <div className="border-border bg-background inline-flex flex-wrap gap-1 rounded-lg border p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === option.value
              ? TONE_SELECTED_CLASSES[tone]
              : 'text-foreground-muted hover:text-foreground'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [icon, setIcon] = useState<IconOption>('none');
  const [iconPosition, setIconPosition] = useState<IconPosition>('left');
  const [content, setContent] = useState('Get started');
  const [width, setWidth] = useState<Width>('auto');
  const [state, setState] = useState<PreviewState>('default');

  const previewRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    if (state === 'focus') previewRef.current?.focus();
    else previewRef.current?.blur();
  }, [state]);

  const previewContent = content.trim().length > 0 ? content : 'Button';
  const stateClassName =
    state === 'hover'
      ? (HOVER_OVERRIDE[variant] ?? '')
      : state === 'active'
        ? (ACTIVE_OVERRIDE[variant] ?? '')
        : '';

  const configLine = [
    `variant="${variant}"`,
    `size="${size}"`,
    icon !== 'none' ? `icon="${icon}"` : null,
    icon !== 'none' && iconPosition === 'right' ? `iconPosition="right"` : null,
    width === 'full' ? 'fullWidth' : null,
  ]
    .filter(Boolean)
    .join(' ');

  type PropRow = { key: string; value?: string };
  const propRows: PropRow[] = [
    { key: 'variant', value: variant },
    { key: 'size', value: size },
    ...(icon !== 'none' ? [{ key: 'icon', value: icon }] : []),
    ...(icon !== 'none' && iconPosition === 'right'
      ? [{ key: 'iconPosition', value: 'right' }]
      : []),
    ...(width === 'full' ? [{ key: 'fullWidth' }] : []),
  ];

  const snippet = `<Button\n${propRows
    .map((row) =>
      row.value !== undefined ? `  ${row.key}="${row.value}"` : `  ${row.key}`,
    )
    .join('\n')}\n>\n  ${previewContent}\n</Button>`;

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be blocked (permissions, insecure context) — fail silently.
    }
  };

  return (
    <section id="playground" className="border-border bg-surface border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="border-border mb-12 flex flex-col gap-4 border-b pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-foreground-subtle mb-3 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
              <span className="bg-background text-primary rounded px-1.5 py-0.5">
                02
              </span>
              <span className="text-border" aria-hidden="true">
                ·
              </span>
              <span>Playground Interactivo</span>
            </div>
            <h2 className="text-accent">Construye tu botón</h2>
            <p className="text-foreground-muted mt-2 max-w-xl">
              Explora el componente modificando sus propiedades y mira el
              resultado al instante.
            </p>
          </div>
          <div className="border-border bg-background inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5 md:self-auto">
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            <span className="text-primary font-mono text-[11px] tracking-wide uppercase">
              En vivo · estado del lado del cliente
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* CONTROLS */}
          <div className="border-border bg-background flex flex-col gap-6 rounded-2xl border p-6">
            <ControlGroup label="Variant" tone="primary">
              <SegmentedControl
                options={VARIANT_OPTIONS}
                value={variant}
                onChange={setVariant}
                tone="primary"
              />
            </ControlGroup>

            <ControlGroup label="Size" tone="secondary">
              <DraggableSlider
                values={SIZE_ORDER}
                value={size}
                onChange={(next) => setSize(next as ButtonSize)}
                label="Size"
              />
            </ControlGroup>

            <ControlGroup label="Icon" tone="accent">
              <select
                value={icon}
                onChange={(event) => setIcon(event.target.value as IconOption)}
                className="border-border bg-background text-foreground focus-visible:ring-accent w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                {ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {icon !== 'none' && (
                <div className="mt-3">
                  <SegmentedControl
                    options={ICON_POSITION_OPTIONS}
                    value={iconPosition}
                    onChange={setIconPosition}
                    tone="accent"
                  />
                </div>
              )}
            </ControlGroup>

            <ControlGroup label="Content" tone="primary">
              <input
                type="text"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="border-border bg-background text-foreground focus-visible:ring-primary w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              />
            </ControlGroup>

            <ControlGroup label="Width" tone="secondary">
              <SegmentedControl
                options={WIDTH_OPTIONS}
                value={width}
                onChange={setWidth}
                tone="secondary"
              />
            </ControlGroup>

            <ControlGroup label="State" tone="accent">
              <SegmentedControl
                options={STATE_OPTIONS}
                value={state}
                onChange={setState}
                tone="accent"
              />
              {state === 'disabled' && (
                <p className="text-foreground-subtle mt-2 text-xs">
                  Deshabilitado siempre se renderiza igual sin importar la
                  variante — Button.tsx fuerza el estilo deshabilitado cuando el
                  elemento está realmente deshabilitado.
                </p>
              )}
            </ControlGroup>
          </div>

          {/* LIVE PREVIEW + GENERATED CODE — one console-style window */}
          <div className="border-border bg-background overflow-hidden rounded-2xl border shadow-lg">
            <div className="border-border/60 bg-surface flex items-center gap-2 border-b px-4 py-3">
              <span className="bg-danger/70 h-2.5 w-2.5 rounded-full" />
              <span className="bg-warning/70 h-2.5 w-2.5 rounded-full" />
              <span className="bg-success/70 h-2.5 w-2.5 rounded-full" />
              <span className="text-foreground-subtle ml-2 font-mono text-[11px]">
                button-preview.tsx
              </span>
            </div>

            <div className="flex min-h-70 flex-col items-center justify-center gap-4 p-10">
              <Button
                ref={previewRef}
                variant={variant}
                size={size}
                icon={icon !== 'none' ? icon : undefined}
                iconPosition={icon !== 'none' ? iconPosition : undefined}
                fullWidth={width === 'full'}
                disabled={state === 'disabled'}
                className={stateClassName}
              >
                {previewContent}
              </Button>
              <code className="text-foreground-subtle text-center font-mono text-xs">
                {configLine}
              </code>
            </div>

            <div className="border-border/60 bg-surface border-t p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-primary font-mono text-[11px] tracking-wide uppercase">
                  Generated code
                </span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <div className="font-mono text-xs leading-relaxed">
                <div>
                  <span className="text-foreground-subtle">&lt;</span>
                  <span className="text-primary">Button</span>
                </div>
                {propRows.map((row) => (
                  <div key={row.key} className="pl-4">
                    <span className="text-secondary">{row.key}</span>
                    {row.value !== undefined && (
                      <>
                        <span className="text-foreground-subtle">=</span>
                        <span className="text-accent">
                          &quot;{row.value}&quot;
                        </span>
                      </>
                    )}
                  </div>
                ))}
                <div>
                  <span className="text-foreground-subtle">&gt;</span>
                </div>
                <div className="text-foreground pl-4">{previewContent}</div>
                <div>
                  <span className="text-foreground-subtle">&lt;/</span>
                  <span className="text-primary">Button</span>
                  <span className="text-foreground-subtle">&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
