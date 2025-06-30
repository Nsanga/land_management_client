'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, FileCheck, Users, MapPin, ArrowRight, Menu, X, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <FileCheck className="w-8 h-8" />,
            title: "Demandes Simplifiées",
            description: "Soumettez vos demandes d'immatriculation en quelques clics avec suivi en temps réel"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Sécurité Maximale",
            description: "Vos documents sont protégés par un cryptage de niveau bancaire"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Support Expert",
            description: "Accompagnement par nos agents fonciers certifiés tout au long du processus"
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Géolocalisation",
            description: "Localisation précise de vos parcelles avec cartographie interactive"
        }
    ];

    const testimonials = [
        {
            name: "Marie Dubois",
            role: "Propriétaire",
            content: "Une révolution dans la gestion foncière ! J'ai pu immatriculer ma parcelle en 3 jours au lieu de 3 mois.",
            rating: 5
        },
        {
            name: "Jean Kouakou",
            role: "Agent Immobilier",
            content: "Interface intuitive et processus transparent. Mes clients adorent la simplicité du système.",
            rating: 5
        }
    ];

    const handleLoginPage = () => {
        router.push('/auth/login')
    }

    const handleRegisterPage = () => {
        router.push('/auth/register')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/10 backdrop-blur-lg border-b border-white/20' : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">TerraLink</span>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <a href="#features" className="text-white/80 hover:text-white transition-colors">Fonctionnalités</a>
                            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Témoignages</a>
                            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
                        </nav>

                        <div className="hidden md:flex space-x-4">
                            <button onClick={handleLoginPage} className="text-white/80 hover:text-white transition-colors cursor-pointer">Connexion</button>
                            <button onClick={handleRegisterPage} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                                S&apos;inscrire
                            </button>
                        </div>

                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/50 backdrop-blur-lg border-t border-white/20">
                        <div className="px-4 py-4 space-y-4">
                            <a href="#features" className="block text-white/80 hover:text-white">Fonctionnalités</a>
                            <a href="#testimonials" className="block text-white/80 hover:text-white">Témoignages</a>
                            <a href="#contact" className="block text-white/80 hover:text-white">Contact</a>
                            <div className="pt-4 border-t border-white/20 space-y-2">
                                <button onClick={handleLoginPage} className="block w-full text-left text-white/80 cursor-pointer">Connexion</button>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg">
                                    S&apos;inscrire
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-8">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            Nouvelle génération de gestion foncière
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Simplifiez vos
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> démarches </span>
                            foncières
                        </h1>

                        <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Plateforme digitale révolutionnaire pour l&apos;immatriculation, la gestion et le suivi
                            de vos biens fonciers. Rapide, sécurisé et transparent.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button onClick={handleRegisterPage} className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                                Commencer maintenant
                                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all">
                                Voir la démo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/2 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Pourquoi choisir TerraLink ?
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Une solution complète qui révolutionne la gestion foncière traditionnelle
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/70 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ce que disent nos utilisateurs
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-white/80 mb-6 text-lg leading-relaxed">&quot;{testimonial.content}&quot;</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white font-semibold">{testimonial.name[0]}</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{testimonial.name}</div>
                                        <div className="text-white/60">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Prêt à révolutionner votre gestion foncière ?
                    </h2>
                    <p className="text-xl text-white/80 mb-8">
                        Rejoignez des milliers d&apos;utilisateurs qui font déjà confiance à TerraLink
                    </p>
                    <button onClick={handleRegisterPage} className="group bg-white text-purple-900 px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                        Créer mon compte gratuitement
                        <ChevronRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">TerraLink</span>
                        </div>
                        <div className="text-white/60 text-sm">
                            © 2025 TerraLink. Tous droits réservés.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}