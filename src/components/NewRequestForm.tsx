'use client';
import { UserInfo } from '@/store/authSlice';
import React from 'react';

interface NewRequestFormProps {
    formData: {
        propertyType: string;
        location: string;
        description: string;
        urgency: string;
        documents: File[];
        agent: string;
    };
    setFormData: (data: Partial<NewRequestFormProps['formData']>) => void;
    onCancel: () => void;
    onSubmit: () => void;
    user_agents: UserInfo[];
    loading: boolean;
}

export default function NewRequestForm({
    formData,
    setFormData,
    onCancel,
    onSubmit,
    user_agents,
    loading
}: NewRequestFormProps) {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData({ documents: [...formData.documents, ...files] });
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Type de propriété"
                value={formData.propertyType}
                onChange={(e) => setFormData({ propertyType: e.target.value })}
                className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Localisation"
                value={formData.location}
                onChange={(e) => setFormData({ location: e.target.value })}
                className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                rows={4}
                placeholder="Description de la demande"
                value={formData.description}
                onChange={(e) => setFormData({ description: e.target.value })}
                className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">Agent foncier:</label>
                <select
                    value={formData.agent}
                    onChange={(e) => setFormData({ agent: e.target.value })}
                    className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-1/2"
                >
                    <option value="">-- Sélectionner un agent --</option>
                    {user_agents?.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                            {agent.firstName} {agent.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700">Urgence:</label>
                <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ urgency: e.target.value })}
                    className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="low">Faible</option>
                    <option value="medium">Normale</option>
                    <option value="high">Haute</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Ajouter un document (PDF ou image) :</label>
                <input
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-700"
                />
            </div>

            {formData.documents.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    {formData.documents.map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                    ))}
                </ul>
            )}

            <div className="flex justify-end space-x-2 pt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    Annuler
                </button>
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            En cours...
                        </div>
                    ) : (
                        <span className="flex items-center justify-center">
                            Soumettre
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
