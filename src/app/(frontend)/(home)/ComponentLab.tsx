'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppIcon } from '@/lib/icon-map';
import { cn } from '@/utilities/cn';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const COMPONENTS = [
  {
    title: 'Button System',
    type: 'Componente UI',
    description:
      'Botón reutilizable y tipado diseñado para mantener una interfaz consistente y flexible. Ofrece diferentes variantes, tamaños, iconos y anchos, adaptándose tanto a acciones como a enlaces. Incluye estados de interacción, transiciones sutiles y configuraciones accesibles para integrarse fácilmente en interfaces modernas.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
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
          <Button
            variant="accent"
            size="lg"
            icon="arrowright"
            iconPosition="right"
          >
            Probar interacción
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
  ) => (
    <Card
      media={renderPreview(index)}
      category={component.type}
      title={component.title}
      description={component.description}
      tags={component.technologies}
      href={`/resources/${component.title.toLowerCase().replaceAll(' ', '-')}`}
      isActive={position === 'active'}
    />
  );

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
          href="https://github.com/LealCloud"
          variant="accent"
          size="lg"
          icon="github"
          iconPosition="left"
          className="rounded-full hover:-translate-y-0.5"
        >
          Ver todos los recursos
        </Button>
      </header>

      <div className="relative">
        <Button
          type="button"
          aria-label="Componente anterior"
          onClick={() => changeComponent(activeIndex - 1, -1)}
          variant="accent"
          icon="anglesLeft"
          className="absolute top-1/2 -left-2 z-20 size-10 -translate-y-1/2 rounded-full p-0 sm:-left-3 md:-left-5 md:size-11"
        />

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
          icon="anglesRight"
          className="absolute top-1/2 -right-2 z-20 size-10 -translate-y-1/2 rounded-full p-0 hover:scale-105 sm:-right-3 md:-right-5 md:size-11"
        />
      </div>

      <footer className="text-foreground-subtle mt-6 flex items-center justify-center text-xs">
        <div
          role="tablist"
          aria-label="Navegación del carrusel"
          className="flex items-center gap-2"
        >
          {COMPONENTS.map((component, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={component.title}
                type="button"
                role="tab"
                aria-label={`Ir a ${component.title}`}
                aria-selected={isActive}
                onClick={() =>
                  changeComponent(
                    index,
                    index > activeIndex ? 1 : index < activeIndex ? -1 : 0,
                  )
                }
                className={cn(
                  'cursor-pointer rounded-full transition-all duration-200',
                  'focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  isActive
                    ? 'bg-accent size-2 shadow-[0_0_10px_var(--accent)]'
                    : 'bg-border hover:bg-foreground-subtle size-1.5',
                )}
              />
            );
          })}
        </div>
      </footer>
    </section>
  );
}
