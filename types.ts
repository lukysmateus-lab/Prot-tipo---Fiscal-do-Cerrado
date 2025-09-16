
import type { ReactElement } from 'react';

export enum Page {
  Report = 'Denunciar',
  Solutions = 'Solucionar',
  Engage = 'Participar',
  Profile = 'Perfil',
}

export enum ReportCategory {
  Lixo = 'Lixo em local inadequado',
  Incendio = 'Foco de incêndio',
  Desmatamento = 'Desmatamento',
  Pichacao = 'Pichação em monumentos',
  Outro = 'Outro',
}

export enum ReportStatus {
  Recebida = 'Recebida',
  EmAnalise = 'Em análise',
  Solucionado = 'Solucionado',
}

export interface Report {
  id: number;
  category: ReportCategory;
  description: string;
  location: { lat: number; lng: number };
  imageUrl?: string;
  status: ReportStatus;
  timestamp: string;
}

export enum PointCategory {
  ColetaSeletiva = 'Coleta Seletiva',
  PapaEntulho = 'Papa Entulho',
  PEV = 'PEV Eletrônicos',
  Organicos = 'Feira de Orgânicos',
}

export interface MapPoint {
  id: number;
  category: PointCategory;
  name: string;
  address: string;
  hours: string;
  acceptedMaterials: string[];
  location: { lat: number; lng: number };
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  organizer: string;
  participants: number;
}

export interface Badge {
  id: number;
  name: string;
  // Fix: Replaced JSX.Element with ReactElement to resolve namespace error.
  icon: ReactElement;
  description: string;
}

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  points: number;
  badges: number[];
}

export interface PartnerOffer {
  id: number;
  name: string;
  description: string;
  cost: number;
  logoUrl: string;
}