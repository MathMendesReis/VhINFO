import React, { useEffect, useState } from 'react';

export default function useApp() {

    const arrayImagens = [
        {
            url: 'https://www.leidainformatica.com/wp-content/uploads/2020/05/205-scaled.jpg',
            alt: 'lorem imput',
            link: '#'
        },
        {
            url: 'https://i0.wp.com/elitecursos.com.br/wp-content/uploads/2015/10/analiseedesenvdesistemas.jpg?fit=540%2C350&ssl=1',
            alt: 'lorem imput 2',
            link: '#'
        },
        {
            url: 'https://informaticasa.com.br/wp-content/uploads/2023/10/Ativo-4-983x1024.png',
            alt: 'lorem imput',
            link: '#'
        },
    ]

    const [products, setProducts] = useState([...arrayImagens]);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            nextProduct();
        }, 3000);
        return () => clearTimeout(timer);
    }, [currentProductIndex]);

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

    const updateCurrentProductIndex = (newIndex) => {
        if (newIndex >= 0 && newIndex < products.length) {
            setCurrentProductIndex(newIndex);
        }
    };


    // useEffect(() => {
    //     const handleScroll = (event) => {
    //         if (event.deltaY > 0) {
    //             setCurrentProductIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    //         } else {
    //             setCurrentProductIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    //         }
    //     };

    //     window.addEventListener('wheel', handleScroll);

    //     return () => {
    //         window.removeEventListener('wheel', handleScroll);
    //     };
    // }, [currentProductIndex, products.length]);

    return { products, currentProductIndex, prevProduct, nextProduct, updateCurrentProductIndex };
}
