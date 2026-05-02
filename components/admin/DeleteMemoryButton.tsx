"use client"
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteMemory } from '@/actions/memory-actions'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function DeleteMemoryButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteMemory(id)
      if (result.success) {
        toast.success("Memory deleted successfully")
        setIsOpen(false)
        router.refresh()
      } else {
        throw new Error(result.error?.message || "Failed to delete memory")
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
      console.error("Delete failed:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-xl transition-all active:scale-95"
        title="Delete Memory"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <DeleteConfirmationModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Are you sure?"
        message="This memory will be permanently deleted and cannot be recovered."
      />
    </>
  )
}
