import { Map, MapPin } from 'lucide-react'
import React from 'react'

const Properties = () => {
  return (
    <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Gestion des propriétés</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                <Map className="w-4 h-4" />
                <span>Voir sur la carte</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Parcelle #{i.toString().padStart(3, '0')}</h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Immatriculée
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Type:</strong> Résidentiel</p>
                    <p><strong>Surface:</strong> 500 m²</p>
                    <p><strong>Localisation:</strong> Douala, Littoral</p>
                    <p><strong>Propriétaire:</strong> Jean Kouakou</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                      Voir détails
                    </button>
                    <button className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default Properties
