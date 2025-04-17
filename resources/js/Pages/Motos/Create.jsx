import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        marque: '',
        modele: '',
        annee: '',
        kilometrage: '',
        etat: '',
        prix: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('motos.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-2xl font-bold text-gray-800">Ajouter une Moto</h1>}>
            <Head title="Ajouter une Moto" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="marque" value="Marque" />
                                <TextInput
                                    id="marque"
                                    name="marque"
                                    value={data.marque}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('marque', e.target.value)}
                                    required
                                />
                                <InputError message={errors.marque} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="modele" value="Modèle" />
                                <TextInput
                                    id="modele"
                                    name="modele"
                                    value={data.modele}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('modele', e.target.value)}
                                    required
                                />
                                <InputError message={errors.modele} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="annee" value="Année" />
                                <TextInput
                                    id="annee"
                                    name="annee"
                                    type="number"
                                    value={data.annee}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('annee', e.target.value)}
                                    required
                                />
                                <InputError message={errors.annee} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="kilometrage" value="Kilométrage" />
                                <TextInput
                                    id="kilometrage"
                                    name="kilometrage"
                                    type="number"
                                    value={data.kilometrage}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('kilometrage', e.target.value)}
                                    required
                                />
                                <InputError message={errors.kilometrage} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="etat" value="État" />
                                <select
                                    id="etat"
                                    name="etat"
                                    value={data.etat}
                                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                    onChange={(e) => setData('etat', e.target.value)}
                                    required
                                >
                                    <option value="">Sélectionner un état</option>
                                    <option value="Neuf">Neuf</option>
                                    <option value="Très bon état">Très bon état</option>
                                    <option value="Bon état">Bon état</option>
                                    <option value="État moyen">État moyen</option>
                                    <option value="À restaurer">À restaurer</option>
                                </select>
                                <InputError message={errors.etat} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="prix" value="Prix (€)" />
                                <TextInput
                                    id="prix"
                                    name="prix"
                                    type="number"
                                    step="0.01"
                                    value={data.prix}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('prix', e.target.value)}
                                    required
                                />
                                <InputError message={errors.prix} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Image" />
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Ajouter la moto
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 