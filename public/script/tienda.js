document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    fetch('/productos')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('productContainer');
            productContainer.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
                let aux = "data:imgen/png;base64," + product.IMAGEN
                productCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${aux}" class="card-img-top" alt="${product.NOMBRE}">
                        <div class="card-body">
                            <h5 class="card-title">${product.NOMBRE}</h5>
                            <p class="card-text">${product.DESCRIPCION}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Precio: $${product.PRECIO}</small>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error:', error));
}
