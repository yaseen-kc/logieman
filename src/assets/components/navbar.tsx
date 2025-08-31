import { useLayoutEffect, useRef, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NAV_CONSTANTS } from '../../constants/navConstants'
import { gsap } from 'gsap'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-light">
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-light/40 backdrop-blur-md border-b border-light/20 lg:bg-light lg:backdrop-blur-0 lg:border-b-0">
        <nav aria-label={NAV_CONSTANTS.ariaLabels.global} className="mx-auto max-w-7xl flex items-center justify-between p-3 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{NAV_CONSTANTS.company.name}</span>
              <img
                alt={NAV_CONSTANTS.company.logo.alt}
                src={NAV_CONSTANTS.company.logo.src}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">{NAV_CONSTANTS.ariaLabels.openMainMenu}</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {NAV_CONSTANTS.navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href={NAV_CONSTANTS.links.login.href} className="text-sm/6 font-semibold text-gray-900">
              {NAV_CONSTANTS.links.login.text} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/40 backdrop-blur-md border-l border-white/20 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{NAV_CONSTANTS.company.name}</span>
                <img
                  alt={NAV_CONSTANTS.company.logo.alt}
                  src={NAV_CONSTANTS.company.logo.src}
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">{NAV_CONSTANTS.ariaLabels.closeMenu}</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {NAV_CONSTANTS.navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href={NAV_CONSTANTS.links.login.href}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {NAV_CONSTANTS.links.login.text}
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}
