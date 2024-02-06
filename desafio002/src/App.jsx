import React, { useEffect, useState } from 'react';
import styles from "./App.module.css";

async function getProducts() {
  const url = "https://desafio.xlow.com.br/search";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao obter dados');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    return [];
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const prevProduct = () => {
    if (currentProductIndex === 0) {
      setCurrentProductIndex(products.length - 1)
      return;
    }
    setCurrentProductIndex(currentProductIndex - 1);
  };

  const nextProduct = () => {
    if (currentProductIndex === products.length - 1) {
      setCurrentProductIndex(0)
      return;
    }
    setCurrentProductIndex(currentProductIndex + 1);
  };

  return (
    <main className={styles.page}>
      <section className={styles.containerCard}>
        <button className={styles.buttonVoltarItem} onClick={prevProduct}>Anterior</button>
        {products.length > 0 && (
          <div key={products[currentProductIndex].productId} className={styles.card}>
            <h3>{products[currentProductIndex].brand}</h3>
            <img src={products[currentProductIndex].image} alt={products[currentProductIndex].productName} />
            <h1>{products[currentProductIndex].productName}</h1>
            <h4>Preço: {products[currentProductIndex].listPrice}</h4>
            <h4>Melhor Preço: {products[currentProductIndex].bestPrice}</h4>
            <button>Comprar</button>
          </div>
        )}
        <button className={styles.buttonAvancarItem} onClick={nextProduct}>Próximo</button>
      </section>
    </main>
  );
}

export default App;
