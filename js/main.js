const blogStates = {};

function toggleBlogGeneric(event, blogId, blogFile) {
  const blogContent = document.getElementById(blogId);
  const button = event.target;
  const isVisible = blogStates[blogId] || false;

  if (isVisible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadBlogContent(blogId, blogFile);
  }

  blogStates[blogId] = !isVisible;
}

function loadBlogContent(blogId, blogFile) {
  const blogContent = document.getElementById(blogId);
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch(`blogs/${blogFile}`)
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

// Example HTML usage:
// <button onclick="toggleBlogGeneric(event, 'full-blog', 'blog1.html')">Read More...</button>
// <button onclick="toggleBlogGeneric(event, 'full-blog2', 'blog2.html')">Read More...</button>
