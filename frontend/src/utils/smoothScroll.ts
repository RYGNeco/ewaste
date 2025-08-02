/**
 * SmoothScroll utility
 * Enhances the scrolling experience across the website
 */

// Initialize smooth scrolling for all anchor links
export const initSmoothScroll = () => {
  // Handle all anchor links in the document
  document.addEventListener('click', (event) => {
    const target = event.target as Element;
    // Check if the clicked element is an anchor tag with a hash
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      const href = target.getAttribute('href');
      if (!href) return;
      
      const targetId = href.substring(1); // Remove the # character
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        event.preventDefault();
        
        // Custom smooth scroll with animation
        const headerOffset = 80; // Account for fixed header if you have one
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Use the smooth scrolling with a slightly longer duration
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });

  // Smooth scrolling for links with hash in URL on page load
  window.addEventListener('load', () => {
    if (window.location.hash) {
      setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure page is fully loaded
    }
  });
};

// Additional helper for programmatic smooth scrolling
export const scrollToElement = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL hash without triggering scroll (for shareable links)
    window.history.pushState(null, '', `#${elementId}`);
  }
};

// Function to smoothly scroll to top with custom duration
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export default {
  initSmoothScroll,
  scrollToElement,
  scrollToTop
};
