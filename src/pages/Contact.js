import React from 'react';

const Contact = () => {
    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Contacto</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                ¿Tienes alguna pregunta? Envíanos un mensaje y te responderemos a la brevedad.
            </p>
            
            <div className="auth-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input type="email" id="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje:</label>
                        <textarea id="message" rows="5" required />
                    </div>
                    <button type="submit" className="btn-submit">Enviar Mensaje</button>
                </form>
            </div>
        </main>
    );
};

export default Contact;