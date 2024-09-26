interface Product {
  name: string;
  price: number;
  type: string;
  unit: string;
  date: string;
  receivedBy: string;
}

const productForm = document.getElementById("product-form") as HTMLFormElement;
const productNameInput = document.getElementById(
  "product-name"
) as HTMLInputElement;
const productPriceInput = document.getElementById(
  "product-price"
) as HTMLInputElement;
const productTypeInput = document.getElementById(
  "product-type"
) as HTMLInputElement;
const productUnitInput = document.getElementById(
  "product-unit"
) as HTMLInputElement;
const productDateInput = document.getElementById(
  "product-date"
) as HTMLInputElement;
const receivedByInput = document.getElementById(
  "received-by"
) as HTMLInputElement;
const productRows = document.getElementById("product-rows") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts(filteredProducts: Product[] = products) {
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

  const newProduct: Product = {
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
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchValue) ||
      product.type.toLowerCase().includes(searchValue) ||
      product.receivedBy.toLowerCase().includes(searchValue)
  );
  renderProducts(filteredProducts);
});

renderProducts();
