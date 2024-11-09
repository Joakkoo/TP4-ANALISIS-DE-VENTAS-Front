import React, { useState, useEffect } from 'react';
import { Input, Button, message, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import './home.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function HomePage() {
    const [pdfFile, setPdfFile] = useState(null);
    const [recommendations, setRecommendations] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('No hay token. Redirigiendo al login...');
            window.location.replace('/login'); 
        } else {
            setIsAuthenticated(true); 
        }
    }, []); 

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('Token no encontrado. Redirigiendo a login...');
            window.location.replace('/login');
            return;
        }

        if (!pdfFile) {
            message.error('Por favor, selecciona un archivo PDF');
            return;
        }

        const formData = new FormData();
        formData.append('pdfFile', pdfFile);

        try {
            setLoading(true);
            setRecommendations((prev) => [...prev, { message: 'Generando recomendaciones...', sender: 'bot' }]);

            const response = await axios.post(`${backendUrl}/api/sales/upload-recommend`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            setRecommendations((prev) => [
                ...prev,
                { message: response.data.recomendaciones, sender: 'bot' }
            ]);
            message.success('PDF subido y recomendaciones generadas');
        } catch (error) {
            message.error('Error al subir PDF o generar recomendaciones');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Si no está autenticado, no renderiza nada
    if (!isAuthenticated) {
        return null; 
    }

    return (
        <div style={{margin: 'auto', paddingTop: '20px' }}>
    <img src="/sales-icon-2.png" className='logo' alt="Logo" style={{ display: 'block', margin: 'auto', marginBottom: '20px', width: '80px', height: '80px' }} />
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '3px'}}>
            <h2 style={{fontFamily: 'Futura, sans-serif', textAlign: 'center'}}>Subir PDF y Generar Recomendaciones</h2>
            <Input type="file" onChange={handleFileChange} />
            <Button
                type="primary"
                onClick={handleUpload}
                block
                style={{ marginTop: '10px', backgroundColor: 'darkgreen' }}
                icon={<UploadOutlined />}
            >
                Subir PDF
            </Button>
            
            {/* Chat */}
            <div style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                <div style={{ height: '300px', overflowY: 'auto', padding: '10px', backgroundColor: 'lightgray', borderRadius: '10px' }}>
                    {recommendations.map((item, index) => (
                        <div key={index} style={{ marginBottom: '10px' }} >
                            <div
                                style={{
                                    fontFamily: 'Futura, sans-serif',
                                    backgroundColor: item.sender === 'bot' ? '#f0f0f0' : '#e0f7fa',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    maxWidth: '70%',
                                    marginLeft: item.sender === 'bot' ? 'auto' : '0',
                                    marginRight: item.sender === 'bot' ? '0' : 'auto',
                                }}
                            >
                                {item.message}
                            </div>
                        </div>
                    ))}
                    {loading && <Spin indicator={<LoadingOutlined />} size='small'/>}
                </div>
            </div>
            
            <Button
                type="default"
                onClick={() => window.location.href = '/recommendations'}
                block
                style={{ marginTop: '20px',backgroundColor:'#e0f7fa'}}
               
            >
                Ver Recomendaciones Anteriores
            </Button>
        </div>
    </div>
    );
}

export default HomePage;
