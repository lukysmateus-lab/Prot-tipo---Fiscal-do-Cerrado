
import { Report, ReportCategory, ReportStatus, PointCategory, MapPoint, Event, User, Badge, PartnerOffer } from './types';
import React from 'react';

// Icons (Heroicons)
export const ICONS = {
     denuncia: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    solucionar: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 011.447-.894L9 9m0 11l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V7.618a1 1 0 00-1.447-.894L15 9m-6-2l6-3m0 0l6 3m-6-3V3" /></svg>,
    participar: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    perfil: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    location: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
    camera: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
    plus: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>,
    tree: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zM10 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zM16 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
    water: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
    fire: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM4.22 5.22a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM15.78 6.28a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM3.5 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM14.25 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.22 14.78a.75.75 0 011.06 0l1.06-1.06a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06zM15.78 13.72a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" clipRule="evenodd" /><path d="M10 4.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
    community: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>,
    sun: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    moon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
};


export const MOCK_BADGES: Badge[] = [
  { id: 1, name: 'Guardião das Árvores', icon: ICONS.tree, description: 'Participou de 3 eventos de plantio.' },
  { id: 2, name: 'Defensor das Águas', icon: ICONS.water, description: 'Realizou 5 denúncias de lixo perto de rios.' },
  { id: 3, name: 'Vigia do Fogo', icon: ICONS.fire, description: 'Reportou 2 focos de incêndio.' },
  { id: 4, name: 'Engajador Comunitário', icon: ICONS.community, description: 'Criou um evento com mais de 10 participantes.' },
];

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Ana', avatarUrl: 'https://picsum.photos/id/237/100', points: 1250, badges: [1, 2] },
  { id: 2, name: 'Bruno', avatarUrl: 'https://picsum.photos/id/238/100', points: 1100, badges: [3] },
  { id: 3, name: 'Carla', avatarUrl: 'https://picsum.photos/id/239/100', points: 980, badges: [1] },
  { id: 4, name: 'Daniel', avatarUrl: 'https://picsum.photos/id/240/100', points: 760, badges: [] },
  { id: 5, name: 'Eduarda', avatarUrl: 'https://picsum.photos/id/241/100', points: 540, badges: [4] },
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 1,
    category: ReportCategory.Lixo,
    description: 'Grande quantidade de lixo e entulho na margem do Lago Paranoá.',
    location: { lat: -15.79, lng: -47.88 },
    status: ReportStatus.Solucionado,
    timestamp: '2024-07-28T10:00:00Z',
    imageUrl: 'https://picsum.photos/400/300?grayscale&random=1'
  },
  {
    id: 2,
    category: ReportCategory.Incendio,
    description: 'Fumaça vista próxima ao Parque Nacional de Brasília.',
    location: { lat: -15.70, lng: -47.93 },
    status: ReportStatus.EmAnalise,
    timestamp: '2024-07-29T14:30:00Z',
    imageUrl: 'https://picsum.photos/400/300?grayscale&random=2'
  },
];

export const MOCK_MAP_POINTS: MapPoint[] = [
    { id: 1, category: PointCategory.ColetaSeletiva, name: 'Ponto Verde - Asa Sul', address: 'SQS 108, Bloco A', hours: '24 horas', acceptedMaterials: ['Plástico', 'Papel', 'Metal', 'Vidro'], location: { lat: -15.809, lng: -47.885 } },
    { id: 2, category: PointCategory.PapaEntulho, name: 'Papa Entulho - Taguatinga', address: 'QNL 2, Taguatinga Norte', hours: '08:00 - 18:00', acceptedMaterials: ['Restos de obra', 'Móveis velhos', 'Poda de árvore'], location: { lat: -15.820, lng: -48.055 } },
    { id: 3, category: PointCategory.PEV, name: 'PEV Eletro - Pátio Brasil', address: 'SCS Quadra 7', hours: '10:00 - 22:00', acceptedMaterials: ['Pilhas', 'Baterias', 'Celulares', 'Computadores'], location: { lat: -15.795, lng: -47.888 } },
    { id: 4, category: PointCategory.Organicos, name: 'Feira Orgânica do CCBB', address: 'SCES Trecho 2', hours: 'Sábados, 09:00 - 15:00', acceptedMaterials: ['Frutas', 'Verduras', 'Legumes'], location: { lat: -15.802, lng: -47.818 } },
];

export const MOCK_EVENTS: Event[] = [
    { id: 1, title: 'Plantio de Ipês no Parque da Cidade', date: '2024-08-15', location: 'Parque da Cidade Sarah Kubitschek', description: 'Vamos nos reunir para plantar 100 mudas de ipês e deixar nossa cidade mais colorida.', organizer: 'Comunidade Ativa', participants: 45 },
    { id: 2, title: 'Mutirão de Limpeza no Lago Paranoá', date: '2024-08-22', location: 'Orla da Ponte JK', description: 'Um dia dedicado a retirar o lixo das margens do nosso lago.', organizer: 'Amigos do Lago', participants: 78 },
];

export const MOCK_PARTNER_OFFERS: PartnerOffer[] = [
    { id: 1, name: 'Copo Reutilizável Grátis', description: 'Troque seus pontos por um copo ecológico na loja "Mundo Verde".', cost: 250, logoUrl: 'https://picsum.photos/id/10/100' },
    { id: 2, name: '10% de Desconto em Orgânicos', description: 'Use seus pontos para ganhar desconto na feira "Sabor da Terra".', cost: 150, logoUrl: 'https://picsum.photos/id/20/100' },
    { id: 3, name: 'Refeição Vegetariana', description: 'Desfrute de uma deliciosa refeição no restaurante "Girassol".', cost: 500, logoUrl: 'https://picsum.photos/id/30/100' },
];

