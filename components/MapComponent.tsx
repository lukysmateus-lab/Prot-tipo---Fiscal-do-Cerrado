
import React, { useState } from 'react';
import { MapPoint } from '../types';

interface MapComponentProps {
    points: MapPoint[];
}

const MapComponent: React.FC<MapComponentProps> = ({ points }) => {
    const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

    const getMarkerColor = (category: string) => {
        switch (category) {
            case 'Coleta Seletiva': return 'bg-blue-500';
            case 'Papa Entulho': return 'bg-yellow-500';
            case 'PEV Eletrônicos': return 'bg-green-500';
            case 'Feira de Orgânicos': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    // Normalize coordinates to fit within a 100x100 grid for positioning
    const minLat = Math.min(...points.map(p => p.location.lat));
    const maxLat = Math.max(...points.map(p => p.location.lat));
    const minLng = Math.min(...points.map(p => p.location.lng));
    const maxLng = Math.max(...points.map(p => p.location.lng));

    const normalizeLat = (lat: number) => ((lat - minLat) / (maxLat - minLat)) * 100;
    const normalizeLng = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * 100;

    return (
        <div className="relative w-full h-96 bg-brand-green-light dark:bg-brand-green-dark rounded-lg overflow-hidden my-4 border-2 border-brand-green dark:border-brand-green-light">
            {/* Mock map background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/simple-dashed.png')] opacity-20"></div>

            {points.map(point => (
                <button
                    key={point.id}
                    className={`absolute w-4 h-4 rounded-full ${getMarkerColor(point.category)} transform -translate-x-1/2 -translate-y-1/2 focus:outline-none ring-2 ring-white dark:ring-black`}
                    style={{ bottom: `${normalizeLat(point.location.lat)}%`, left: `${normalizeLng(point.location.lng)}%` }}
                    onClick={() => setSelectedPoint(point)}
                    aria-label={`Ver detalhes de ${point.name}`}
                />
            ))}

            {selectedPoint && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 bg-brand-surface-light dark:bg-brand-surface-dark p-3 rounded-lg shadow-lg z-10 animate-fade-in-up">
                    <button onClick={() => setSelectedPoint(null)} className="absolute top-1 right-1 text-gray-500">&times;</button>
                    <h3 className="font-bold text-brand-text-light dark:text-brand-text-dark">{selectedPoint.name}</h3>
                    <p className="text-sm text-brand-text-secondary dark:text-brand-text-secondary">{selectedPoint.address}</p>
                    <p className="text-xs mt-1 text-brand-text-light dark:text-brand-text-dark"><strong>Horário:</strong> {selectedPoint.hours}</p>
                    <p className="text-xs text-brand-text-light dark:text-brand-text-dark"><strong>Aceita:</strong> {selectedPoint.acceptedMaterials.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
