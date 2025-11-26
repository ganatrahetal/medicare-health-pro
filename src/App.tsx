import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { PatientManagement } from './components/PatientManagement';
import { DoctorManagement } from './components/DoctorManagement';
import { AppointmentSystem } from './components/AppointmentSystem';
import { DepartmentManagement } from './components/DepartmentManagement';
import { BillingSystem } from './components/BillingSystem';
import { PharmacyInventory } from './components/PharmacyInventory';
import { LabTests } from './components/LabTests';
import { BedManagement } from './components/BedManagement';
import { EmergencyRoom } from './components/EmergencyRoom';
import { SurgeryScheduling } from './components/SurgeryScheduling';
import { StaffManagement } from './components/StaffManagement';
import { Radiology } from './components/Radiology';
import { BloodBank } from './components/BloodBank';
import { InsuranceManagement } from './components/InsuranceManagement';
import { EquipmentManagement } from './components/EquipmentManagement';
import { ReportsAnalytics } from './components/ReportsAnalytics';
import { Toaster } from './components/ui/toaster';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  Building2, 
  CreditCard, 
  Pill, 
  TestTube, 
  BedDouble,
  Menu,
  X,
  Siren,
  Scissors,
  UserCog,
  Scan,
  Droplet,
  FileText,
  Wrench,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Badge } from './components/ui/badge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useToast } from './components/ui/use-toast';

