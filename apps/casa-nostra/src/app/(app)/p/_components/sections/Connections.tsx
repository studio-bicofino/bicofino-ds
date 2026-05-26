'use client'

import type { CSSProperties } from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import { useFieldArray, Controller, useWatch } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2, Plus } from 'lucide-react'
import type { PersonFormInput } from '@/lib/db/schemas'
import type { Group } from '@/lib/db/types'
import { SectionShell, FullRow } from './SectionShell'
import { TextField, TextAreaField, SelectField, FieldShell, fieldInputBaseStyle } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
  groups: Pick<Group, 'id' | 'name' | 'group_type'>[]
  introCandidates: Array<{ id: string; full_name: string }>
}

const subHeader: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--bf-text-primary)',
}

export function ConnectionsSection({ control, errors, groups, introCandidates }: Props) {
  const groupArr = useFieldArray({ control, name: 'groups' })
  const futebolArr = useFieldArray({ control, name: 'futebol_links' })

  const watchedGroups = useWatch({ control, name: 'groups' }) ?? []
  const selectedGroupIds = new Set(watchedGroups.map((g) => g.group_id))

  const availableGroups = groups.filter((g) => !selectedGroupIds.has(g.id))

  return (
    <SectionShell
      eyebrow="05 · Conexões"
      title="Quem aproximou e onde circula"
      subtitle="Grupos master, conexões com futebol e a pessoa que apresentou."
      gridStyle={{ gridTemplateColumns: '1fr', gap: 20 }}
    >
      <FullRow>
        <h3 style={subHeader}>Grupos</h3>
      </FullRow>

      <FullRow>
        <FieldShell label="Adicionar grupo">
          <select
            value=""
            onChange={(e) => {
              const id = e.target.value
              if (!id) return
              groupArr.append({ group_id: id, joined_year: null, notes: null })
            }}
            style={{ ...fieldInputBaseStyle, appearance: 'none', paddingRight: 36 }}
          >
            <option value="">— escolher grupo —</option>
            {availableGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} ({g.group_type})
              </option>
            ))}
          </select>
        </FieldShell>
      </FullRow>

      {groupArr.fields.length === 0 && (
        <FullRow>
          <EmptyHint>Nenhum grupo vinculado.</EmptyHint>
        </FullRow>
      )}

      <AnimatePresence initial={false}>
      {groupArr.fields.map((row, i) => {
        const groupId = watchedGroups[i]?.group_id
        const g = groups.find((x) => x.id === groupId)
        return (
          <FullRow key={row.id}>
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr 40px',
                gap: 12,
                alignItems: 'end',
                padding: 16,
                background: 'var(--bf-surface-subtle)',
                borderRadius: 12,
                border: '1px solid var(--bf-border)',
                overflow: 'hidden',
              }}
            >
              <FieldShell label="Grupo">
                <div
                  style={{
                    ...fieldInputBaseStyle,
                    background: 'var(--bf-bg-page)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {g ? `${g.name} · ${g.group_type}` : '—'}
                </div>
              </FieldShell>
              <Controller
                name={`groups.${i}.joined_year` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Ano entrada"
                    type="number"
                    inputMode="numeric"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? null : Number(e.target.value))
                    }
                  />
                )}
              />
              <Controller
                name={`groups.${i}.notes` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Notas"
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    placeholder="Cargo no grupo, anos ativos…"
                  />
                )}
              />
              <RemoveButton onClick={() => groupArr.remove(i)} />
            </motion.div>
          </FullRow>
        )
      })}
      </AnimatePresence>

      <FullRow>
        <hr style={{ border: 'none', borderTop: '1px solid var(--bf-border)' }} />
      </FullRow>

      <FullRow>
        <h3 style={subHeader}>Conexões com futebol</h3>
      </FullRow>

      {futebolArr.fields.length === 0 && (
        <FullRow>
          <EmptyHint>Nenhuma conexão futebol registrada.</EmptyHint>
        </FullRow>
      )}

      <AnimatePresence initial={false}>
      {futebolArr.fields.map((row, i) => (
        <FullRow key={row.id}>
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 1fr 40px',
              gap: 12,
              alignItems: 'end',
              padding: 16,
              background: 'var(--bf-surface-subtle)',
              borderRadius: 12,
              border: '1px solid var(--bf-border)',
            }}
          >
            <Controller
              name={`futebol_links.${i}.link_type` as const}
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Tipo"
                  value={field.value ?? 'time'}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.futebol_links?.[i]?.link_type?.message}
                >
                  <option value="time">Time</option>
                  <option value="atleta">Atleta</option>
                  <option value="estadio">Estádio</option>
                  <option value="patrocinio">Patrocínio</option>
                  <option value="entidade">Entidade</option>
                  <option value="comissao">Comissão</option>
                  <option value="outro">Outro</option>
                </SelectField>
              )}
            />
            <Controller
              name={`futebol_links.${i}.entity_name` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Entidade"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Ex.: Palmeiras"
                  error={errors.futebol_links?.[i]?.entity_name?.message}
                />
              )}
            />
            <Controller
              name={`futebol_links.${i}.relation` as const}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Relação"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="Ex.: sócio do conselho"
                />
              )}
            />
            <RemoveButton onClick={() => futebolArr.remove(i)} />
          </div>
          <div style={{ marginTop: 8 }}>
            <Controller
              name={`futebol_links.${i}.notes` as const}
              control={control}
              render={({ field }) => (
                <TextAreaField
                  label="Notas"
                  rows={2}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              )}
            />
          </div>
          </motion.div>
        </FullRow>
      ))}
      </AnimatePresence>

      <FullRow>
        <AddButton
          label="Adicionar conexão futebol"
          onClick={() =>
            futebolArr.append({
              link_type: 'time',
              entity_name: '',
              relation: null,
              notes: null,
            })
          }
        />
      </FullRow>

      <FullRow>
        <hr style={{ border: 'none', borderTop: '1px solid var(--bf-border)' }} />
      </FullRow>

      <FullRow>
        <Controller
          name="intro_by_person_id"
          control={control}
          render={({ field }) => (
            <SelectField
              id="intro_by_person_id"
              label="Apresentado por"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || null)}
              error={errors.intro_by_person_id?.message}
              hint={
                introCandidates.length === 0
                  ? 'Aparece quando há outras pessoas cadastradas na Casa.'
                  : 'Pessoa da Casa que abriu essa porta. Opcional.'
              }
            >
              <option value="">— ninguém / desconhecido —</option>
              {introCandidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                </option>
              ))}
            </SelectField>
          )}
        />
      </FullRow>
    </SectionShell>
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
