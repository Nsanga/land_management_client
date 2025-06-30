import { Send } from 'lucide-react'
import React from 'react'

const Messages = () => {
  return (
    <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Centre de messages</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Conversations</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      { name: 'Jean Kouakou', message: 'Question sur mon dossier REQ-001', time: '10:30', unread: true },
                      { name: 'Marie Dubois', message: 'Documents supplémentaires', time: '09:15', unread: false },
                      { name: 'Pierre Martin', message: 'Merci pour l\'approbation', time: 'Hier', unread: false },
                      { name: 'Sophie Ngomo', message: 'Quand puis-je récupérer...', time: 'Hier', unread: true }
                    ].map((conv, i) => (
                      <div key={i} className={`p-4 hover:bg-gray-50 cursor-pointer ${conv.unread ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className={`font-medium ${conv.unread ? 'text-blue-900' : 'text-gray-900'}`}>
                              {conv.name}
                            </h4>
                            <p className={`text-sm truncate ${conv.unread ? 'text-blue-700' : 'text-gray-600'}`}>
                              {conv.message}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 ml-2">
                            {conv.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Jean Kouakou</h3>
                    <p className="text-sm text-gray-600">En ligne il y a 5 min</p>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">Bonjour, j&apos;aimerais avoir des nouvelles de mon dossier REQ-001.</p>
                          <p className="text-xs text-gray-500 mt-1">10:30</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                          <p className="text-sm">Bonjour Jean, votre dossier est en cours de traitement. Nous vous tiendrons informé.</p>
                          <p className="text-xs text-blue-200 mt-1">10:32</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Tapez votre message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Messages
