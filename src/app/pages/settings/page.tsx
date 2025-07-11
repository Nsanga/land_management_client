"use client";
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Eye, EyeOff, Shield, Bell } from 'lucide-react';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    website: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    avatar: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    privacy: {
        profilePublic: boolean;
        showEmail: boolean;
        showPhone: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
    language: string;
}

type LucideIcon = React.ComponentType<{
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
  }>;

type UserProfileField = keyof UserProfile;
type NestedSection = 'notifications' | 'privacy';
type NotificationField = keyof UserProfile['notifications'];
type PrivacyField = keyof UserProfile['privacy'];
type TabId = "notifications" | "privacy" | "profile" | "security"; // Add all your tab IDs here

export default function ProfileSettingsPage() {
    const [profile, setProfile] = useState<UserProfile>({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@email.com',
        phone: '+33 6 12 34 56 78',
        location: 'Paris, France',
        bio: 'Développeur passionné par les nouvelles technologies',
        website: 'https://jeandupont.dev',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        avatar: '',
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        privacy: {
            profilePublic: true,
            showEmail: false,
            showPhone: false
        },
        theme: 'light',
        language: 'fr'
    });

    const [activeTab, setActiveTab] = useState<TabId>("profile"); 
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = <K extends UserProfileField>(
        field: K,
        value: UserProfile[K]
    ) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedChange = (
        section: NestedSection,
        field: NotificationField | PrivacyField,
        value: boolean
    ) => {
        setProfile(prev => ({
            ...prev,
            [section]: {
                ...prev[section], // Garde les autres propriétés de la section
                [field]: value
            }
        }));
    };
    //   [section as keyof UserProfile]
    const handleSave = async () => {
        setIsLoading(true);
        // Simulation d'une sauvegarde
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        alert('Profil mis à jour avec succès !');
    };

    const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'security', label: 'Sécurité', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Confidentialité', icon: Eye }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {profile.firstName[0]}{profile.lastName[0]}
                            </div>
                            <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-500">
                                <Camera size={16} className="text-blue-600" />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Paramètres du Profil
                            </h1>
                            <p className="text-gray-600 mt-1">Gérez vos informations personnelles et vos préférences</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-6">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as TabId)}
                                    className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/30'
                                        }`}
                                >
                                    <Icon size={20} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations Personnelles</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Prénom</label>
                                    <input
                                        type="text"
                                        value={profile.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="w-full px-4 text-black py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Nom</label>
                                    <input
                                        type="text"
                                        value={profile.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="w-full px-4 text-black py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full pl-11 text-black pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Téléphone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full pl-11 text-black pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Localisation</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full pl-11 text-black pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Site Web</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="url"
                                        value={profile.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        className="w-full pl-11 text-black pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                            </div> */}

                            {/* <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Bio</label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 text-black py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                                    placeholder="Parlez-nous de vous..."
                                />
                            </div> */}

                            {/* <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Thème</label>
                                <div className="relative">
                                    <Palette className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <select
                                        value={profile.theme}
                                        onChange={(e) => handleInputChange('theme', e.target.value)}
                                        className="w-full pl-11 text-black pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    >
                                        <option value="light">Clair</option>
                                        <option value="dark">Sombre</option>
                                        <option value="auto">Automatique</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sécurité</h2>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Mot de passe actuel</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.current ? 'text' : 'password'}
                                        value={profile.currentPassword}
                                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                        className="w-full px-4 text-black py-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Nouveau mot de passe</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.new ? 'text' : 'password'}
                                        value={profile.newPassword}
                                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                        className="w-full px-4 text-black py-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Confirmer le nouveau mot de passe</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        value={profile.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className="w-full px-4 text-black py-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl">
                                <h3 className="font-semibold text-blue-900 mb-2">Conseils de sécurité</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Utilisez au moins 8 caractères</li>
                                    <li>• Incluez des majuscules, minuscules et chiffres</li>
                                    <li>• Ajoutez des caractères spéciaux</li>
                                    <li>• Évitez les mots courants</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Notifications par email</h3>
                                        <p className="text-sm text-gray-600">Recevez des notifications par email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profile.notifications.email}
                                            onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Notifications push</h3>
                                        <p className="text-sm text-gray-600">Recevez des notifications sur votre appareil</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profile.notifications.push}
                                            onChange={(e) => handleNestedChange('notifications', 'push', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Notifications SMS</h3>
                                        <p className="text-sm text-gray-600">Recevez des notifications par SMS</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profile.notifications.sms}
                                            onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confidentialité</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Profil public</h3>
                                        <p className="text-sm text-gray-600">Permettre aux autres de voir votre profil</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profile.privacy.profilePublic}
                                            onChange={(e) => handleNestedChange('privacy', 'profilePublic', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Afficher l&apos;email</h3>
                                        <p className="text-sm text-gray-600">Rendre votre email visible sur votre profil</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profile.privacy.showEmail}
                                            onChange={(e) => handleNestedChange('privacy', 'showEmail', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Afficher le téléphone</h3>
                                        <p className="text-sm text-gray-600">Rendre votre numéro visible sur votre profil</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profile.privacy.showPhone}
                                            onChange={(e) => handleNestedChange('privacy', 'showPhone', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Enregistrer les modifications
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}