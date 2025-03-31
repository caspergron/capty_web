import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disc, Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  
  const { currentUser, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { name: t('navigation.features'), href: '/#features' },
    { name: t('navigation.howItWorks'), href: '/#how-it-works' },
    { name: t('navigation.testimonials'), href: '/#testimonials' },
    { name: t('navigation.clubs'), href: '/#clubs' },
    { name: t('navigation.faq'), href: '/#faq' },
  ];

  const adminLinks = [
    { name: t('navigation.admin.clubs'), href: '/admin' },
    { name: t('navigation.admin.discSales'), href: '/disc-sales-admin' },
  ];

  // Toggle admin dropdown
  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close admin dropdown when clicking elsewhere on the page
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.admin-dropdown-container')) {
        setIsAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary text-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:text-primary-lighter transition-colors">
            <Disc className="h-8 w-8" />
            <span className="text-xl font-bold">Capty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <a
                key={section.name}
                href={section.href}
                className="text-primary-lighter hover:text-white transition-colors"
              >
                {section.name}
              </a>
            ))}
            
            {/* Admin Dropdown - Only shown for admin users */}
            {isAdmin && (
              <div className="relative admin-dropdown-container">
                <button 
                  className="text-primary-lighter hover:text-white transition-colors flex items-center gap-1"
                  onClick={toggleAdminDropdown}
                  aria-expanded={isAdminDropdownOpen}
                  aria-haspopup="true"
                >
                  {t('navigation.admin.title')} <ChevronDown className="h-4 w-4" />
                </button>
                
                {isAdminDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
                    <div className="py-1">
                      {adminLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminDropdownOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="text-primary-lighter">
                  <User className="h-4 w-4 inline mr-1" />
                  {currentUser.email}
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-accent hover:bg-opacity-90 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  {t('navigation.logout')}
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-accent hover:bg-opacity-90 px-4 py-2 rounded-md transition-colors"
              >
                {t('navigation.login')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {sections.map((section) => (
              <a
                key={section.name}
                href={section.href}
                className="block text-primary-lighter hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {section.name}
              </a>
            ))}
            
            {isAdmin && (
              <div className="py-2 border-t border-primary-light">
                <p className="text-sm text-primary-lighter mb-2">{t('navigation.admin.title')}</p>
                {adminLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block py-2 pl-2 text-primary-lighter hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
            
            {currentUser ? (
              <div className="py-2 border-t border-primary-light">
                <div className="text-primary-lighter mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  {currentUser.email}
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-accent hover:bg-opacity-90 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  {t('navigation.logout')}
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block w-full bg-accent hover:bg-opacity-90 px-4 py-2 rounded-md transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.login')}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;