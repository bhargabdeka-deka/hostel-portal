"use client"
import { Trash2 } from 'lucide-react';
import { deleteAlumni } from '@/actions/admin-actions';
import { useState } from 'react';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function DeleteAlumniButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAlumni(id);
      if (result.success) {
        toast.success("Registration deleted successfully");
        setIsOpen(false);
        router.refresh();
      } else {
        throw new Error("Failed to delete registration");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete registration. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-500/20 group/del disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        title="Delete Registration"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <DeleteConfirmationModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Are you sure?"
        message="This registration will be permanently deleted and cannot be recovered."
      />
    </>
  );
}
