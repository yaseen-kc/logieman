import { CTA_CONSTANTS } from "../../constants/ctaConstant";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTA() {
  const DATA = CTA_CONSTANTS.section;
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([".cta-title", ".cta-desc", ".cta-btn"], { opacity: 0, y: 24 });

      gsap.to(".cta-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".cta-desc", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-desc",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const btns = gsap.utils.toArray<HTMLElement>(".cta-btn");
      btns.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: Math.min(i * 0.06, 0.2),
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id={DATA.id} className="relative isolate overflow-hidden bg-light" ref={sectionRef}>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="cta-title text-4xl font-semibold tracking-tight text-dark sm:text-6xl">
            {DATA.title}
          </h2>
          <p className="cta-desc mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {DATA.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={DATA.primary.href}
              className="cta-btn inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              {DATA.primary.label}
            </a>
            <a
              href={DATA.secondary.href}
              className="cta-btn inline-flex w-full items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-dark ring-1 ring-border transition hover:bg-light sm:w-auto"
            >
              {DATA.secondary.label}
              <span aria-hidden="true" className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
