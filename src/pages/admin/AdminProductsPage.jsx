import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, Plus, Upload, Pencil, Trash2, Package } from 'lucide-react'
import Swal from 'sweetalert2'
import {
  deleteProduct,
  downloadProductTemplate,
  fetchAdminProducts,
  fetchProductMeta,
  importProductsExcel,
} from '@/api/products'
import Button from '@/components/ui/Button'
import ProductEditorModal from '@/components/admin/ProductEditorModal'
import useDebouncedValue from '@/hooks/useDebouncedValue'
import {
  CountryPill,
  EmptyState,
  FilterPreviewPills,
  FilterSelect,
  PageHero,
  Pagination,
  Panel,
  SearchField,
  StatusPill,
  uniqueFilterOptions,
} from '@/components/admin/adminUi'
import { productInitialValues } from '@/lib/productValidation'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [filters, setFilters] = useState({
    q: '',
    status: 'all',
    countryOfOrigin: 'all',
    dosageForm: 'all',
    therapeuticClass: 'all',
    manufacturer: 'all',
    sourceCode: 'all',
    page: 1,
  })
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, 400)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editorValues, setEditorValues] = useState(productInitialValues)
  const [importing, setImporting] = useState(false)
  const skipDebounceLoad = useRef(true)

  const load = async (next = filters) => {
    setLoading(true)
    setError('')
    try {
      const [listRes, metaRes] = await Promise.all([
        fetchAdminProducts({ ...next, limit: 20 }),
        fetchProductMeta(),
      ])
      setProducts(listRes.data.items)
      setPagination(listRes.data.pagination)
      setMeta(metaRes.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = (patch = {}) => {
    const next = { ...filters, ...patch, page: patch.page || 1 }
    setFilters(next)
    load(next)
  }

  useEffect(() => {
    document.title = 'Products | Admin | Imperial Co'
    load()
  }, [])

  useEffect(() => {
    if (skipDebounceLoad.current) {
      skipDebounceLoad.current = false
      return
    }
    applyFilters({ q: debouncedSearch })
  }, [debouncedSearch])

  const filterOptions = useMemo(
    () => ({
      countries: uniqueFilterOptions(meta?.countries || [], ['all']),
      dosageForms: uniqueFilterOptions(meta?.dosageForms || [], ['all']),
      therapeuticClasses: uniqueFilterOptions(meta?.therapeuticClasses || [], ['all']),
      manufacturers: uniqueFilterOptions(meta?.manufacturers || [], ['all']),
      sourceCodes: uniqueFilterOptions(meta?.sourceCodes || [], ['all']),
    }),
    [meta],
  )

  const openCreate = () => {
    setEditingId(null)
    setEditorValues(productInitialValues)
    setEditorOpen(true)
  }

  const openEdit = (product) => {
    setEditingId(product.id)
    setEditorValues({
      itemId: product.itemId || '',
      itemName: product.itemName || product.name || '',
      itemType: product.itemType || 'inventory',
      status: product.status || 'active',
      salesDescription: product.salesDescription || '',
      salesRate: product.salesRate || 0,
      purchaseDescription: product.purchaseDescription || '',
      purchaseRate: product.purchaseRate || 0,
      brandName: product.brandName || '',
      generic: product.generic || '',
      strength: product.strength || '',
      packSize: product.packSize || '',
      dosageForm: product.dosageForm || '',
      countryOfOrigin: product.countryOfOrigin || product.country || '',
      sourceCode: product.sourceCode || '',
      therapeuticClass: product.therapeuticClass || '',
      manufacturer: product.manufacturer || '',
    })
    setEditorOpen(true)
  }

  const onDelete = async (product) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete product?',
      text: `Delete ${product.itemName || product.name}?`,
      showCancelButton: true,
      confirmButtonColor: '#282a74',
      cancelButtonColor: '#7a7d96',
      confirmButtonText: 'Delete',
    })
    if (!result.isConfirmed) return
    try {
      await deleteProduct(product.id)
      setMessage('Product deleted')
      await Swal.fire({
        icon: 'success',
        title: 'Product deleted',
        confirmButtonColor: '#282a74',
        timer: 1600,
        showConfirmButton: false,
      })
      await load(filters)
    } catch (err) {
      setError(err.message)
      await Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: err.message,
        confirmButtonColor: '#282a74',
      })
    }
  }

  const onImport = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setImporting(true)
    setMessage('')
    setError('')
    try {
      const result = await importProductsExcel(file)
      setMessage(
        `Import complete: ${result.data.created} created, ${result.data.updated} updated` +
          (result.data.errors?.length ? ` (${result.data.errors.length} warnings)` : ''),
      )
      await load({ ...filters, page: 1 })
    } catch (err) {
      setError(err.message)
    } finally {
      setImporting(false)
    }
  }

  const onDownloadTemplate = async () => {
    try {
      const blob = await downloadProductTemplate()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'imperial-products-template.xlsx'
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-5">
      <PageHero
        eyebrow="Catalog inventory"
        title="Products"
        description="Add, search, filter, and import products. Excel rows upsert by item id."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={onDownloadTemplate}>
              <Download className="h-4 w-4" />
              Template
            </Button>
            <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-brand/15 bg-white px-4 text-sm font-semibold text-brand transition hover:bg-brand-muted">
              <Upload className="h-4 w-4" />
              {importing ? 'Importing…' : 'Import Excel'}
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="sr-only"
                onChange={onImport}
              />
            </label>
            <Button size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add product
            </Button>
          </>
        }
      />

      {message ? (
        <p className="rounded-2xl bg-mint px-4 py-3 text-sm text-mint-text">{message}</p>
      ) : null}
      {error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <Panel>
        <SearchField
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={(q) => {
            setSearchInput(q)
            applyFilters({ q })
          }}
          placeholder="Search item id, name, brand, generic, manufacturer…"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <FilterSelect
            label="Status"
            value={filters.status}
            options={['all', 'active', 'inactive', 'discontinued']}
            onChange={(status) => applyFilters({ status })}
          />
          <FilterSelect
            label="Country"
            value={filters.countryOfOrigin}
            options={['all', ...filterOptions.countries]}
            onChange={(countryOfOrigin) => applyFilters({ countryOfOrigin })}
          />
          <FilterSelect
            label="Dosage form"
            value={filters.dosageForm}
            options={['all', ...filterOptions.dosageForms]}
            onChange={(dosageForm) => applyFilters({ dosageForm })}
          />
          <FilterSelect
            label="Therapeutic class"
            value={filters.therapeuticClass}
            options={['all', ...filterOptions.therapeuticClasses]}
            onChange={(therapeuticClass) => applyFilters({ therapeuticClass })}
          />
          <FilterSelect
            label="Manufacturer"
            value={filters.manufacturer}
            options={['all', ...filterOptions.manufacturers]}
            onChange={(manufacturer) => applyFilters({ manufacturer })}
          />
          <FilterSelect
            label="Source code"
            value={filters.sourceCode}
            options={['all', ...filterOptions.sourceCodes]}
            onChange={(sourceCode) => applyFilters({ sourceCode })}
          />
        </div>

        <div className="mt-4">
          <FilterPreviewPills
            items={[
              {
                label: 'Country',
                value: filters.countryOfOrigin,
                hidden: filters.countryOfOrigin === 'all',
                onClear: () => applyFilters({ countryOfOrigin: 'all' }),
              },
              {
                label: 'Drug Form',
                value: filters.dosageForm,
                hidden: filters.dosageForm === 'all',
                onClear: () => applyFilters({ dosageForm: 'all' }),
              },
            ]}
          />
        </div>
      </Panel>

      {loading ? (
        <Panel>
          <p className="py-10 text-center text-sm text-slate-body">Loading products…</p>
        </Panel>
      ) : products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products yet"
          description="Add your first product manually or import the Excel template."
          action={
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add product
            </Button>
          }
        />
      ) : (
        <Panel padded={false} className="overflow-hidden">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_0.7fr_auto] gap-4 border-b border-brand/8 bg-brand-muted/50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-soft md:grid">
            <span>Product</span>
            <span>Brand / Generic</span>
            <span>Form / Origin</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <ul className="divide-y divide-brand/8">
            {products.map((product) => (
              <li
                key={product.id}
                className="grid gap-3 px-4 py-4 md:grid-cols-[1.5fr_1fr_1fr_0.7fr_auto] md:items-center md:gap-4 md:px-5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold leading-snug text-brand">
                      {product.itemName}
                    </p>
                    <StatusPill value={product.status} size="sm" />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-soft">
                    {product.itemId}
                    {product.manufacturer ? ` · ${product.manufacturer}` : ''}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {product.itemType ? (
                      <StatusPill value={product.itemType} size="sm" />
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-soft md:hidden">
                    Sale {product.salesRate} · Buy {product.purchaseRate}
                  </p>
                </div>
                <div className="text-sm text-slate-body">
                  <p className="font-medium">{product.brandName || '—'}</p>
                  <p className="text-xs text-slate-soft">{product.generic || '—'}</p>
                </div>
                <div className="text-sm text-slate-body">
                  <p>{product.dosageForm || '—'}</p>
                  <div className="mt-1.5">
                    <CountryPill
                      value={product.countryOfOrigin || product.country}
                      size="sm"
                    />
                  </div>
                </div>
                <div>
                  <StatusPill value={product.status} />
                  <p className="mt-1.5 hidden text-xs text-slate-soft md:block">
                    Sale {product.salesRate} · Buy {product.purchaseRate}
                  </p>
                </div>
                <div className="flex gap-2 md:justify-end">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-muted text-brand transition hover:bg-brand-soft"
                    onClick={() => openEdit(product)}
                    aria-label="Edit product"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                    onClick={() => onDelete(product)}
                    aria-label="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        label={pagination.total === 1 ? 'product' : 'products'}
        onChange={(page) => applyFilters({ page })}
      />

      <ProductEditorModal
        open={editorOpen}
        editingId={editingId}
        initialValues={editorValues}
        onClose={() => setEditorOpen(false)}
        onSaved={async () => {
          setMessage(editingId ? 'Product updated' : 'Product created')
          await load({ ...filters, page: 1 })
        }}
      />
    </div>
  )
}
