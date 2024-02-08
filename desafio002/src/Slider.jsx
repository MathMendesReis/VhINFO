import React from 'react';
import styles from "./App.module.css";
import useApp from './useApp';
import { ArrowLeftSvg } from './arrows/left';
import { ArrowRigthSvg } from './arrows/rigth';

function Slider() {
    const { products, currentProductIndex, prevProduct, nextProduct, updateCurrentProductIndex } = useApp()
    return (
        <main className={styles.page}>
            <section className={styles.containerCard}>
                <button className={styles.buttonVoltarItem} onClick={prevProduct}>
                    <ArrowLeftSvg />
                </button>
                {products.length > 0 && (
                    <a src={products[currentProductIndex].link} className={styles.card}>
                        <img src={products[currentProductIndex].url} alt={products[currentProductIndex].alt} />
                    </a>
                )}
                <button className={styles.buttonAvancarItem} onClick={nextProduct}>
                    <ArrowRigthSvg />
                </button>
            </section>
            <section className={styles.cardButtons}>
                {products.map(({ link }, index) => (
                    <div key={index} className={styles.buttonNav} onClick={() => updateCurrentProductIndex(index)}>
                        {index === currentProductIndex ?
                            <div className={styles.buttonActive} />
                            :
                            <div className={styles.buttonDesative} />
                        }
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Slider;
