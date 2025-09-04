import {
  ArrowRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BENTO } from "../../constants/bentoConstants"; // <-- import constants

function BentoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "bento-card group relative min-w-0 overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md " +
        (className ?? "")
      }
    >
      {children}
    </div>
  );
}

export default function BentoGrids() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const gsapContext = gsap.context(() => {
      // Animate section title and subtitle
      gsap.set([".bento-title", ".bento-subtitle"], { opacity: 0, y: 24 });
      gsap.to(".bento-title", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bento-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.to(".bento-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bento-subtitle",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each card on enter viewport
      const cardElements = gsap.utils.toArray<HTMLElement>(".bento-card");
      cardElements.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          delay: Math.min(index * 0.06, 0.3),
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Continuous SVG animations (pause when off-screen)
      const svgTrigger = {
        trigger: ".routing-svg",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play pause resume pause",
      };

      const circles = gsap.utils.toArray<SVGCircleElement>(
        ".routing-svg .routing-circle"
      );
      if (circles.length) {
        gsap.to(circles, {
          scale: 1.08,
          transformOrigin: "50% 50%",
          yoyo: true,
          repeat: -1,
          duration: 1.5,
          ease: "sine.inOut",
          stagger: 0.15,
          scrollTrigger: svgTrigger,
        });
      }

      const links = gsap.utils.toArray<SVGPathElement>(
        ".routing-svg .routing-link"
      );
      if (links.length) {
        gsap.set(links, { strokeDashoffset: 0 });
        gsap.to(links, {
          strokeDashoffset: -8,
          repeat: -1,
          duration: 1.2,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: svgTrigger,
        });
      }

      const flow = document.querySelector<SVGPathElement>(
        ".routing-svg .routing-flow"
      );
      if (flow) {
        gsap.set(flow, { strokeDashoffset: 0, opacity: 0.9 });
        gsap.to(flow, {
          strokeDashoffset: -12,
          repeat: -1,
          duration: 1.6,
          ease: "none",
          scrollTrigger: svgTrigger,
        });
        gsap.to(flow, {
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: 1.6,
          ease: "sine.inOut",
          scrollTrigger: svgTrigger,
        });
      }

      const grad = document.querySelector<SVGLinearGradientElement>("#grad");
      if (grad) {
        gsap.to(grad, {
          attr: { gradientTransform: "rotate(360 .5 .5)" },
          duration: 12,
          ease: "none",
          repeat: -1,
          scrollTrigger: svgTrigger,
        });
      }
    }, containerRef);

    return () => {
      gsapContext.revert();
    };
  }, []);
  return (
    <div ref={containerRef} className="min-h-screen bg-light w-full relative">
      {/* Your Content/Components */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="bento-title text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
            {BENTO.section.title}
          </h2>
          <p className="bento-subtitle mt-3 text-sm text-muted sm:text-base">
            {BENTO.section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Driver Location Tracking */}
          <BentoCard className="md:col-span-2 lg:col-span-2">
            <div className="flex flex-col justify-between gap-6 md:flex-row">
              <div className="md:w-1/2 min-w-0">
                <h3 className="mt-1 text-xl font-semibold text-dark">
                  {BENTO.location.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {BENTO.location.description}
                </p>
                <a
                  href={BENTO.location.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20 transition hover:bg-primary/20"
                >
                  {BENTO.location.cta}
                  <ArrowRightIcon className="size-4" />
                </a>
              </div>
              <div className="md:w-1/2 flex items-center">
                <img
                  src={BENTO.location.imgSrc}
                  alt={BENTO.location.title}
                  loading="lazy"
                  className="w-full h-auto max-h-72 md:max-h-80 object-contain"
                />
              </div>
            </div>
          </BentoCard>

          {/* Guaranteed Quotes in 1 Hour */}
          <BentoCard>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-dark flex items-center gap-2">
                  <ChartBarIcon className="size-5 text-secondary" />
                  {BENTO.quotes.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {BENTO.quotes.description}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <img
                src={BENTO.quotes.imgSrc}
                alt={BENTO.quotes.title}
                loading="lazy"
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          </BentoCard>

          {/* We Ship Everything ! */}
          <BentoCard>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="size-5 text-secondary" />
              <h3 className="text-xl font-semibold text-dark">
                {BENTO.ship.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted">{BENTO.ship.description}</p>
            <div className="mt-4">
              <img
                src={BENTO.ship.imgSrc}
                alt={BENTO.ship.title}
                loading="lazy"
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          </BentoCard>

          {/* Advanced Automation*/}
          <BentoCard>
            <div className="flex items-center gap-2">
              <Cog6ToothIcon className="size-5 text-secondary" />
              <h3 className="text-xl font-semibold text-dark">
                {BENTO.automation.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted">
              {BENTO.automation.description}
            </p>
            <div className="mt-4">
              <img
                src={BENTO.automation.imgSrc}
                alt={BENTO.automation.title}
                loading="lazy"
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          </BentoCard>

          {/* Diverse Fleet of Trucks*/}
          <BentoCard>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-5 text-secondary" />
              <h3 className="text-xl font-semibold text-dark">
                {BENTO.diverse.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted">
              {BENTO.diverse.description}
            </p>
            <div className="mt-4">
              <img
                src={BENTO.diverse.imgSrc}
                alt={BENTO.diverse.title}
                loading="lazy"
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          </BentoCard>
        </div>
      </section>
    </div>
  );
}
