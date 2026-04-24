"use client"

import { Trash2 } from 'lucide-react'
import { deleteUser } from '@/actions/users'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteUserButton({ userId, email }: { userId: string, email: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (confirm(`Are you sure you want to remove ${email} from the team?`)) {
      setIsDeleting(true)
      try {
        await deleteUser(userId)
        router.refresh()
      } catch (error) {
        alert("Failed to delete user")
        setIsDeleting(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90 disabled:opacity-50"
      title="Remove Member"
      suppressHydrationWarning
    >
      <Trash2 className={`w-5 h-5 ${isDeleting ? 'animate-pulse' : ''}`} />
    </button>
  )
}
