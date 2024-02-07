import React from 'react';
import styles from "./App.module.css";
import useApp from './useApp';


function App() {
  const { products, currentProductIndex, prevProduct, nextProduct } = useApp()

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
