import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Check, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NotificationFormData, submitNotificationRequest } from '../services/notificationService';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<NotificationFormData>({
    email: '',
    name: '',
    country: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await submitNotificationRequest(formData);
      
      if (result.success) {
        setSubmitted(true);
        // Reset form after successful submission
        setFormData({
          email: '',
          name: '',
          country: ''
        });
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Failed to submit notification request');
      }
    } catch (err) {
      setError(t('notifications.errors.submitError'));
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset state when modal is closed
      setSubmitted(false);
      setError(null);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-primary">
                    {t('notifications.modal.title')}
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-500"
                    disabled={isSubmitting}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('notifications.modal.thankYou')}</h3>
                    <p className="text-gray-600">
                      {t('notifications.modal.submittedMessage')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 p-4 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('notifications.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('notifications.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('notifications.form.country')}
                      </label>
                      <input
                        type="text"
                        id="country"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="submit"
                        className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-light transition-colors duration-200 flex items-center justify-center disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            {t('notifications.form.sending')}
                          </>
                        ) : (
                          t('notifications.form.send')
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {t('notifications.form.cancel')}
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default NotificationModal;