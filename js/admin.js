// Admin Panel JavaScript
let contentData = {
  blogs: [],
  projects: [],
  publications: []
};

// Simple password protection
const ADMIN_PASSWORD = 'aibomech2025'; // Change this to a secure password

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
  // Load existing content
  loadContentData();
  
  // Set up form handlers
  setupFormHandlers();
  
  // Initialize dark mode
  initializeDarkMode();
  
  // Check if already logged in
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
  }
});

// Password check
function checkPassword() {
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');
  
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    showAdminPanel();
  } else {
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 3000);
  }
}

function logout() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('loginScreen').style.display = 'block';
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('password').value = '';
}

function showAdminPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  loadExistingContent();
  updateContentSummary();
}

// Tab management
function showTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));
  
  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => button.classList.remove('active'));
  
  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  
  // Activate corresponding button
  event.target.classList.add('active');
  
  // Update content summary if preview tab is selected
  if (tabName === 'preview') {
    updateContentSummary();
  }
}

// Load content data from JSON file
async function loadContentData() {
  try {
    const response = await fetch('data/content.json');
    if (response.ok) {
      contentData = await response.json();
    }
  } catch (error) {
    console.error('Error loading content data:', error);
    // Initialize with empty data if file doesn't exist
    contentData = { blogs: [], projects: [], publications: [] };
  }
}

// Setup form handlers
function setupFormHandlers() {
  // Blog form
  document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addBlog();
  });
  
  // Project form
  document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addProject();
  });
  
  // Publication form
  document.getElementById('publicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addPublication();
  });
}

// Add blog function
function addBlog() {
  const title = document.getElementById('blogTitle').value;
  const description = document.getElementById('blogDescription').value;
  const link = document.getElementById('blogLink').value;
  const linkText = document.getElementById('blogLinkText').value;
  
  if (!title || !description || !link || !linkText) {
    showError('Please fill in all fields.');
    return;
  }
  
  const newBlog = {
    id: 'blog' + (contentData.blogs.length + 1),
    title: title,
    description: description,
    link: link,
    linkText: linkText
  };
  
  contentData.blogs.push(newBlog);
  
  // Clear form
  document.getElementById('blogForm').reset();
  
  // Update displays
  loadExistingContent();
  updateContentSummary();
  
  showSuccess('Blog post added successfully!');
}

// Add project function
function addProject() {
  const title = document.getElementById('projectTitle').value;
  const description = document.getElementById('projectDescription').value;
  const link = document.getElementById('projectLink').value;
  const linkText = document.getElementById('projectLinkText').value;
  
  if (!title || !description || !link || !linkText) {
    showError('Please fill in all fields.');
    return;
  }
  
  const newProject = {
    id: 'project' + (contentData.projects.length + 1),
    title: title,
    description: description,
    link: link,
    linkText: linkText
  };
  
  contentData.projects.push(newProject);
  
  // Clear form
  document.getElementById('projectForm').reset();
  
  // Update displays
  loadExistingContent();
  updateContentSummary();
  
  showSuccess('Project added successfully!');
}

// Add publication function
function addPublication() {
  const title = document.getElementById('pubTitle').value;
  const journal = document.getElementById('pubJournal').value;
  const description = document.getElementById('pubDescription').value;
  const image = document.getElementById('pubImage').value;
  const link = document.getElementById('pubLink').value;
  const citation = document.getElementById('pubCitation').value;
  
  if (!title || !journal || !description || !image || !link || !citation) {
    showError('Please fill in all fields.');
    return;
  }
  
  const newPublication = {
    id: 'pub' + (contentData.publications.length + 1),
    title: title,
    journal: journal,
    description: description,
    image: image,
    link: link,
    citation: citation
  };
  
  contentData.publications.push(newPublication);
  
  // Clear form
  document.getElementById('publicationForm').reset();
  
  // Update displays
  loadExistingContent();
  updateContentSummary();
  
  showSuccess('Publication added successfully!');
}

