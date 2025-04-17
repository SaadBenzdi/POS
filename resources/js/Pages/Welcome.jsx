import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Welcome({ canLogin, canRegister, laravelVersion, phpVersion }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center py-20">
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Bienvenue sur <span className="text-blue-600 dark:text-blue-400">BRE</span> Collection
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        Gérez votre collection de motos et voitures en toute simplicité. 
                        Un espace dédié pour les passionnés d'automobiles.
                    </p>
                    <div className="flex justify-center space-x-4">
                        {canLogin ? (
                            <Link
                                href={route('login')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
                            >
                                Se connecter
                            </Link>
                        ) : null}
                        {canRegister ? (
                            <Link
                                href={route('register')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-white hover:bg-gray-50 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-200"
                            >
                                S'inscrire
                            </Link>
                        ) : null}
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Moto Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                            <div className="p-8">
                                <div className="flex items-center mb-6">
                                    <span className="text-4xl mr-4">🏍️</span>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Collection de Motos</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Gérez votre collection de motos avec facilité. Ajoutez, modifiez et suivez toutes les informations importantes de vos motos.
                                </p>
                                <Link
                                    href={route('motos.index')}
                                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
                                >
                                    Voir les motos
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Voiture Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                            <div className="p-8">
                                <div className="flex items-center mb-6">
                                    <span className="text-4xl mr-4">🚗</span>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Collection de Voitures</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Organisez votre collection de voitures. Gardez une trace de tous les détails importants de vos véhicules.
                                </p>
                                <Link
                                    href={route('voitures.index')}
                                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
                                >
                                    Voir les voitures
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-12">
                                Une plateforme complète pour les passionnés
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6">
                                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                                    <div className="text-gray-600 dark:text-gray-300">Sécurisé</div>
                                </div>
                                <div className="p-6">
                                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                                    <div className="text-gray-600 dark:text-gray-300">Accessible</div>
                                </div>
                                <div className="p-6">
                                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">∞</div>
                                    <div className="text-gray-600 dark:text-gray-300">Possibilités</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} BRE Collection. Tous droits réservés.</p>
                    <p className="mt-2 text-sm">
                        Construit avec Laravel {laravelVersion} et PHP {phpVersion}
                    </p>
                </footer>
            </div>
        </div>
    );
}
