import React, { useEffect, useState } from 'react';

export default function useApp() {
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
        setCurrentProductIndex((prevIndex) => {
            if (prevIndex === 0) {
                return products.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    const nextProduct = () => {
        setCurrentProductIndex((prevIndex) => {
            if (prevIndex === products.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    return { products, currentProductIndex, prevProduct, nextProduct };
}
