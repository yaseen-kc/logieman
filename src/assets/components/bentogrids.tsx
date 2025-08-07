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
                "bento-card group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md " +
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

            const circles = gsap.utils.toArray<SVGCircleElement>(".routing-svg .routing-circle");
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

            const links = gsap.utils.toArray<SVGPathElement>(".routing-svg .routing-link");
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

            const flow = document.querySelector<SVGPathElement>(".routing-svg .routing-flow");
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
        <div ref={containerRef} className="min-h-screen w-full bg-[#fff8f0] relative">
            {/* Soft Warm Pastel Texture */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 182, 153, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 244, 214, 0.5) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 182, 153, 0.1) 0%, transparent 50%)`,
                }}
            />
            {/* Your Content/Components */}
            <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mb-8 text-center">
                <h2 className="bento-title text-3xl font-semibold tracking-tight text-dark sm:text-4xl">
                    {BENTO.section.title}
                </h2>
                <p className="bento-subtitle mt-3 text-muted">
                    {BENTO.section.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Intelligent Routing Engine */}
                <BentoCard className="lg:col-span-2">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row">
                        <div className="max-w-xl">
                            <h3 className="mt-5 text-xl font-semibold text-dark">
                                {BENTO.routing.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted">
                                {BENTO.routing.description}
                            </p>
                            <button
                                type="button"
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20 transition hover:bg-primary/20"
                            >
                                {BENTO.routing.cta}
                                <ArrowRightIcon className="size-4" />
                            </button>
                        </div>

                        {/* Simple flow illustration */}
                        <div className="relative isolate grow rounded-2xl bg-gradient-to-br from-secondary/5 to-primary/5 p-6 ring-1 ring-border h-64 sm:h-72 lg:h-80">
                            <svg
                                viewBox="0 0 500 220"
                                className="size-full routing-svg"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id="grad" x1="0" x2="1" gradientTransform="rotate(0 .5 .5)">
                                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
                                        <stop offset="100%" stopColor="#FEA405" stopOpacity="0.35" />
                                    </linearGradient>
                                </defs>
                                <rect x="0" y="0" width="500" height="220" fill="url(#grad)" rx="14" />
                                <g stroke="#6366F1" strokeWidth="2" fill="none">
                                    <circle className="routing-circle" cx="80" cy="60" r="18" fill="#fff" />
                                    <circle className="routing-circle" cx="240" cy="60" r="18" fill="#fff" />
                                    <circle className="routing-circle" cx="400" cy="60" r="18" fill="#fff" />
                                    <path className="routing-link" d="M98 60 H222" strokeDasharray="4 4" />
                                    <path className="routing-link" d="M258 60 H382" strokeDasharray="4 4" />
                                    <path className="routing-flow" d="M80 78 V160 H400" strokeDasharray="6 6" />
                                </g>
                                <g fontSize="12" fill="#111827">
                                    <text x="65" y="100">{BENTO.routing.labels[0]}</text>
                                    <text x="223" y="100">{BENTO.routing.labels[1]}</text>
                                    <text x="385" y="100">{BENTO.routing.labels[2]}</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </BentoCard>

                {/* Customizable Dashboards */}
                <BentoCard>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-dark flex items-center gap-2">
                                <ChartBarIcon className="size-5 text-secondary" />
                                {BENTO.dashboards.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted">
                                {BENTO.dashboards.description}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 rounded-xl bg-light p-4 ring-1 ring-border">
                        {/* Mini line chart */}
                        <svg viewBox="0 0 300 100" className="w-full">
                            <polyline
                                points="0,70 40,60 80,65 120,50 160,55 200,35 240,45 280,25"
                                fill="none"
                                stroke="#6366F1"
                                strokeWidth="2"
                            />
                            <polyline
                                points="0,85 40,80 80,82 120,70 160,74 200,60 240,62 280,50"
                                fill="none"
                                stroke="#FEA405"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </BentoCard>

                {/* Real-Time Collaboration */}
                <BentoCard>
                    <div className="flex items-center gap-2">
                        <UserGroupIcon className="size-5 text-secondary" />
                        <h3 className="text-xl font-semibold text-dark">{BENTO.collaboration.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                        {BENTO.collaboration.description}
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        {BENTO.collaboration.avatars.ids.map((n) => (
                            <img
                                key={n}
                                className="mx-auto size-12 rounded-full ring-2 ring-white shadow"
                                alt={`Collaborator ${n}`}
                                src={`${BENTO.collaboration.avatars.urlBase}${n + 10}`}
                            />
                        ))}
                    </div>
                </BentoCard>

                {/* Advanced Automation */}
                <BentoCard>
                    <div className="flex items-center gap-2">
                        <Cog6ToothIcon className="size-5 text-secondary" />
                        <h3 className="text-xl font-semibold text-dark">{BENTO.automation.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                        {BENTO.automation.description}
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-muted">
                        {BENTO.automation.steps.map((step) => (
                            <div
                                key={step}
                                className="rounded-lg bg-light px-3 py-3 ring-1 ring-border"
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Advanced Security */}
                <BentoCard>
                    <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="size-5 text-secondary" />
                        <h3 className="text-xl font-semibold text-dark">{BENTO.security.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                        {BENTO.security.description}
                    </p>
                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-secondary/10 via-white to-primary/10 p-10 ring-1 ring-border">
                        <ShieldCheckIcon className="mx-auto size-14 text-secondary/70" />
                    </div>
                </BentoCard>
            </div>
            </section>
        </div>
    );
}