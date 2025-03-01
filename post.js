const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const postContent = document.getElementById('post-content');
const posts = JSON.parse(localStorage.getItem('posts')) || [];

const post = posts.find(p => p.id == postId);

if (post) {
    postContent.innerHTML = `
        <div class="text">${post.text}</div>
        ${post.image ? `<img src="${post.image}" alt="Пост">` : ''}
    `;
} else {
    postContent.innerHTML = '<p>Пост не найден.</p>';
}
