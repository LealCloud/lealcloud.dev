'use client';

import { Button } from '@/components/ui/Button';
import { AppIcon, TechIconName } from '@/lib/icon-map';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const TECHS: { name: string; icon: TechIconName }[] = [
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Git', icon: 'git' },
  { name: 'PostgreSQL', icon: 'postgresql' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background relative flex min-h-[calc(100dvh-4rem)] w-full flex-1 flex-col overflow-hidden text-center">
      {/* Resplandor sutil detrás del contenido */}
      <div
        aria-hidden
        className="bg-primary/20 pointer-events-none absolute -top-48 left-1/2 h-144 w-xl -translate-x-1/2 rounded-full blur-[120px]"
      />

      <motion.div
        variants={container}
        initial={false}
        animate={reduceMotion ? 'show' : 'show'}
        className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-12 sm:px-8 sm:py-20 lg:py-28"
      >
        {/* Badge de disponibilidad */}
        <motion.div
          variants={item}
          className="border-secondary/30 bg-secondary/10 text-secondary mb-8 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-center text-sm font-medium sm:w-fit sm:px-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="bg-secondary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-secondary relative inline-flex h-2 w-2 rounded-full" />
          </span>
          Disponible para nuevos proyectos
        </motion.div>

        {/* Subtítulo / Rol */}
        <motion.p
          variants={item}
          className="text-accent mb-3 text-sm font-medium"
        >
          Junior Web Developer · En constante evolución
        </motion.p>

        {/* Título principal */}
        <motion.h1 variants={item} className="mb-6 text-balance">
          Construyo software que convierte ideas en experiencias reales.
        </motion.h1>

        {/* Descripción */}
        <motion.p
          variants={item}
          className="text-foreground-muted mb-10 max-w-xl text-base leading-relaxed text-pretty"
        >
          Desarrollador de software enfocado en el ecosistema moderno. Combino
          lógica analítica, diseño funcional y buenas prácticas de programación
          para crear experiencias digitales de alto impacto.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="accent">Ver mis proyectos</Button>
          <Button variant="primary">Hablemos</Button>
        </motion.div>
      </motion.div>

      {/* Cinta de tecnologías en movimiento */}
      <div
        className="border-border bg-surface mt-auto w-full overflow-hidden border-t py-6"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <motion.div
          className="flex w-max shrink-0 items-center"
          animate={reduceMotion ? undefined : { x: [0, -(TECHS.length * 96)] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 30, ease: 'linear', repeat: Infinity }
          }
        >
          {[...TECHS, ...TECHS, ...TECHS, ...TECHS].map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className="text-foreground-subtle flex w-24 shrink-0 flex-col items-center justify-center gap-2 text-center text-sm font-medium"
            >
              <AppIcon category="tech" name={tech.icon} className="text-2xl" />
              {tech.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
