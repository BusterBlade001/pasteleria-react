import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "5 Consejos para Conservar tus Tortas Frescas",
            date: "10 de Noviembre, 2025",
            excerpt: "Aprende cómo mantener tus tortas en perfecto estado por más tiempo.",
            content: "La refrigeración adecuada y el uso de recipientes herméticos son clave. Para tortas con crema o rellenos lácteos, la nevera es obligatoria. Asegúrate de cubrirlas con film plástico o una campana de torta para evitar que absorban olores. Las tortas secas o de bizcocho simple pueden durar hasta tres días a temperatura ambiente, siempre que estén en un lugar fresco y seco, lejos de la luz directa del sol. ¡Nunca guardes el pastel caliente!"
        },
        {
            id: 2,
            title: "Tendencias en Decoración de Tortas 2025",
            date: "5 de Noviembre, 2025",
            excerpt: "Descubre los diseños más populares de este año.",
            content: "Los diseños minimalistas y los colores pastel están dominando. El 'fault line cake' (con una franja de color o textura en el medio) y el uso de flores comestibles naturales siguen siendo muy populares para bodas y eventos elegantes. Además, la tendencia 'vintage' con bordes perlados y técnicas de 'piping' clásicas ha regresado con fuerza. En cuanto a sabores, las mezclas exóticas como el matcha y el yuzu están ganando terreno."
        },
        {
            id: 3,
            title: "Beneficios de Nuestros Productos Sin Azúcar",
            date: "1 de Noviembre, 2025",
            excerpt: "Deliciosos postres sin comprometer tu salud.",
            content: "Utilizamos endulzantes naturales como stevia y eritritol, que tienen un índice glucémico mucho menor que el azúcar tradicional. Esto hace que nuestros postres sean aptos para diabéticos y para quienes siguen dietas bajas en carbohidratos. Además de ser saludables, mantenemos el sabor y la textura, demostrando que no es necesario sacrificar el placer por el bienestar."
        }
    ];

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Blog de Pastelería Mil Sabores</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Consejos, recetas y novedades del mundo de la pastelería
            </p>
            
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {blogPosts.map(post => (
                    <article key={post.id} style={{ 
                        background: 'white', 
                        padding: '2rem', 
                        marginBottom: '2rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <h2>{post.title}</h2>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            {post.date}
                        </p>
                        <p style={{ marginBottom: '1rem' }}>{post.excerpt}</p>
                        <p style={{ color: '#666' }}>{post.content}</p>
                        
                        {/* CORRECCIÓN FINAL: Usar Link para simular la navegación al detalle */}
                        <Link 
                            to={`/blog/${post.id}`} 
                            className="btn-secondary" 
                            style={{ marginTop: '1rem' }}
                        >
                            Leer más
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default Blog;