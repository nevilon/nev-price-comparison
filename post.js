const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const postContent = document.getElementById('post-content');
const commentsList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const posts = JSON.parse(localStorage.getItem('posts')) || [];

const post = posts.find(p => p.id == postId);

if (post) {
    postContent.innerHTML = `
        <div class="text">${post.text}</div>
    `;

    // Рендер комментариев
    post.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="text">${comment}</div>
        `;
        commentsList.appendChild(commentElement);
    });
} else {
    postContent.innerHTML = '<p>Пост не найден.</p>';
}

// Добавление комментария
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const commentText = document.getElementById('comment-text').value;
    post.comments.push(commentText);
    localStorage.setItem('posts', JSON.stringify(posts));

    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <div class="text">${commentText}</div>
    `;
    commentsList.appendChild(commentElement);

    commentForm.reset();
});
