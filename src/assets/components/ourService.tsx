import { OUR_SERVICES_DATA as DATA } from "../../constants/ourServiceConstant";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ServiceCard({
  name,
  description,
  imageSrc,
  imageAlt,
}: {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="service-card group h-[330px] w-full mx-auto rounded-3xl border border-border bg-light p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-full flex-col items-center text-center">
        <h3 className="text-sm font-semibold text-dark sm:text-base">{name}</h3>
        <p className="mt-2 text-sm text-muted sm:text-base">{description}</p>

        <div className="mt-6 w-full grow flex items-center justify-center">
          <img
            className="w-[212px] h-[140px] object-contain"
            src={imageSrc}
            alt={imageAlt}
            width={212}
            height={140}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default function OurService() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([".our-title", ".our-desc"], { opacity: 0, y: 22 });
      gsap.to(".our-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".our-title", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.to(".our-desc", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: ".our-desc", start: "top 85%", toggleActions: "play none none reverse" },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          delay: Math.min(i * 0.05, 0.25),
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-light" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="text-center">
          <h2 className="our-title text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
            {DATA.title}
          </h2>
          <p className="our-desc mx-auto mt-3 max-w-3xl text-sm text-muted sm:text-base">
            {DATA.description}
          </p>
        </div>

        {/* Mobile: single-row horizontal scroll */}
        {/* <div className="mt-10 -mx-6 overflow-x-auto md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 px-6">
            {DATA.services.map((s) => (
              <div key={s.name} className="min-w-[260px] snap-start">
                <ServiceCard
                  name={s.name}
                  description={s.description}
                  imageSrc={s.imageSrc}
                  imageAlt={s.image}
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* Mobile: single-column grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:hidden">
          {DATA.services.map((s) => (
            <ServiceCard
              key={s.name}
              name={s.name}
              description={s.description}
              imageSrc={s.imageSrc}
              imageAlt={s.image}
            />
          ))}
        </div>

        {/* Desktop / Tablet: grid layout */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {DATA.services.map((s) => (
            <ServiceCard
              key={s.name}
              name={s.name}
              description={s.description}
              imageSrc={s.imageSrc}
              imageAlt={s.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
