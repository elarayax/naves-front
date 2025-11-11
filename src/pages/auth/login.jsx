import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../../components/templates/Forms';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';
import { useAuth } from '../../context/AuthContext'; // AÑADIDO

const Login = () => {
    const [form, setForm] = useState({ correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // AÑADIDO: usa el contexto

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.correo || !form.contrasena) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            const response = await UserService.login(form);
            const usuario = response.data; // YA ES EL USUARIO COMPLETO

            // GUARDA SOLO user (SIN token)
            localStorage.setItem('user', JSON.stringify({
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }));

            // USA EL CONTEXTO
            login({
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            });

            generarMensaje(`¡Bienvenido ${usuario.nombre}!`, 'success');

            setTimeout(() => {
                if (usuario.rol.id === 1 || usuario.rol.id === 2) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            }, 1500);

        } catch (error) {
            const msg = error.response?.data || 'Credenciales inválidas';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
            setForm({ correo: "", contrasena: "" });
        }
    };

    const Login = [
        {
            type: "text",
            text: [
                {
                    content: "Inicio de Sesión",
                    variant: "h1",
                    className: "text-center text-4xl font-medium mb-10 text-white",
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "correo",
                    value: form.correo,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mb-4",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "contrasena",
                    value: form.contrasena,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "current-password",
                    className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500",
                },
            ],
            className: "space-y-8"
        },
        {           
            type: "button",
            text: loading ? "Iniciando..." : "Iniciar Sesión",
            disabled: loading,
            className: `transform w-full mt-4 mb-4 rounded-sm py-2 font-bold duration-300 
                       ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-400'}`,
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <Link
                            to="/create-user"
                            className="text-indigo-400 hover:text-indigo-300 underline transition"
                        >
                            Crear usuario
                        </Link>
                    ),
                    variant: "p",
                    className: "text-center text-lg",
                },
            ],
        },
    ];

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-800 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-white/10 p-10 backdrop-blur-xl shadow-2xl">
                <Forms content={Login} />
            </form>
        </main>
    );
};

export default Login;