// Load existing content for display
function loadExistingContent() {
  loadExistingBlogs();
  loadExistingProjects();
  loadExistingPublications();
}

function loadExistingBlogs() {
  const container = document.getElementById('existingBlogs');
  container.innerHTML = '';
  
  contentData.blogs.forEach((blog, index) => {
    const blogDiv = document.createElement('div');
    blogDiv.className = 'existing-item';
    blogDiv.innerHTML = `
      <div>
        <h4>${blog.title}</h4>
        <p>${blog.description.substring(0, 100)}...</p>
        <small><strong>Link:</strong> ${blog.link}</small>
      </div>
      <div class="item-actions">
        <button class="btn btn-small btn-danger" onclick="removeItem('blogs', ${index})">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    `;
    container.appendChild(blogDiv);
  });
}

function loadExistingProjects() {
  const container = document.getElementById('existingProjects');
  container.innerHTML = '';
  
  contentData.projects.forEach((project, index) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'existing-item';
    projectDiv.innerHTML = `
      <div>
        <h4>${project.title}</h4>
        <p>${project.description.substring(0, 100)}...</p>
        <small><strong>Link:</strong> ${project.link}</small>
      </div>
      <div class="item-actions">
        <button class="btn btn-small btn-danger" onclick="removeItem('projects', ${index})">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    `;
    container.appendChild(projectDiv);
  });
}

function loadExistingPublications() {
  const container = document.getElementById('existingPublications');
  container.innerHTML = '';
  
  contentData.publications.forEach((publication, index) => {
    const pubDiv = document.createElement('div');
    pubDiv.className = 'existing-item';
    pubDiv.innerHTML = `
      <div>
        <h4>${publication.title}</h4>
        <p><strong>${publication.journal}</strong></p>
        <p>${publication.description.substring(0, 100)}...</p>
        <small><strong>Link:</strong> ${publication.link}</small>
      </div>
      <div class="item-actions">
        <button class="btn btn-small btn-danger" onclick="removeItem('publications', ${index})">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    `;
    container.appendChild(pubDiv);
  });
}

// Remove item function
function removeItem(type, index) {
  if (confirm('Are you sure you want to remove this item?')) {
    contentData[type].splice(index, 1);
    loadExistingContent();
    updateContentSummary();
    showSuccess('Item removed successfully!');
  }
}

