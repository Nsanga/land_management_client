'use client';
import React, { useEffect, useState } from 'react';
import {
    Plus, Eye, Download, CheckCircle,
    Clock, AlertTriangle, Users, BarChart3,
    Map, FileCheck
} from 'lucide-react';
import NewRequestForm from '@/components/NewRequestForm';
import { RootState } from '@/lib/store';
import { fetchAgentsFonciers, fetchRequests } from '@/lib/actions';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestFailure, addRequestSuccess, startLoadingRequests, stopLoading } from '@/store/requestSlice';
import { makeRequest } from '@/services/requestService';
import toast from 'react-hot-toast';

export default function Dashboard() {
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

    useEffect(() => {
        fetchAgentsFonciers(dispatch);
        fetchRequests(dispatch);
    }, [dispatch]);

    // Données simulées
    const stats = [
        { label: 'Demandes en cours', value: '24', change: '+12%', icon: Clock, color: 'bg-blue-500' },
        { label: 'Demandes approuvées', value: '156', change: '+8%', icon: CheckCircle, color: 'bg-green-500' },
        { label: 'Parcelles gérées', value: '89', change: '+15%', icon: Map, color: 'bg-purple-500' },
        { label: 'Agents actifs', value: '12', change: '+2%', icon: Users, color: 'bg-orange-500' }
    ];

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

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => setShowNewRequestModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nouvelle demande d&apos;immatriculation</span>
                </button>
                <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2">
                    <Map className="w-5 h-5" />
                    <span>Carte des propriétés</span>
                </button>
                <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Rapports</span>
                </button>
            </div>

            {/* Recent Requests */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Demandes récentes</h2>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Voir tout</button>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {request?.map((request) => (
                        <div key={request._id} className={`p-6 border-l-4 ${getUrgencyColor(request.urgency)} hover:bg-gray-50 transition-colors`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-800">{request.requestNumber}</h3>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                            {request.status === 'pending' ? 'En attente' : request.status === 'in_progress' ? ' En cours' : request.status === 'completed' ? 'Approuvée' : 'Rejetée'}
                                        </span>
                                        {request.urgency === 'high' && (
                                            <AlertTriangle className="w-4 h-4 text-red-500" />
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-1">{request.propertyType}</p>
                                    <p className="text-sm text-gray-500">Agent Foncier: {request.agent.firstName + " " + request.agent.lastName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-3">
                                        {new Date(request.createdAt).toLocaleString('fr-FR', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                            <FileCheck className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal de nouvelle demande */}
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
    );
}
