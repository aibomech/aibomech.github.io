// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLeft = document.querySelector('.nav-left');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLeft.classList.toggle('active');
  });
}

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
    
    // Re-render MathJax when theme changes
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise().then(() => {
        console.log('MathJax re-rendered for theme change');
      }).catch(err => console.log('MathJax re-render error:', err));
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (navLeft.classList.contains('active')) {
        navLeft.classList.remove('active');
      }
    }
  });
});

// Modal handling
const modal = document.getElementById('contentModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

// Function to close modal and clear URL parameter
function closeContentModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  // Clear URL parameter
  const url = new URL(window.location);
  url.searchParams.delete('content');
  window.history.pushState({}, '', url);
}

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
  closeContentModal();
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeContentModal();
  }
});

// Function to render MathJax in content
function renderMathJax(element) {
  if (window.MathJax && MathJax.typesetPromise) {
    return MathJax.typesetPromise([element]).then(() => {
      console.log('MathJax rendered successfully');
    }).catch(err => {
      console.error('MathJax rendering error:', err);
    });
  } else {
    console.warn('MathJax not available');
    return Promise.resolve();
  }
}

// Function to open content modal
function openContentModal(contentPath, contentTitle) {
  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Update URL with content parameter for sharing
  const url = new URL(window.location);
  url.searchParams.set('content', contentPath);
  window.history.pushState({}, '', url);
  
  // Show loading message
  modalContent.innerHTML = '<div class="loading">Loading content...</div>';
  
  // Load the content
  fetch(contentPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      // Extract content from the loaded HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Look for main content - adjust selectors based on your HTML structure
      const contentElement = doc.querySelector('.content') || 
                            doc.querySelector('article') || 
                            doc.querySelector('main') || 
                            doc.querySelector('blog-post') ||
                            doc.body;
      
      // Set title and content
      modalContent.innerHTML = `<h2>${contentTitle}</h2>${contentElement.innerHTML}`;
      
      // Render MathJax for the new content
      return renderMathJax(modalContent);
    })
    .catch(error => {
      modalContent.innerHTML = `
        <div class="error-message">
          <p>Sorry, could not load the content. Please try clicking the link directly:</p>
          <p><a href="${contentPath}" target="_blank">Open ${contentTitle} in new tab</a></p>
        </div>
      `;
      console.error('Error loading content:', error);
    });
}

// Handle blog and project link clicks
document.addEventListener('click', (event) => {
  // Check if the clicked element is a blog or project link
  if (event.target.classList.contains('card-link') && 
     (event.target.dataset.blog || event.target.dataset.project)) {
    
    event.preventDefault();
    
    const contentPath = event.target.dataset.blog || event.target.dataset.project;
    const contentTitle = event.target.closest('.card-content').querySelector('.card-title').textContent;
    
    openContentModal(contentPath, contentTitle);
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeContentModal();
  }
});

// Check URL parameters on page load to open content if specified
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const contentPath = urlParams.get('content');
  
  if (contentPath) {
    // Find the title from the page - try to match with existing links
    const linkElement = document.querySelector(`a[data-blog="${contentPath}"], a[data-project="${contentPath}"]`);
    let contentTitle = 'Content';
    
    if (linkElement) {
      const cardContent = linkElement.closest('.card-content');
      if (cardContent) {
        const titleElement = cardContent.querySelector('.card-title');
        if (titleElement) {
          contentTitle = titleElement.textContent;
        }
      }
    }
    
    // Open the modal with the content
    openContentModal(contentPath, contentTitle);
  }
});

