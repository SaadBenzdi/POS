import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Index() {
    const [tracks, setTracks] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = async () => {
        try {
            const response = await axios.get('/api/tracks');
            setTracks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des pistes');
            setLoading(false);
        }
    };

    const handleDelete = (track) => {
        setSelectedTrack(track);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/tracks/${selectedTrack.id}`);
            setTracks(tracks.filter(track => track.id !== selectedTrack.id));
            setShowDeleteModal(false);
            setSelectedTrack(null);
        } catch (err) {
            setError('Erreur lors de la suppression de la piste');
        }
    };

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
        <AuthenticatedLayout header={<h1 className="text-2xl font-bold text-gray-800 dark:text-white">Liste des Pistess</h1>}>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Gérez vos pistes</h2>
                    <Link
                        href={route('tracks.create')}
                        className="bg-black dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition duration-200"
                    >
                        Ajouter une piste
                    </Link>
                </div>

                {tracks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">Aucune piste trouvée</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tracks.map((track) => (
                            <div key={track.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    {track.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <span className="font-medium">Lieu:</span> {track.location}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <span className="font-medium">Longueur:</span> {track.length} km
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <span className="font-medium">Difficulté:</span> {track.difficulty}
                                </p>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link
                                        href={route('tracks.show', track.id)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                    >
                                        Voir
                                    </Link>
                                    <Link
                                        href={route('tracks.edit', track.id)}
                                        className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(track)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedTrack(null);
                }}
                title="Confirmer la suppression"
            >
                <div className="mt-2">
                    <p className="text-gray-600 dark:text-gray-300">
                        Êtes-vous sûr de vouloir supprimer cette piste ? Cette action est irréversible.
                    </p>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() => {
                            setShowDeleteModal(false);
                            setSelectedTrack(null);
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                        onClick={confirmDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
} 