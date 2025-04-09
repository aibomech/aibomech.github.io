// main.js
let isBlogVisible = {
  blog1: false,
  blog2: false
};

function toggleBlog(event, blog) {
  const blogContent = document.getElementById('full-' + blog);
  const button = event.target;  // Get the clicked button

  // Check if the blog content is currently visible
  if (isBlogVisible[blog]) {
    // Hide the content and change the button text
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    // If the content is not visible, load and show the content, change the button text
    loadFullBlog(blog);
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
  }

  // Toggle visibility state
  isBlogVisible[blog] = !isBlogVisible[blog];
}

function loadFullBlog(blog) {
  let blogFile = '';
  if (blog === 'blog1') {
    blogFile = 'blogs/blog1.xml';
  } else if (blog === 'blog2') {
    blogFile = 'blogs/blog2.xml';
  }

  if (blogFile !== '') {
    fetch(blogFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('full-' + blog).innerHTML = data;
      })
      .catch(error => console.error('Failed to load full blog:', error));
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
