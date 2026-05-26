'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { useFieldArray, Controller } from 'react-hook-form'
import { Trash2, Plus } from 'lucide-react'
import type { PersonFormInput } from '@/lib/db/schemas'
import type { SuggestionsBundle } from '@/lib/db/suggestions'
import { SectionShell, FullRow } from './SectionShell'
import { SelectField, FieldShell } from '../Field'
import { AutocompleteField } from '../AutocompleteField'
import { ChipInput } from './ChipInput'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
  suggestions: SuggestionsBundle
}

export function GeographySection({ control, errors, suggestions }: Props) {
  const geoArr = useFieldArray({ control, name: 'geography_action' })

  return (
    <SectionShell
      eyebrow="06 · Geografia"
      title="Onde mora, transita e atua"
      subtitle="Cidade-base + línguas + passaportes. Adicione regiões de atuação se for relevante."
    >
      <Controller
        name="home_city"
        control={control}
        render={({ field }) => (
          <AutocompleteField
            id="home_city"
            label="Cidade-base"
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v || null)}
            placeholder="Ex.: São Paulo"
            error={errors.home_city?.message}
            suggestions={suggestions.home_city}
          />
        )}
      />

      <Controller
        name="home_country"
        control={control}
        render={({ field }) => (
          <AutocompleteField
            id="home_country"
            label="País"
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v || null)}
            placeholder="Ex.: Brasil"
            error={errors.home_country?.message}
            suggestions={suggestions.home_country}
          />
        )}
      />

      <Controller
        name="languages"
        control={control}
        render={({ field }) => (
          <ChipInput
            label="Línguas"
            value={field.value ?? []}
            onChange={field.onChange}
            placeholder="Português, Inglês, Italiano…"
            hint="Enter ou vírgula para adicionar."
            suggestions={suggestions.language}
          />
        )}
      />

      <Controller
        name="passports"
        control={control}
        render={({ field }) => (
          <ChipInput
            label="Passaportes"
            value={field.value ?? []}
            onChange={field.onChange}
            placeholder="Brasil, Itália, EUA…"
            hint="Enter ou vírgula para adicionar."
            suggestions={suggestions.passport}
          />
        )}
      />

      <FullRow>
        <hr style={{ border: 'none', borderTop: '1px solid var(--bf-border)' }} />
      </FullRow>

      <FullRow>
        <h3
          className="mono"
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--bf-text-primary)',
          }}
        >
          Geografia de atuação
        </h3>
      </FullRow>

      {geoArr.fields.length === 0 && (
        <FullRow>
          <div
            style={{
              padding: '16px',
              border: '1px dashed var(--bf-border-strong)',
              borderRadius: 12,
              color: 'var(--bf-text-secondary)',
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            Nenhuma região registrada.
          </div>
        </FullRow>
      )}

      {geoArr.fields.map((row, i) => (
        <FullRow key={row.id}>
          <div
            className="cn-form-row"
            style={{ '--cols': '1fr 160px 160px 40px' } as React.CSSProperties}
          >
            <Controller
              name={`geography_action.${i}.region` as const}
              control={control}
              render={({ field }) => (
                <AutocompleteField
                  label="Região"
                  value={field.value ?? ''}
                  onChange={(v) => field.onChange(v)}
                  placeholder="Ex.: Milão"
                  error={errors.geography_action?.[i]?.region?.message}
                  suggestions={suggestions.region}
                />
              )}
            />
            <Controller
              name={`geography_action.${i}.scope` as const}
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Escopo"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                >
                  <option value="">—</option>
                  <option value="cidade">Cidade</option>
                  <option value="estado">Estado</option>
                  <option value="pais">País</option>
                  <option value="continente">Continente</option>
                  <option value="global">Global</option>
                </SelectField>
              )}
            />
            <Controller
              name={`geography_action.${i}.context` as const}
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Contexto"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                >
                  <option value="">—</option>
                  <option value="mora">Mora</option>
                  <option value="atua">Atua</option>
                  <option value="tem_negocio">Tem negócio</option>
                  <option value="tem_familia">Tem família</option>
                  <option value="outro">Outro</option>
                </SelectField>
              )}
            />
            <FieldShell label=" ">
              <div
                style={{
                  height: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  type="button"
                  onClick={() => geoArr.remove(i)}
                  aria-label="Remover região"
                  className="cn-icon-btn-danger"
                >
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              </div>
            </FieldShell>
          </div>
        </FullRow>
      ))}

      <FullRow>
        <button
          type="button"
          onClick={() =>
            geoArr.append({
              region: '',
              scope: null,
              context: null,
            })
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            border: '1px solid var(--bf-border-strong)',
            borderRadius: 9999,
            background: 'transparent',
            color: 'var(--bf-text-primary)',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} strokeWidth={1.5} />
          Adicionar região
        </button>
      </FullRow>
    </SectionShell>
  )
}
