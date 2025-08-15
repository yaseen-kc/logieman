import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { HERO_CONSTANTS } from "../../constants/heroConstants";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const { announcement, content, background, mockup } = HERO_CONSTANTS;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgSvgRef = useRef<SVGSVGElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const phoneSvgRef = useRef<SVGSVGElement | null>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement | null>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([headlineRef.current, descriptionRef.current, primaryBtnRef.current, secondaryBtnRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(badgeRef.current, { opacity: 0, y: -8 });
      gsap.set(phoneSvgRef.current, { opacity: 0, y: 24, rotate: 0.001 });
      gsap.set(bgSvgRef.current, { opacity: 0, y: 20 });

      // Intro timeline
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.1")
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25")
        .to([primaryBtnRef.current, secondaryBtnRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
        }, "-=0.3")
        .to(bgSvgRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
        .to(phoneSvgRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      // Subtle phone float animation (continuous)
      if (phoneSvgRef.current) {
        gsap.to(phoneSvgRef.current, {
          y: "-=8",
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Scroll parallax
      if (sectionRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 0.5,
          },
        });

        scrollTl
          .to(bgSvgRef.current, { y: -60, ease: "none" }, 0)
          .to(phoneSvgRef.current, { y: -20, scale: 1.03, ease: "none" }, 0);
      }

      // SVG background subtle pulse on scroll enter
      if (bgSvgRef.current) {
        gsap.fromTo(
          bgSvgRef.current,
          { scale: 1 },
          {
            scale: 1.02,
            transformOrigin: "50% 50%",
            duration: 1.2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const onPrimaryEnter = useCallback(() => {
    if (!primaryBtnRef.current) return;
    gsap.to(primaryBtnRef.current, {
      y: -3,
      scale: 1.03,
      duration: 0.18,
      ease: "power2.out",
    });
  }, []);

  const onPrimaryLeave = useCallback(() => {
    if (!primaryBtnRef.current) return;
    gsap.to(primaryBtnRef.current, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const onSecondaryEnter = useCallback(() => {
    if (!secondaryBtnRef.current) return;
    gsap.to(secondaryBtnRef.current, {
      x: 4,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const onSecondaryLeave = useCallback(() => {
    if (!secondaryBtnRef.current) return;
    gsap.to(secondaryBtnRef.current, {
      x: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-light" ref={sectionRef}>
      <div className="relative isolate">
        {/* Background pattern SVG */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          ref={bgSvgRef}
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id={background.patternId}
              width={background.patternWidth}
              height={background.patternHeight}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-light">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill={`url(#${background.patternId})`}
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>

        {/* Main content container */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-5">
          {/* Text content */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            {/* Announcement badge */}
            <div className="flex">
              <div
                className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-muted ring-1 ring-border hover:ring-dark/20"
                ref={badgeRef}
              >
                <span className="font-semibold text-primary">
                  {announcement.badge}
                </span>
                <span aria-hidden="true" className="h-4 w-px bg-border" />
                <a
                  href={announcement.link.href}
                  className="flex items-center gap-x-1"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {announcement.link.text}
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="-mr-2 size-5 text-muted"
                  />
                </a>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-dark sm:text-7xl"
              ref={headlineRef}
            >
              {content.headline}
            </h1>

            {/* Description */}
            <p
              className="mt-8 text-pretty text-lg font-medium text-muted sm:text-xl/8"
              ref={descriptionRef}
            >
              {content.description}
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={content.cta.primary.href}
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                ref={primaryBtnRef}
                onMouseEnter={onPrimaryEnter}
                onMouseLeave={onPrimaryLeave}
              >
                {content.cta.primary.text}
              </a>
              <a
                href={content.cta.secondary.href}
                className="text-sm/6 font-semibold text-dark"
                ref={secondaryBtnRef}
                onMouseEnter={onSecondaryEnter}
                onMouseLeave={onSecondaryLeave}
              >
                {content.cta.secondary.text} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Mockup image */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
            <svg
              role="img"
              viewBox={mockup.viewBox}
              className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
              ref={phoneSvgRef}
            >
              <title>{mockup.imageAlt}</title>
              <defs>
                <clipPath id={mockup.clipPathId}>
                  <rect
                    rx={mockup.clipRect.rx}
                    width={mockup.clipRect.width}
                    height={mockup.clipRect.height}
                  />
                </clipPath>
              </defs>
              {/* Phone frame */}
              <path
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                fill="#4B5563"
              />
              {/* Phone screen */}
              <path
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                fill="#343E4E"
              />
              {/* App screenshot */}
              <foreignObject
                width={mockup.clipRect.width}
                height={mockup.clipRect.height}
                clipPath={`url(#${mockup.clipPathId})`}
                transform="translate(24 24)"
              >
                <img alt={mockup.imageAlt} src={mockup.imageUrl} />
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
