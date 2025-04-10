// Track visibility state
const blogVisibility = {
  blog1: false,
  blog2: false,
  blog3: false,
  blog4: false,
};

// Generic toggle function
function toggleBlog(event, blogId, filePath) {
  const blogContent = document.getElementById(`full-${blogId}`);
  const button = event.target;

  if (blogVisibility[blogId]) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadBlogContent(blogId, filePath);
  }

  blogVisibility[blogId] = !blogVisibility[blogId];
}

// Generic content loader
function loadBlogContent(blogId, filePath) {
  const blogContent = document.getElementById(`full-${blogId}`);
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error(`${blogId} error:`, err);
      });
  }
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
