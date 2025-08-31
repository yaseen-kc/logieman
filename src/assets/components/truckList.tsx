import { TRUCK_LIST_CONSTANTS } from "../../constants/truckListConstants";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TruckCard({ name, imageSrc }: { name: string; imageSrc: string }) {
  return (
    <div className="truck-card group h-[260px] w-full rounded-3xl border border-border bg-light p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-full flex-col items-center justify-between text-center">
        <div className="mt-2 w-full grow">
          <img
            alt={name}
            src={imageSrc}
            className="mx-auto h-28 w-auto object-contain"
          />
        </div>
        <h3 className="mt-6 text-sm font-semibold text-dark sm:text-base">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default function TruckList() {
  const DATA = TRUCK_LIST_CONSTANTS;

  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([".truck-title", ".truck-desc"], { opacity: 0, y: 22 });
      gsap.to(".truck-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".truck-title", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.to(".truck-desc", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: ".truck-desc", start: "top 85%", toggleActions: "play none none reverse" },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".truck-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          delay: Math.min(i * 0.05, 0.25),
          scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-light" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="text-center">
          <h2 className="truck-title text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
            {DATA.title}
          </h2>
          <p className="truck-desc mx-auto mt-3 max-w-3xl text-sm text-muted sm:text-base">
            {DATA.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {DATA.fleet.map((f) => (
            <TruckCard
              key={f.name + f.imageSrc}
              name={f.name}
              imageSrc={f.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
