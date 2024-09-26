"use strict";
const productForm = document.getElementById("product-form");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productTypeInput = document.getElementById("product-type");
const productUnitInput = document.getElementById("product-unit");
const productDateInput = document.getElementById("product-date");
const receivedByInput = document.getElementById("received-by");
const productRows = document.getElementById("product-rows");
const searchInput = document.getElementById("search");
let products = JSON.parse(localStorage.getItem("products") || "[]");
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}
function renderProducts(filteredProducts = products) {
    productRows.innerHTML = "";
    filteredProducts.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.type}</td>
            <td>${product.unit}</td>
            <td>${product.date}</td>
            <td>${product.receivedBy}</td>
        `;
        productRows.appendChild(row);
    });
}
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        name: productNameInput.value,
        price: parseFloat(productPriceInput.value),
        type: productTypeInput.value,
        unit: productUnitInput.value,
        date: productDateInput.value,
        receivedBy: receivedByInput.value,
    };
    products.push(newProduct);
    saveProducts();
    renderProducts();
    productForm.reset();
});
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchValue) ||
        product.type.toLowerCase().includes(searchValue) ||
        product.receivedBy.toLowerCase().includes(searchValue));
    renderProducts(filteredProducts);
});
renderProducts();
