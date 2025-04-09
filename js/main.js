let isBlogVisible = false;

function toggleBlog(event) {
  const blogContent = document.getElementById('full-blog');
  const button = event.target;  // Get the clicked button

  // Toggle the visibility of the full blog content
  if (isBlogVisible) {
    blogContent.style.display = 'none';  // Hide the content
    button.innerText = 'Read More...';  // Change button text to 'Read More'
  } else {
    loadFullBlog();  // Load the full blog content if not already loaded
    blogContent.style.display = 'block';  // Show the content
    button.innerText = 'Read Less...';  // Change button text to 'Read Less'
  }

  isBlogVisible = !isBlogVisible;  // Toggle visibility state
}

function loadFullBlog() {
  // Check if content is already loaded to avoid fetching multiple times
  if (document.getElementById('full-blog').innerHTML.trim() === '') {
    fetch('blogs/blog1.html')  // Update with your actual blog content path
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('full-blog').innerHTML = data;  // Insert blog content
      })
      .catch(error => console.error('Failed to load full blog:', error));
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
