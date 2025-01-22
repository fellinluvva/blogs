const API_URL = 'http://localhost:3000/blogs';

async function fetchBlogs() {
const blogList = document.getElementById('blogList');
blogList.innerHTML = 'Loading...';

try {
    const response = await fetch(API_URL);
    const blogs = await response.json();
    blogList.innerHTML = '';

    blogs.forEach((blog) => {
    const blogItem = document.createElement('div');
    blogItem.classList.add('blog-item');
    blogItem.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.body}</p>
        <small>Author: ${blog.author || 'Anonymous'}</small>
        
        <button onclick="deleteBlog('${blog._id}')">Delete</button>
    `;
    blogList.appendChild(blogItem);
    });
} catch (error) {
    blogList.innerHTML = 'Failed to load blogs.';
    console.error(error);
}
}

document.getElementById('blogForm').addEventListener('submit', async (e) => {
e.preventDefault();

const title = document.getElementById('title').value;
const body = document.getElementById('body').value;
const author = document.getElementById('author').value;

try {
    const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, author }),
    });

    if (response.ok) {
    alert('Blog created successfully!');
    document.getElementById('blogForm').reset();
    fetchBlogs();
    } else {
    alert('Failed to create blog.');
    }
} catch (error) {
    console.error(error);
}
});

// Delete a blog
async function deleteBlog(id) {
if (!confirm('Are you sure you want to delete this blog?')) return;

try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (response.ok) {
    alert('Blog deleted successfully!');
    fetchBlogs();
    } else {
    alert('Failed to delete blog.');
    }
} catch (error) {
    console.error(error);
}
}

fetchBlogs();
