const url = "https://desafio.xlow.com.br/search";
const productContainer = document.querySelector("#products-container");
const productCountInput = document.querySelector("#product-count-input");

async function getAllProducts() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const countH1 = document.createElement("h1");
    countH1.classList.add("product-modal");
    countH1.innerText = `Total Products: ${data.length}`;
    productContainer.appendChild(countH1);

    productContainer.innerHTML = '';

    const productCount = parseInt(productCountInput.value) || data.length;

    for (let i = 0; i < productCount && i < data.length; i++) {
      const prod = data[i];

      const card = document.createElement("li");
      card.classList.add("product-card");

      const title = document.createElement("h2");
      title.innerText = prod.productName;

      const brand = document.createElement("p");
      brand.innerText = `Marca: ${prod.brand}`;

      const image = document.createElement("img");
      image.src = prod.image;
      image.alt = prod.productName;

      const listPrice = document.createElement("p");
      listPrice.innerText = `Preço de Lista: R$ ${prod.listPrice / 100}`;
      listPrice.classList.add('price')

      const bestPrice = document.createElement("p");
      bestPrice.innerText = `Melhor Preço: R$ ${prod.bestPrice / 100}`;

      const button = document.createElement("button");
      button.innerText = "Ver Produto";
      button.addEventListener("click", () => {
        window.open(prod.link, "_blank");
      });

      card.appendChild(title);
      card.appendChild(brand);
      card.appendChild(image);
      card.appendChild(listPrice);
      card.appendChild(bestPrice);
      card.appendChild(button)
      productContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
  }
}

productCountInput.addEventListener('change', getAllProducts);

getAllProducts();
