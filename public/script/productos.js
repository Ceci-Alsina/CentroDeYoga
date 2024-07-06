var categorias = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    
    fetch("/categorias")
        .then((respuesta) => respuesta.json())
        .then((data) => {
            data.forEach((e) => {
                categorias.push(new Option(e.DESCRIPCION, e.ID))
            });
        })
        .catch((error) => console.error(error))
});

function loadProducts() {
    fetch('/productos')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            products.forEach(product => {
                let aux = "data:imgen/png;base64," + product.IMAGEN

                const productRow = document.createElement('tr');
                productRow.innerHTML = `
                    <td>${product.ID}</td>
                    <td>${product.NOMBRE}</td>
                    <td>${product.PRECIO}</td>
                    <td>${product.DESCRIPCION}</td>
                    <td>${product.STOCK}</td>
                    <td>${product.CATEGORIA}</td>
                    <td><img src="${aux}" alt="${product.NOMBRE}" class="small-img"></td>
                    <td>
                        <button class="btn btn-edit" onclick="editProduct(${product.ID})">Modificar</button>
                        <button class="btn btn-delete" onclick="deleteProduct(${product.ID})">Eliminar</button>
                    </td>
                `;
                productList.appendChild(productRow);
            });
        })
        .catch(error => console.error('Error:', error));
}

function showProductForm() {
    const formContainer = document.getElementById('productForm');
    formContainer.style.display = 'block';
    formContainer.innerHTML = `
        <form id="productFormContent" enctype="multipart/form-data">
            <input type="hidden" id="productId" name="productId">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" required></textarea>
            </div>
            <div class="form-group">
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" required>
            </div>
            <div class="form-group">
                <label for="fk_categoria">Categoría:</label>
                <select  name="fk_categoria" id="fk_categoria" required>
                    <option value="fk_categoria">&nbsp;</option>
                </select>
            </div>
            <div class="form-group">
                <label for="imagen">Imagen:</label>
                <input type="file" id="imagen" name="imagen">
            </div>
            <button type="submit" class="btn">Guardar</button>
            <button type="button" id="cancelarProductFromContent" class="btn">Cancelar</button>
        </form>
    `;
    document.getElementById('productFormContent').addEventListener('submit', submitProductForm);
    document.getElementById('cancelarProductFromContent').addEventListener('click', closeProductForm);

    let selectCategorias = document.getElementById('fk_categoria')
    categorias.forEach((opcion) => {
        selectCategorias.options[selectCategorias.options.length] = opcion
    })
}

function closeProductForm() {
    const formContainer = document.getElementById('productForm');
    formContainer.style.display = 'none';
}

function submitProductForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = document.getElementById('productId').value;

    let url = '/productos';
    let method = 'POST';

    if (productId) {
        url = `/productos/${productId}`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadProducts();
        event.target.reset();
        closeProductForm();
    })
    .catch(error => console.error('Error:', error));
}

function editProduct(id) {
    fetch(`/productos/${id}`)
        .then(response => response.json())
        .then(product => {
            showProductForm();
            document.getElementById('productId').value = product.ID;
            document.getElementById('nombre').value = product.NOMBRE;
            document.getElementById('precio').value = product.PRECIO;
            document.getElementById('descripcion').value = product.DESCRIPCION;
            document.getElementById('stock').value = product.STOCK;
            document.getElementById('fk_categoria').value = product.ID_CATEGORIA;
        })
        .catch(error => console.error('Error:', error));
}

function deleteProduct(id) {
    fetch(`/productos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        alert(response.message);
    })
    .catch(error => console.error('Error:', error));
}

function filterProducts() {
    const filterValue = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#productList tr');
    rows.forEach(row => {
        const categoryCell = row.cells[1]; // Columna de nombre (se busca por nombre de producto)
        if (categoryCell) {
            const category = categoryCell.textContent.toLowerCase();
            if (category.includes(filterValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}
