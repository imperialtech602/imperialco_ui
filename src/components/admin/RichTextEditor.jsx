import { useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Underline,
} from 'lucide-react'
import { sanitizeRichText, toEditorHtml } from '@/lib/richText'

const TOOLS = [
  { command: 'bold', icon: Bold, label: 'Bold' },
  { command: 'italic', icon: Italic, label: 'Italic' },
  { command: 'underline', icon: Underline, label: 'Underline' },
  { command: 'formatBlock', arg: 'h2', icon: Heading2, label: 'Heading' },
  { command: 'formatBlock', arg: 'h3', icon: Heading3, label: 'Subheading' },
  { command: 'formatBlock', arg: 'p', icon: Pilcrow, label: 'Paragraph' },
  { command: 'insertUnorderedList', icon: List, label: 'Bullet list' },
  { command: 'insertOrderedList', icon: ListOrdered, label: 'Numbered list' },
]

function publish(editor, onChange) {
  const html = sanitizeRichText(editor.innerHTML)
  editor.dataset.empty = editor.textContent.trim() ? 'false' : 'true'
  onChange(html)
}

function runCommand(editor, onChange, command, arg) {
  editor.focus()
  if (command === 'formatBlock') {
    document.execCommand('formatBlock', false, arg)
    if (String(document.queryCommandValue('formatBlock')).toLowerCase() !== arg) {
      document.execCommand('formatBlock', false, `<${arg}>`)
    }
  } else {
    document.execCommand(command, false, arg)
  }
  publish(editor, onChange)
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null)
  const initialHtml = useRef(value)

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return
    editor.innerHTML = toEditorHtml(initialHtml.current)
    editor.dataset.empty = editor.textContent.trim() ? 'false' : 'true'
  }, [])

  const onLink = async () => {
    const editor = editorRef.current
    if (!editor) return
    const selection = window.getSelection()
    const range = selection && selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null
    const { value: href } = await Swal.fire({
      title: 'Add link',
      input: 'text',
      inputPlaceholder: 'https:// or /request-quote',
      showCancelButton: true,
      confirmButtonColor: '#282a74',
      confirmButtonText: 'Add link',
    })
    if (!href) return
    editor.focus()
    if (range) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
    document.execCommand('createLink', false, href.trim())
    publish(editor, onChange)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand/10 bg-white focus-within:border-brand/30 focus-within:ring-2 focus-within:ring-brand/15">
      <div className="flex flex-wrap gap-1 border-b border-brand/8 bg-brand-muted/50 p-2">
        {TOOLS.map((tool) => (
          <button
            key={`${tool.command}-${tool.arg || tool.label}`}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-brand hover:bg-white"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => runCommand(editorRef.current, onChange, tool.command, tool.arg)}
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
        <button
          type="button"
          title="Link"
          aria-label="Link"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-brand hover:bg-white"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onLink}
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={editorRef}
        className="rich-text min-h-[180px] px-3 py-3 text-sm leading-relaxed text-ink outline-none"
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label="Main section content"
        data-placeholder={placeholder || 'Write the section. Use the toolbar for headings, lists, and links.'}
        onInput={(event) => publish(event.currentTarget, onChange)}
        suppressContentEditableWarning
      />
    </div>
  )
}