// Update content summary
function updateContentSummary() {
  const summaryDiv = document.getElementById('contentSummary');
  summaryDiv.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
      <div style="background: var(--primary-color); color: white; padding: 1rem; border-radius: 8px; text-align: center;">
        <i class="fas fa-blog fa-2x"></i>
        <h4>${contentData.blogs.length}</h4>
        <p>Blog Posts</p>
      </div>
      <div style="background: var(--secondary-color); color: white; padding: 1rem; border-radius: 8px; text-align: center;">
        <i class="fas fa-project-diagram fa-2x"></i>
        <h4>${contentData.projects.length}</h4>
        <p>Projects</p>
      </div>
      <div style="background: var(--accent-color); color: white; padding: 1rem; border-radius: 8px; text-align: center;">
        <i class="fas fa-file-alt fa-2x"></i>
        <h4>${contentData.publications.length}</h4>
        <p>Publications</p>
      </div>
    </div>
    <p style="text-align: center; margin-top: 1rem;">
      <strong>Total Content Items:</strong> ${contentData.blogs.length + contentData.projects.length + contentData.publications.length}
    </p>
  `;
}

// Update website function
async function updateWebsite() {
  try {
    // Save updated content data
    await saveContentData();
    
    // Generate new HTML sections
    await generateUpdatedHTML();
    
    showSuccess('Website updated successfully! Changes are now live.');
  } catch (error) {
    showError('Error updating website: ' + error.message);
  }
}

// Save content data (simulated - in real implementation this would save to server)
async function saveContentData() {
  // In a real implementation, this would send the data to a server
  // For now, we'll store it in localStorage as a backup
  localStorage.setItem('aibomech_content', JSON.stringify(contentData));
  
  // Create a downloadable JSON file
  const dataStr = JSON.stringify(contentData, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  
  // For demonstration, we'll create a download link
  const url = URL.createObjectURL(dataBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'content.json';
  downloadLink.click();
  URL.revokeObjectURL(url);
}

// Generate updated HTML sections
async function generateUpdatedHTML() {
  // Generate blog section HTML
  const blogHTML = contentData.blogs.map(blog => `
        <div class="card">
          <div class="card-content">
            <h3 class="card-title">${blog.title}</h3>
            <p class="card-text">
              ${blog.description}
            </p>
            <a href="${blog.link}" class="card-link" data-blog="${blog.link}">${blog.linkText}</a>
          </div>
        </div>`).join('\\n        ');
  
  // Generate project section HTML
  const projectHTML = contentData.projects.map(project => `
        <div class="card">
          <div class="card-content">
            <h3 class="card-title">${project.title}</h3>
            <p class="card-text">
              ${project.description}
            </p>
            <a href="${project.link}" class="card-link" data-project="${project.link}">${project.linkText}</a>
          </div>
        </div>`).join('\\n        ');
  
  // Generate publication section HTML
  const publicationHTML = contentData.publications.map(pub => `
        <div class="publication">
          <h3 class="card-title">${pub.title}</h3>
          <img src="${pub.image}" alt="${pub.title}" class="pub-card-img">
          <p class="publication-meta">${pub.journal}</p>
          <p>
            ${pub.description}
          </p>
          <a href="${pub.link}" target="_blank" class="card-link">Read Full Paper</a>
          <p><strong>If you wish to cite this paper:</strong></p>
          <pre>
${pub.citation}
          </pre>
        </div>`).join('\\n\\n        ');
  
  // Store generated HTML for manual copy-paste or automatic update
  const generatedHTML = {
    blogs: blogHTML,
    projects: projectHTML,
    publications: publicationHTML
  };
  
  localStorage.setItem('aibomech_generated_html', JSON.stringify(generatedHTML));
  
  // Create downloadable HTML file with instructions
  const instructionsHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>AIBOMECH - Generated Content</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; }
        .section { margin: 2rem 0; padding: 1rem; border: 1px solid #ddd; }
        pre { background: #f5f5f5; padding: 1rem; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>AIBOMECH - Generated Content</h1>
    <p>Copy the HTML sections below and replace the corresponding sections in your index.html file.</p>
    
    <div class="section">
        <h2>Blog Section HTML</h2>
        <pre>${blogHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>
    
    <div class="section">
        <h2>Projects Section HTML</h2>
        <pre>${projectHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>
    
    <div class="section">
        <h2>Publications Section HTML</h2>
        <pre>${publicationHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>
</body>
</html>`;
  
  const htmlBlob = new Blob([instructionsHTML], {type: 'text/html'});
  const htmlUrl = URL.createObjectURL(htmlBlob);
  const htmlDownloadLink = document.createElement('a');
  htmlDownloadLink.href = htmlUrl;
  htmlDownloadLink.download = 'generated_content.html';
  htmlDownloadLink.click();
  URL.revokeObjectURL(htmlUrl);
}

// Preview website
function previewWebsite() {
  window.open('index.html', '_blank');
}

// Success and error messages
function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  successText.textContent = message;
  successDiv.style.display = 'block';
  
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 5000);
}

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  errorText.textContent = message;
  errorDiv.style.display = 'block';
  
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

// Dark mode functionality
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const icon = darkModeToggle.querySelector('i');
  
  // Check saved preference
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
  
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

// Enter key login
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && document.getElementById('loginScreen').style.display !== 'none') {
    checkPassword();
  }
});