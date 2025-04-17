import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Index({ voitures }) {
  const { delete: destroy } = useForm();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoiture, setSelectedVoiture] = useState(null);

  const handleDelete = (id) => {
    setSelectedVoiture(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedVoiture) {
      destroy(`/voitures/${selectedVoiture}`, {
        method: 'delete',
        preserveScroll: true,
        onSuccess: () => {
          setShowDeleteModal(false);
          setSelectedVoiture(null);
        },
      });
    }
  };

  return (
    <AuthenticatedLayout header={<h1 className="text-2xl font-bold text-gray-800">Liste des Voitures</h1>}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">🚗</span>
              Liste des Voitures
            </h1>
            <p className="text-gray-500">Gérez votre collection de voitures</p>
          </div>
          <Link
            href="/voitures/create"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-medium transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Ajouter une voiture</span>
          </Link>
        </div>

        {voitures.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-7xl mb-6">🚗</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Aucune voiture trouvée</h3>
            <p className="text-gray-500 mb-6">Commencez par ajouter votre première voiture à votre collection</p>
            <Link
              href="/voitures/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter une voiture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {voitures.map((voiture) => (
              <div
                key={voiture.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
              >
                <div className="relative">
                  {voiture.image ? (
                    <img
                      src={`/storage/${voiture.image}`}
                      alt={`${voiture.marque} ${voiture.modele}`}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-6xl">🚗</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{voiture.marque} {voiture.modele}</h3>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Année: {voiture.annee}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={route('voitures.show', voiture.id)}
                      className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Voir
                    </Link>
                    <Link
                      href={route('voitures.edit', voiture.id)}
                      className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(voiture.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Supprimer
                    </button>
                  </div>
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
          setSelectedVoiture(null);
        }}
        title="Confirmer la suppression"
      >
        <div className="mt-2">
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer cette voiture ? Cette action est irréversible.
          </p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedVoiture(null);
            }}
          >
            Annuler
          </button>
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={confirmDelete}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
