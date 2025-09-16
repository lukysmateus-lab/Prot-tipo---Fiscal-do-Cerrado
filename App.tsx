import React, { useState, useEffect, useCallback } from 'react';
import { Page, Report, Event, User, MapPoint, ReportCategory, ReportStatus, PointCategory, Badge, PartnerOffer } from './types';
import { ICONS, MOCK_REPORTS, MOCK_EVENTS, MOCK_USERS, MOCK_MAP_POINTS, MOCK_BADGES, MOCK_PARTNER_OFFERS } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Modal from './components/Modal';
import MapComponent from './components/MapComponent';


// --- PAGE COMPONENTS (defined in the same file to keep file count low) ---

// Report Card Component
const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    const statusColor = {
        [ReportStatus.Recebida]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        [ReportStatus.EmAnalise]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        [ReportStatus.Solucionado]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return (
        <div className="bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg shadow-md p-4 mb-4">
            {report.imageUrl && <img src={report.imageUrl} alt="Denúncia" className="rounded-md w-full h-32 object-cover mb-3" />}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-brand-text-light dark:text-brand-text-dark">{report.category}</h3>
                    <p className="text-sm text-brand-text-secondary dark:text-brand-text-secondary mt-1">{report.description}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColor[report.status]}`}>{report.status}</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{new Date(report.timestamp).toLocaleString()}</p>
        </div>
    );
};

// Report Form Component
const ReportForm: React.FC<{ onAddReport: (report: Omit<Report, 'id' | 'timestamp' | 'status'>) => void; closeModal: () => void }> = ({ onAddReport, closeModal }) => {
    const [category, setCategory] = useState<ReportCategory>(ReportCategory.Lixo);
    const [description, setDescription] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddReport({
            category,
            description,
            location: { lat: -15.8, lng: -47.85 }, // Mock location
        });
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary dark:text-brand-text-secondary mb-1">Categoria</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as ReportCategory)} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2">
                    {Object.values(ReportCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary dark:text-brand-text-secondary mb-1">Descrição</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2" required />
            </div>
            <div className="flex items-center justify-between">
                <button type="button" className="flex items-center space-x-2 text-brand-green-dark dark:text-brand-green-light font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    {ICONS.location}<span>Obter Localização</span>
                </button>
                 <button type="button" className="flex items-center space-x-2 text-brand-green-dark dark:text-brand-green-light font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    {ICONS.camera}<span>Anexar Foto</span>
                </button>
            </div>
            <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Enviar Denúncia
            </button>
        </form>
    );
};

// Report Page
const ReportPage: React.FC<{ reports: Report[]; addReport: (report: Report) => void }> = ({ reports, addReport }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddReport = (reportData: Omit<Report, 'id' | 'timestamp' | 'status'>) => {
        const newReport: Report = {
            ...reportData,
            id: reports.length + 1,
            timestamp: new Date().toISOString(),
            status: ReportStatus.Recebida,
            imageUrl: `https://picsum.photos/400/300?grayscale&random=${reports.length + 1}`
        };
        addReport(newReport);
    };

    return (
        <>
            <div className="p-4">
                <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center space-x-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-4 rounded-lg transition-colors mb-6 shadow-lg">
                    {ICONS.plus}
                    <span>Fazer Nova Denúncia</span>
                </button>
                <h2 className="text-xl font-bold mb-4 text-brand-text-light dark:text-brand-text-dark">Minhas Denúncias</h2>
                {reports.length > 0 ? reports.map(report => <ReportCard key={report.id} report={report} />) : <p className="text-brand-text-secondary dark:text-brand-text-secondary">Nenhuma denúncia feita ainda.</p>}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Denúncia">
                <ReportForm onAddReport={handleAddReport} closeModal={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

// Solutions Page
const SolutionsPage: React.FC<{ mapPoints: MapPoint[] }> = ({ mapPoints }) => {
    const [filter, setFilter] = useState<PointCategory | 'all'>('all');
    
    const filteredPoints = filter === 'all' ? mapPoints : mapPoints.filter(p => p.category === filter);
    const categories = ['all', ...Object.values(PointCategory)];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2 text-brand-text-light dark:text-brand-text-dark">Encontrar Soluções</h2>
            <p className="text-brand-text-secondary dark:text-brand-text-secondary mb-4">Localize pontos de coleta, feiras e mais.</p>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as PointCategory | 'all')}
                        className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${filter === cat ? 'bg-brand-green text-white' : 'bg-brand-surface-light dark:bg-brand-surface-dark text-brand-text-light dark:text-brand-text-dark'}`}
                    >
                        {cat === 'all' ? 'Todos' : cat}
                    </button>
                ))}
            </div>
            <MapComponent points={filteredPoints} />
        </div>
    );
};

// Event Form Component
const EventForm: React.FC<{ onAddEvent: (event: Omit<Event, 'id' | 'participants' | 'organizer'>) => void; closeModal: () => void; currentUserName: string; }> = ({ onAddEvent, closeModal, currentUserName }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent({ title, date, location, description });
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary dark:text-brand-text-secondary mb-1">Título do Evento</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-brand-text-secondary dark:text-brand-text-secondary mb-1">Data e Hora</label>
                <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-brand-text-secondary dark:text-brand-text-secondary mb-1">Local</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary dark:text-brand-text-secondary mb-1">Descrição</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2" required />
            </div>
            <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Criar Evento
            </button>
        </form>
    );
};

// Engage Page
const EngagePage: React.FC<{ events: Event[]; addEvent: (event: Event) => void; joinEvent: (eventId: number) => void; currentUserName: string; }> = ({ events, addEvent, joinEvent, currentUserName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddEvent = (eventData: Omit<Event, 'id'| 'participants' | 'organizer'>) => {
        const newEvent: Event = {
            ...eventData,
            id: events.length + 1,
            participants: 1,
            organizer: currentUserName,
        };
        addEvent(newEvent);
    };

    const EventCard: React.FC<{ event: Event }> = ({ event }) => (
        <div className="bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg shadow-md p-4 mb-4">
            <h3 className="font-bold text-brand-text-light dark:text-brand-text-dark">{event.title}</h3>
            <p className="text-sm text-brand-green-dark dark:text-brand-green-light font-semibold">{new Date(event.date).toLocaleString()} @ {event.location}</p>
            <p className="text-sm text-brand-text-secondary dark:text-brand-text-secondary my-2">{event.description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Organizado por: {event.organizer}</span>
                <button onClick={() => joinEvent(event.id)} className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-bold py-1 px-3 rounded-full transition-colors">Participar</button>
            </div>
        </div>
    );

    return (
        <>
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark">Participe</h2>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-1 bg-brand-green/20 text-brand-green-dark dark:text-brand-green-light text-sm font-bold py-2 px-3 rounded-full">
                        {ICONS.plus}
                        <span>Criar Evento</span>
                    </button>
                </div>
                {events.map(event => <EventCard key={event.id} event={event} />)}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Evento">
                <EventForm onAddEvent={handleAddEvent} closeModal={() => setIsModalOpen(false)} currentUserName={currentUserName}/>
            </Modal>
        </>
    );
};


// Profile Page
const ProfilePage: React.FC<{
    currentUser: User;
    allUsers: User[];
    badges: Badge[];
    partnerOffers: PartnerOffer[];
    redeemOffer: (offer: PartnerOffer) => void;
}> = ({ currentUser, allUsers, badges, partnerOffers, redeemOffer }) => {
    const userBadges = badges.filter(badge => currentUser.badges.includes(badge.id));
    const sortedUsers = [...allUsers].sort((a, b) => b.points - a.points);

    return (
        <div className="p-4 space-y-8">
            {/* User Info */}
            <div className="flex flex-col items-center">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full border-4 border-brand-green-light" />
                <h2 className="text-2xl font-bold mt-3 text-brand-text-light dark:text-brand-text-dark">{currentUser.name}</h2>
                <p className="text-brand-orange-dark font-bold text-lg">{currentUser.points} Pontos</p>
            </div>

            {/* Badges */}
            <div>
                <h3 className="text-lg font-bold mb-3 text-brand-text-light dark:text-brand-text-dark">Minhas Medalhas</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                    {userBadges.length > 0 ? userBadges.map(badge => (
                        <div key={badge.id} className="flex flex-col items-center">
                            {badge.icon}
                            <span className="text-xs mt-1 text-brand-text-secondary dark:text-brand-text-secondary">{badge.name}</span>
                        </div>
                    )) : <p className="col-span-4 text-sm text-brand-text-secondary">Continue participando para ganhar medalhas!</p>}
                </div>
            </div>

            {/* Ranking */}
            <div>
                <h3 className="text-lg font-bold mb-3 text-brand-text-light dark:text-brand-text-dark">Ranking de Fiscais</h3>
                <div className="space-y-2">
                    {sortedUsers.slice(0, 5).map((user, index) => (
                         <div key={user.id} className={`flex items-center p-3 rounded-lg ${user.id === currentUser.id ? 'bg-brand-green-light dark:bg-brand-green-dark' : 'bg-brand-surface-light dark:bg-brand-surface-dark'}`}>
                             <span className="font-bold w-6">{index + 1}</span>
                             <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mx-3" />
                             <span className="flex-grow text-brand-text-light dark:text-brand-text-dark">{user.name}</span>
                             <span className="font-bold text-brand-orange-dark">{user.points} pts</span>
                         </div>
                    ))}
                </div>
            </div>

             {/* Partner Offers */}
            <div>
                <h3 className="text-lg font-bold mb-3 text-brand-text-light dark:text-brand-text-dark">Trocar Pontos</h3>
                 <div className="space-y-3">
                    {partnerOffers.map(offer => (
                        <div key={offer.id} className="bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg p-3 flex items-center justify-between shadow">
                            <div className="flex items-center">
                                <img src={offer.logoUrl} alt={offer.name} className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <h4 className="font-semibold text-sm text-brand-text-light dark:text-brand-text-dark">{offer.name}</h4>
                                    <p className="text-xs text-brand-text-secondary dark:text-brand-text-secondary">{offer.description}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => redeemOffer(offer)} 
                                disabled={currentUser.points < offer.cost}
                                className="bg-brand-orange text-white text-xs font-bold py-1 px-3 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-brand-orange-dark"
                            >
                                {offer.cost} pts
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Toast Component ---
const Toast: React.FC<{ message: string; onDismiss: () => void }> = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000); // Dismiss after 3 seconds
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-brand-green-dark text-white px-6 py-3 rounded-full shadow-lg z-50 animate-toast-in">
            {message}
        </div>
    );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Report);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [users] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [mapPoints] = useState<MapPoint[]>(MOCK_MAP_POINTS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState('text-base');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
    setCurrentUser(prev => ({ ...prev, points: prev.points + 25 })); // Add points for reporting
    showToast("Denúncia enviada com sucesso!");
  };
  
  const addEvent = (event: Event) => {
    setEvents(prev => [event, ...prev]);
    setCurrentUser(prev => ({ ...prev, points: prev.points + 50 })); // Add points for creating event
    showToast("Evento criado com sucesso!");
  };

  const handleJoinEvent = (eventId: number) => {
      // Here you would typically handle registration logic
      // For the prototype, we just give points and feedback
      setCurrentUser(prev => ({ ...prev, points: prev.points + 15 }));
      showToast("Inscrição no evento confirmada!");
  };

  const handleRedeemOffer = (offer: PartnerOffer) => {
      if(currentUser.points >= offer.cost) {
          setCurrentUser(prev => ({ ...prev, points: prev.points - offer.cost }));
          showToast("Recompensa resgatada!");
      } else {
          showToast("Pontos insuficientes.");
      }
  };

  const renderPage = () => {
    switch (activePage) {
      case Page.Report:
        return <ReportPage reports={reports} addReport={addReport} />;
      case Page.Solutions:
        return <SolutionsPage mapPoints={mapPoints} />;
      case Page.Engage:
        return <EngagePage events={events} addEvent={addEvent} joinEvent={handleJoinEvent} currentUserName={currentUser.name} />;
      case Page.Profile:
        return <ProfilePage currentUser={currentUser} allUsers={users} badges={MOCK_BADGES} partnerOffers={MOCK_PARTNER_OFFERS} redeemOffer={handleRedeemOffer}/>;
      default:
        return <ReportPage reports={reports} addReport={addReport} />;
    }
  };

  return (
    <div className={`w-full max-w-lg mx-auto bg-brand-bg-light dark:bg-brand-bg-dark min-h-screen shadow-2xl flex flex-col ${fontSize}`}>
      <Header 
        currentUser={currentUser} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        fontSize={fontSize}
        setFontSize={setFontSize} 
      />
      <main className="flex-grow pb-20">
        {renderPage()}
      </main>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
      {toastMessage && <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />}
    </div>
  );
};

export default App;