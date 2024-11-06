import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (values) => {
        const { username, password } = values;
        try {
            const response = await axios.post(`${backendUrl}/api/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/home';
        } catch (error) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
            <h2>Iniciar Sesión</h2>
            {error && <Alert message={error} type="error" />}
            <Form onFinish={handleLogin}>
                <Form.Item name="username" rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}>
                    <Input placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
                    <Input.Password placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Ingresar
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="link"
                        block
                        onClick={() => window.location.href = '/register'}
                    >
                        ¿No tienes cuenta? Regístrate aquí
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
