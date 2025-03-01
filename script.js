let products = JSON.parse(localStorage.getItem('products')) || [];
let editIndex = null;

const productList = document.getElementById('product-list');
const addProductBtn = document.getElementById('add-product-btn');
const modal = document.getElementById('product-form-modal');
const productForm = document.getElementById('product-form');
const cancelBtn = document.getElementById('cancel-btn');

// Открыть форму добавления товара
addProductBtn.addEventListener('click', () => {
    editIndex = null;
    document.getElementById('form-title').textContent = 'Добавить товар';
    productForm.reset();
    modal.style.display = 'flex';
});

// Закрыть форму
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Сохранить товар
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        description: document.getElementById('product-description').value,
        image: document.getElementById('product-image').value,
        url: document.getElementById('product-url').value
    };

    if (editIndex !== null) {
        products[editIndex] = product; // Редактирование
    } else {
        products.push(product); // Добавление
    }

    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    modal.style.display = 'none';
});

// Рендер товаров
function renderProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/300'}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">${product.price}</p>
            <p>${product.description}</p>
            <div class="actions">
                <button onclick="editProduct(${index})">Редактировать</button>
                <button onclick="deleteProduct(${index})">Удалить</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Редактировать товар
window.editProduct = (index) => {
    editIndex = index;
    const product = products[index];
    document.getElementById('form-title').textContent = 'Редактировать товар';
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-url').value = product.url;
    modal.style.display = 'flex';
};

// Удалить товар
window.deleteProduct = (index) => {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
};

// Инициализация
renderProducts();