// Dynamic Content Loader for AIBOMECH Website
// This script loads content dynamically from the JSON data file

document.addEventListener('DOMContentLoaded', function() {
  loadDynamicContent();
});

async function loadDynamicContent() {
  try {
    // Load content data
    const response = await fetch('data/content.json');
    if (!response.ok) {
      throw new Error('Content data not found');
    }
    
    const contentData = await response.json();
    
    // Update each section
    updateBlogSection(contentData.blogs);
    updateProjectsSection(contentData.projects);
    updatePublicationsSection(contentData.publications);
    
    console.log('Dynamic content loaded successfully');
    
    // Rebuild search index after content is loaded
    if (typeof buildSearchIndex === 'function') {
      buildSearchIndex();
    }
    
  } catch (error) {
    console.error('Error loading dynamic content:', error);
    // Fallback to static content if dynamic loading fails
  }
}

function updateBlogSection(blogs) {
  const blogContainer = document.querySelector('#blog .cards-container');
  if (!blogContainer || !blogs || blogs.length === 0) return;
  
  // Clear existing content
  blogContainer.innerHTML = '';
  
  // Generate blog cards
  blogs.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.className = 'card';
    blogCard.innerHTML = `
      <div class="card-content">
        <h3 class="card-title">${blog.title}</h3>
        <p class="card-text">
          ${blog.description}
        </p>
        <a href="${blog.link}" class="card-link" data-blog="${blog.link}">${blog.linkText}</a>
      </div>
    `;
    blogContainer.appendChild(blogCard);
  });
}

function updateProjectsSection(projects) {
  const projectContainer = document.querySelector('#projects .cards-container');
  if (!projectContainer || !projects || projects.length === 0) return;
  
  // Clear existing content
  projectContainer.innerHTML = '';
  
  // Generate project cards
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'card';
    projectCard.innerHTML = `
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-text">
          ${project.description}
        </p>
        <a href="${project.link}" class="card-link" data-project="${project.link}">${project.linkText}</a>
      </div>
    `;
    projectContainer.appendChild(projectCard);
  });
}

function updatePublicationsSection(publications) {
  const pubContainer = document.getElementById('publicationsContainer');
  if (!pubContainer || !publications || publications.length === 0) return;
  
  // Clear existing content
  pubContainer.innerHTML = '';
  
  // Generate publication entries
  publications.forEach(pub => {
    const pubEntry = document.createElement('div');
    pubEntry.className = 'publication';
    pubEntry.innerHTML = `
      <h3 class="card-title">${pub.title}</h3>
      <img src="${pub.image}" alt="${pub.title}" class="pub-card-img">
      <p class="publication-meta">${pub.journal}</p>
      <p>
        ${pub.description}
      </p>
      <a href="${pub.link}" target="_blank" class="card-link">Read Full Paper</a>
      <p><strong>If you wish to cite this paper:</strong></p>
      <pre>${pub.citation}</pre>
    `;
    pubContainer.appendChild(pubEntry);
  });
}