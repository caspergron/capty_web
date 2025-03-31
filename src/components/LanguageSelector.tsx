import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };
  
  // Find current language
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-md text-primary-lighter hover:text-white focus:outline-none"
        aria-expanded={isOpen}
      >
        <Globe className="h-5 w-5" />
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
        <span className="inline sm:hidden">{currentLanguage.flag}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  i18n.language === language.code ? 'bg-primary-lightest text-primary font-medium' : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <span className="mr-2">{language.flag}</span>
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;