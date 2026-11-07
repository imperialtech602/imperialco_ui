import { useEffect, useMemo, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Swal from 'sweetalert2'
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createProduct, updateProduct } from '@/api/products'
import { fieldClass, formatFilterLabel, labelClass } from '@/components/admin/adminUi'
import {
  PRODUCT_STEPS,
  productInitialValues,
  productStepSchema,
} from '@/lib/productValidation'

const fieldErrorClass =
  'h-11 w-full rounded-xl border border-red-300 bg-red-50/50 px-3 text-sm text-ink outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200'
const errorClass = 'mt-1.5 text-xs font-semibold text-red-600'

function TextField({ name, label, required, type = 'text', className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      <Field name={name}>
        {({ field, meta, form }) => (
          <input
            {...field}
            type={type}
            value={field.value ?? ''}
            onChange={(e) => {
              const value =
                type === 'number' ? Number(e.target.value) : e.target.value
              form.setFieldValue(name, value)
            }}
            className={meta.touched && meta.error ? fieldErrorClass : fieldClass}
          />
        )}
      </Field>
      <ErrorMessage name={name} component="p" className={errorClass} />
    </label>
  )
}

function SelectField({ name, label, required, options }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      <Field name={name}>
        {({ field, meta }) => (
          <select
            {...field}
            className={meta.touched && meta.error ? fieldErrorClass : fieldClass}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {formatFilterLabel(option)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className={errorClass} />
    </label>
  )
}

function Stepper({ step }) {
  return (
    <ol className="mt-5 flex items-start justify-between gap-1">
      {PRODUCT_STEPS.map((item, index) => {
        const active = index === step
        const done = index < step
        return (
          <li key={item.id} className="flex min-w-0 flex-1 flex-col items-center text-center">
            <div
              className={[
                'inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold sm:h-9 sm:w-9 sm:text-sm',
                done || active
                  ? 'bg-brand text-white shadow-sm shadow-brand/20'
                  : 'bg-brand-muted text-slate-soft',
                active ? 'ring-4 ring-brand/15' : '',
              ].join(' ')}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
            </div>
            <p
              className={[
                'mt-2 text-[10px] font-bold sm:text-xs',
                active || done ? 'text-brand' : 'text-slate-soft',
              ].join(' ')}
            >
              {item.title}
            </p>
            <p className="mt-0.5 hidden text-[10px] text-slate-soft sm:block">
              {item.subtitle}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

export default function ProductEditorModal({
  open,
  editingId,
  initialValues,
  onClose,
  onSaved,
}) {
  const [step, setStep] = useState(0)
  const schema = useMemo(() => productStepSchema(step), [step])

  useEffect(() => {
    if (open) setStep(0)
  }, [open, editingId])

  if (!open) return null

  const values = {
    ...productInitialValues,
    ...initialValues,
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 backdrop-blur-[2px] sm:items-center">
      <div className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl shadow-brand/20 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-soft">
              Catalog
            </p>
            <h3 className="mt-1 text-xl font-extrabold text-brand">
              {editingId ? 'Edit product' : 'Add product'}
            </h3>
            <p className="mt-1 text-sm text-slate-body">
              Item ID is unique. Excel import updates matching item ids.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep(0)
              onClose()
            }}
            className="rounded-full p-2 text-slate-soft hover:bg-brand-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Stepper step={step} />

        <Formik
          key={`${editingId || 'new'}-${open}`}
          initialValues={values}
          enableReinitialize
          validationSchema={schema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (formValues, helpers) => {
            try {
              if (editingId) await updateProduct(editingId, formValues)
              else await createProduct(formValues)
              helpers.resetForm()
              setStep(0)
              onClose()
              await Swal.fire({
                icon: 'success',
                title: editingId ? 'Product updated' : 'Product created',
                confirmButtonColor: '#282a74',
              })
              onSaved?.()
            } catch (err) {
              await Swal.fire({
                icon: 'error',
                title: 'Save failed',
                text: err.message || 'Unable to save product',
                confirmButtonColor: '#282a74',
              })
            } finally {
              helpers.setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, validateForm, setTouched, submitForm }) => {
            const goNext = async () => {
              const formErrors = await validateForm()
              if (Object.keys(formErrors).length) {
                setTouched(
                  Object.keys(formErrors).reduce((acc, key) => {
                    acc[key] = true
                    return acc
                  }, {}),
                )
                await Swal.fire({
                  icon: 'warning',
                  title: 'Required fields missing',
                  text: 'Please complete all required fields before continuing.',
                  confirmButtonColor: '#282a74',
                })
                return
              }
              setStep((prev) => Math.min(prev + 1, PRODUCT_STEPS.length - 1))
            }

            return (
              <Form className="mt-6">
                {step === 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField name="itemId" label="Item ID" required />
                    <div className="sm:col-span-2">
                      <TextField name="itemName" label="Item name" required />
                    </div>
                    <TextField name="itemType" label="Item type" required />
                    <SelectField
                      name="status"
                      label="Status"
                      required
                      options={['active', 'inactive', 'discontinued']}
                    />
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField name="salesDescription" label="Sales description" />
                    <TextField
                      name="salesRate"
                      label="Sales rate"
                      type="number"
                      required
                    />
                    <TextField
                      name="purchaseDescription"
                      label="Purchase description"
                    />
                    <TextField
                      name="purchaseRate"
                      label="Purchase rate"
                      type="number"
                      required
                    />
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField name="brandName" label="Brand name" required />
                    <TextField name="generic" label="Generic" required />
                    <TextField name="strength" label="Strength" required />
                    <TextField name="packSize" label="Pack size" required />
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField name="dosageForm" label="Dosage form" required />
                    <TextField
                      name="countryOfOrigin"
                      label="Country of origin"
                      required
                    />
                    <TextField name="sourceCode" label="Source code" required />
                    <TextField
                      name="therapeuticClass"
                      label="Therapeutic class"
                      required
                    />
                    <div className="sm:col-span-2">
                      <TextField name="manufacturer" label="Manufacturer" required />
                    </div>
                  </div>
                ) : null}

                <div className="mt-7 flex flex-col-reverse gap-2 border-t border-brand/8 pt-5 sm:flex-row sm:justify-between">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setStep(0)
                        onClose()
                      }}
                    >
                      Cancel
                    </Button>
                    {step > 0 ? (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                    ) : null}
                  </div>

                  {step < PRODUCT_STEPS.length - 1 ? (
                    <Button type="button" onClick={goNext}>
                      Continue
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        const formErrors = await validateForm()
                        if (Object.keys(formErrors).length) {
                          setTouched(
                            Object.keys(formErrors).reduce((acc, key) => {
                              acc[key] = true
                              return acc
                            }, {}),
                          )
                          await Swal.fire({
                            icon: 'warning',
                            title: 'Required fields missing',
                            text: 'Please complete all required fields before saving.',
                            confirmButtonColor: '#282a74',
                          })
                          return
                        }
                        submitForm()
                      }}
                    >
                      {isSubmitting
                        ? 'Saving…'
                        : editingId
                          ? 'Save changes'
                          : 'Save product'}
                    </Button>
                  )}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
