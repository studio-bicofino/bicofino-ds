'use client'

import { useState, type ReactNode } from 'react'

/* Painel de tunagem do lab — substituto leve do Leva (sem manutenção,
   incompatível com React 19). Mesma ideia: ajustar valores ao vivo
   até achar o que vira receita. */

export type RangeSpec = { value: number; min: number; max: number; step?: number; label?: string }
export type SelectSpec = { value: string; options: readonly string[]; label?: string }
export type ToggleSpec = { value: boolean; label?: string }
export type TunerSpec = RangeSpec | SelectSpec | ToggleSpec
export type TunerSchema = Record<string, TunerSpec>

type TunerValues<T extends TunerSchema> = { [K in keyof T]: T[K]['value'] }

export function useTuner<T extends TunerSchema>(
  schema: T,
  opts: { title?: string } = {},
): { values: TunerValues<T>; panel: ReactNode; replay: number } {
  const [values, setValues] = useState<TunerValues<T>>(
    () =>
      Object.fromEntries(
        Object.entries(schema).map(([key, spec]) => [key, spec.value]),
      ) as TunerValues<T>,
  )
  const [replay, setReplay] = useState(0)

  const set = (key: keyof T, value: number | string | boolean) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const panel = (
    <aside className="tuner">
      <div className="tuner__head">
        <span>{opts.title ?? '// Tuner'}</span>
        <button className="tuner__replay" onClick={() => setReplay((n) => n + 1)}>
          ↻ replay
        </button>
      </div>
      <div className="tuner__body">
        {Object.entries(schema).map(([key, spec]) => {
          const label = spec.label ?? key

          if ('options' in spec) {
            const current = values[key as keyof T] as string
            return (
              <div className="tuner__field" key={key}>
                <span className="tuner__label">{label}</span>
                <div className="tuner__options">
                  {spec.options.map((opt) => (
                    <button
                      key={opt}
                      className={`tuner__opt${opt === current ? ' tuner__opt--on' : ''}`}
                      onClick={() => set(key, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )
          }

          if (typeof spec.value === 'boolean') {
            const current = values[key as keyof T] as boolean
            return (
              <div className="tuner__field" key={key}>
                <label className="tuner__toggle">
                  <input
                    type="checkbox"
                    checked={current}
                    onChange={(e) => set(key, e.target.checked)}
                  />
                  {label}
                </label>
              </div>
            )
          }

          const range = spec as RangeSpec
          const current = values[key as keyof T] as number
          return (
            <div className="tuner__field" key={key}>
              <span className="tuner__label">
                {label}
                <span className="tuner__value">{current}</span>
              </span>
              <input
                type="range"
                min={range.min}
                max={range.max}
                step={range.step ?? 0.01}
                value={current}
                onChange={(e) => set(key, Number(e.target.value))}
              />
            </div>
          )
        })}
      </div>
    </aside>
  )

  return { values, panel, replay }
}
