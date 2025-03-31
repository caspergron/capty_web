import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotificationModal from './NotificationModal';

function BetaAnnouncement() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-accent/90 text-white py-3 px-6 text-center shadow-md backdrop-blur-sm">
        <p className="text-sm font-medium">
          🚀 <span className="font-bold">{t('beta.attention')}</span> {t('beta.sampleData')} 
          {t('beta.standBy')} <span className="font-bold">{t('beta.releaseDate')}</span>.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-2 px-4 py-1.5 bg-white text-primary text-sm font-semibold rounded-full hover:bg-primary-lightest transition-colors duration-200 flex items-center mx-auto"
        >
          <Bell className="h-4 w-4 mr-2" />
          {t('beta.notifyButton')}
        </button>
      </div>

      <NotificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default BetaAnnouncement;