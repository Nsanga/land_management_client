'use client';
import React, { useState } from 'react';
import { MapPin, Eye, EyeOff, Mail, Lock, Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginUserService } from '@/services/authService';
import { startLoading, stopLoading, loginFailure, loginSuccess } from '@/store/authSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface FormErrors {
    email?: string;
    password?: string;
    [key: string]: string | undefined; // pour d'autres champs dynamiques si besoin
}

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const router = useRouter();
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

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

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        dispatch(startLoading());

        try {
            const user = await loginUserService(formData);
            dispatch(loginSuccess(user));
            toast.success('Connexion réussie !');
            router.push('/pages/dashboard');
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
                dispatch(loginFailure(message));
                toast.error(message);
            } else {
                console.error("une erreur inconnue:", error);
                dispatch(loginFailure("Erreur inconnue"));
                toast.error("Erreur inconnue");
            }
        } finally {
            dispatch(stopLoading());
        }
    };

    const handleRegisterPage = () => {
        router.push('/auth/register');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">TerraLink</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Bon retour !</h1>
                    <p className="text-white/70">Connectez-vous à votre espace sécurisé</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
                        <div className="space-y-6">
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
                                        placeholder="votre@email.com"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                        </div>
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                                )}
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
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-sm text-white/80">Se souvenir de moi</span>
                                </label>
                                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Connexion...
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        Se connecter
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Security Notice */}
                        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="flex items-center">
                                <Shield className="w-5 h-5 text-green-400 mr-2" />
                                <span className="text-sm text-white/80">
                                    Connexion sécurisée par cryptage SSL 256-bit
                                </span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-white/70">
                                Pas encore de compte ?{' '}
                                <button onClick={handleRegisterPage} className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">
                                    Créer un compte
                                </button>
                            </p>
                        </div>
                    </div>
                </form>

                {/* Additional Security Info */}
                <p className="text-xs text-white/50">
                    En vous connectant, vous acceptez nos{' '}
                    <a href="#" className="text-blue-400 hover:underline">conditions d&apos;utilisation</a>
                    {' '}et notre{' '}
                    <a href="#" className="text-blue-400 hover:underline">politique de confidentialité</a>
                </p>
            </div>
        </div>
    );
}