import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export interface HierarchyWarning {
  type: 'tv_count_reduction' | 'member_removal' | 'site_removal';
  title: string;
  message: string;
  affectedItems: {
    id: string;
    label: string;
    description?: string;
  }[];
}

interface HierarchyWarningModalProps {
  warning: HierarchyWarning | null;
  onConfirm: (selectedItemsToRemove?: string[]) => void;
  onCancel: () => void;
}

export function HierarchyWarningModal({
  warning,
  onConfirm,
  onCancel
}: HierarchyWarningModalProps) {
  if (!warning) return null;

  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(
    new Set(warning.affectedItems.map(item => item.id))
  );

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedItems));
  };

  return (
    <AnimatePresence>
      {warning && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {warning.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {warning.message}
                  </p>
                </div>
                <button
                  onClick={onCancel}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Affected Items */}
              {warning.affectedItems.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    The following will be affected:
                  </p>
                  <div className="space-y-2">
                    {warning.affectedItems.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => handleToggleItem(item.id)}
                          className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={onCancel}
                  className="text-sm"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleConfirm}
                  className="text-sm"
                >
                  Continue
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

