import { useState, useEffect } from 'react';
import type { Customer } from './types';
import { INITIAL_CUSTOMERS } from './lib/mockDataset';

// Components & Layout
import { Sidebar } from './components/Layout/Sidebar';
import type { NavItem } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { CustomerManagementPage } from './pages/CustomerManagementPage';
import { PredictionPage } from './pages/PredictionPage';
import { SegmentsPage } from './pages/SegmentsPage';
import { RetentionPage } from './pages/RetentionPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import type { NotificationItem } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

// Modals
import { Customer360Modal } from './components/Customer/Customer360Modal';
import { ExcelImportModal } from './components/Excel/ExcelImportModal';
import { PitchModeModal } from './components/Pitch/PitchModeModal';

export function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Datasets State
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Modals
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Dataset Synchronized Alert',
      message: 'New customer dataset processed. All KPIs, risk metrics, and charts recalculated.',
      timestamp: 'Just now',
      type: 'system',
      read: false,
    },
    {
      id: 'n2',
      title: 'High Churn Risk Spike Alert',
      message: 'VIP Account Marcus Chen (CLV $8,200) risk score spiked to 88% due to shipping delay.',
      timestamp: '10 mins ago',
      type: 'alert',
      read: false,
    },
    {
      id: 'n3',
      title: 'XGBoost Model Retrained',
      message: 'Model retrained on latest dataset. Accuracy stable at 91.82%, ROC-AUC 0.926.',
      timestamp: '1 hour ago',
      type: 'ai',
      read: true,
    },
  ]);

  // Apply dark mode class to html document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Completely replaces existing dataset with newly uploaded dataset
  const handleImportExcelCustomers = (imported: Customer[], stats?: any) => {
    if (imported && imported.length > 0) {
      setCustomers(imported);
      
      // Add system notification for dataset sync
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'Dataset Successfully Synchronized',
        message: `Dashboard refreshed with ${imported.length.toLocaleString()} customer records.${stats ? ` Model accuracy: ${stats.model_accuracy}%` : ''}`,
        timestamp: 'Just now',
        type: 'system',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
    setIsExcelModalOpen(false);
  };

  const handleDeployRetention = (customer: Customer) => {
    setSelectedCustomer(customer);
    setActiveTab('retention');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Filter customers by search term
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors font-sans">
      
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenExcelModal={() => setIsExcelModalOpen(true)}
          onOpenPitchModal={() => setIsPitchModalOpen(true)}
          unreadCount={unreadCount}
          onOpenNotifications={() => setActiveTab('notifications')}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {activeTab === 'dashboard' && (
            <DashboardPage
              customers={filteredCustomers}
              onSelectCustomer={setSelectedCustomer}
              onDeployRetention={handleDeployRetention}
              onOpenPitch={() => setIsPitchModalOpen(true)}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerManagementPage
              customers={filteredCustomers}
              onSelectCustomer={setSelectedCustomer}
              onDeployRetention={handleDeployRetention}
            />
          )}

          {activeTab === 'predictions' && <PredictionPage />}

          {activeTab === 'segments' && (
            <SegmentsPage
              customers={filteredCustomers}
              onSelectCustomer={setSelectedCustomer}
              onDeployRetention={handleDeployRetention}
            />
          )}

          {activeTab === 'retention' && (
            <RetentionPage
              customers={filteredCustomers}
              selectedCustomer={selectedCustomer}
              onClearCustomer={() => setSelectedCustomer(null)}
              onSelectCustomer={setSelectedCustomer}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsPage customers={filteredCustomers} />}

          {activeTab === 'reports' && <ReportsPage customers={filteredCustomers} />}

          {activeTab === 'notifications' && (
            <NotificationsPage
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          )}

          {activeTab === 'settings' && <SettingsPage />}

        </main>
      </div>

      {/* Modals */}
      {selectedCustomer && (
        <Customer360Modal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onDeployRetention={handleDeployRetention}
        />
      )}

      <ExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onCustomersImported={handleImportExcelCustomers}
      />

      <PitchModeModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
      />

    </div>
  );
}

export default App;
