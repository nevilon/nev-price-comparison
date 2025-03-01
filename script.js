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
    const imageUpload = document.getElementById('post-image-upload');

    const post = {
        text: postText,
        image: '' // Будет заполнено после загрузки изображения
    };

    // Если выбрано изображение, преобразуем его в base64
    if (imageUpload.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            post.image = e.target.result; // Сохраняем base64-код изображения
            savePost(post);
        };
        reader.readAsDataURL(imageUpload.files[0]);
    } else {
        savePost(post);
    }
});

function savePost(post) {
    posts.unshift(post); // Добавляем пост в начало массива
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    modal.style.display = 'none';
}

// Рендер постов
function renderPosts() {
    postList.innerHTML = '';
    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="text">${post.text}</div>
            ${post.image ? `<img src="${post.image}" alt="Пост ${index + 1}">` : ''}
        `;
        postList.appendChild(postCard);
    });
}

// Инициализация
renderPosts();
