import { Users, UserCheck, Calendar, BedDouble, TrendingUp, AlertCircle, Clock, DollarSign, Activity, Heart, Zap, ArrowUpRight, Stethoscope, Syringe, Pill, Scissors, TestTube, Droplet, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';

type TabType = 'dashboard' | 'patients' | 'doctors' | 'appointments' | 'departments' | 'billing' | 'pharmacy' | 'labs' | 'beds' | 'emergency' | 'surgery' | 'staff' | 'radiology' | 'blood-bank' | 'insurance' | 'equipment' | 'reports';

interface DashboardProps {
  onNavigate: (tab: TabType) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { 
      title: 'Total Patients', 
      value: '2,847', 
      change: '+12.5%', 
      icon: Users, 
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    { 
      title: 'Active Doctors', 
      value: '142', 
      change: '+3.2%', 
      icon: UserCheck, 
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500'
    },
    { 
      title: "Today's Appointments", 
      value: '87', 
      change: '+8.1%', 
      icon: Calendar, 
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-500'
    },
    { 
      title: 'Available Beds', 
      value: '34/120', 
      change: '-5.2%', 
      icon: BedDouble, 
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500'
    },
    { 
      title: 'Revenue (Monthly)', 
      value: '$485K', 
      change: '+15.3%', 
      icon: DollarSign, 
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    { 
      title: 'Emergency Cases', 
      value: '12', 
      change: '+2', 
      icon: AlertCircle, 
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-red-500 to-pink-500'
    },
  ];

  const patientAdmissions = [
    { month: 'Jan', admissions: 245, discharges: 230 },
    { month: 'Feb', admissions: 268, discharges: 251 },
    { month: 'Mar', admissions: 289, discharges: 275 },
    { month: 'Apr', admissions: 312, discharges: 298 },
    { month: 'May', admissions: 334, discharges: 320 },
    { month: 'Jun', admissions: 358, discharges: 342 },
  ];

  const departmentStats = [
    { name: 'Cardiology', patients: 312, color: '#3b82f6' },
    { name: 'Neurology', patients: 245, color: '#8b5cf6' },
    { name: 'Orthopedics', patients: 198, color: '#10b981' },
    { name: 'Pediatrics', patients: 289, color: '#f59e0b' },
    { name: 'Emergency', patients: 156, color: '#ef4444' },
    { name: 'Others', patients: 423, color: '#6b7280' },
  ];

  const treatmentTypes = [
    { name: 'Surgical', count: 156, icon: Scissors, color: '#ef4444', bgColor: 'from-red-50 to-pink-50', percentage: 18 },
    { name: 'Medical', count: 342, icon: Pill, color: '#3b82f6', bgColor: 'from-blue-50 to-indigo-50', percentage: 40 },
    { name: 'Diagnostic', count: 198, icon: TestTube, color: '#8b5cf6', bgColor: 'from-purple-50 to-violet-50', percentage: 23 },
    { name: 'Therapeutic', count: 167, icon: Syringe, color: '#10b981', bgColor: 'from-green-50 to-emerald-50', percentage: 19 },
  ];

  const diseaseCategories = [
    { disease: 'Cardiovascular', patients: 312, color: '#ef4444', trend: '+12%' },
    { disease: 'Respiratory', patients: 245, color: '#3b82f6', trend: '+8%' },
    { disease: 'Neurological', patients: 198, color: '#8b5cf6', trend: '+5%' },
    { disease: 'Digestive', patients: 167, color: '#f59e0b', trend: '+3%' },
    { disease: 'Musculoskeletal', patients: 142, color: '#10b981', trend: '+7%' },
    { disease: 'Endocrine', patients: 128, color: '#06b6d4', trend: '+4%' },
  ];

  const commonDiseases = [
    { name: 'Hypertension', cases: 289, severity: 'Moderate', icon: Heart },
    { name: 'Diabetes Type 2', cases: 245, severity: 'Moderate', icon: Activity },
    { name: 'Pneumonia', cases: 167, severity: 'Severe', icon: Activity },
    { name: 'Coronary Artery Disease', cases: 156, severity: 'Severe', icon: Heart },
    { name: 'Chronic Kidney Disease', cases: 134, severity: 'Severe', icon: Activity },
    { name: 'Asthma', cases: 198, severity: 'Mild', icon: Activity },
  ];

  const revenueData = [
    { day: 'Mon', revenue: 45000 },
    { day: 'Tue', revenue: 52000 },
    { day: 'Wed', revenue: 48000 },
    { day: 'Thu', revenue: 61000 },
    { day: 'Fri', revenue: 55000 },
    { day: 'Sat', revenue: 38000 },
    { day: 'Sun', revenue: 32000 },
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Smith', doctor: 'Dr. Emily Chen', time: '09:00 AM', department: 'Cardiology', status: 'Confirmed', avatar: 'JS' },
    { id: 2, patient: 'Sarah Williams', doctor: 'Dr. Michael Brown', time: '10:30 AM', department: 'Neurology', status: 'In Progress', avatar: 'SW' },
    { id: 3, patient: 'Robert Johnson', doctor: 'Dr. Lisa Anderson', time: '11:00 AM', department: 'Orthopedics', status: 'Waiting', avatar: 'RJ' },
    { id: 4, patient: 'Maria Garcia', doctor: 'Dr. James Wilson', time: '02:00 PM', department: 'Pediatrics', status: 'Confirmed', avatar: 'MG' },
    { id: 5, patient: 'David Lee', doctor: 'Dr. Sarah Martinez', time: '03:30 PM', department: 'Cardiology', status: 'Waiting', avatar: 'DL' },
  ];

  const criticalAlerts = [
    { id: 1, message: 'ICU Bed 5 - Patient vitals critical', time: '5 mins ago', severity: 'high', icon: Activity },
    { id: 2, message: 'Pharmacy - Low stock: Insulin', time: '15 mins ago', severity: 'medium', icon: AlertCircle },
    { id: 3, message: 'Equipment - MRI machine maintenance due', time: '1 hour ago', severity: 'low', icon: Zap },
  ];

  const quickActions = [
    { label: 'New Patient', icon: Users, onClick: () => onNavigate('patients'), gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Emergency', icon: AlertCircle, onClick: () => onNavigate('emergency'), gradient: 'from-red-500 to-pink-500' },
    { label: 'Appointments', icon: Calendar, onClick: () => onNavigate('appointments'), gradient: 'from-purple-500 to-indigo-500' },
    { label: 'Reports', icon: Activity, onClick: () => onNavigate('reports'), gradient: 'from-emerald-500 to-teal-500' },
  ];

  const todaySurgeries = [
    {
      id: 'SUR-001',
      patient: 'Robert Johnson',
      patientId: 'P003',
      surgeryType: 'Hip Replacement',
      surgeon: 'Dr. Lisa Anderson',
      time: '08:00 AM',
      duration: '3 hours',
      room: 'OR-1',
      status: 'In Progress',
      priority: 'Elective',
      anesthesiologist: 'Dr. Mark Davis'
    },
    {
      id: 'SUR-002',
      patient: 'Jennifer Martinez',
      patientId: 'P012',
      surgeryType: 'Appendectomy',
      surgeon: 'Dr. Michael Chen',
      time: '11:30 AM',
      duration: '1.5 hours',
      room: 'OR-2',
      status: 'Pre-Op',
      priority: 'Emergency',
      anesthesiologist: 'Dr. Sarah Kim'
    },
    {
      id: 'SUR-003',
      patient: 'Thomas Anderson',
      patientId: 'P025',
      surgeryType: 'Cardiac Bypass',
      surgeon: 'Dr. Emily Chen',
      time: '02:00 PM',
      duration: '5 hours',
      room: 'OR-3',
      status: 'Scheduled',
      priority: 'Urgent',
      anesthesiologist: 'Dr. James Wilson'
    },
    {
      id: 'SUR-004',
      patient: 'Lisa Thompson',
      patientId: 'P038',
      surgeryType: 'Knee Arthroscopy',
      surgeon: 'Dr. Lisa Anderson',
      time: '09:00 AM',
      duration: '2 hours',
      room: 'OR-1',
      status: 'Completed',
      priority: 'Elective',
      anesthesiologist: 'Dr. Mark Davis'
    },
  ];

  const surgeryStats = [
    { label: 'Total Surgeries (Month)', value: '156', change: '+8%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Today\'s Surgeries', value: '4', change: '+1', color: 'from-purple-500 to-pink-500' },
    { label: 'In Progress', value: '1', change: '0', color: 'from-amber-500 to-orange-500' },
    { label: 'Success Rate', value: '98.5%', change: '+0.5%', color: 'from-green-500 to-emerald-500' },
  ];

  const surgeryTypeDistribution = [
    { name: 'Orthopedic', count: 45, color: '#3b82f6' },
    { name: 'Cardiac', count: 28, color: '#ef4444' },
    { name: 'General', count: 38, color: '#10b981' },
    { name: 'Neurological', count: 22, color: '#8b5cf6' },
    { name: 'Others', count: 23, color: '#f59e0b' },
  ];

  const monthlyScurgeries = [
    { month: 'Jan', surgeries: 142 },
    { month: 'Feb', surgeries: 135 },
    { month: 'Mar', surgeries: 148 },
    { month: 'Apr', surgeries: 156 },
    { month: 'May', surgeries: 163 },
    { month: 'Jun', surgeries: 156 },
  ];

  const operatingRooms = [
    { room: 'OR-1', status: 'In Use', surgery: 'Hip Replacement', surgeon: 'Dr. Anderson', endTime: '11:00 AM', utilization: 85 },
    { room: 'OR-2', status: 'Preparing', surgery: 'Appendectomy', surgeon: 'Dr. Chen', endTime: '11:30 AM', utilization: 72 },
    { room: 'OR-3', status: 'Available', surgery: '-', surgeon: '-', endTime: '-', utilization: 68 },
    { room: 'OR-4', status: 'Maintenance', surgery: '-', surgeon: '-', endTime: '-', utilization: 0 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-100 text-red-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Mild': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSurgeryStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pre-Op': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Scheduled': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSurgeryPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Emergency': return 'bg-red-100 text-red-700';
      case 'Urgent': return 'bg-orange-100 text-orange-700';
      case 'Elective': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl mb-2 animate-in slide-in-from-left duration-700">Welcome back, Dr. Johnson! 👋</h2>
              <p className="text-blue-100 text-lg animate-in slide-in-from-left duration-700" style={{ animationDelay: '0.1s' }}>Here's what's happening in your hospital today</p>
            </div>
            <div className="hidden lg:flex gap-3">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className="flex flex-col items-center gap-2 px-6 py-4 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur-sm transition-all duration-300 group/btn hover:scale-110 hover:shadow-xl shadow-lg"
                  >
                    <Icon className="w-6 h-6 group-hover/btn:scale-125 group-hover/btn:rotate-12 transition-all duration-300" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className={`card-hover border-0 shadow-xl hover:shadow-2xl bg-gradient-to-br ${stat.bgGradient} transition-all duration-300 group/card relative overflow-hidden animate-in slide-in-from-bottom`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                    <p className="text-4xl mb-3 transition-all duration-300 group-hover/card:scale-110 origin-left">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full shadow-md ${
                        stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`${stat.iconBg} p-4 rounded-2xl shadow-xl text-white group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Treatment Types Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 animate-in slide-in-from-left duration-500">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl">Treatment Types Overview</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {treatmentTypes.map((treatment, index) => {
            const Icon = treatment.icon;
            return (
              <Card key={index} className={`card-hover border-0 shadow-xl hover:shadow-2xl bg-gradient-to-br ${treatment.bgColor} transition-all duration-300 group/treatment relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover/treatment:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm mb-1">{treatment.name}</p>
                      <p className="text-3xl mb-2 transition-all duration-300 group-hover/treatment:scale-110 origin-left">{treatment.count}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full rounded-full transition-all duration-700 shadow-md" 
                            style={{ width: `${treatment.percentage}%`, backgroundColor: treatment.color }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{treatment.percentage}%</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl shadow-xl group-hover/treatment:scale-110 group-hover/treatment:rotate-12 transition-all duration-300" style={{ backgroundColor: treatment.color }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Disease Categories & Common Diseases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Categories */}
        <Card className="border-0 shadow-lg card-hover">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Disease Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {diseaseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div>
                      <p className="text-sm">{category.disease}</p>
                      <p className="text-xs text-gray-500">{category.patients} patients</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-sm">{category.trend}</span>
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Diseases */}
        <Card className="border-0 shadow-lg card-hover">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-600" />
              Most Common Diseases
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {commonDiseases.map((disease, index) => {
                const Icon = disease.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">{disease.name}</p>
                        <p className="text-xs text-gray-500">{disease.cases} active cases</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(disease.severity)}`}>
                      {disease.severity}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Admissions Chart */}
        <Card className="border-0 shadow-lg card-hover">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Patient Admissions & Discharges
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientAdmissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="admissions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="discharges" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="border-0 shadow-lg card-hover">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Department Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="patients"
                >
                  {departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card className="border-0 shadow-lg card-hover">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Weekly Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }} 
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2 border-0 shadow-lg card-hover">
          <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {recentAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                      {apt.avatar}
                    </div>
                    <div>
                      <p>{apt.patient}</p>
                      <p className="text-sm text-gray-600">{apt.doctor} • {apt.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{apt.time}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      apt.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {apt.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card className="border-0 shadow-lg card-hover">
          <CardHeader className="border-b bg-gradient-to-r from-red-50 to-pink-50">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {criticalAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${
                    alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm mb-1">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Surgeries */}
      <Card className="border-0 shadow-lg card-hover">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-blue-600" />
            Today's Surgeries
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {todaySurgeries.map((surgery) => (
              <div key={surgery.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    {surgery.patientId}
                  </div>
                  <div>
                    <p>{surgery.patient}</p>
                    <p className="text-sm text-gray-600">{surgery.surgeryType} • {surgery.surgeon}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{surgery.time}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${getSurgeryStatusColor(surgery.status)}`}>
                    {surgery.status}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${getSurgeryPriorityColor(surgery.priority)}`}>
                    {surgery.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Surgery Overview Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Scissors className="w-6 h-6 text-blue-600" />
          <h3>Surgery Department Analytics</h3>
        </div>

        {/* Surgery Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {surgeryStats.map((stat, index) => (
            <Card key={index} className="card-hover border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6 bg-[rgb(255,255,255)] rounded-[19px]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl mb-2">{stat.value}</p>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl shadow-md bg-gradient-to-br ${stat.color}`}>
                    <Scissors className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Surgery Charts & Operating Rooms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Surgery Trend */}
          <Card className="border-0 shadow-lg card-hover">
            <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Monthly Surgery Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyScurgeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="surgeries" 
                    stroke="#6366f1" 
                    strokeWidth={3} 
                    dot={{ fill: '#6366f1', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Surgery Type Distribution */}
          <Card className="border-0 shadow-lg card-hover">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-purple-600" />
                Surgery Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={surgeryTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {surgeryTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}