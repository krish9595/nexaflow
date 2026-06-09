/**
 * Nexaflow Premium Interaction Engine
 * Handcrafted by a Senior Designer
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. CORE THEME MANAGER (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Sun and Moon SVG paths
  const sunPath = `
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  `;
  
  const moonPath = `
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  `;

  // Get active theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(targetTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update switch icons
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? sunPath : moonPath;
    }
  }

  // ==========================================
  // 2. SCROLL READING PROGRESS LINE
  // ==========================================
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }
  }, { passive: true });

  // ==========================================
  // 3. DESKTOP ONLY: CUSTOM CURSOR TRAIL ENGINE
  // ==========================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let followerX = 0, followerY = 0;
  
  // Track cursor coordinates
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation frame loop
  function animateCursor() {
    // Dot instantly snaps
    let dX = mouseX - dotX;
    let dY = mouseY - dotY;
    dotX += dX;
    dotY += dY;
    
    if (cursorDot) {
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
    }

    // Follower has trailing inertia
    let fX = mouseX - followerX;
    let fY = mouseY - followerY;
    followerX += fX * 0.14; // smooth lag factor
    followerY += fY * 0.14;
    
    if (cursorFollower) {
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(animateCursor);
  }

  // Start loop on desktop viewports
  if (window.innerWidth >= 992) {
    requestAnimationFrame(animateCursor);
    
    // Bind hover states for cursor enlarging
    const hoverTriggers = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .faq-header, .estimator-addon-check');
    hoverTriggers.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
    });

    // Case study cards enlargement triggers
    const projectCards = document.querySelectorAll('.featured-card, .project-showcase-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => document.body.classList.add('cursor-on-project'));
      card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on-project'));
    });
  }

  // ==========================================
  // 4. CTA BUTTONS: PHYSICS MAGNETIC TILTS
  // ==========================================
  const magneticButtons = document.querySelectorAll('.btn-magnetic');

  if (window.innerWidth >= 992) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const bounds = btn.getBoundingClientRect();
        
        // Calculate coordinates relative to button center
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Tilt bounds physics vectors
        const pullFactor = 0.35; // strength of magnetic pull
        const tiltX = deltaX * pullFactor;
        const tiltY = deltaY * pullFactor;
        
        btn.style.transform = `translate3d(${tiltX}px, ${tiltY}px, 0) scale(1.02)`;
        btn.style.boxShadow = `0 15px 35px rgba(23, 23, 23, 0.15)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        // Reset seamlessly
        btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
        btn.style.boxShadow = 'none';
      });
    });
  }

  // ==========================================
  // 5. ADVANCED PORTFOLIO SYSTEM
  // ==========================================
  // Redesigned to show selected vertical showcase layout. 
  // Complex filtering, dynamic bookmarks, and dynamic side-by-side comparisons removed.

  // ==========================================
  // 6. PROGRESSIVE STORYTELLING & WIDGETS
  // ==========================================

  // Countup numbers on scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute('data-count'), 10);
        let currentNum = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNum / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
          currentNum += increment;
          if (currentNum >= targetNum) {
            el.textContent = `${targetNum}+`;
            clearInterval(timer);
          } else {
            el.textContent = `${Math.floor(currentNum)}+`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statNumbers.forEach(num => countObserver.observe(num));

  // Circular Skills radar progress scroll triggers
  const skillsContainer = document.querySelector('.skills-visualizer-container');
  const radialCircle = document.getElementById('radial-circle-track');
  const radialPercentLabel = document.getElementById('radial-percentage-num');
  const barFills = document.querySelectorAll('.skill-bar-fill');

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate circular SVG chart
        // Circumference is 565.48. Target percentage is 92% (average agency execution).
        const targetPercent = 92;
        const offset = 565.48 - (565.48 * targetPercent) / 100;
        
        if (radialCircle) {
          radialCircle.style.strokeDashoffset = offset;
        }

        // Count circular percentages live
        let currentPercent = 0;
        const percentTimer = setInterval(() => {
          currentPercent++;
          if (currentPercent >= targetPercent) {
            radialPercentLabel.textContent = `${targetPercent}%`;
            clearInterval(percentTimer);
          } else {
            radialPercentLabel.textContent = `${currentPercent}%`;
          }
        }, 20);

        // Fill horizontal visual skill-bars
        barFills.forEach(bar => {
          const row = bar.closest('.skills-progress-row');
          const targetW = row.getAttribute('data-skill-percentage');
          bar.style.width = `${targetW}%`;
        });
      }
    });
  }, { threshold: 0.3 });

  if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
  }

  // Active Scroll-Timeline milestones highlight
  const timelineSteps = document.querySelectorAll('#milestones-timeline-scroll .timeline-step');
  
  window.addEventListener('scroll', () => {
    let closestStep = null;
    let minDistance = Infinity;

    timelineSteps.forEach(step => {
      const bounds = step.getBoundingClientRect();
      // Distance from middle viewport
      const distance = Math.abs(bounds.top + bounds.height / 2 - window.innerHeight / 2);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestStep = step;
      }
    });

    if (closestStep) {
      timelineSteps.forEach(s => s.classList.remove('active'));
      closestStep.classList.add('active');
    }
  }, { passive: true });

  // Gyroscope cursor-inertia simulated effect on hero cards
  const heroFloatingBox = document.getElementById('hero-floating-box');
  const heroHeadline = document.getElementById('hero-headline');
  
  if (window.innerWidth >= 992 && heroFloatingBox) {
    document.addEventListener('mousemove', (e) => {
      const offsetX = (window.innerWidth / 2 - e.clientX) * 0.03;
      const offsetY = (window.innerHeight / 2 - e.clientY) * 0.03;
      
      heroFloatingBox.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      heroHeadline.style.transform = `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0)`;
    });
  }

  // ==========================================
  // 7. MULTI-STEP CONTACT FORM WIZARD
  // ==========================================
  const stepPanels = document.querySelectorAll('.form-step-panel');
  const stepIndicators = document.querySelectorAll('.form-step-indicator-dot');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  const submitBtn = document.getElementById('wizard-submit-btn');

  let currentStep = 1;

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (validateStep(currentStep)) {
        if (currentStep < 2) {
          currentStep++;
          updateWizardSteps();
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateWizardSteps();
      }
    });
  }

  function validateStep(step) {
    let isValid = true;
    const activePanel = document.querySelector(`.form-step-panel[data-step="${step}"]`);
    if (!activePanel) return true;
    
    // Check validation of visible inputs in current active panel
    const inputs = activePanel.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.reportValidity();
        isValid = false;
      }
    });
    
    return isValid;
  }

  function updateWizardSteps() {
    // Switch Panels
    stepPanels.forEach(panel => {
      const stepIndex = parseInt(panel.getAttribute('data-step'), 10);
      if (stepIndex === currentStep) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update Indicators dots
    stepIndicators.forEach(dot => {
      const dotIndex = parseInt(dot.getAttribute('data-step'), 10);
      dot.classList.remove('active', 'completed');
      
      if (dotIndex === currentStep) {
        dot.classList.add('active');
      } else if (dotIndex < currentStep) {
        dot.classList.add('completed');
      }
    });

    // Update Wizard Buttons
    if (currentStep === 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'inline-flex';
      if (submitBtn) submitBtn.style.display = 'none';
    } else if (currentStep === 2) {
      if (prevBtn) prevBtn.style.display = 'inline-flex';
      if (nextBtn) nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'inline-flex';
    }

    // Scroll to form header focus area smoothly
    const progressIndicator = document.getElementById('form-progress-indicator');
    if (progressIndicator) {
      progressIndicator.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ==========================================
  // 8. SPA ROUTER VIEW TRANSITIONS & FALLBACKS
  // ==========================================
  const pagesViews = document.querySelectorAll('.page-view');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-bar .mobile-nav-item');

  let isInitialLoad = true;

  function navigateTo(hash) {
    let targetId = hash.replace('#', '') || 'home';
    let targetPage = document.getElementById(`page-${targetId}`);
    
    if (!targetPage) {
      targetId = 'home';
      targetPage = document.getElementById('page-home');
    }

    // Wrap in View Transitions API if supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        switchActivePage(targetId, targetPage);
      });
    } else {
      switchActivePage(targetId, targetPage);
    }
  }

  function switchActivePage(targetId, targetPage) {
    pagesViews.forEach(page => {
      page.classList.remove('active');
    });

    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });

    const capitalized = targetId.charAt(0).toUpperCase() + targetId.slice(1);
    document.title = `Nexaflow — ${capitalized === 'Home' ? 'Premium Mobile-First Digital Agency' : capitalized}`;

    updateNavHighlights(targetId);

    // Reinitialize scroll reveals
    setTimeout(triggerInitialReveals, 50);

    // Accessibility Focus Routing
    if (!isInitialLoad) {
      const heading = targetPage.querySelector('h1, h2, h3');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }
  }

  function updateNavHighlights(activeId) {
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('data-hash') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      if (link.getAttribute('data-hash') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  navigateTo(window.location.hash);
  isInitialLoad = false;

  // ==========================================
  // 9. RESPONSIVE AUTO-HIDE NAVIGATION & HEADERS
  // ==========================================
  const globalHeader = document.getElementById('global-header');
  const mobileNav = document.getElementById('mobile-nav');
  const stickyCallCtaElement = document.getElementById('sticky-call-cta');
  const stickyWhatsappCtaElement = document.getElementById('sticky-whatsapp-cta');
  
  let lastScrollTopPosition = 0;
  const hideScrollThreshold = 80;

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Header size & blur change on scroll
    if (globalHeader) {
      if (scrollTop > 50) {
        globalHeader.classList.add('scrolled');
      } else {
        globalHeader.classList.remove('scrolled');
      }
    }

    // Auto-Hide Mobile Bottom Nav
    if (mobileNav) {
      if (scrollTop > hideScrollThreshold) {
        if (scrollTop > lastScrollTopPosition) {
          mobileNav.classList.add('hide');
          if (stickyCallCtaElement) stickyCallCtaElement.style.transform = 'translateY(4.5rem)';
          if (stickyWhatsappCtaElement) stickyWhatsappCtaElement.style.transform = 'translateY(4.5rem)';
        } else {
          mobileNav.classList.remove('hide');
          if (stickyCallCtaElement) stickyCallCtaElement.style.transform = 'translateY(0)';
          if (stickyWhatsappCtaElement) stickyWhatsappCtaElement.style.transform = 'translateY(0)';
        }
      } else {
        mobileNav.classList.remove('hide');
        if (stickyCallCtaElement) stickyCallCtaElement.style.transform = 'translateY(0)';
        if (stickyWhatsappCtaElement) stickyWhatsappCtaElement.style.transform = 'translateY(0)';
      }
    }

    lastScrollTopPosition = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });

  // ==========================================
  // 10. SCROLL ENTRY REVEAL TIMERS
  // ==========================================
  let revealObserver;
  
  function initScrollObserver() {
    const revealOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);
  }

  function triggerInitialReveals() {
    const revealElements = document.querySelectorAll('.page-view.active .reveal-on-scroll');
    
    if (revealObserver) {
      revealObserver.disconnect();
    }
    
    initScrollObserver();
    
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
      
      if (isVisible) {
        el.classList.add('revealed');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  triggerInitialReveals();

  // ==========================================
  // 11. INQUIRY FORM SUCCESS HANDLERS & RESET
  // ==========================================
  const formElement = document.getElementById('agency-inquiry-form');
  const successAlertBox = document.getElementById('form-success-alert');
  const errorAlertBox = document.getElementById('form-error-alert');
  const successCloseBtnElement = document.getElementById('success-close-btn');
  const submitBtnElement = document.getElementById('wizard-submit-btn');

  if (formElement && successAlertBox) {
    formElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Hide error alert if visible
      if (errorAlertBox) errorAlertBox.style.display = 'none';

      // Gather input data
      const name = document.getElementById('client-name')?.value || '';
      const company = document.getElementById('client-company')?.value || '';
      const location = document.getElementById('client-location')?.value || '';
      const email = document.getElementById('client-email')?.value || '';
      const phone = document.getElementById('client-phone')?.value || '';
      const honeypot = document.getElementById('client-honeypot')?.value || '';

      // Disable submit button and show loading text
      const originalSubmitText = submitBtnElement ? submitBtnElement.textContent : 'Submit Inquiry';
      if (submitBtnElement) {
        submitBtnElement.disabled = true;
        submitBtnElement.textContent = 'Sending...';
      }

      // Check if running locally (e.g. localhost, 127.0.0.1, [::1], local subnets, or file protocol)
      const isLocalhost = 
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' || 
        window.location.hostname === '[::1]' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.') ||
        window.location.hostname.startsWith('172.16.') ||
        window.location.hostname.startsWith('172.17.') ||
        window.location.hostname.startsWith('172.18.') ||
        window.location.hostname.startsWith('172.19.') ||
        window.location.hostname.startsWith('172.20.') ||
        window.location.hostname.startsWith('172.21.') ||
        window.location.hostname.startsWith('172.22.') ||
        window.location.hostname.startsWith('172.23.') ||
        window.location.hostname.startsWith('172.24.') ||
        window.location.hostname.startsWith('172.25.') ||
        window.location.hostname.startsWith('172.26.') ||
        window.location.hostname.startsWith('172.27.') ||
        window.location.hostname.startsWith('172.28.') ||
        window.location.hostname.startsWith('172.29.') ||
        window.location.hostname.startsWith('172.30.') ||
        window.location.hostname.startsWith('172.31.') ||
        window.location.hostname.endsWith('.local') ||
        window.location.hostname === '' ||
        window.location.protocol === 'file:';

      try {
        let result;

        if (isLocalhost) {
          console.log('[Local Development Mode] Simulating backend form submission...', {
            name, company, location, email, phone
          });
          // Artificial network latency delay to mimic actual API behavior
          await new Promise(resolve => setTimeout(resolve, 800));
          result = {
            success: true,
            message: "Local development mode"
          };
        } else {
          const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, company, location, email, phone, honeypot })
          });

          // Prevent JSON parsing errors on non-JSON content types (like HTML 404 pages)
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            result = await response.json();
          } else {
            const errorText = await response.text();
            throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
          }

          if (!response.ok || !result.success) {
            throw new Error(result.message || 'Submission failed');
          }
        }

        if (result && result.success) {
          // Display specific success message depending on environment
          const successDesc = successAlertBox.querySelector('p');
          if (successDesc) {
            if (isLocalhost) {
              successDesc.textContent = result.message || "Local development mode";
            } else {
              successDesc.textContent = "We'll get back to you shortly.";
            }
          }

          // Success transition animation
          formElement.style.transition = 'opacity 0.4s ease';
          formElement.style.opacity = '0';
          
          setTimeout(() => {
            formElement.style.display = 'none';
            successAlertBox.style.display = 'block';
            successAlertBox.style.opacity = '0';
            
            setTimeout(() => {
              successAlertBox.style.opacity = '1';
              successAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 50);
          }, 400);
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Submission Error:', err);
        // Show error feedback
        if (errorAlertBox) {
          errorAlertBox.textContent = err.message || 'An error occurred while submitting your inquiry. Please try again.';
          errorAlertBox.style.display = 'block';
          errorAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        // Re-enable submit button
        if (submitBtnElement) {
          submitBtnElement.disabled = false;
          submitBtnElement.textContent = originalSubmitText;
        }
      }
    });
  }

  if (successCloseBtnElement && formElement && successAlertBox) {
    successCloseBtnElement.addEventListener('click', () => {
      formElement.reset();
      
      // Hide error alert if visible
      if (errorAlertBox) errorAlertBox.style.display = 'none';

      // Reset Wizard steps
      currentStep = 1;
      updateWizardSteps();

      // Animate back to form
      successAlertBox.style.transition = 'opacity 0.4s ease';
      successAlertBox.style.opacity = '0';

      setTimeout(() => {
        successAlertBox.style.display = 'none';
        formElement.style.display = 'block';
        formElement.style.opacity = '0';
        
        setTimeout(() => {
          formElement.style.opacity = '1';
        }, 50);
      }, 400);
    });
  }

  function resetChips(containerId, defaultValue) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const chips = container.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
      if (chip.getAttribute('data-val') === defaultValue) {
        chip.classList.add('active');
        chip.setAttribute('aria-checked', 'true');
      } else {
        chip.classList.remove('active');
        chip.setAttribute('aria-checked', 'false');
      }
    });
  }

  // Accordion Logic
  const accordionButtons = document.querySelectorAll('.faq-header');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const faqPanel = btn.nextElementSibling;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      faqItem.classList.toggle('open');

      if (!isExpanded) {
        faqPanel.style.maxHeight = faqPanel.scrollHeight + 'px';
      } else {
        faqPanel.style.maxHeight = '0px';
      }
    });
  });

});
