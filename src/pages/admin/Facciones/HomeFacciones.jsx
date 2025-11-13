// src/pages/user/Home.jsx
import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import { homeData } from './data/homeData';
import FaccionesService from '../../../services/FaccionesService';

function Home() {
    const [pageData, setPageData] = useState(homeData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const updatedData = [...pageData];
            for (let i = 0; i < updatedData.length; i++) {
                const item = updatedData[i];
                if (item.type === "table" && item.service === "facciones") {
                    try {
                        setLoading(true);
                        const data = await FaccionesService.getAllFacciones();

                        updatedData[i] = {
                            ...item,
                            data: data,
                        };
                    } catch (error) {
                        updatedData[i] = {
                            ...item,
                            data: [["Error", "No se pudieron cargar las facciones"]],
                        };
                    } finally {
                        setLoading(false);
                    }
                }
            }
            setPageData(updatedData);
        };
        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}
            <Section content={pageData} className="container py-12" />
        </div>
    );
}

export default Home;