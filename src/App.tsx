import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Pricing } from './components/Pricing';
import { AdminPanel } from './components/Admin/AdminPanel';
import { LoginForm } from './components/Auth/LoginForm';
import { NotificationContainer } from './components/UI/NotificationContainer';
import { useProjects } from './hooks/useProjects';
import { useAuth } from './hooks/useAuth';
import { useNotification } from './hooks/useNotification';
import { useMessages } from './hooks/useMessages';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { notifications, removeNotification } = useNotification();
  const { 
    contactMessages, 
    customRequests, 
    addContactMessage, 
    addCustomRequest,
    updateContactMessage,
    updateCustomRequest,
    deleteContactMessage,
    deleteCustomRequest
  } = useMessages();

  const handleNavigate = (section: string) => {
    // Handle admin route - only accessible via direct URL
    if (section === 'admin') {
      if (!isAuthenticated) {
        setCurrentSection('login');
        return;
      }
      setCurrentSection('admin');
      return;
    }
    
    setCurrentSection(section);
  };

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // Check for admin route in URL
    const path = window.location.pathname;
    if (path === '/admin') {
      if (isAuthenticated) {
        setCurrentSection('admin');
      } else {
        setCurrentSection('login');
      }
      return;
    }

    return () => {
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, [currentSection, isAuthenticated]);


  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      setCurrentSection('admin');
      // Update URL without page reload
      window.history.pushState({}, '', '/admin');
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setCurrentSection('home');
    // Update URL without page reload
    window.history.pushState({}, '', '/');
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-black to-charcoal-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-400 mx-auto mb-6"></div>
          <p className="text-antique-400 font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form
  if (currentSection === 'login') {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <NotificationContainer 
          notifications={notifications} 
          onRemove={removeNotification} 
        />
      </>
    );
  }

  // Show admin panel (only if authenticated)
  if (currentSection === 'admin') {
    if (!isAuthenticated) {
      setCurrentSection('login');
      return null;
    }

    return (
      <>
        <NotificationContainer
          notifications={notifications}
          onRemove={removeNotification}
        />
        <AdminPanel
          projects={projects}
          onAddProject={addProject}
          onUpdateProject={updateProject}
          onDeleteProject={deleteProject}
          contactMessages={contactMessages}
          customRequests={customRequests}
          onUpdateContactMessage={updateContactMessage}
          onUpdateCustomRequest={updateCustomRequest}
          onDeleteContactMessage={deleteContactMessage}
          onDeleteCustomRequest={deleteCustomRequest}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      <Header 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main>
        <section id="home">
          <Hero onNavigate={handleNavigate} />
        </section>
        
        <section id="projects">
          <Projects projects={projects} />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="pricing">
          <Pricing />
        </section>
        
        <section id="team">
          <Team />
        </section>
        
        <section id="contact">
          <Contact 
            onContactSubmit={addContactMessage}
            onCustomRequestSubmit={addCustomRequest}
          />
        </section>
      </main>
    </div>
  );
}

export default App;