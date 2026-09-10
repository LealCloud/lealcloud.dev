'use client';

import { Button } from '@/components/ui/Button';
import { AppIcon } from '@/lib/icon-map';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const COMPONENTS = [
  {
    title: 'Animated Button',
    type: 'Componente',
    description:
      'Botón reutilizable con estados de hover, loading y microinteracciones.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    title: 'Glass Card',
    type: 'Componente',
    description:
      'Tarjeta con efecto glass, bordes suaves y animaciones sutiles.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Command Menu',
    type: 'Componente',
    description: 'Menú de comandos rápido, accesible y personalizable.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 70 : -70,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -70 : 70,
    scale: 0.97,
  }),
};

export default function ComponentLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();

  const totalComponents = COMPONENTS.length;

  const getIndex = (index: number) => {
    return (index + totalComponents) % totalComponents;
  };

  const previousIndex = getIndex(activeIndex - 1);
  const nextIndex = getIndex(activeIndex + 1);

  const activeComponent = COMPONENTS[activeIndex];
  const previousComponent = COMPONENTS[previousIndex];
  const nextComponent = COMPONENTS[nextIndex];

  const changeComponent = (newIndex: number, newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex(getIndex(newIndex));
  };

  const renderPreview = (index: number) => {
    if (index === 0) {
      return (
        <div className="border-primary/25 bg-background/80 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl">
          <Button variant="accent" size="sm" iconPosition="right">
            Probar interacción
            <AppIcon category="ui" name="arrowright" className="text-sm" />
          </Button>
        </div>
      );
    }

    if (index === 1) {
      return (
        <div className="border-primary/25 bg-background/80 w-full max-w-70 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="bg-success size-1.5 rounded-full" />
            <span className="text-foreground-subtle text-[10px] tracking-wider uppercase">
              Preview
            </span>
          </div>

          <div className="border-border bg-surface flex items-center justify-between rounded-xl border px-4 py-3">
            <span className="text-foreground text-sm font-medium">
              Glass Card
            </span>

            <AppIcon category="ui" name="arrowright" className="text-sm" />
          </div>
        </div>
      );
    }

    return (
      <div className="border-border bg-background/85 w-full max-w-75 rounded-2xl border p-3 shadow-2xl backdrop-blur-xl">
        <div className="border-border bg-surface mb-2 flex items-center gap-2 rounded-lg border px-3 py-2">
          <span className="text-foreground-subtle text-xs">⌕</span>

          <span className="text-foreground-subtle text-[10px]">
            Buscar comando...
          </span>
        </div>

        <div className="bg-primary/10 flex items-center gap-3 rounded-lg px-3 py-2">
          <span className="text-primary text-xs">⌂</span>

          <span className="text-foreground text-xs font-medium">Inicio</span>
        </div>
      </div>
    );
  };

  const renderCard = (
    component: (typeof COMPONENTS)[number],
    index: number,
    position: 'previous' | 'active' | 'next',
  ) => {
    const isActive = position === 'active';

    return (
      <motion.article
        layout
        className={
          isActive
            ? 'border-primary/45 bg-surface relative overflow-hidden rounded-3xl border shadow-[0_0_70px_color-mix(in_oklab,var(--primary)_10%,transparent)]'
            : 'border-border bg-surface/70 relative overflow-hidden rounded-3xl border opacity-45'
        }
        animate={{
          opacity: isActive ? 1 : 0.45,
          scale: isActive ? 1 : 0.94,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <div className="border-border/70 relative aspect-16/7 overflow-hidden border-b bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]">
          <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-size-[28px_28px]" />

          <div className="relative flex h-full items-center justify-center p-6 md:p-8">
            {renderPreview(index)}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <p className="text-primary mb-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase">
            {component.type}
          </p>

          <h3 className="text-xl md:text-2xl">{component.title}</h3>

          <p className="text-foreground-muted mt-2 text-sm leading-relaxed">
            {component.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {component.technologies.map((technology) => (
              <li
                key={technology}
                className="border-border bg-background/50 text-foreground-subtle rounded-full border px-2.5 py-1 text-[10px] font-medium"
              >
                {technology}
              </li>
            ))}
          </ul>

          {isActive && (
            <a
              href={`/recursos/${component.title.toLowerCase().replaceAll(' ', '-')}`}
              className="text-foreground hover:text-primary mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              Ver componente
              <AppIcon category="ui" name="arrowright" className="text-sm" />
            </a>
          )}
        </div>
      </motion.article>
    );
  };

  return (
    <section
      id="component-lab"
      className="mx-auto w-full max-w-355 px-6 py-20 md:px-8 md:py-24 lg:py-28"
    >
      <header className="mb-10 flex flex-col gap-7 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-170">
          <p className="text-primary mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase">
            <AppIcon category="ui" name="lab" className="text-4xl" />
            Component Lab
          </p>

          <h2 className="max-w-160 text-balance">
            Componentes, experimentos y recursos que construyo.
          </h2>

          <p className="text-foreground-muted mt-4 max-w-150 text-base leading-relaxed text-pretty">
            Aquí comparto componentes de UI, hooks y pequeños recursos que he
            creado mientras aprendo y desarrollo.
          </p>
        </div>

        {/* TODO: Crear y organizar contenido*/}
        <Button
          href="/"
          variant="accent"
          iconPosition="right"
          className="rounded-full hover:-translate-y-0.5"
        >
          <AppIcon category="social" name="github" className="text-3xl" />
          Ver todos los recursos
          <AppIcon category="ui" name="arrowright" className="text-sm" />
        </Button>
      </header>

      <div className="relative">
        <Button
          type="button"
          aria-label="Componente anterior"
          onClick={() => changeComponent(activeIndex - 1, -1)}
          variant="accent"
          className="absolute top-1/2 -left-2 z-20 size-10 -translate-y-1/2 rounded-full p-0 sm:-left-3 md:-left-5 md:size-11"
        >
          <AppIcon category="ui" name="anglesLeft" className="text-2xl" />
        </Button>

        <div className="mx-auto max-w-310">
          <div className="hidden grid-cols-[minmax(0,0.82fr)_minmax(0,1.15fr)_minmax(0,0.82fr)] items-center gap-5 lg:grid">
            {renderCard(previousComponent, previousIndex, 'previous')}

            {renderCard(activeComponent, activeIndex, 'active')}

            {renderCard(nextComponent, nextIndex, 'next')}
          </div>

          <div className="lg:hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={activeComponent.title}
                custom={direction}
                variants={reduceMotion ? undefined : variants}
                initial={reduceMotion ? false : 'enter'}
                animate={reduceMotion ? undefined : 'center'}
                exit={reduceMotion ? undefined : 'exit'}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }
              >
                {renderCard(activeComponent, activeIndex, 'active')}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Button
          type="button"
          aria-label="Siguiente componente"
          onClick={() => changeComponent(activeIndex + 1, 1)}
          variant="accent"
          className="absolute top-1/2 -right-2 z-20 size-10 -translate-y-1/2 rounded-full p-0 hover:scale-105 sm:-right-3 md:-right-5 md:size-11"
        >
          <AppIcon category="ui" name="anglesRight" className="text-2xl" />
        </Button>
      </div>

      <footer className="text-foreground-subtle mt-6 flex items-center justify-center text-xs">
        <div
          className="flex items-center gap-2"
          aria-label="Navegación del carrusel"
        >
          {COMPONENTS.map((component, index) => (
            <Button
              key={component.title}
              type="button"
              aria-label={`Ir a ${component.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() =>
                changeComponent(
                  index,
                  index > activeIndex ? 1 : index < activeIndex ? -1 : 0,
                )
              }
              variant="accent"
              className={
                index === activeIndex
                  ? 'size-2 rounded-full p-0 shadow-[0_0_10px_var(--accent)]'
                  : 'bg-border hover:bg-foreground-subtle size-1.5 rounded-full p-0 shadow-none'
              }
            />
          ))}
        </div>
      </footer>
    </section>
  );
}
