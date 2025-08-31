import { FOOTER_CONSTANTS } from "../../constants/footerConstants";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([".footer-brand", ".footer-columns .footer-col", ".footer-copy"], { opacity: 0, y: 22 });

      gsap.to(".footer-brand", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none reverse" },
      });

      const cols = gsap.utils.toArray<HTMLElement>(".footer-columns .footer-col");
      cols.forEach((col, i) => {
        gsap.to(col, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: Math.min(i * 0.05, 0.25),
          scrollTrigger: { trigger: col, start: "top 95%", toggleActions: "play none none reverse" },
        });
      });

      gsap.to(".footer-copy", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".footer-copy", start: "top 95%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer aria-label={FOOTER_CONSTANTS.ariaLabels.footerNavigation} className="bg-light" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="footer-brand space-y-6">
            <div className="flex items-center gap-3">
              <img
                alt={FOOTER_CONSTANTS.company.logo.alt}
                src={FOOTER_CONSTANTS.company.logo.src}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              {FOOTER_CONSTANTS.company.description}
            </p>
            <div className="flex gap-4" aria-label={FOOTER_CONSTANTS.ariaLabels.socialLinks}>
              {FOOTER_CONSTANTS.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={item.name}
                >
                  {item.name === "X" && (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.49 11.24H17.36l-5.3-6.956-6.06 6.956H2.69l7.73-8.878L2.25 2.25h7.02l4.78 6.356 4.194-6.356Zm-1.158 18.5h1.833L7.987 4.186H6.017L17.086 20.75Z" />
                    </svg>
                  )}
                  {item.name === "GitHub" && (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.464-1.11-1.464-.907-.62.069-.607.069-.607 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.506.337c1.909-1.295 2.748-1.026 2.748-1.026.545 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.565 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.name === "LinkedIn" && (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5ZM.5 8.25h4V23h-4V8.25Zm7.25 0h3.837v2.01h.054c.534-1.012 1.84-2.078 3.787-2.078 4.05 0 4.794 2.667 4.794 6.137V23h-4v-6.6c0-1.576-.028-3.6-2.2-3.6-2.2 0-2.536 1.718-2.536 3.49V23h-3.836V8.25Z" />
                    </svg>
                  )}
                  {item.name === "Instagram" && (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6zM17.5 6.5a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                    </svg>
                  )}
                  {item.name === "Facebook" && (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.27V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-columns mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2">
            {FOOTER_CONSTANTS.navigation.map((section) => (
              <div key={section.title} className="footer-col">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {section.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {section.links.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-copy mt-16 border-t border-gray-900/10 pt-8">
          <p className="text-xs leading-5 text-gray-500">
            {FOOTER_CONSTANTS.company.copyrightPrefix} {FOOTER_CONSTANTS.company.year} {FOOTER_CONSTANTS.company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
