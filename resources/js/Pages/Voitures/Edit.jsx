import React, { useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Edit({ auth, voiture }) {
const { data, setData, put, processing, errors } = useForm({
    marque: voiture.marque,
    modele: voiture.modele,
    annee: voiture.annee,
    image: voiture.image,  
  });
const handleSubmit = (e) => {
    e.preventDefault();
    put(`/voitures/${voiture.id}`);
  };
  return (
    <AuthenticatedLayout
      auth={auth}
      header={<h1 className="text-2xl font-bold text-gray-800">🚗 Modifier une Voiture</h1>}
    >
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Marque</label>
            <input
              type="text"
              value={data.marque}
              onChange={(e) => setData('marque', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.marque && <p className="text-red-500 text-sm mt-1">{errors.marque}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Modèle</label>
            <input
              type="text"
              value={data.modele}
              onChange={(e) => setData('modele', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.modele && <p className="text-red-500 text-sm mt-1">{errors.modele}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Année</label>
            <input
              type="number"
              value={data.annee}
              onChange={(e) => setData('annee', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.annee && <p className="text-red-500 text-sm mt-1">{errors.annee}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Image</label>
            <input
              type="file"
              onChange={(e) => setData('image', e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              href="/voitures"
              className="text-blue-600 hover:underline"
            >
              ← Retour
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
