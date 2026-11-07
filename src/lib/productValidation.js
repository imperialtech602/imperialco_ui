import * as Yup from 'yup'

export const productInitialValues = {
  itemId: '',
  itemName: '',
  itemType: 'inventory',
  status: 'active',
  salesDescription: '',
  salesRate: 0,
  purchaseDescription: '',
  purchaseRate: 0,
  brandName: '',
  generic: '',
  strength: '',
  packSize: '',
  dosageForm: '',
  countryOfOrigin: '',
  sourceCode: '',
  therapeuticClass: '',
  manufacturer: '',
}

export const PRODUCT_STEPS = [
  { id: 'basics', title: 'Basics', subtitle: 'ID & status' },
  { id: 'pricing', title: 'Pricing', subtitle: 'Sales & purchase' },
  { id: 'details', title: 'Details', subtitle: 'Brand & pack' },
  { id: 'origin', title: 'Origin', subtitle: 'Form & source' },
]

export const basicsStepSchema = Yup.object({
  itemId: Yup.string().trim().required('Item ID is required'),
  itemName: Yup.string().trim().required('Item name is required'),
  itemType: Yup.string().trim().required('Item type is required'),
  status: Yup.string()
    .oneOf(['active', 'inactive', 'discontinued'])
    .required('Status is required'),
})

export const pricingStepSchema = Yup.object({
  salesDescription: Yup.string().trim(),
  salesRate: Yup.number()
    .typeError('Sales rate must be a number')
    .min(0, 'Sales rate cannot be negative')
    .required('Sales rate is required'),
  purchaseDescription: Yup.string().trim(),
  purchaseRate: Yup.number()
    .typeError('Purchase rate must be a number')
    .min(0, 'Purchase rate cannot be negative')
    .required('Purchase rate is required'),
})

export const detailsStepSchema = Yup.object({
  brandName: Yup.string().trim().required('Brand name is required'),
  generic: Yup.string().trim().required('Generic is required'),
  strength: Yup.string().trim().required('Strength is required'),
  packSize: Yup.string().trim().required('Pack size is required'),
})

export const originStepSchema = Yup.object({
  dosageForm: Yup.string().trim().required('Dosage form is required'),
  countryOfOrigin: Yup.string().trim().required('Country of origin is required'),
  sourceCode: Yup.string().trim().required('Source code is required'),
  therapeuticClass: Yup.string().trim().required('Therapeutic class is required'),
  manufacturer: Yup.string().trim().required('Manufacturer is required'),
})

export const fullProductSchema = basicsStepSchema
  .concat(pricingStepSchema)
  .concat(detailsStepSchema)
  .concat(originStepSchema)

export function productStepSchema(step) {
  if (step === 0) return basicsStepSchema
  if (step === 1) return pricingStepSchema
  if (step === 2) return detailsStepSchema
  return fullProductSchema
}
