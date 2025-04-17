import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function Show({ track: initialTrack }) {
    const [track, setTrack] = useState(initialTrack);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/tracks/${initialTrack.id}`);
                setTrack(response.data);
            } catch (err) {
                setError('Erreur lors du chargement de la piste');
            } finally {
                setLoading(false);
            }
        };

        fetchTrack();
    }, [initialTrack.id]);

    if (loading) {
        return (
            <AuthenticatedLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (error) {
        return (
            <AuthenticatedLayout>
                <div className="text-center text-red-600 p-4">
                    {error}
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout header={<h1 className="text-2xl font-bold text-gray-800 dark:text-white">Détails de la piste</h1>}>
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                {track.name}
                            </h2>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{track.location}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Informations</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-600 dark:text-gray-300">Longueur: {track.length} km</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-600 dark:text-gray-300">Difficulté: {track.difficulty}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {track.description || 'Aucune description disponible'}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link
                                href={route('tracks.index')}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                                Retour
                            </Link>
                            <Link
                                href={route('tracks.edit', track.id)}
                                className="px-4 py-2 text-white bg-black dark:bg-blue-600 rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700"
                            >
                                Modifier
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 