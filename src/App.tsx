import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Store as AppStore, Download, Star, CheckCircle, HelpCircle, Users, Trophy, ShoppingCart, Calendar, Disc, TrendingUp, DollarSign } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Admin from './pages/Admin';
import DiscSalesAdmin from './pages/DiscSalesAdmin';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import BetaAnnouncement from './components/BetaAnnouncement';
import DiscSalesAdsSection from './components/DiscSalesAdsSection';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Club, getFeaturedClubs } from './services/clubService';
import { submitContactForm } from './services/contactService';

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  if (!currentUser || !isAdmin) {
    // Redirect to login and store the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function HomePage() {
  const { t } = useTranslation();
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({
    submitting: false,
    success: false,
    error: null as string | null
  });

  // Dynamic data with translations
  const stats = [
    { name: t('stats.clubs'), value: '250+' },
    { name: t('stats.members'), value: '10,000+' },
    { name: t('stats.salesAds'), value: '5,000+' }
  ];
  
  const features = [
    {
      title: t('features.compete.title'),
      description: t('features.compete.description'),
      icon: Trophy
    },
    {
      title: t('features.compare.title'),
      description: t('features.compare.description'),
      icon: ShoppingCart
    },
    {
      title: t('features.connect.title'),
      description: t('features.connect.description'),
      icon: Users
    }
  ];
  
  const howItWorks = [
    {
      step: 1,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description')
    },
    {
      step: 2,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description')
    },
    {
      step: 3,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description')
    },
    {
      step: 4,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description')
    }
  ];
  
  const testimonials = [
    {
      name: t('testimonials.sarah.name'),
      role: t('testimonials.sarah.role'),
      content: t('testimonials.sarah.content'),
      rating: 5
    },
    {
      name: t('testimonials.mike.name'),
      role: t('testimonials.mike.role'),
      content: t('testimonials.mike.content'),
      rating: 5
    },
    {
      name: t('testimonials.lisa.name'),
      role: t('testimonials.lisa.role'),
      content: t('testimonials.lisa.content'),
      rating: 5
    }
  ];
  
  const faqs = [
    {
      question: t('faqs.marketplace.question'),
      answer: t('faqs.marketplace.answer')
    },
    {
      question: t('faqs.listings.question'),
      answer: t('faqs.listings.answer')
    },
    {
      question: t('faqs.scores.question'),
      answer: t('faqs.scores.answer')
    },
    {
      question: t('faqs.subscription.question'),
      answer: t('faqs.subscription.answer')
    }
  ];
  
  const usps = [
    {
      title: t('usps.discover.title'),
      description: t('usps.discover.description'),
      icon: Disc
    },
    {
      title: t('usps.track.title'),
      description: t('usps.track.description'),
      icon: TrendingUp
    },
    {
      title: t('usps.sell.title'),
      description: t('usps.sell.description'),
      icon: DollarSign
    }
  ];

  // Fallback club data in case Firebase fetch fails
  const fallbackClubs = Array.from({ length: 10 }, (_, i) => ({
    id: `fallback-${i}`,
    name: `${t('clubs.fallback.name')} ${i + 1}`,
    location: [t('clubs.fallback.locations.usa'), t('clubs.fallback.locations.sweden'), t('clubs.fallback.locations.finland'), t('clubs.fallback.locations.germany'), t('clubs.fallback.locations.norway')][Math.floor(Math.random() * 5)],
    members: Math.floor(Math.random() * 500) + 50
  }));

  useEffect(() => {
    // Fetch clubs from Firebase
    const loadClubs = async () => {
      try {
        const featuredClubs = await getFeaturedClubs(10);
        if (featuredClubs.length > 0) {
          setClubs(featuredClubs);
        } else {
          setClubs(fallbackClubs);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading clubs:', err);
        setError(t('errors.failedToLoadClubs'));
        setClubs(fallbackClubs);
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, [t]); // Re-fetch when language changes
  
  // Handle contact form input changes
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setContactStatus({
      submitting: true,
      success: false,
      error: null
    });
    
    try {
      const result = await submitContactForm(contactForm);
      
      if (result.success) {
        setContactStatus({
          submitting: false,
          success: true,
          error: null
        });
        
        // Reset form after successful submission
        setContactForm({
          name: '',
          email: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setContactStatus(prev => ({
            ...prev,
            success: false
          }));
        }, 5000);
      } else {
        throw new Error('Failed to submit contact form');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setContactStatus({
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
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-primary pt-16 pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl text-center relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-lighter">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 relative z-10">
              <a href="#" className="inline-block">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/capty-webpage.firebasestorage.app/o/Store%3DApp%20Store%2C%20Type%3DDark%2C%20Language%3DEnglish%402x.png?alt=media&token=c9bf3a9d-ecb7-4462-86c0-c69fad9e1b27" 
                  alt="Download on the App Store" 
                  className="h-12"
                  title={t('hero.appStore')}
                />
              </a>
              <a href="#" className="inline-block">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/capty-webpage.firebasestorage.app/o/Store%3DGoogle%20Play%2C%20Type%3DDark%2C%20Language%3DEnglish%402x.png?alt=media&token=0b817346-0e21-477d-a774-9694102af13c" 
                  alt="Get it on Google Play" 
                  className="h-12"
                  title={t('hero.googlePlay')}
                />
              </a>
            </div>
          </div>
        </div>
        
        {/* Disc Golf Player Image */}
        <div className="absolute bottom-0 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 lg:pl-[50px] w-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/capty-webpage.firebasestorage.app/o/discgolf%20player.png?alt=media&token=1632751d-7d79-4b53-8328-bdab89cac7e0"
            alt="Disc Golf Player"
            className="w-full max-w-xs mx-auto lg:mx-0 h-auto object-contain lg:max-w-sm xl:max-w-md"
          />
        </div>
      </section>

      {/* Unique Value Props Section */}
      <section className="py-24 bg-primary-lightest">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {t('value.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('value.description1')} <br />
              {t('value.description2')} <br />
              {t('value.description3')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {usps.map((usp) => (
              <div key={usp.title} className="relative p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center">
                <usp.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold leading-7 text-primary">{usp.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disc Sales Ads Section */}
      <DiscSalesAdsSection />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('features.title')}
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="relative p-8 bg-primary-lightest rounded-2xl">
                  <feature.icon className="h-12 w-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold leading-7 text-primary">{feature.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-primary-lightest">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">{t('howItWorks.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-primary-lighter">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">{t('testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-primary-lightest p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section id="clubs" className="py-24 bg-primary-lightest">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-primary">{t('clubs.title')}</h2>
            {error && (
              <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
                {error}
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">{t('clubs.loading')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('clubs.table.name')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('clubs.table.location')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('clubs.table.members')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clubs.map((club) => (
                    <tr key={club.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-primary">{club.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{club.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{club.members}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link to="/admin" className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light">
              {t('clubs.manageButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">{t('faqs.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-primary-lightest p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <HelpCircle className="h-6 w-6 text-accent mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-primary-lightest">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-primary mb-8">{t('contact.title')}</h2>
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              {contactStatus.error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                  {contactStatus.error}
                </div>
              )}
              
              {contactStatus.success && (
                <div className="p-4 bg-green-50 text-green-700 rounded-md">
                  {t('contact.successMessage')}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form.name')}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={contactStatus.submitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={contactStatus.submitting}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  disabled={contactStatus.submitting}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-light disabled:opacity-70"
                disabled={contactStatus.submitting}
              >
                {contactStatus.submitting ? t('contact.form.sending') : t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Capty</h3>
              <p className="text-primary-lighter">{t('footer.tagline')}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('footer.legal.title')}</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-primary-lighter hover:text-white">{t('footer.legal.privacy')}</Link></li>
                <li><Link to="/terms-and-conditions" className="text-primary-lighter hover:text-white">{t('footer.legal.terms')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('footer.social.title')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-lighter hover:text-white">{t('footer.social.instagram')}</a></li>
                <li><a href="#" className="text-primary-lighter hover:text-white">{t('footer.social.facebook')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t('footer.newsletter.title')}</h3>
              <p className="text-primary-lighter mb-4">{t('footer.newsletter.description')}</p>
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full px-4 py-2 rounded-md bg-white text-primary"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppWithRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/disc-sales-admin" 
        element={
          <ProtectedRoute>
            <DiscSalesAdmin />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppWithRoutes />
    </AuthProvider>
  );
}

export default App;