type TabType = 'dashboard' | 'patients' | 'doctors' | 'appointments' | 'departments' | 'billing' | 'pharmacy' | 'labs' | 'beds' | 'emergency' | 'surgery' | 'staff' | 'radiology' | 'blood-bank' | 'insurance' | 'equipment' | 'reports';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(12);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Settings state
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('mdy');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [labResults, setLabResults] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);
  
  const { toast } = useToast();

  // Show landing page first
  if (showLanding) {
    return <LandingPage onViewDemo={() => setShowLanding(false)} />;
  }

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard, category: 'main', color: 'from-blue-500 to-cyan-500' },
    { id: 'patients' as TabType, label: 'Patients', icon: Users, category: 'clinical', color: 'from-violet-500 to-purple-500' },
    { id: 'doctors' as TabType, label: 'Doctors', icon: Stethoscope, category: 'clinical', color: 'from-emerald-500 to-teal-500' },
    { id: 'appointments' as TabType, label: 'Appointments', icon: Calendar, category: 'clinical', color: 'from-amber-500 to-orange-500' },
    { id: 'emergency' as TabType, label: 'Emergency', icon: Siren, category: 'clinical', badge: 3, color: 'from-red-500 to-pink-500' },
    { id: 'surgery' as TabType, label: 'Surgery', icon: Scissors, category: 'clinical', color: 'from-indigo-500 to-blue-500' },
    { id: 'labs' as TabType, label: 'Laboratory', icon: TestTube, category: 'diagnostic', color: 'from-cyan-500 to-blue-500' },
    { id: 'radiology' as TabType, label: 'Radiology', icon: Scan, category: 'diagnostic', color: 'from-purple-500 to-indigo-500' },
    { id: 'pharmacy' as TabType, label: 'Pharmacy', icon: Pill, category: 'services', color: 'from-green-500 to-emerald-500' },
    { id: 'blood-bank' as TabType, label: 'Blood Bank', icon: Droplet, category: 'services', color: 'from-rose-500 to-red-500' },
    { id: 'beds' as TabType, label: 'Bed Management', icon: BedDouble, category: 'operations', color: 'from-sky-500 to-blue-500' },
    { id: 'departments' as TabType, label: 'Departments', icon: Building2, category: 'operations', color: 'from-slate-500 to-gray-500' },
    { id: 'staff' as TabType, label: 'Staff', icon: UserCog, category: 'operations', color: 'from-teal-500 to-cyan-500' },
    { id: 'equipment' as TabType, label: 'Equipment', icon: Wrench, category: 'operations', color: 'from-orange-500 to-amber-500' },
    { id: 'billing' as TabType, label: 'Billing', icon: CreditCard, category: 'financial', color: 'from-lime-500 to-green-500' },
    { id: 'insurance' as TabType, label: 'Insurance', icon: FileText, category: 'financial', color: 'from-blue-500 to-indigo-500' },
    { id: 'reports' as TabType, label: 'Reports & Analytics', icon: BarChart3, category: 'admin', color: 'from-fuchsia-500 to-purple-500' },
  ];

  const categories = [
    { id: 'main', label: 'Main', icon: LayoutDashboard },
    { id: 'clinical', label: 'Clinical', icon: Heart },
    { id: 'diagnostic', label: 'Diagnostic', icon: TestTube },
    { id: 'services', label: 'Services', icon: Pill },
    { id: 'operations', label: 'Operations', icon: Building2 },
    { id: 'financial', label: 'Financial', icon: CreditCard },
    { id: 'admin', label: 'Admin', icon: BarChart3 },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl top-1/2 -left-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl bottom-0 right-1/3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header - Fixed */}
      <header className="glass-effect fixed top-0 left-0 right-0 z-50 border-b border-white/40 backdrop-blur-xl shadow-lg shadow-blue-500/5">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2.5 hover:bg-white/80 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl animate-pulse shadow-xl shadow-blue-500/50"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white drop-shadow-lg animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 tracking-tight">
                  MediCare Hospital Pro
                </h1>
                <p className="text-gray-500 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                  <span className="hidden sm:inline">Enterprise Healthcare Management</span>
                  <span className="sm:hidden">Online</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setHelpOpen(true)}
              className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-300 group hover:scale-105 shadow-sm"
            >
              <HelpCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2.5 hover:bg-white/80 rounded-xl transition-all duration-300 group hover:scale-105 shadow-sm"
            >
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-xl shadow-red-500/50 animate-bounce">
                  {notifications}
                </span>
              )}
            </button>
            <button 
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-300 group hover:scale-105 shadow-sm"
            >
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden sm:block" />
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-white/80 rounded-xl hover:bg-white transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-900">Dr. Sarah Johnson</p>
                <p className="text-xs text-gray-500">Chief Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                SJ
              </div>
            </div>
            <button 
              onClick={() => {
                setShowLanding(true);
              }}
              className="p-2.5 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-[89px] overflow-hidden">
        {/* Sidebar - Fixed */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed left-0 top-[89px] bottom-0 w-72 glass-effect border-r border-white/40 transition-all duration-300 z-40 lg:translate-x-0 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent shadow-xl shadow-blue-500/5`}
        >
          <nav className="p-4 space-y-6">
            {categories.map((category) => {
              const categoryTabs = tabs.filter(tab => tab.category === category.id);
              if (categoryTabs.length === 0) return null;
              const CategoryIcon = category.icon;
              
              return (
                <div key={category.id}>
                  <div className="flex items-center gap-2 px-3 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                      <CategoryIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">
                      {category.label}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {categoryTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            if (window.innerWidth < 1024) setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-xl scale-105 hover:scale-110'
                              : 'text-gray-700 hover:bg-white/80 hover:scale-102 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'} transition-colors`} />
                            <span className="text-sm">{tab.label}</span>
                          </div>
                          {tab.badge && (
                            <Badge className="bg-red-500 text-white h-5 min-w-5 px-1.5 shadow-lg shadow-red-500/50">
                              {tab.badge}
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 mt-4">
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl p-4 text-white shadow-2xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Heart className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm">Need Help?</p>
                  <p className="text-xs opacity-90">24/7 Support</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  toast({
                    title: "Contact Support",
                    description: "Support team available 24/7. Call: +1 (555) 123-4567 or email: support@medicare.com",
                    variant: "default",
                  });
                }}
                className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Contact Support
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 lg:ml-72 overflow-y-auto relative">
          <div className="p-4 md:p-6">
            <div className="max-w-[1600px] mx-auto relative z-10">
            {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
            {activeTab === 'patients' && <PatientManagement />}
            {activeTab === 'doctors' && <DoctorManagement />}
            {activeTab === 'appointments' && <AppointmentSystem />}
            {activeTab === 'departments' && <DepartmentManagement />}
            {activeTab === 'billing' && <BillingSystem />}
            {activeTab === 'pharmacy' && <PharmacyInventory />}
            {activeTab === 'labs' && <LabTests />}
            {activeTab === 'beds' && <BedManagement />}
            {activeTab === 'emergency' && <EmergencyRoom />}
            {activeTab === 'surgery' && <SurgeryScheduling />}
            {activeTab === 'staff' && <StaffManagement />}
            {activeTab === 'radiology' && <Radiology />}
            {activeTab === 'blood-bank' && <BloodBank />}
            {activeTab === 'insurance' && <InsuranceManagement />}
            {activeTab === 'equipment' && <EquipmentManagement />}
            {activeTab === 'reports' && <ReportsAnalytics />}
            </div>

            {/* Footer with Dynamic Year */}
            <footer className="mt-12 border-t border-white/40 bg-white/60 backdrop-blur-sm">
              <div className="max-w-[1600px] mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        © {new Date().getFullYear()} MediCare Hospital Pro. All rights reserved.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-md z-30 lg:hidden transition-all duration-300 animate-in fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Notifications Dialog */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50/30 border-2">
          <DialogHeader className="border-b pb-4 bg-gradient-to-r from-blue-50 to-cyan-50 -mx-6 -mt-6 px-6 pt-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Notifications</DialogTitle>
                <DialogDescription>You have {notifications} unread notifications</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-3 py-6">
            {/* Emergency Notification */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Emergency Patient Admitted</p>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <p className="text-xs text-gray-600">New emergency case in ER: John Smith - Critical condition</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Urgent</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">ER-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Surgery Update */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Scissors className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Surgery Completed Successfully</p>
                    <span className="text-xs text-gray-500">15 min ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Hip Replacement surgery for Robert Johnson completed</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Success</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">SUR-2025-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Results */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <TestTube className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Lab Results Available</p>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Blood test results ready for patient Emily Williams (P008)</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Lab Report</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Reminder */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Upcoming Appointment</p>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Dr. Sarah Martinez has an appointment at 3:00 PM today</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">Reminder</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blood Bank Alert */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Droplet className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Blood Stock Alert</p>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                  <p className="text-xs text-gray-600">O- blood type running low - Only 5 units remaining</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Low Stock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Maintenance */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Equipment Maintenance Due</p>
                    <span className="text-xs text-gray-500">5 hours ago</span>
                  </div>
                  <p className="text-xs text-gray-600">MRI Machine #2 requires scheduled maintenance this week</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-indigo-50/30 border-2">
          <DialogHeader className="border-b pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 -mx-6 -mt-6 px-6 pt-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Help & Information Center</DialogTitle>
                <DialogDescription>Get help and learn about system features</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6 py-6">
            {/* Contact Support */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <h3>Contact Support</h3>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-sm">support@medicare.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="text-sm">24/7 Support Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                  <Info className="w-5 h-5" />
                </div>
                <h3>Quick Start Guide</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm mb-1">Navigate Modules</p>
                    <p className="text-xs text-gray-600">Use the left sidebar to access different hospital management modules</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm mb-1">Search & Filter</p>
                    <p className="text-xs text-gray-600">Every module includes powerful search and filtering capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm mb-1">View Details</p>
                    <p className="text-xs text-gray-600">Click on any card or row to view comprehensive details and take actions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm mb-1">Real-time Updates</p>
                    <p className="text-xs text-gray-600">The system provides real-time notifications and status updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Features */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white">
                  <Heart className="w-5 h-5" />
                </div>
                <h3>System Features</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm mb-1">✓ Patient Management</p>
                  <p className="text-xs text-gray-600">Comprehensive patient records</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm mb-1">✓ Appointment Scheduling</p>
                  <p className="text-xs text-gray-600">Intelligent scheduling system</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm mb-1">✓ Billing & Insurance</p>
                  <p className="text-xs text-gray-600">Automated billing processing</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm mb-1">✓ Emergency Management</p>
                  <p className="text-xs text-gray-600">Real-time ER tracking</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm mb-1">✓ Surgery Scheduling</p>
                  <p className="text-xs text-gray-600">Operating room management</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm mb-1">✓ Lab & Radiology</p>
                  <p className="text-xs text-gray-600">Diagnostic test management</p>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <h3>Documentation & Resources</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Access comprehensive documentation, video tutorials, and training materials:</p>
              <div className="space-y-2">
                <button className="w-full p-3 bg-white hover:bg-amber-50 rounded-lg text-left text-sm transition-colors flex items-center justify-between">
                  <span>User Manual (PDF)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-white hover:bg-amber-50 rounded-lg text-left text-sm transition-colors flex items-center justify-between">
                  <span>Video Tutorials</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-white hover:bg-amber-50 rounded-lg text-left text-sm transition-colors flex items-center justify-between">
                  <span>FAQ & Troubleshooting</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-slate-50/30 border-2">
          <DialogHeader className="border-b pb-4 bg-gradient-to-r from-slate-50 to-gray-50 -mx-6 -mt-6 px-6 pt-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">System Settings</DialogTitle>
                <DialogDescription>Configure your hospital management system preferences</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6 py-6">
            {/* Account Settings */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                  <Users className="w-5 h-5" />
                </div>
                <h3>Account Settings</h3>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">Profile Information</p>
                    <p className="text-xs text-gray-600">Update your personal details and contact information</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">Change Password</p>
                    <p className="text-xs text-gray-600">Update your account password for security</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-600">Enable 2FA for enhanced security</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <h3>Notification Preferences</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">Emergency Alerts</p>
                    <p className="text-xs text-gray-600">Get notified about emergency cases</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={emergencyAlerts} onChange={() => setEmergencyAlerts(!emergencyAlerts)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">Appointment Reminders</p>
                    <p className="text-xs text-gray-600">Receive reminders for upcoming appointments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={appointmentReminders} onChange={() => setAppointmentReminders(!appointmentReminders)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">Lab Results</p>
                    <p className="text-xs text-gray-600">Notifications when lab results are ready</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={labResults} onChange={() => setLabResults(!labResults)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <p className="text-sm mb-1">System Updates</p>
                    <p className="text-xs text-gray-600">Get notified about system updates and maintenance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={systemUpdates} onChange={() => setSystemUpdates(!systemUpdates)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <h3>Display Settings</h3>
              </div>
              <div className="grid gap-4">
                {/* Theme Setting */}
                <div className="p-5 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm mb-1">Theme</p>
                      <p className="text-xs text-gray-600">Choose your preferred color theme</p>
                    </div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg text-sm shadow-sm">
                      {theme === 'light' ? 'Light Mode' : theme === 'dark' ? 'Dark Mode' : 'Auto'}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        theme === 'light'
                          ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-400 shadow-lg shadow-amber-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-amber-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          theme === 'light' 
                            ? 'bg-gradient-to-br from-amber-400 to-yellow-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          <span className="text-2xl">☀️</span>
                        </div>
                        <p className="text-xs">Light Mode</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-indigo-100 to-blue-100 border-2 border-indigo-400 shadow-lg shadow-indigo-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-indigo-400 to-blue-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          <span className="text-2xl">🌙</span>
                        </div>
                        <p className="text-xs">Dark Mode</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTheme('auto')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        theme === 'auto'
                          ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400 shadow-lg shadow-purple-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          theme === 'auto' 
                            ? 'bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          <span className="text-2xl">🔄</span>
                        </div>
                        <p className="text-xs">Auto</p>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Language Setting */}
                <div className="p-5 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm mb-1">Language</p>
                      <p className="text-xs text-gray-600">Select your preferred language</p>
                    </div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg text-sm shadow-sm">
                      {language === 'en' ? 'English' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : 'German'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        language === 'en'
                          ? 'bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-400 shadow-lg shadow-blue-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                          language === 'en' 
                            ? 'bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          🇺🇸
                        </div>
                        <p className="text-sm">English</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setLanguage('es')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        language === 'es'
                          ? 'bg-gradient-to-br from-rose-100 to-red-100 border-2 border-rose-400 shadow-lg shadow-rose-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-rose-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                          language === 'es' 
                            ? 'bg-gradient-to-br from-rose-400 to-red-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          🇪🇸
                        </div>
                        <p className="text-sm">Spanish</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setLanguage('fr')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        language === 'fr'
                          ? 'bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-400 shadow-lg shadow-indigo-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                          language === 'fr' 
                            ? 'bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          🇫🇷
                        </div>
                        <p className="text-sm">French</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setLanguage('de')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        language === 'de'
                          ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-400 shadow-lg shadow-amber-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-amber-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                          language === 'de' 
                            ? 'bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg' 
                            : 'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          🇩🇪
                        </div>
                        <p className="text-sm">German</p>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Date Format Setting */}
                <div className="p-5 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm mb-1">Date Format</p>
                      <p className="text-xs text-gray-600">Choose date display format</p>
                    </div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg text-sm shadow-sm">
                      {dateFormat === 'mdy' ? 'MM/DD/YYYY' : dateFormat === 'dmy' ? 'DD/MM/YYYY' : 'YYYY-MM-DD'}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <button
                      onClick={() => setDateFormat('mdy')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        dateFormat === 'mdy'
                          ? 'bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-400 shadow-lg shadow-blue-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            dateFormat === 'mdy' 
                              ? 'bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg' 
                              : 'bg-gradient-to-br from-gray-300 to-gray-400'
                          }`}>
                            <span className="text-xl">📅</span>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">MM/DD/YYYY</p>
                            <p className="text-xs text-gray-600">US Format</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-lg">
                          11/13/2025
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setDateFormat('dmy')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        dateFormat === 'dmy'
                          ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400 shadow-lg shadow-purple-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            dateFormat === 'dmy' 
                              ? 'bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg' 
                              : 'bg-gradient-to-br from-gray-300 to-gray-400'
                          }`}>
                            <span className="text-xl">📅</span>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">DD/MM/YYYY</p>
                            <p className="text-xs text-gray-600">EU Format</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-lg">
                          13/11/2025
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setDateFormat('ymd')}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        dateFormat === 'ymd'
                          ? 'bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-400 shadow-lg shadow-emerald-200/50'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            dateFormat === 'ymd' 
                              ? 'bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg' 
                              : 'bg-gradient-to-br from-gray-300 to-gray-400'
                          }`}>
                            <span className="text-xl">📅</span>
                          </div>
                          <div className="text-left">
                            <p className="text-sm">YYYY-MM-DD</p>
                            <p className="text-xs text-gray-600">ISO Format</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-lg">
                          2025-11-13
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-500 rounded-lg flex items-center justify-center text-white">
                  <Info className="w-5 h-5" />
                </div>
                <h3>System Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Version</p>
                  <p className="text-sm">MediCare Pro v3.2.1</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                  <p className="text-sm">November 13, 2025</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">License Type</p>
                  <p className="text-sm">Enterprise Edition</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Support Status</p>
                  <p className="text-sm text-green-600">Active - Premium Support</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}