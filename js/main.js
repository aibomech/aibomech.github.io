let isBlogVisible = false;
let isBlog2Visible = false;
let isBlog3Visible = false;
let isBlog4Visible=false;
let isBlog5Visible=false;
let isBlog6Visible=false;
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

  if (isBlog3Visible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog3();
  }

  isBlog3Visible = !isBlog3Visible;
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


// Blog 4 Toggle
function toggleBlog4(event) {
  const blogContent = document.getElementById('full-blog4');
  const button = event.target;

  if (isBlog4Visible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog4();
  }

  isBlog4Visible = !isBlog4Visible;
}

function loadFullBlog4() {
  const blogContent = document.getElementById('full-blog4');
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch('blogs/blog4.html')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error('Blog 4 error:', err);
      });
  }
}


// Blog 5 Toggle
function toggleBlog5(event) {
  const blogContent = document.getElementById('full-blog5');
  const button = event.target;

  if (isBlog5Visible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog5();
  }

  isBlog5Visible = !isBlog5Visible;
}

function loadFullBlog5() {
  const blogContent = document.getElementById('full-blog5');
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch('blogs/blog5.html')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error('Blog 5 error:', err);
      });
  }
}


// Blog 6 Toggle
function toggleBlog6(event) {
  const blogContent = document.getElementById('full-blog6');
  const button = event.target;

  if (isBlog6Visible) {
    blogContent.style.display = 'none';
    button.innerText = 'Read More...';
  } else {
    blogContent.style.display = 'block';
    button.innerText = 'Read Less...';
    loadFullBlog6();
  }

  isBlog6Visible = !isBlog6Visible;
}

function loadFullBlog6() {
  const blogContent = document.getElementById('full-blog6');
  if (blogContent.innerHTML.trim() === '') {
    blogContent.innerHTML = '<p>Loading...</p>';
    fetch('blogs/blog6.html')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text();
      })
      .then(data => {
        blogContent.innerHTML = data;
      })
      .catch(err => {
        blogContent.innerHTML = '<p>Failed to load blog content.</p>';
        console.error('Blog 6 error:', err);
      });
  }
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
