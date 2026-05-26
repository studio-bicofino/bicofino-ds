'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { PersonFormInput } from '@/lib/db/schemas'
import { SectionShell, FullRow } from './SectionShell'
import { TextField } from '../Field'

type Props = {
  control: Control<PersonFormInput>
  errors: FieldErrors<PersonFormInput>
}

export function IdentitySection({ control, errors }: Props) {
  return (
    <SectionShell
      eyebrow="01 · Identidade"
      title="Como esta pessoa é conhecida"
      subtitle="Nome completo + apelido pelo qual costumamos chamá-la. Foto por enquanto via URL — bucket de upload virá depois."
    >
      <Controller
        name="full_name"
        control={control}
        render={({ field }) => {
          const filled = !!(field.value && field.value.trim().length > 0)
          return (
            <TextField
              id="full_name"
              label={
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Nome completo *
                  <AnimatePresence initial={false}>
                    {filled && (
                      <motion.span
                        key="ok"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 14,
                          height: 14,
                          borderRadius: 9999,
                          background: 'var(--bf-cn-sep)',
                          color: '#fff',
                        }}
                        aria-hidden
                      >
                        <Check size={10} strokeWidth={3} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              }
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              placeholder="Ex.: Fabio Wolff"
              error={errors.full_name?.message}
              autoComplete="off"
            />
          )
        }}
      />

      <Controller
        name="preferred_name"
        control={control}
        render={({ field }) => (
          <TextField
            id="preferred_name"
            label="Como chamamos"
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value || null)}
            onBlur={field.onBlur}
            placeholder="Apelido / forma de tratamento"
            error={errors.preferred_name?.message}
          />
        )}
      />

      <FullRow>
        <Controller
          name="photo_url"
          control={control}
          render={({ field }) => (
            <TextField
              id="photo_url"
              label="URL da foto"
              type="url"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || null)}
              onBlur={field.onBlur}
              placeholder="https://… (cole o link de uma foto pública)"
              hint="Por enquanto cole uma URL pública. Upload direto pra Supabase Storage virá em breve."
              error={errors.photo_url?.message}
            />
          )}
        />
      </FullRow>

      <Controller
        name="current_company"
        control={control}
        render={({ field }) => (
          <TextField
            id="current_company"
            label="Empresa atual"
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value || null)}
            onBlur={field.onBlur}
            placeholder="Ex.: Bicofino"
            error={errors.current_company?.message}
          />
        )}
      />

      <Controller
        name="current_title"
        control={control}
        render={({ field }) => (
          <TextField
            id="current_title"
            label="Cargo atual"
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value || null)}
            onBlur={field.onBlur}
            placeholder="Ex.: Sócio fundador"
            error={errors.current_title?.message}
          />
        )}
      />

      <FullRow>
        <Controller
          name="expertise_area"
          control={control}
          render={({ field }) => (
            <TextField
              id="expertise_area"
              label="Área de expertise"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || null)}
              onBlur={field.onBlur}
              placeholder="Ex.: Wealth management, Futebol, Direito M&A…"
              error={errors.expertise_area?.message}
            />
          )}
        />
      </FullRow>
    </SectionShell>
  )
}
