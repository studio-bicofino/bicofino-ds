'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { useFieldArray, Controller } from 'react-hook-form'
import { Trash2, Plus } from 'lucide-react'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { TextField, TextAreaField, FieldShell, fieldInputBaseStyle } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

export function HistorySection({ control, errors }: Props) {
  const work = useFieldArray({ control, name: 'work_history' })
  const bicofino = useFieldArray({ control, name: 'bicofino_history' })

  return (
    <SectionShell
      eyebrow="04 · Histórico"
      title="Trajetória profissional & passagens"
      subtitle="Onde já passou (work_history) + projetos com Bicofino (bicofino_history)."
      gridStyle={{ gridTemplateColumns: '1fr', gap: 24 }}
    >
      <FullRow>
        <SubBlockHeader title="Trajetória profissional" />
      </FullRow>

      {work.fields.length === 0 && (
        <FullRow>
          <EmptyHint>Nenhuma passagem registrada.</EmptyHint>
        </FullRow>
      )}

      {work.fields.map((row, i) => (
        <FullRow key={row.id}>
          <div
            className="cn-form-row"
            style={{ '--cols': '1fr 1fr 100px 100px 40px' } as React.CSSProperties}
          >
            <Controller
              name={`work_history.${i}.company` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Empresa"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Ex.: BTG Pactual"
                  error={errors.work_history?.[i]?.company?.message}
                />
              )}
            />
            <Controller
              name={`work_history.${i}.role` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Cargo"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="Ex.: Head of Wealth"
                />
              )}
            />
            <Controller
              name={`work_history.${i}.start_year` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Início"
                  type="number"
                  inputMode="numeric"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? null : Number(e.target.value))
                  }
                  placeholder="2010"
                />
              )}
            />
            <Controller
              name={`work_history.${i}.end_year` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Fim"
                  type="number"
                  inputMode="numeric"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? null : Number(e.target.value))
                  }
                  placeholder="atual"
                />
              )}
            />
            <RemoveButton onClick={() => work.remove(i)} />
          </div>
          <div style={{ marginTop: 8 }}>
            <Controller
              name={`work_history.${i}.notes` as const}
              control={control}
              render={({ field }) => (
                <TextAreaField
                  label="Notas"
                  rows={2}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="Contexto, motivo de saída, projetos relevantes…"
                />
              )}
            />
          </div>
        </FullRow>
      ))}

      <FullRow>
        <AddButton
          label="Adicionar passagem"
          onClick={() =>
            work.append({
              company: '',
              role: null,
              start_year: null,
              end_year: null,
              notes: null,
            })
          }
        />
      </FullRow>

      <FullRow>
        <hr style={{ border: 'none', borderTop: '1px solid var(--bf-border)' }} />
      </FullRow>

      <FullRow>
        <SubBlockHeader title="Histórico com Bicofino" />
      </FullRow>

      {bicofino.fields.length === 0 && (
        <FullRow>
          <EmptyHint>Nenhum projeto Bicofino registrado.</EmptyHint>
        </FullRow>
      )}

      {bicofino.fields.map((row, i) => (
        <FullRow key={row.id}>
          <div
            className="cn-form-row"
            style={{ '--cols': '1fr 1fr 100px 40px' } as React.CSSProperties}
          >
            <Controller
              name={`bicofino_history.${i}.project` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Projeto"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Ex.: Vanguarda Italia 2027"
                  error={errors.bicofino_history?.[i]?.project?.message}
                />
              )}
            />
            <Controller
              name={`bicofino_history.${i}.role` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Papel"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="Ex.: Curador"
                />
              )}
            />
            <Controller
              name={`bicofino_history.${i}.year` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Ano"
                  type="number"
                  inputMode="numeric"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? null : Number(e.target.value))
                  }
                  placeholder="2026"
                />
              )}
            />
            <RemoveButton onClick={() => bicofino.remove(i)} />
          </div>
          <div style={{ marginTop: 8 }}>
            <Controller
              name={`bicofino_history.${i}.outcome` as const}
              control={control}
              render={({ field }) => (
                <TextAreaField
                  label="Desfecho"
                  rows={2}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="O que rolou? Aprendizados, próximos passos…"
                />
              )}
            />
          </div>
        </FullRow>
      ))}

      <FullRow>
        <AddButton
          label="Adicionar projeto Bicofino"
          onClick={() =>
            bicofino.append({
              project: '',
              year: null,
              role: null,
              outcome: null,
            })
          }
        />
      </FullRow>
    </SectionShell>
  )
}

function SubBlockHeader({ title }: { title: string }) {
  return (
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
      {title}
    </h3>
  )
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
      {label}
    </button>
  )
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <FieldShell label=" ">
      <button
        type="button"
        onClick={onClick}
        aria-label="Remover"
        style={{
          ...fieldInputBaseStyle,
          height: 44,
          width: 44,
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--bf-ops-danger)',
          background: 'var(--bf-surface)',
        }}
      >
        <Trash2 size={18} strokeWidth={1.5} />
      </button>
    </FieldShell>
  )
}
