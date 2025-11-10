import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Datos de blog con contenido extendido (Mismos que en Blog.js)
const blogPosts = [
    {
        id: 1,
        title: "5 Consejos para Conservar tus Tortas Frescas",
        date: "10 de Noviembre, 2025",
        content: "La refrigeración adecuada y el uso de recipientes herméticos son clave. Para tortas con crema o rellenos lácteos, la nevera es obligatoria. Asegúrate de cubrirlas con film plástico o una campana de torta para evitar que absorban olores. Las tortas secas o de bizcocho simple pueden durar hasta tres días a temperatura ambiente, siempre que estén en un lugar fresco y seco, lejos de la luz directa del sol. ¡Nunca guardes el pastel caliente!\n\n**Detalle del Enfriamiento:** Es crucial que la torta esté completamente fría antes de refrigerar o glasear. El calor atrapado puede condensarse y crear humedad excesiva, arruinando la textura y provocando la proliferación de bacterias. Utiliza una rejilla de enfriamiento para maximizar el flujo de aire.\n\n**El Secreto de la Congelación:** Si deseas guardar la torta por más de una semana, la congelación es tu mejor opción. Envuelve cada porción o capa individualmente en papel film y luego en papel de aluminio antes de meterlas al congelador. Esto evita las quemaduras por frío. Para descongelar, simplemente déjala en el refrigerador durante 12-24 horas."
    },
    {
        id: 2,
        title: "Tendencias en Decoración de Tortas 2025",
        date: "5 de Noviembre, 2025",
        content: "Los diseños minimalistas y los colores pastel están dominando. El 'fault line cake' (con una franja de color o textura en el medio) y el uso de flores comestibles naturales siguen siendo muy populares para bodas y eventos elegantes. Además, la tendencia 'vintage' con bordes perlados y técnicas de 'piping' clásicas ha regresado con fuerza. En cuanto a sabores, las mezclas exóticas como el matcha y el yuzu están ganando terreno.\n\n**Texturas y Materiales:** El fondant está perdiendo popularidad frente al buttercream suizo o italiano, que ofrecen un acabado más suave y una textura más agradable. Se están usando mucho los 'toppers' de acrílico o madera personalizados y la decoración con esferas de chocolate para dar un toque moderno.\n\n**Colores de la Temporada:** Los tonos tierra, beige y terracota se combinan con acentos dorados o plateados. Para las bodas, el clásico blanco marmolado sigue siendo el favorito, a menudo adornado con follaje verde y flores blancas que caen en cascada."
    },
    {
        id: 3,
        title: "Beneficios de Nuestros Productos Sin Azúcar",
        date: "1 de Noviembre, 2025",
        content: "Utilizamos endulzantes naturales como stevia y eritritol, que tienen un índice glucémico mucho menor que el azúcar tradicional. Esto hace que nuestros postres sean aptos para diabéticos y para quienes siguen dietas bajas en carbohidratos. Además de ser saludables, mantenemos el sabor y la textura, demostrando que no es necesario sacrificar el placer por el bienestar.\n\n**Índice Glucémico Bajo:** Nuestros productos sin azúcar ayudan a evitar los picos de glucosa en la sangre, lo cual es vital para la salud metabólica. Esto te permite disfrutar de un postre dulce sin las consecuencias negativas del azúcar refinada.\n\n**Compromiso con la Calidad:** Reemplazar el azúcar no significa usar ingredientes artificiales. Nos enfocamos en grasas saludables, harinas alternativas (como la de almendra y coco) y endulzantes probados para ofrecer un producto de alta calidad y sabor inigualable. El resultado es un postre ligero, denso en nutrientes y apto para casi todos."
    }
];

const BlogDetail = () => {
    // Obtenemos el ID del post desde la URL
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Buscamos el post por ID (asegurando que el ID sea numérico)
        const foundPost = blogPosts.find(p => p.id === parseInt(id));

        if (foundPost) {
            setPost(foundPost);
        } else {
            alert('Artículo de blog no encontrado');
            navigate('/blog');
        }
    }, [id, navigate]);

    if (!post) {
        return (
            <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem' }}>
                <p>Cargando artículo...</p>
            </main>
        );
    }

    // Función para renderizar el contenido con saltos de línea
    const renderContent = (text) => {
        return text.split('\n').map((item, key) => {
            return <p key={key}>{item}</p>;
        });
    }

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <button 
                    className="btn-secondary" 
                    onClick={() => navigate('/blog')}
                    style={{ marginBottom: '1rem' }}
                >
                    ← Volver al Blog
                </button>
                
                <h1 className="section-title" style={{ textAlign: 'left' }}>{post.title}</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    Publicado el: {post.date}
                </p>
                
                <div style={{ lineHeight: '1.7', fontSize: '1.1rem', color: '#333' }}>
                    {renderContent(post.content)}
                </div>
            </div>
        </main>
    );
};

export default BlogDetail;