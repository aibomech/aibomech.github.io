// Generalized Toggle Function
function toggleBlog(event, blogId, buttonTextId, blogFile) {
  const blogContent = document.getElementById(blogId);
  const button = event.target;
  const isVisible = blogContent.style.display === 'block';

  blogContent.style.display = isVisible ? 'none' : 'block';
  button.innerText = isVisible ? 'Read More...' : 'Read Less...';

  if (!isVisible && blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch(blogFile)
      .then(res => res.ok ? res.text() : Promise.reject('Network error'))
      .then(data => blogContent.innerHTML = data)
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error(err);
      });
  }
}

// Event Listeners for Blog Toggles
document.getElementById('toggle-blog-1').addEventListener('click', function(event) {
  toggleBlog(event, 'full-blog', 'toggle-blog-1', 'blogs/blog1.html');
});

document.getElementById('toggle-blog-2').addEventListener('click', function(event) {
  toggleBlog(event, 'full-blog2', 'toggle-blog-2', 'blogs/blog2.html');
});

document.getElementById('toggle-blog-3').addEventListener('click', function(event) {
  toggleBlog(event, 'full-blog3', 'toggle-blog-3', 'blogs/blog3.html');
});

document.getElementById('toggle-blog-4').addEventListener('click', function(event) {
  toggleBlog(event, 'full-blog4', 'toggle-blog-4', 'blogs/blog4.html');
});

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
