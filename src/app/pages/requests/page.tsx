'use client';
import React, { useEffect, useState } from 'react'
import {
    Plus, Filter, Eye, Download, FileCheck,
} from 'lucide-react';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import NewRequestForm from '@/components/NewRequestForm';
import { fetchAgentsFonciers, fetchRequests } from '@/lib/actions';
import { makeRequest } from '@/services/requestService';
import { stopLoading } from '@/store/authSlice';
import { startLoadingRequests, addRequestSuccess, addRequestFailure } from '@/store/requestSlice';
import toast from 'react-hot-toast';

const Requests = () => {
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);
    const [newRequest, setNewRequest] = useState({
        propertyType: '',
        location: '',
        description: '',
        urgency: 'medium',
        documents: [],
        agent: '',
    });
    const dispatch = useDispatch();
    const { request, loading } = useSelector((state: RootState) => state.request);
    const { user_agents } = useSelector((state: RootState) => state.user_agents);

    const updateRequest = <T extends object>(partial: Partial<T>) => {
        setNewRequest((prev) => ({ ...prev, ...partial }));
    };

    const handleSubmitRequest = async () => {
        console.log('Nouvelle demande soumise:', newRequest);
        dispatch(startLoadingRequests());

        try {
            const response = await makeRequest({ formData: newRequest });
            dispatch(addRequestSuccess(response));
            toast.success("Demande soumise avec succès !");
            fetchRequests(dispatch);
            setShowNewRequestModal(false);
            setNewRequest({
                propertyType: '',
                location: '',
                description: '',
                urgency: 'medium',
                documents: [],
                agent: ''
            });
        } catch (error: unknown) {
            // Type guard to check if it's an error with a response
            if (error instanceof Error && 'response' in error) {
                const err = error as {
                    response?: {
                        data?: {
                            message?: string
                        }
                    }
                };
                console.error("une erreur:", error);
                const message = err.response?.data?.message || "Erreur serveur";
                dispatch(addRequestFailure(message));
                toast.error(message);
            } else {
                console.error("une erreur inconnue:", error);
                dispatch(addRequestFailure("Erreur inconnue"));
                toast.error("Erreur inconnue");
            }
        } finally {
            dispatch(stopLoading());
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En attente': return 'bg-yellow-100 text-yellow-800';
            case 'En cours': return 'bg-blue-100 text-blue-800';
            case 'Approuvée': return 'bg-green-100 text-green-800';
            case 'Rejetée': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'high': return 'border-l-red-500';
            case 'medium': return 'border-l-blue-500';
            case 'low': return 'border-l-green-500';
            default: return 'border-l-gray-500';
        }
    };

    useEffect(() => {
        fetchAgentsFonciers(dispatch);
        fetchRequests(dispatch);
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Gestion des demandes</h2>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                        <Filter className="w-4 h-4" />
                        <span>Filtrer</span>
                    </button>
                    <button
                        onClick={() => setShowNewRequestModal(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nouvelle demande</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriété</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Foncier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {request?.map((request) => (
                                <tr key={request._id} className={`border-l-4 ${getUrgencyColor(request.urgency)}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.requestNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.propertyType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.agent.firstName + " " + request.agent.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                            {request.status === 'pending' ? 'En attente' : request.status === 'in_progress' ? ' En cours' : request.status === 'completed' ? 'Approuvée' : 'Rejetée'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(request.createdAt).toLocaleString('fr-FR', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            <FileCheck className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showNewRequestModal && (
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[100vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Nouvelle demande d&apos;immatriculation</h2>
                        <NewRequestForm
                            formData={newRequest}
                            setFormData={updateRequest}
                            onCancel={() => setShowNewRequestModal(false)}
                            onSubmit={handleSubmitRequest}
                            user_agents={user_agents}
                            loading={loading}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Requests
