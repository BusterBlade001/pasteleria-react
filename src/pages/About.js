import React from 'react';

const About = () => {
    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Nuestra Historia</h1>
            
            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    Pastelería Mil Sabores nació en 2010 con un sueño: llevar la dulzura y la alegría 
                    a cada hogar chileno a través de productos artesanales de la más alta calidad.
                </p>
                
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Nuestra Misión</h2>
                <p>
                    Crear momentos inolvidables a través de productos de pastelería artesanal, 
                    elaborados con ingredientes de primera calidad y mucho amor. Nos comprometemos 
                    a ofrecer opciones para todos los gustos y necesidades dietéticas.
                </p>
                
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Nuestros Valores</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>🎂 Calidad:</strong> Utilizamos solo los mejores ingredientes
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>❤️ Pasión:</strong> Cada producto es hecho con dedicación
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>🌱 Inclusión:</strong> Opciones veganas, sin gluten y sin azúcar
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>🎨 Personalización:</strong> Hacemos realidad tus ideas
                    </li>
                </ul>
                
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>¿Por qué elegirnos?</h2>
                <p>
                    Con más de 15 años de experiencia, hemos perfeccionado nuestras recetas y 
                    procesos para garantizar que cada bocado sea una experiencia memorable. 
                    Nuestro equipo de pasteleros profesionales trabaja cada día para superar 
                    tus expectativas.
                </p>
                
                <div style={{ 
                    background: '#f8e5d0', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    marginTop: '2rem',
                    textAlign: 'center'
                }}>
                    <h3>¡Gracias por confiar en nosotros!</h3>
                    <p>Cada torta, cada postre, cada sonrisa es nuestra recompensa.</p>
                </div>
            </div>
        </main>
    );
};

export default About;
