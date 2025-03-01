let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editIndex = null;

const postList = document.getElementById('post-list');
const addPostBtn = document.getElementById('add-post-btn');
const modal = document.getElementById('post-form-modal');
const postForm = document.getElementById('post-form');
const cancelBtn = document.getElementById('cancel-btn');

// Открыть форму добавления поста
addPostBtn.addEventListener('click', () => {
    editIndex = null;
    postForm.reset();
    modal.style.display = 'flex';
});

// Закрыть форму
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Сохранить пост
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const postText = document.getElementById('post-text').value;

    const post = {
        id: Date.now(), // Уникальный ID поста
        text: postText,
        comments: []
    };

    posts.unshift(post); // Добавляем пост в начало массива
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    modal.style.display = 'none';
});

// Рендер постов
function renderPosts() {
    postList.innerHTML = '';
    posts.forEach((post) => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="text">${post.text}</div>
            <div class="actions">
                <button onclick="viewPost(${post.id})">Прокомментировать</button>
            </div>
        `;
        postList.appendChild(postCard);
    });
}

// Переход на страницу поста
window.viewPost = (postId) => {
    window.location.href = `post.html?id=${postId}`;
};

// Инициализация
renderPosts();
