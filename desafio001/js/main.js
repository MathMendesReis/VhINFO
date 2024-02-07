const url = "https://desafio.xlow.com.br/search";
const productContainer = document.querySelector("#products-container");
const productCountInput = document.querySelector("#product-count-input");

async function getProductsById(id) {
  const urlUniqueProduct = `https://desafio.xlow.com.br/search/${id}`;
  try {
    const response = await fetch(urlUniqueProduct);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
  }

}

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
      const prodImagens = await getProductsById(data[i].productId)
      const prod = data[i];

      const card = document.createElement("li");
      card.classList.add("product-card");

      const title = document.createElement("h2");
      title.innerText = prod.productName;

      const brand = document.createElement("p");
      brand.innerText = `Marca: ${prod.brand}`;

      const image = document.createElement("img");
      image.classList.add('product-image')
      image.src = prod.image;
      image.alt = prod.productName;



      const listPrice = document.createElement("p");
      listPrice.innerText = `Preço de Lista: R$ ${prod.listPrice / 100}`;
      listPrice.classList.add('price')

      const bestPrice = document.createElement("p");
      bestPrice.innerText = `Melhor Preço: R$ ${prod.bestPrice / 100}`;

      const containerImg = document.createElement("div");
      containerImg.classList.add('container-imgs')
      for (let index = 0; index < prodImagens.items.length; index++) {
        const image1 = document.createElement("img");
        image1.classList.add('small-image')
        image1.src = prodImagens.items[index].images[0].imageUrl;
        image1.alt = prodImagens.items[index].images[0].imageText;
        image1.addEventListener('click', function () {
          image.src = image1.src;
          image.alt = image1.alt;
        });
        containerImg.appendChild(image1)
      }

      const button = document.createElement("button");
      button.innerText = "Ver Produto";

      card.appendChild(title);
      card.appendChild(brand);
      card.appendChild(image);
      card.appendChild(listPrice);
      card.appendChild(bestPrice);
      card.appendChild(containerImg)
      card.appendChild(button)
      productContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
  }
}

productCountInput.addEventListener('change', getAllProducts);

getAllProducts();