// Search script
document.addEventListener('DOMContentLoaded', function() {
  // Get search elements
  const searchForm = document.getElementById('siteSearchForm');
  const searchInput = document.getElementById('siteSearchInput');
  const searchResults = document.getElementById('searchResults');
  
  // Search indexing - collect all searchable content
  const searchIndex = [];
  
  // Function to index content from a section
  function indexSection(sectionId, type) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Index the main section content
    const mainContent = section.querySelector('p');
    if (mainContent) {
      searchIndex.push({
        id: sectionId,
        title: section.querySelector('h2').textContent || sectionId,
        content: mainContent.textContent,
        type: type,
        element: section
      });
    }
    
    // Index cards/publications within the section
    const items = section.querySelectorAll('.card, .publication');
    items.forEach(function(item, index) {
      const itemTitle = item.querySelector('.card-title') || item.querySelector('h3');
      const itemContent = item.querySelector('.card-text') || item.querySelector('p:not(.publication-meta):not(.card-title)');
      
      if (itemTitle && itemContent) {
        searchIndex.push({
          id: `${sectionId}-item-${index}`,
          title: itemTitle.textContent,
          content: itemContent.textContent,
          type: type + '-item',
          element: item,
          parent: section
        });
      }
    });
  }
  
  // Build search index
  function buildSearchIndex() {
    searchIndex.length = 0;
    indexSection('about', 'about');
    indexSection('Aibomech Lab', 'lab');
    indexSection('publications', 'publication');
    indexSection('projects', 'project');
    indexSection('blog', 'blog');
    console.log(`Search index built with ${searchIndex.length} entries`);
  }
  
  buildSearchIndex();
  
  // Function to highlight search term in text
  function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  // Function to get context around search term
  function getContextAround(text, searchTerm, contextLength = 50) {
    if (!text || !searchTerm) return '';
    
    const lowerText = text.toLowerCase();
    const lowerTerm = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerTerm);
    
    if (index === -1) return text.substring(0, contextLength) + '...';
    
    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + searchTerm.length + contextLength);
    
    let context = text.substring(start, end);
    if (start > 0) context = '...' + context;
    if (end < text.length) context += '...';
    
    return highlightSearchTerm(context, searchTerm);
  }
  
  // Function to search the index
  function performSearch(query) {
    if (!query || query.trim().length < 2) {
      searchResults.style.display = 'none';
      return [];
    }
    
    query = query.toLowerCase().trim();
    const results = searchIndex.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      );
    });
    
    return results;
  }
  
  // Function to display search results
  function displaySearchResults(results, query) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
      searchResults.style.display = 'block';
      return;
    }
    
    results.forEach(function(result) {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      
      const titleHighlighted = highlightSearchTerm(result.title, query);
      const contextContent = getContextAround(result.content, query);
      
      resultItem.innerHTML = `
        <h4>${titleHighlighted}</h4>
        <div class="search-result-context">${contextContent}</div>
        <p class="search-result-section">${result.type}</p>
      `;
      
      resultItem.addEventListener('click', function() {
        navigateToResult(result, query);
      });
      
      searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
  }
  
  // Function to highlight content in the page
  function highlightInPage(element, searchTerm) {
    const existingHighlights = document.querySelectorAll('.highlight');
    existingHighlights.forEach(function(el) {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    
    if (!element || !searchTerm) return;
    
    const walkText = (node) => {
      if (node.nodeType === 3) {
        const text = node.nodeValue;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        if (regex.test(text)) {
          const frag = document.createDocumentFragment();
          let lastIdx = 0;
          let match;
          
          regex.lastIndex = 0;
          while ((match = regex.exec(text)) !== null) {
            frag.appendChild(document.createTextNode(text.substring(lastIdx, match.index)));
            
            const highlight = document.createElement('span');
            highlight.className = 'highlight';
            highlight.appendChild(document.createTextNode(match[0]));
            frag.appendChild(highlight);
            
            lastIdx = regex.lastIndex;
          }
          
          if (lastIdx < text.length) {
            frag.appendChild(document.createTextNode(text.substring(lastIdx)));
          }
          
          node.parentNode.replaceChild(frag, node);
          return true;
        }
      } else if (node.nodeType === 1 && 
                node.childNodes && 
                !/(script|style)/i.test(node.tagName)) {
        let hasChanges = false;
        for (let i = 0; i < node.childNodes.length; i++) {
          const result = walkText(node.childNodes[i]);
          hasChanges = hasChanges || result;
        }
        return hasChanges;
      }
      return false;
    };
    
    walkText(element);
  }
  
  // Function to navigate to a search result
  function navigateToResult(result, query) {
    searchResults.style.display = 'none';
    
    const element = result.element;
    if (!element) return;
    
    highlightInPage(element, query);
    
    if (result.parent) {
      result.parent.style.display = 'block';
    }
    
    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    
    element.style.transition = 'background-color 0.5s ease';
    element.style.backgroundColor = 'rgba(255, 230, 0, 0.2)';
    
    setTimeout(() => {
      element.style.backgroundColor = '';
    }, 2000);
  }
  
  // Search form submit handler
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      const results = performSearch(query);
      displaySearchResults(results, query);
    });
  }
  
  // Search input handler for real-time results
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.trim();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      const results = performSearch(query);
      displaySearchResults(results, query);
    });
  }
  
  // Close search results when clicking outside
  document.addEventListener('click', function(e) {
    if (searchForm && searchResults && 
        !searchForm.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
  
  // Navigation key handling for search results
  let selectedResultIndex = -1;
  
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      const resultItems = searchResults.querySelectorAll('.search-result-item');
      const itemCount = resultItems.length;
      
      if (searchResults.style.display !== 'block' || itemCount === 0) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedResultIndex = (selectedResultIndex + 1) % itemCount;
        updateSelectedResult(resultItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedResultIndex = (selectedResultIndex - 1 + itemCount) % itemCount;
        updateSelectedResult(resultItems);
      } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
        e.preventDefault();
        resultItems[selectedResultIndex].click();
      }
    });
  }
  
  function updateSelectedResult(resultItems) {
    resultItems.forEach(function(item, index) {
      if (index === selectedResultIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }
  
  // Initial MathJax rendering for any math already on the page
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise().then(() => {
      console.log('Initial MathJax rendering complete');
    }).catch(err => {
      console.error('Initial MathJax rendering failed:', err);
    });
  }
});
