// src/app/(frontend)/contacto/page.tsx
import { Button } from '@/components/ui/Button';
import { cn } from '@/utilities/cn';
import ContactFormSection from './ContactFormSection';

export default async function Contact() {
  return (
    <div
      className={cn(
        // Base: mobile apilado
        'mx-auto grid w-full grid-cols-1 gap-12 px-6 pt-7 pb-20',
        // Desktop: 2 columnas + ancho creciente
        'md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-14 md:gap-y-16',
        'lg:max-w-7xl lg:gap-x-20 lg:px-10 lg:pb-28',
        'xl:max-w-360 xl:gap-x-28 xl:px-12',
        // Evita que en 2xl se estire infinito
        '2xl:max-w-[100rem] 2xl:px-16',
      )}
    >
      {/* ── Columna izquierda: header + info de contacto ── */}
      <section
        aria-labelledby="contact-title"
        className="flex flex-col gap-8 md:sticky md:top-24 md:self-start"
      >
        <header>
          <h1
            id="contact-title"
            className="text-accent font-serif text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            Contacto
          </h1>
          <p className="text-foreground-muted mt-4 max-w-prose text-base leading-relaxed sm:text-lg">
            Abierto a oportunidades laborales, prácticas profesionales y
            proyectos colaborativos donde pueda seguir creciendo y aportar
            soluciones de software de calidad.
          </p>
        </header>

        <section
          aria-labelledby="contact-info-title"
          className="border-foreground/10 bg-surface/40 rounded-2xl border p-6 md:p-8"
        >
          <h2
            id="contact-info-title"
            className="text-accent mb-6 text-xs font-semibold tracking-[0.08em] wrap-break-word uppercase sm:text-sm"
          >
            Información de contacto
          </h2>

          <address className="not-italic">
            <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0">
              <li>
                <Button
                  variant="social"
                  href={'mailto:hello@lealcloud.dev' as any}
                  icon="email"
                  fullWidth
                  className="justify-start"
                >
                  hello@lealcloud.dev
                </Button>
              </li>
              <li>
                <Button
                  variant="social"
                  href="https://github.com/LealCloud"
                  icon="github"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  className="justify-start"
                >
                  GitHub
                </Button>
              </li>
              <li>
                <Button
                  variant="social"
                  href="https://www.linkedin.com/in/lealcloud/"
                  icon="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  className="justify-start"
                >
                  LinkedIn
                </Button>
              </li>
            </ul>
          </address>

          <dl className="border-foreground/10 mt-8 flex flex-col gap-5 border-t pt-6">
            <div className="flex flex-col gap-1">
              <dt className="text-foreground-muted text-xs font-medium tracking-wider uppercase">
                Ubicación
              </dt>
              <dd className="text-foreground text-sm font-medium sm:text-base">
                Colombia 🇨🇴
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-foreground-muted text-xs font-medium tracking-wider uppercase">
                Disponibilidad
              </dt>
              <dd className="text-foreground text-sm font-medium sm:text-base">
                Remoto • Prácticas • Posiciones Junior
              </dd>
            </div>
          </dl>
        </section>
      </section>

      {/* ── Columna derecha: formulario ── */}
      <ContactFormSection />
    </div>
  );
}
