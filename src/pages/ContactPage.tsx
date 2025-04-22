import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import BetaAnnouncement from '../components/BetaAnnouncement';
import { CheckCircle, Loader, AlertTriangle } from 'lucide-react';
import { submitContactForm } from '../services/contactService';

type ContactReason = 'feedback' | 'delete-account' | 'get-data';

interface ContactFormData {
  name: string;
  email: string;
  reason: ContactReason;
  message: string;
}

function ContactPage() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    reason: 'feedback',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null as string | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      submitting: true,
      success: false,
      error: null
    });
    
    try {
      // Include reason in the message
      const enhancedMessage = `Reason: ${formData.reason}\n\n${formData.message}`;
      
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: enhancedMessage
      });
      
      if (result.success) {
        setFormStatus({
          submitting: false,
          success: true,
          error: null
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          reason: 'feedback',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({
            ...prev,
            success: false
          }));
        }, 5000);
      } else {
        throw new Error('Failed to submit contact form');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setFormStatus({
        submitting: false,
        success: false,
        error: t('contact.errors.submissionFailed')
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary-lightest">
      <Navigation />
      <BetaAnnouncement />
      
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-primary mb-8">{t('contact.title')}</h1>
            
            {formStatus.success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-start gap-2">
                <CheckCircle className="h-6 w-6 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('contact.successMessage')}</p>
                </div>
              </div>
            )}
            
            {formStatus.error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-6 w-6 mt-0.5 flex-shrink-0" />
                <p>{formStatus.error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={formStatus.submitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={formStatus.submitting}
                />
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.reason')}
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={formStatus.submitting}
                >
                  <option value="feedback">{t('contact.form.reasons.feedback')}</option>
                  <option value="delete-account">{t('contact.form.reasons.deleteAccount')}</option>
                  <option value="get-data">{t('contact.form.reasons.getData')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={formStatus.submitting}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-light transition-colors duration-200 disabled:opacity-70"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  t('contact.form.send')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;