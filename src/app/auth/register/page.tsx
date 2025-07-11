'use client';
import React, { useState } from 'react';
import { MapPin, Eye, EyeOff, Mail, Lock, User, Phone, Shield, ArrowRight, CheckCircle, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { registerFailure, registerSuccess, startLoading } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { registerUserService } from '@/services/authService';

interface FormErrors {
    email?: string;
    password?: string;
    [key: string]: string | undefined; // pour d'autres champs dynamiques si besoin
}

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        organization: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        accountType: 'individual', // individual or organization
        role: 'citoyen'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    const router = useRouter();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: isCheckbox ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = (step: number) => {
        const newErrors: FormErrors = {};

        if (step === 1) {
            if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
            if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
            if (!formData.email) {
                newErrors.email = 'L\'email est requis';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Format d\'email invalide';
            }
            if (!formData.phoneNumber) newErrors.phoneNumber = 'Le téléphone est requis';
        }

        if (step === 2) {
            if (!formData.password) {
                newErrors.password = 'Le mot de passe est requis';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            }
            if (!formData.acceptTerms) {
                newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSubmit = async () => {
        if (validateStep(2)) {
            dispatch(startLoading());

            // Construction de l'objet à envoyer
            const { organization, ...rest } = formData;
            const dataToSend = organization
                ? { ...rest, organization }
                : rest;

            try {
                const user = await registerUserService(dataToSend);
                dispatch(registerSuccess(user));
                toast.success('Compte créé avec succès !');
                router.push('/auth/login');
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
                dispatch(registerFailure(message));
                toast.error(message);
            } else {
                console.error("une erreur inconnue:", error);
                dispatch(registerFailure("Erreur inconnue"));
                toast.error("Erreur inconnue");
            }
        }
        }
    };

    const passwordStrength = () => {
        const password = formData.password;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const getStrengthColor = () => {
        const strength = passwordStrength();
        if (strength <= 1) return 'bg-red-500';
        if (strength <= 2) return 'bg-yellow-500';
        if (strength <= 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const getStrengthText = () => {
        const strength = passwordStrength();
        if (strength <= 1) return 'Faible';
        if (strength <= 2) return 'Moyen';
        if (strength <= 3) return 'Fort';
        return 'Très fort';
    };

    const handleLoginPage = () => {
        router.push('/auth/login');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div onClick={() => router.push("/")} className="flex items-center justify-center space-x-2 mb-4 cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">TerraLink</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Créer votre compte</h1>
                    <p className="text-white/70">Rejoignez la révolution foncière numérique</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'
                            }`}>
                            1
                        </div>
                        <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'
                            }`}>
                            2
                        </div>
                    </div>
                </div>

                {/* Registration Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Informations personnelles</h2>
                                <p className="text-white/60 text-sm">Étape 1 sur 2</p>
                            </div>

                            {/* Account Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-white/90 mb-3">
                                    Type de compte
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
                                        className={`p-4 rounded-xl border transition-all ${formData.accountType === 'individual'
                                            ? 'bg-blue-500/20 border-blue-500 text-white'
                                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                                            }`}
                                    >
                                        <User className="w-6 h-6 mx-auto mb-2" />
                                        <div className="text-sm font-medium">Particulier</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, accountType: 'organization' }))}
                                        className={`p-4 rounded-xl border transition-all ${formData.accountType === 'organization'
                                            ? 'bg-blue-500/20 border-blue-500 text-white'
                                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                                            }`}
                                    >
                                        <Building className="w-6 h-6 mx-auto mb-2" />
                                        <div className="text-sm font-medium">Organisation</div>
                                    </button>
                                </div>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.firstName ? 'border-red-400' : 'border-white/20'
                                            }`}
                                        placeholder="Jean"
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-2">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.lastName ? 'border-red-400' : 'border-white/20'
                                            }`}
                                        placeholder="Dupont"
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                                    Adresse email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-white/50" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-400' : 'border-white/20'
                                            }`}
                                        placeholder="jean.dupont@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/90 mb-2">
                                    Téléphone
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="w-5 h-5 text-white/50" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.phoneNumber ? 'border-red-400' : 'border-white/20'
                                            }`}
                                        placeholder="+237 6XX XX XX XX"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="mt-1 text-xs text-red-400">{errors.phoneNumber}</p>
                                )}
                            </div>

                            {/* Organization Field (conditional) */}
                            {formData.accountType === 'organization' && (
                                <div>
                                    <label htmlFor="organization" className="block text-sm font-medium text-white/90 mb-2">
                                        Nom de l&apos;organisation
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building className="w-5 h-5 text-white/50" />
                                        </div>
                                        <input
                                            type="text"
                                            id="organization"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Nom de votre organisation"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Next Button */}
                            <button
                                type="button"
                                onClick={handleNext}
                                className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                <span className="flex items-center justify-center">
                                    Continuer
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Sécurité du compte</h2>
                                <p className="text-white/60 text-sm">Étape 2 sur 2</p>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-white/50" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? 'border-red-400' : 'border-white/20'
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-1 bg-white/10 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength() / 4) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-white/70">{getStrengthText()}</span>
                                        </div>
                                    </div>
                                )}
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-2">
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-white/50" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.confirmPassword ? 'border-red-400' : 'border-white/20'
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <div className="absolute inset-y-0 right-12 flex items-center">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                        </div>
                                    )}
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Terms Acceptance */}
                            <div>
                                <label className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleInputChange}
                                        className={`mt-1 w-4 h-4 text-blue-600 bg-white/10 border rounded focus:ring-blue-500 focus:ring-2 ${errors.acceptTerms ? 'border-red-400' : 'border-white/30'
                                            }`}
                                    />
                                    <span className="text-sm text-white/80 leading-relaxed">
                                        J&apos;accepte les{' '}
                                        <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                                            conditions d&apos;utilisation
                                        </a>
                                        {' '}et la{' '}
                                        <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                                            politique de confidentialité
                                        </a>
                                    </span>
                                </label>
                                {errors.acceptTerms && (
                                    <p className="mt-1 text-xs text-red-400">{errors.acceptTerms}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(1)}
                                    className="flex-1 bg-white/10 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all"
                                >
                                    Retour
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Création...
                                        </div>
                                    ) : (
                                        'Créer mon compte'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 text-green-400 mr-2" />
                            <span className="text-sm text-white/80">
                                Vos données sont protégées par un cryptage de niveau militaire
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-white/70">
                            Déjà un compte ?{' '}
                            <button onClick={handleLoginPage} className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">
                                Se connecter
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}