import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function RecommendationsPage() {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('Token no encontrado. Redirigiendo a login...');
                window.location.href = '/login'; 
                return;
            }
            try {
                const response = await axios.get(`${backendUrl}/api/sales/user-pdfs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPdfs(response.data.pdfs);
            } catch (error) {
                message.error('Error al cargar PDFs');
                console.error(error);
            }
        };
        fetchPdfs();
    }, []);

    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', fontFamily: "Futura, sans-serif" }}>Tus PDFs subidos y recomendaciones</h2>
            <ul>
                {pdfs.map((pdf) => (
                    <li key={pdf._id}>
                        <strong style={{ fontFamily: 'Segoe UI'  }}>{pdf.nombre}</strong>
                        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>{pdf.recomendaciones}</p>
                    </li>
                ))}
            </ul>
            <Button type="default" onClick={() => window.location.href = '/home'} block>
                Volver al inicio
            </Button>
        </div>
    );
}

export default RecommendationsPage;
