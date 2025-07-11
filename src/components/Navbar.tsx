'use client';
import React from 'react';
import {
    Bell, Settings, LogOut,
    Menu
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout, stopLoading } from '@/store/authSlice';

export default function Navbar({ currentTitle, toggleSidebar }: {
    currentTitle: string;
    toggleSidebar: () => void;
}) {

    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <div className="bg-gray-50 flex">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Menu className="w-5 h-5 text-gray-600" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {currentTitle}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <button onClick={() => router.push("/pages/settings")} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(logout());
                                    router.push("/auth/login");
                                    dispatch(stopLoading());
                                }}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <LogOut className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}
