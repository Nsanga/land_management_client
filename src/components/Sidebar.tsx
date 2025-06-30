'use client';
import React from 'react';
import {
    MapPin, FileText, User, Settings,
    Home, Users, BarChart3, Map, MessageSquare
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

export default function SideBar({ sidebarOpen }: {
    sidebarOpen: boolean;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useSelector((state: RootState) => state.auth.user);

    const isActive = (pathId: string) => pathname.includes(pathId);

    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: Home },
        { id: 'requests', label: 'Demandes', icon: FileText },
        { id: 'properties', label: 'Propriétés', icon: Map },
        { id: 'agents', label: 'Agents', icon: Users },
        { id: 'analytics', label: 'Analyses', icon: BarChart3 },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'settings', label: 'Paramètres', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex border-r">
            {/* Sidebar */}
            <div className={`bg-white shadow-xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
                } flex flex-col`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        {sidebarOpen && <span className="text-xl font-bold text-gray-800">TerraLink</span>}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => router.push(`/pages/${item.id}`)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${isActive(item.id)
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800">{user?.userInfo.firstName + " " + user?.userInfo.lastName}</div>
                                <div className="text-xs text-gray-500">{user?.userInfo.email}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
