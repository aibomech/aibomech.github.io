let isBlogVisible = false;
let isBlog2Visible = false;
let isBlog3Visible = false;
// Blog 1 Toggle
function toggleBlog(event) {
  const blogContent = document.getElementById('full-blog');
  const button = event.target;

  if (isBlogVisible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog();
  }

  isBlogVisible = !isBlogVisible;
}

function loadFullBlog() {
  const blogContent = document.getElementById('full-blog');
  if (blogContent.innerHTML.trim() === '') {
    fetch('blogs/blog1.html')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error('Blog 1 error:', err);
      });
  }
}

// Blog 2 Toggle
function toggleBlog2(event) {
  const blogContent = document.getElementById('full-blog2');
  const button = event.target;

  if (isBlog2Visible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog2();
  }

  isBlog2Visible = !isBlog2Visible;
}

function loadFullBlog2() {
  const blogContent = document.getElementById('full-blog2');
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch('blogs/blog2.html')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error('Blog 2 error:', err);
      });
  }
}


// Blog 3 Toggle
function toggleBlog3(event) {
  const blogContent = document.getElementById('full-blog3');
  const button = event.target;

  if (isBlog2Visible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog3();
  }

  isBlog2Visible = !isBlog2Visible;
}

function loadFullBlog3() {
  const blogContent = document.getElementById('full-blog3');
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch('blogs/blog3.html')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error('Blog 3 error:', err);
      });
  }
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
