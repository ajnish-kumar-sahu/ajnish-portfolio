import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'boolean' | 'array';
  options?: string[]; // for select
  placeholder?: string;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  initialData?: any;
  onSave: (data: any) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, title, fields, initialData, onSave }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData, isOpen]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string) => {
    const arr = value.split(',').map(s => s.trim()).filter(Boolean);
    handleChange(name, arr);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>

          <div className="space-y-5">
            {fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {field.label}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    rows={4}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                  />
                )}

                {field.type === 'select' && (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="">Select...</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {field.type === 'boolean' && (
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable</span>
                  </label>
                )}

                {field.type === 'array' && (
                  <input
                    type="text"
                    value={Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : ''}
                    onChange={(e) => handleArrayChange(field.name, e.target.value)}
                    placeholder="Comma separated values (e.g. React, Node, SQL)"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(formData);
                onClose();
              }}
              className="flex-1 px-4 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
