import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import './auth.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${backendUrl}/api/register`, { username, password });
            alert('Registro exitoso, ahora puedes iniciar sesión');
            window.location.href = '/login';
        } catch (error) {
            setError('Error al registrar usuario');
        }
    };

    return (
        <div style={{margin: 'auto', padding: '20px' }}>
    <img src="/sales-icon-2.png" className='logo' alt="Logo" style={{ display: 'block', margin: 'auto', marginBottom: '20px', width: '80px', height: '80px' }} />
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', fontFamily: "Futura, sans-serif" }}>Registrar Nueva Cuenta</h2>
            {error && <Alert message={error} type="error" />}
            <Form onSubmitCapture={handleRegister}>
                <Form.Item
                    label="Usuario"
                    name="username"
                    rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
                >
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuario"
                    />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block style={{ backgroundColor: 'darkgreen' }}>
                        Registrar
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="link"
                        block
                        onClick={() => window.location.href = '/login'}
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    );
}

export default Register;
