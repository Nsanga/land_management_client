// /app/pages/layout.tsx
'use client';
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import PrivateRoute from "@/utils/PrivateRoute";
import ClientOnly from "./ClientOnly";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/pages/dashboard": "Tableau de bord",
    "/pages/requests": "Demandes",
    "/pages/properties": "Propriétés",
    "/pages/agents": "Agents",
    "/pages/analytics": "Analyses",
    "/pages/messages": "Messages",
    "/pages/settings": "Paramètres",
  };

  const currentTitle = pageTitles[pathname] || "";

  return (
    <ClientOnly>
      <PrivateRoute>
        <div className="flex h-screen">
          <Sidebar sidebarOpen={sidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar currentTitle={currentTitle} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-auto p-6 bg-white">
              {children}
            </main>
          </div>
        </div>
      </PrivateRoute>
    </ClientOnly>
  );
}
