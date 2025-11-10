import React from 'react';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "5 Consejos para Conservar tus Tortas Frescas",
            date: "10 de Noviembre, 2025",
            excerpt: "Aprende cómo mantener tus tortas en perfecto estado por más tiempo.",
            content: "La refrigeración adecuada y el uso de recipientes herméticos son clave..."
        },
        {
            id: 2,
            title: "Tendencias en Decoración de Tortas 2025",
            date: "5 de Noviembre, 2025",
            excerpt: "Descubre los diseños más populares de este año.",
            content: "Los diseños minimalistas y los colores pastel están dominando..."
        },
        {
            id: 3,
            title: "Beneficios de Nuestros Productos Sin Azúcar",
            date: "1 de Noviembre, 2025",
            excerpt: "Deliciosos postres sin comprometer tu salud.",
            content: "Utilizamos endulzantes naturales como stevia y eritritol..."
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
                        <button className="btn-secondary" style={{ marginTop: '1rem' }}>
                            Leer más
                        </button>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default Blog;
