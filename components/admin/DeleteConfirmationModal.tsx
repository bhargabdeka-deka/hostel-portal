"use client"
import { cn } from "@/lib/utils"
import { Trash2, X, AlertTriangle, Loader2 } from 'lucide-react'
import { useEffect } from 'react'

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This item will be permanently deleted and cannot be recovered.",
  isDeleting = false
}: DeleteConfirmationModalProps) {
  
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={isDeleting ? undefined : onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              {title}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {message}
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button 
              onClick={onClose}
              disabled={isDeleting}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
