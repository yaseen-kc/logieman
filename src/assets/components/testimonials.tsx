import { featuredTestimonial, testimonials, testimonialsHeading, testimonialsSubheading } from "../../constants/testimonialConstants";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Testimonials() {
  const mobileTestimonials = testimonials.flat(2).slice(0, 3);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Headings
      gsap.set([".t-heading", ".t-subheading"], { opacity: 0, y: 22 });
      gsap.to([".t-heading", ".t-subheading"], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Featured + cards
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          delay: Math.min(i * 0.05, 0.3),
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className="relative isolate bg-light px-6 py-12 sm:px-8 sm:py-16" ref={sectionRef}>
      {/* Gradient BG */}
      {/* <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary to-accent"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden opacity-25 blur-3xl xl:justify-end"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-primary to-accent xl:ml-0 xl:mr-[calc(50%-12rem)]"
        />
      </div> */}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-heading text-base/7 font-semibold text-primary">
            {testimonialsHeading}
          </h2>
          <p className="t-subheading mt-2 text-balance text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
            {testimonialsSubheading}
          </p>
        </div>

        {/* Mobile: Featured + first 3 testimonials */}
        <div className="mx-auto mt-16 max-w-2xl text-sm/6 text-dark sm:hidden">
          <figure className="testimonial-card rounded-2xl bg-white shadow-lg ring-1 ring-dark/5">
            <blockquote className="p-6 text-lg font-semibold tracking-tight text-dark sm:p-12 sm:text-xl/8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-border px-6 py-4 sm:flex-nowrap">
              <img
                alt=""
                src={featuredTestimonial.author.imageUrl}
                className="size-10 flex-none rounded-full bg-light"
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-muted">{`@${featuredTestimonial.author.handle}`}</div>
              </div>
              {featuredTestimonial.author.logoUrl && (
                <img
                  alt=""
                  src={featuredTestimonial.author.logoUrl}
                  className="h-10 w-auto flex-none"
                />
              )}
            </figcaption>
          </figure>

          <div className="mt-8 space-y-8">
            {mobileTestimonials.map((testimonial) => (
              <figure
                key={testimonial.author.handle}
                className="testimonial-card rounded-2xl bg-white p-6 shadow-lg ring-1 ring-dark/5"
              >
                <blockquote className="text-dark">
                  <p>{`“${testimonial.body}”`}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <img
                    alt=""
                    src={testimonial.author.imageUrl}
                    className="size-10 rounded-full bg-light"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-muted">{`@${testimonial.author.handle}`}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Desktop and up: existing grid */}
        <div className="mx-auto mt-16 hidden max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-dark sm:mt-20 sm:grid sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          {/* Featured */}
          <figure className="testimonial-card rounded-2xl bg-white shadow-lg ring-1 ring-dark/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold tracking-tight text-dark sm:p-12 sm:text-xl/8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-border px-6 py-4 sm:flex-nowrap">
              <img
                alt=""
                src={featuredTestimonial.author.imageUrl}
                className="size-10 flex-none rounded-full bg-light"
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-muted">{`@${featuredTestimonial.author.handle}`}</div>
              </div>
              {featuredTestimonial.author.logoUrl && (
                <img
                  alt=""
                  src={featuredTestimonial.author.logoUrl}
                  className="h-10 w-auto flex-none"
                />
              )}
            </figcaption>
          </figure>

          {/* Other Testimonials */}
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8"
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className="testimonial-card rounded-2xl bg-white p-6 shadow-lg ring-1 ring-dark/5"
                    >
                      <blockquote className="text-dark">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="size-10 rounded-full bg-light"
                        />
                        <div>
                          <div className="font-semibold">
                            {testimonial.author.name}
                          </div>
                          <div className="text-muted">{`@${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
