import { Plus, User, Settings } from 'lucide-react'
import React from 'react'

const Agents = () => {
  return (
    <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Gestion des agents</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nouvel agent</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Paul Mbarga', role: 'Agent senior', region: 'Centre', status: 'Actif', cases: 12 },
                { name: 'Marie Essono', role: 'Agent', region: 'Littoral', status: 'Actif', cases: 8 },
                { name: 'Jean Fouda', role: 'Superviseur', region: 'Nord', status: 'Actif', cases: 15 },
                { name: 'Sophie Biya', role: 'Agent', region: 'Ouest', status: 'Inactif', cases: 5 },
                { name: 'Daniel Njoya', role: 'Agent senior', region: 'Adamaoua', status: 'Actif', cases: 10 },
                { name: 'Grace Manga', role: 'Agent', region: 'Sud', status: 'Actif', cases: 7 }
              ].map((agent, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Région:</strong> {agent.region}</p>
                    <p><strong>Dossiers actifs:</strong> {agent.cases}</p>
                    <div className="flex items-center space-x-2">
                      <strong>Statut:</strong>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        agent.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                      Contacter
                    </button>
                    <button className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default Agents
