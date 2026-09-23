'use client';

import { Button, type ButtonVariant } from '@/components/ui/Button';
import { AppIcon, type TechIconName, type UiIconName } from '@/lib/icon-map';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const TECH_STACK: { label: string; icon: TechIconName }[] = [
  { label: 'Next.js', icon: 'nextjs' },
  { label: 'React', icon: 'react' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'Tailwind CSS', icon: 'tailwind' },
];

type SpecItem =
  | { label: string; category: 'ui'; icon: UiIconName }
  | { label: string; category: 'tech'; icon: TechIconName };

const SPEC_ITEMS: SpecItem[] = [
  { label: '6 variants', category: 'ui', icon: 'solid' },
  { label: '3 sizes', category: 'ui', icon: 'architecture' },
  { label: 'Button or Link', category: 'ui', icon: 'branch' },
  { label: 'Typed icons', category: 'tech', icon: 'typescript' },
];

function SpecIcon({ item }: { item: SpecItem }) {
  if (item.category === 'tech') {
    return (
      <AppIcon
        category="tech"
        name={item.icon}
        className="text-foreground-subtle size-3.5"
        aria-hidden="true"
      />
    );
  }
  return (
    <AppIcon
      category="ui"
      name={item.icon}
      className="text-foreground-subtle size-3.5"
      aria-hidden="true"
    />
  );
}

const VARIANT_OPTIONS: { value: ButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'accent', label: 'Accent' },
  { value: 'social', label: 'Social' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'disabled', label: 'Disabled' },
];

export default function ButtonHero() {
  const shouldReduceMotion = useReducedMotion();
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [copied, setCopied] = useState(false);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const snippet = `<Button variant="${variant}" size="lg">Get started</Button>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="border-border bg-background relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="bg-primary/10 pointer-events-none absolute top-0 -right-24 h-96 w-96 max-w-[60vw] rounded-full blur-[60px] md:blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="bg-secondary/10 pointer-events-none absolute bottom-0 -left-20 h-72 w-72 max-w-[60vw] rounded-full blur-[50px] md:blur-[100px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="min-w-0 lg:col-span-6">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={rise}
              className="text-foreground-subtle mb-6 flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
            >
              <span className="bg-surface text-primary rounded px-1.5 py-0.5">
                01
              </span>
              <span className="text-border" aria-hidden="true">
                ·
              </span>
              <span>Component / UI</span>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={rise}
              className="flex flex-wrap items-baseline gap-3"
            >
              <h1>Button</h1>
              <span className="border-border bg-surface text-foreground-subtle rounded border px-2 py-0.5 font-mono text-xs tracking-wide uppercase">
                Polimórfico
              </span>
            </motion.div>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={rise}
              className="text-foreground-muted mt-6 max-w-lg text-base sm:text-lg"
            >
              Un sistema de botones reutilizable para acciones consistentes,
              navegación y estados interactivos en mis interfaces de Next.js; un
              componente que renderiza un <code>&lt;button&gt;</code> real o un{' '}
              <code>&lt;a&gt;</code> real dependiendo de lo que le pases.
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-2"
            >
              {TECH_STACK.map((tech, i) => (
                <motion.li
                  key={tech.label}
                  custom={3 + i * 0.5}
                  variants={rise}
                  className="border-border bg-surface text-foreground-muted hover:text-foreground inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 motion-reduce:transform-none motion-reduce:transition-none sm:px-4 sm:text-sm"
                >
                  <AppIcon
                    category="tech"
                    name={tech.icon}
                    className="size-4"
                    aria-hidden="true"
                  />
                  {tech.label}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={rise}
              className="text-foreground-subtle mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs"
            >
              {SPEC_ITEMS.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <SpecIcon item={item} />
                  {item.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={rise}
              className="mt-8"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById('playground')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Explora el playground
              </Button>
            </motion.div>
          </div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="min-w-0 lg:col-span-6"
          >
            <div className="border-border bg-surface shadow-primary/5 rounded-2xl border p-0.5 shadow-xl sm:p-1">
              <div className="bg-background rounded-xl p-3 sm:p-4">
                <div className="bg-surface flex items-center justify-between gap-2 rounded-lg px-3 py-2">
                  <span className="text-primary shrink-0 font-mono text-xs">
                    &lt;Button /&gt;
                  </span>
                  <span className="text-foreground-subtle truncate font-mono text-[10px] tracking-wide uppercase">
                    Live specimen
                  </span>
                </div>

                <div className="border-border/60 bg-surface-hover/40 relative mt-4 flex min-h-55 items-center justify-center rounded-lg border">
                  <Button variant={variant} size="lg">
                    Get started
                  </Button>
                </div>
                <p className="text-foreground-subtle mt-2 text-center font-mono text-[11px]">
                  size=&quot;lg&quot; → 48px height · 16px radius
                </p>
                <div
                  role="group"
                  aria-label="Preview variant"
                  className="mt-4 grid min-w-0 grid-cols-2 gap-1.5 min-[400px]:grid-cols-3 sm:grid-cols-6"
                >
                  {VARIANT_OPTIONS.map((option) => (
                    <div key={option.value} className="min-w-0">
                      <Button
                        variant={variant === option.value ? 'accent' : 'ghost'}
                        size="sm"
                        aria-pressed={variant === option.value}
                        onClick={() => setVariant(option.value)}
                        className="w-full"
                      >
                        <span className="truncate">{option.label}</span>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="bg-surface mt-4 flex min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-2">
                  <code className="text-foreground-muted min-w-0 flex-1 overflow-x-auto text-xs whitespace-nowrap">
                    {snippet}
                  </code>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
