import { useLayoutEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gsap } from "gsap";
import {
  APP_SCREEN,
  COUNTRIES,
  LOAD_TYPES,
  POST_LOAD_TEXT,
} from "../../constants/postLoadConstants";
import { createTempLoad } from "../../api/tempLoads";
import {
  PostLoadFormSchema,
  extractFieldErrors,
  type PostLoadFieldErrors,
} from "../../validation/postLoadSchema";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<LoadFormState>({
    sourceCountry: "",
    destinationCountry: "",
    weightKg: "",
    loadType: "",
    materialType: "",
    scheduledDate: "",
    hsnCode: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<PostLoadFieldErrors>({});

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

  function formatDateToLocalYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Validate with Zod before proceeding
      const result = PostLoadFormSchema.safeParse(form);
      if (!result.success) {
        const fieldErrors = extractFieldErrors(result);
        setErrors(fieldErrors);
        // Focus the first field with error if possible
        const firstKey = Object.keys(fieldErrors)[0] as keyof PostLoadFieldErrors | undefined;
        if (firstKey) {
          const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
          if (el) el.focus();
        }
        return;
      }

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

  // Mount animations for text and fields
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from([".postload-title", ".postload-desc"], {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
      })
        .from(".postload-section-title", {
          opacity: 0,
          y: 14,
          duration: 0.5,
          stagger: 0.06,
        }, "<+0.15")
        .from(".postload-field", {
          opacity: 0,
          y: 10,
          duration: 0.45,
          stagger: 0.05,
        }, "<+0.05")
        .from(".postload-button", {
          opacity: 0,
          scale: 0.96,
          duration: 0.35,
        }, "<");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Focus/hover interaction helpers
  function onFieldFocus(e: React.FocusEvent<HTMLElement>) {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: "0 0 0 4px rgba(59,130,246,0.25)",
      duration: 0.2,
      ease: "power2.out",
    });
  }
  function onFieldBlur(e: React.FocusEvent<HTMLElement>) {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      duration: 0.2,
      ease: "power2.out",
    });
  }
  function onButtonEnter(e: React.MouseEvent<HTMLButtonElement>) {
    gsap.to(e.currentTarget, { scale: 1.03, y: -1, duration: 0.18, ease: "power2.out" });
  }
  function onButtonLeave(e: React.MouseEvent<HTMLButtonElement>) {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.18, ease: "power2.out" });
  }

  return (
    <section ref={sectionRef} className="bg-light">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {/* Left: Simple Image */}
          <div className="order-2 lg:order-1 self-stretch h-full">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm h-full min-h-[22rem] sm:min-h-[26rem]">
              <img
                alt={POST_LOAD_TEXT.alt.texture}
                src={APP_SCREEN}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="order-1 lg:order-2 self-stretch h-full rounded-3xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="postload-title text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
                {POST_LOAD_TEXT.form.title}
              </h2>
              <p className="postload-desc mt-2 text-sm text-muted">
                {POST_LOAD_TEXT.form.description}
              </p>
            </div>

            <form onSubmit={submit} noValidate className="space-y-8">
              {/* Location Details */}
              <div>
                <h3 className="postload-section-title text-sm font-semibold text-dark">
                  {POST_LOAD_TEXT.sections.locationDetails}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.sourceCountry}
                    </label>
                    <div className="mt-1">
                      <select
                        onFocus={onFieldFocus}
                        onBlur={onFieldBlur}
                        name="sourceCountry"
                        aria-invalid={Boolean(errors.sourceCountry) || undefined}
                        className={`postload-field block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.sourceCountry ? "border-red-500 focus:ring-red-500" : ""}`}
                        value={form.sourceCountry}
                        onChange={(e) =>
                          (update("sourceCountry", e.target.value), setErrors((prev) => ({ ...prev, sourceCountry: undefined })))
                        }
                        required
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
                      {errors.sourceCountry && (
                        <p className="mt-1 text-sm text-red-600">{errors.sourceCountry}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.destinationCountry}
                    </label>
                    <div className="mt-1">
                      <select
                        onFocus={onFieldFocus}
                        onBlur={onFieldBlur}
                        name="destinationCountry"
                        aria-invalid={Boolean(errors.destinationCountry) || undefined}
                        className={`postload-field block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.destinationCountry ? "border-red-500 focus:ring-red-500" : ""}`}
                        value={form.destinationCountry}
                        onChange={(e) =>
                          (update("destinationCountry", e.target.value), setErrors((prev) => ({ ...prev, destinationCountry: undefined })))
                        }
                        required
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
                      {errors.destinationCountry && (
                        <p className="mt-1 text-sm text-red-600">{errors.destinationCountry}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Load Details */}
              <div>
                <h3 className="postload-section-title text-sm font-semibold text-dark">
                  {POST_LOAD_TEXT.sections.loadDetails}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.weight}
                    </label>
                    <input
                      onFocus={onFieldFocus}
                      onBlur={onFieldBlur}
                      type="number"
                      min={0}
                      step="0.01"
                      name="weightKg"
                      aria-invalid={Boolean(errors.weightKg) || undefined}
                      value={form.weightKg}
                      onChange={(e) => (update("weightKg", e.target.value), setErrors((prev) => ({ ...prev, weightKg: undefined })))}
                      className={`postload-field mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.weightKg ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    {errors.weightKg && (
                      <p className="mt-1 text-sm text-red-600">{errors.weightKg}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.loadType}
                    </label>
                    <select
                      onFocus={onFieldFocus}
                      onBlur={onFieldBlur}
                      name="loadType"
                      aria-invalid={Boolean(errors.loadType) || undefined}
                      value={form.loadType}
                      onChange={(e) => (update("loadType", e.target.value), setErrors((prev) => ({ ...prev, loadType: undefined })))}
                      required
                      className={`postload-field mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.loadType ? "border-red-500 focus:ring-red-500" : ""}`}
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
                    {errors.loadType && (
                      <p className="mt-1 text-sm text-red-600">{errors.loadType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.materialType}
                    </label>
                    <input
                      onFocus={onFieldFocus}
                      onBlur={onFieldBlur}
                      type="text"
                      placeholder={
                        POST_LOAD_TEXT.placeholders.materialTypeExample
                      }
                      name="materialType"
                      aria-invalid={Boolean(errors.materialType) || undefined}
                      value={form.materialType}
                      onChange={(e) => (update("materialType", e.target.value), setErrors((prev) => ({ ...prev, materialType: undefined })))}
                      className={`postload-field mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.materialType ? "border-red-500 focus:ring-red-500" : ""}`}
                    />
                    {errors.materialType && (
                      <p className="mt-1 text-sm text-red-600">{errors.materialType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark">
                      {POST_LOAD_TEXT.labels.scheduledDate}
                    </label>
                    <div className="mt-1">
                      {(() => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          <DatePicker
                            onFocus={onFieldFocus as unknown as (e: React.FocusEvent<HTMLInputElement>) => void}
                            onBlur={onFieldBlur as unknown as (e: React.FocusEvent<HTMLInputElement>) => void}
                            name="scheduledDate"
                            aria-invalid={Boolean(errors.scheduledDate) || undefined}
                            selected={selectedDate}
                            onChange={(date: Date | null) => {
                              setSelectedDate(date);
                              update(
                                "scheduledDate",
                                date ? formatDateToLocalYYYYMMDD(date) : ""
                              );
                              setErrors((prev) => ({ ...prev, scheduledDate: undefined }));
                            }}
                            minDate={today}
                            filterDate={(d) => {
                              if (!d) return false;
                              const dd = new Date(d);
                              dd.setHours(0, 0, 0, 0);
                              return dd.getTime() >= today.getTime();
                            }}
                            placeholderText={
                              POST_LOAD_TEXT.labels.scheduledDate
                            }
                            dateFormat="yyyy-MM-dd"
                            className={`postload-field block w-full rounded-lg border border-border bg-light px-3 py-2 text-sm text-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.scheduledDate ? "border-red-500 focus:ring-red-500" : ""}`}
                            isClearable
                            showPopperArrow={false}
                          />
                        );
                      })()}
                      {errors.scheduledDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.scheduledDate}</p>
                      )}
                    </div>
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
                  onMouseEnter={onButtonEnter}
                  onMouseLeave={onButtonLeave}
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
