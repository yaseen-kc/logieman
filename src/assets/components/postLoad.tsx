import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  APP_SCREEN,
  COUNTRIES,
  LOAD_TYPES,
  POST_LOAD_TEXT,
  TESTIMONIALS,
} from "../../constants/postLoadConstants";
import { createTempLoad } from "../../api/tempLoads";

type LoadFormState = {
  sourceCountry: string;
  destinationCountry: string;
  weightKg: string;
  loadType: string;
  materialType: string;
  scheduledDate: string;
  hsnCode?: string;
};

export default function PostLoad() {
  const [form, setForm] = useState<LoadFormState>({
    sourceCountry: "",
    destinationCountry: "",
    weightKg: "",
    loadType: "",
    materialType: "",
    scheduledDate: "",
    hsnCode: "",
  });

  function update<K extends keyof LoadFormState>(
    key: K,
    value: LoadFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function generateDeviceFingerprint() {
    const screenProps = `${window.screen.width}x${window.screen.height}`;
    const colorDepth = window.screen.colorDepth;
    const timezone = new Date().getTimezoneOffset();
    const language = navigator.language || "en-US";

    const fingerprintStr = `${screenProps}-${colorDepth}-${timezone}-${language}`;

    let hash = 0;
    for (let i = 0; i < fingerprintStr.length; i++) {
      const char = fingerprintStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return "df-" + Math.abs(hash).toString(16).padStart(8, "0");
  }

  function mapLoadType(label: string): "FTL" | "LTL" | "Project Basis" {
    if (label === "Full Truckload (FTL)") return "FTL";
    if (label === "Less Than Truckload (LTL)") return "LTL";
    return "Project Basis";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const deviceFingerprint = generateDeviceFingerprint();
      // eslint-disable-next-line no-console
      console.log("Web-app generated device hash:", deviceFingerprint);

      const payload = {
        deviceHash: deviceFingerprint,
        loadData: {
          sourceCountry: form.sourceCountry,
          destCountry: form.destinationCountry,
          scheduledDate: form.scheduledDate,
          weight: form.weightKg,
          material: form.materialType,
          materialHSNCode: form.hsnCode || undefined,
          loadType: mapLoadType(form.loadType),
        },
      } as const;

      const data = await createTempLoad(payload);
      // eslint-disable-next-line no-console
      console.log("Temp load saved response:", data);

      const base = import.meta.env.VITE_DASHBOARD_URL;
      if (base) {
        window.location.href = `${base}/signin?redirect=post-load&deviceFingerprint=${encodeURIComponent(
          deviceFingerprint
        )}`;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error saving temporary load:", error);
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Right: Testimonials Slider */}
          <TestimonialsSlider />

          {/* Left: Form */}
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
                {POST_LOAD_TEXT.form.title}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {POST_LOAD_TEXT.form.description}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-8">
              {/* Location Details */}
              <div>
                <h3 className="text-sm font-semibold text-dark">
                  {POST_LOAD_TEXT.sections.locationDetails}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.sourceCountry}
                    </label>
                    <div className="mt-1">
                      <select
                        value={form.sourceCountry}
                        onChange={(e) =>
                          update("sourceCountry", e.target.value)
                        }
                        required
                        className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled>
                          {POST_LOAD_TEXT.placeholders.selectCountry}
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.destinationCountry}
                    </label>
                    <div className="mt-1">
                      <select
                        value={form.destinationCountry}
                        onChange={(e) =>
                          update("destinationCountry", e.target.value)
                        }
                        required
                        className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled>
                          {POST_LOAD_TEXT.placeholders.selectCountry}
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Load Details */}
              <div>
                <h3 className="text-sm font-semibold text-dark">
                  {POST_LOAD_TEXT.sections.loadDetails}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.weight}
                    </label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      required
                      value={form.weightKg}
                      onChange={(e) => update("weightKg", e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.loadType}
                    </label>
                    <select
                      value={form.loadType}
                      onChange={(e) => update("loadType", e.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="" disabled>
                        {POST_LOAD_TEXT.placeholders.selectType}
                      </option>
                      {LOAD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.materialType}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        POST_LOAD_TEXT.placeholders.materialTypeExample
                      }
                      required
                      value={form.materialType}
                      onChange={(e) => update("materialType", e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.scheduledDate}
                    </label>
                    <input
                      type="date"
                      required
                      value={form.scheduledDate}
                      onChange={(e) => update("scheduledDate", e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.hsnCode}
                    </label>
                    <input
                      type="text"
                      placeholder={POST_LOAD_TEXT.placeholders.hsnCodeExample}
                      value={form.hsnCode}
                      onChange={(e) => update("hsnCode", e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div> */}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {POST_LOAD_TEXT.form.submitButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <aside
      className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm flex flex-col justify-end min-h-[22rem] sm:min-h-[26rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={POST_LOAD_TEXT.ariaLabels.customerTestimonials}
    >
      {/* Background visual */}
      <div className="absolute inset-0">
        <img
          alt={POST_LOAD_TEXT.alt.texture}
          src={APP_SCREEN}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Slides viewport */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 backdrop-blur">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="min-w-full p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={POST_LOAD_TEXT.ariaLabels.avatar}
                    className="size-12 rounded-full ring-2 ring-white/60"
                  />
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-white/80 text-xs">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon
                      key={s}
                      className={`size-4 ${
                        s < t.rating ? "text-yellow-400" : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-base text-white/95">“{t.quote}”</p>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              aria-label={POST_LOAD_TEXT.ariaLabels.previousReview}
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              aria-label={POST_LOAD_TEXT.ariaLabels.nextReview}
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`${POST_LOAD_TEXT.ariaLabels.goToReview} ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
