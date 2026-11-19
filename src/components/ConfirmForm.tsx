'use client'
export default function ConfirmForm({ action, message, children }: { action: (fd: FormData) => void | Promise<void>; message: string; children: React.ReactNode }) {
  return <form action={action} onSubmit={e => { if (!confirm(message)) e.preventDefault() }}>{children}</form>
}
