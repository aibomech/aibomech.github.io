// Content Page JavaScript for Blogs and Projects

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
  const icon = darkModeToggle.querySelector('i');
  
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }
  
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (icon) {
      if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
      }
    }
  });
}

// Share Functionality
function copyLink() {
  const url = window.location.href;
  
  // Use modern Clipboard API if available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      fallbackCopyTextToClipboard(url);
    });
  } else {
    fallbackCopyTextToClipboard(url);
  }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showToast('Link copied to clipboard!');
  } catch (err) {
    console.error('Fallback: Failed to copy', err);
    showToast('Failed to copy link');
  }
  
  document.body.removeChild(textArea);
}

// Share on Twitter
function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.querySelector('.content-title')?.textContent || 'Check this out!');
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=aibomech`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

// Share on LinkedIn
function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  window.open(linkedInUrl, '_blank', 'width=550,height=420');
}

// Share on Facebook
function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
}

// Show toast notification
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add reading progress indicator
function updateReadingProgress() {
  const article = document.querySelector('.content-article');
  if (!article) return;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const trackLength = documentHeight - windowHeight;
  const pctScrolled = Math.floor((scrollTop / trackLength) * 100);
  
  // You can use this to show a progress bar if needed
  // For now, we'll just log it
  if (pctScrolled >= 90 && !sessionStorage.getItem('articleRead')) {
    sessionStorage.setItem('articleRead', 'true');
    // Could trigger analytics event here
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for share buttons
  const copyLinkBtn = document.querySelector('[onclick="copyLink()"]');
  const twitterBtn = document.querySelector('[onclick="shareOnTwitter()"]');
  const linkedInBtn = document.querySelector('[onclick="shareOnLinkedIn()"]');
  const facebookBtn = document.querySelector('[onclick="shareOnFacebook()"]');
  
  // Track reading progress
  window.addEventListener('scroll', updateReadingProgress);
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Press 'D' to toggle dark mode
    if (e.key === 'd' || e.key === 'D') {
      if (!e.target.matches('input, textarea')) {
        darkModeToggle?.click();
      }
    }
  });
});

// Print functionality
function printPage() {
  window.print();
}
