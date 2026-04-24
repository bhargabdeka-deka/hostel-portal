"use client"
import { Trash2 } from 'lucide-react';
import { deleteAlumni } from '@/actions/admin-actions';
import { useState } from 'react';

export default function DeleteAlumniButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this registration? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await deleteAlumni(id);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete registration. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100 group/del disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete Registration"
    >
      {isDeleting ? (
        <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
