let isBlogVisible = false;

function toggleBlog(event) {
  const blogContent = document.getElementById('full-blog');
  const button = event.target;  // Get the clicked button

  // Check if the blog content is currently visible
  if (isBlogVisible) {
    // Hide the content and change the button text
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    // If the content is not visible, load and show the content, change the button text
    loadFullBlog();
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
  }

  // Toggle visibility state
  isBlogVisible = !isBlogVisible;
}

function loadFullBlog() {
  // Only load the content if it's not already loaded
  const blogContent = document.getElementById('full-blog');
  if (blogContent.innerHTML.trim() === '') {
    fetch('blogs/blog1.html')  // Update the path as needed
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        blogContent.innerHTML = data;  // Insert blog content into the div
      })
      .catch(error => console.error('Failed to load full blog:', error));
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
