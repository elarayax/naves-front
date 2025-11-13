// src/components/organisms/CreateModal.jsx
import React, { useState, useEffect } from 'react';
import DynamicInputs from '../molecules/DynamicInput';
import Button from '../atoms/Button';

function CreateModal({ isOpen, onClose, onSubmit, inputsConfig = [], title = "Crear nuevo", submitText = "Guardar", loading = false, }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen) {
            const initial = {};
            inputsConfig.forEach((input) => {
                initial[input.name] = input.value || '';
            });
            setFormData(initial);
        }
    }, [isOpen, inputsConfig]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={loading} >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <DynamicInputs
                        Inputs={inputsConfig.map((input) => ({
                            ...input,
                            value: formData[input.name] || '',
                            onChange: handleChange,
                        }))}
                        className="space-y-4"
                    />

                    <div className="flex gap-3 pt-4">
                        <Button text={loading ? "Guardando..." : submitText} 
                                className={` flex-1 py-2.5 px-4 rounded-lg font-medium text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} `} 
                                disabled={loading}
                        />
                        <Button
                            text="Cancelar" onClick={onClose}
                            className="flex-1 py-2.5 px-4 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateModal;