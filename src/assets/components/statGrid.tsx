import { stats } from "../../constants/statCosntants";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function statGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([".stat-title", ".stat-desc", ".stat-item"], { opacity: 0, y: 22 });

      gsap.to([".stat-title", ".stat-desc"], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      const items = gsap.utils.toArray<HTMLElement>(".stat-item");
      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: Math.min(i * 0.05, 0.25),
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-light py-12 sm:py-16" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="stat-title text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Trusted by creators worldwide
            </h2>
            <p className="stat-desc mt-4 text-lg/8 text-gray-600">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-item flex flex-col p-8">
                <dt className="text-sm/6 font-semibold text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
