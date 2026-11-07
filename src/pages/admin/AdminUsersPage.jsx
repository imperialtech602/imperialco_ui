import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import { createUser, deleteUser, fetchUsers, updateUser } from '@/api/users'
import Button from '@/components/ui/Button'
import {
  EmptyState,
  PageHero,
  Panel,
  StatusPill,
  fieldClass,
  labelClass,
} from '@/components/admin/adminUi'

const EMPTY = {
  name: '',
  email: '',
  password: '',
  role: 'admin',
  isActive: true,
  permissions: {
    products: false,
    orders: false,
    knowledgeHub: false,
  },
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchUsers()
      setUsers(res.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Users | Admin | Imperial Co'
    load()
  }, [])

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY)
    setEditorOpen(true)
  }

  const openEdit = (user) => {
    setEditingId(user.id)
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'admin',
      isActive: user.isActive !== false,
      permissions: {
        products: Boolean(user.permissions?.products),
        orders: Boolean(user.permissions?.orders),
        knowledgeHub: Boolean(user.permissions?.knowledgeHub),
      },
    })
    setEditorOpen(true)
  }

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    if (name.startsWith('perm.')) {
      const key = name.replace('perm.', '')
      setForm((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, [key]: checked },
      }))
      return
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onSave = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
        isActive: form.isActive,
        permissions: form.permissions,
      }
      if (form.password) payload.password = form.password
      if (!editingId) {
        if (!form.password) throw new Error('Password is required for new users')
        payload.password = form.password
        await createUser(payload)
      } else {
        await updateUser(editingId, payload)
      }
      setEditorOpen(false)
      await Swal.fire({
        icon: 'success',
        title: editingId ? 'User updated' : 'User created',
        confirmButtonColor: '#282a74',
        timer: 1400,
        showConfirmButton: false,
      })
      await load()
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Save failed',
        text: err.message,
        confirmButtonColor: '#282a74',
      })
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (user) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete user?',
      text: `Delete ${user.name} (${user.email})?`,
      showCancelButton: true,
      confirmButtonColor: '#282a74',
      confirmButtonText: 'Delete',
    })
    if (!result.isConfirmed) return
    try {
      await deleteUser(user.id)
      await load()
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: err.message,
        confirmButtonColor: '#282a74',
      })
    }
  }

  return (
    <div className="space-y-5">
      <PageHero
        eyebrow="Access control"
        title="Users"
        description="Create team members and grant Products, Orders, or Knowledge Hub access."
        actions={
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add user
          </Button>
        }
      />

      {error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {loading ? (
        <Panel>
          <p className="py-10 text-center text-sm text-slate-body">Loading users…</p>
        </Panel>
      ) : users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users yet"
          description="Add your first team member."
          action={
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add user
            </Button>
          }
        />
      ) : (
        <Panel padded={false} className="overflow-hidden">
          <ul className="divide-y divide-brand/8">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-brand">{user.name}</p>
                    <StatusPill value={user.role} size="sm" />
                    {!user.isActive ? <StatusPill value="inactive" size="sm" /> : null}
                  </div>
                  <p className="mt-1 text-xs text-slate-soft">{user.email}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {user.permissions?.products ? (
                      <span className="rounded-full bg-brand-muted px-2.5 py-1 text-[11px] font-bold text-brand">
                        Products
                      </span>
                    ) : null}
                    {user.permissions?.orders ? (
                      <span className="rounded-full bg-brand-muted px-2.5 py-1 text-[11px] font-bold text-brand">
                        Orders
                      </span>
                    ) : null}
                    {user.permissions?.knowledgeHub ? (
                      <span className="rounded-full bg-brand-muted px-2.5 py-1 text-[11px] font-bold text-brand">
                        Knowledge Hub
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-muted text-brand"
                    onClick={() => openEdit(user)}
                    aria-label="Edit user"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600"
                    onClick={() => onDelete(user)}
                    aria-label="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {editorOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 backdrop-blur-[2px] sm:items-center">
          <form
            onSubmit={onSave}
            className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl sm:p-7"
          >
            <h3 className="text-xl font-extrabold text-brand">
              {editingId ? 'Edit user' : 'Add user'}
            </h3>
            <div className="mt-5 grid gap-4">
              <label>
                <span className={labelClass}>Name</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className={fieldClass}
                />
              </label>
              <label>
                <span className={labelClass}>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className={fieldClass}
                />
              </label>
              <label>
                <span className={labelClass}>
                  Password{editingId ? ' (leave blank to keep)' : ''}
                </span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  className={fieldClass}
                  required={!editingId}
                />
              </label>
              <label>
                <span className={labelClass}>Role</span>
                <select
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  className={fieldClass}
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super admin</option>
                </select>
              </label>

              {form.role !== 'superadmin' ? (
                <div>
                  <p className={labelClass}>Permissions</p>
                  <div className="mt-2 space-y-2 rounded-2xl bg-brand-muted/60 p-4">
                    {[
                      ['products', 'Products'],
                      ['orders', 'Orders'],
                      ['knowledgeHub', 'Knowledge Hub'],
                    ].map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3 text-sm font-semibold text-brand">
                        <input
                          type="checkbox"
                          name={`perm.${key}`}
                          checked={Boolean(form.permissions[key])}
                          onChange={onChange}
                          className="h-4 w-4 accent-brand"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="rounded-xl bg-brand-muted px-4 py-3 text-sm text-slate-body">
                  Super admins automatically have full access.
                </p>
              )}

              <label className="flex items-center gap-3 text-sm font-semibold text-brand">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={onChange}
                  className="h-4 w-4 accent-brand"
                />
                Active account
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditorOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save user'}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
