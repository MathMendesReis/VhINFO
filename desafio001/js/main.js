const url = "https://desafio.xlow.com.br/search";
const productContainer = document.querySelector("#products-container");
const productCountInput = document.querySelector("#product-count-input");
const main = document.querySelector("#main");
const containerCount = document.createElement('div')
containerCount.classList.add('container-text-count')

async function getProductsById(id) {
  const urlUniqueProduct = `https://desafio.xlow.com.br/search/${id}`;
  try {
    const response = await fetch(urlUniqueProduct);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
  }
}

async function getAllProducts(start, final) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    productContainer.innerHTML = "";
    containerCount.innerHTML = "";

    const countH1 = document.createElement("h1");
    countH1.classList.add("text-count");
    countH1.innerText = `${data.length} produtos`;
    containerCount.appendChild(countH1);
    main.appendChild(containerCount);

    const slicedData = data.slice(start, final);

    for (const prod of slicedData) {
      const prodImagens = await getProductsById(prod.productId);

      const title = document.createElement("h2");
      title.innerText = prod.productName;

      const card = document.createElement("li");
      card.classList.add("product-card");

      const brand = document.createElement("p");
      brand.innerText = `Marca: ${prod.brand}`;

      const image = document.createElement("img");
      image.classList.add('product-image')
      image.src = prod.image;
      image.alt = prod.productName;

      const divImage = document.createElement("div")
      divImage.classList.add('containerMainImg')
      divImage.appendChild(image)

      const listPrice = document.createElement("p");
      listPrice.innerText = `Preço de Lista: R$ ${prod.listPrice / 100}`;
      listPrice.classList.add('price')

      const bestPrice = document.createElement("p");
      bestPrice.innerText = `Melhor Preço: R$ ${prod.bestPrice / 100}`;

      const containerImg = document.createElement("div");
      containerImg.classList.add('container-imgs')
      for (const item of prodImagens.items) {
        const image1 = document.createElement("img");
        image1.classList.add('small-image')
        image1.src = item.images[0].imageUrl;
        image1.alt = item.images[0].imageText;
        image1.title = 'clique para ver essa imagem'
        image1.addEventListener('click', function () {
          image.src = image1.src;
          image.alt = image1.alt;
        });
        containerImg.appendChild(image1);
      }

      const button = document.createElement("button");
      button.classList.add('button');
      button.innerText = "Ver Produto";

      card.appendChild(divImage);
      card.appendChild(title);
      card.appendChild(brand);
      card.appendChild(listPrice);
      card.appendChild(bestPrice);
      card.appendChild(containerImg);
      card.appendChild(button);
      productContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
  }
}


let start = 0;
let final = 5;


getAllProducts(start, final);


const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
  if (start > 0) {
    start = start - 1;
    final = final - 1;
    getAllProducts(start, final);
  }
});

nextBtn.addEventListener('click', () => {
  if (final < 5) {
    start = start + 1;
    final = final + 1;
    getAllProducts(start, final);
  }
});
