import { 
  Heart, 
  Users, 
  Stethoscope, 
  Calendar, 
  Building2, 
  CreditCard, 
  Pill, 
  TestTube, 
  BedDouble,
  Siren,
  Scissors,
  UserCog,
  Scan,
  Droplet,
  FileText,
  Wrench,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Award,
  Sparkles,
  Activity,
  Bell,
  FileSearch,
  Workflow,
  Database,
  Lock,
  Headphones,
  ChevronRight,
  LayoutDashboard,
  Boxes,
  LineChart,
  Users2,
  Play,
  Check,
  MousePointer2,
  Repeat,
  Send,
  Mail,
  Phone,
  MapPin,
  User,
  Building,
  Video,
  FileStack,
  ArrowRightLeft
} from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface LandingPageProps {
  onViewDemo: () => void;
}

export function LandingPage({ onViewDemo }: LandingPageProps) {
  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Complete patient records system with medical history, vitals tracking, allergies, demographics, and family history management with advanced search',
      color: 'from-violet-500 to-purple-500',
      highlight: 'Comprehensive Records'
    },
    {
      icon: Stethoscope,
      title: 'Doctor Management',
      description: 'Doctor profiles with specializations, qualifications, availability schedules, consultation fees, performance metrics, and patient reviews',
      color: 'from-emerald-500 to-teal-500',
      highlight: 'Full Profiles'
    },
    {
      icon: Calendar,
      title: 'Appointment System',
      description: 'Intelligent scheduling with conflict prevention, automated reminders, waitlist management, real-time availability, and multi-doctor booking',
      color: 'from-amber-500 to-orange-500',
      highlight: 'Smart Scheduling'
    },
    {
      icon: Siren,
      title: 'Emergency Room',
      description: 'Real-time ER tracking with triage levels, bed status monitoring, critical alerts, ambulance coordination, and instant notifications',
      color: 'from-red-500 to-pink-500',
      highlight: 'Critical Care'
    },
    {
      icon: Scissors,
      title: 'Surgery Scheduling',
      description: 'OR management with surgical team coordination, equipment tracking, pre/post-op care workflows, anesthesia records, and recovery monitoring',
      color: 'from-indigo-500 to-blue-500',
      highlight: 'OR Management'
    },
    {
      icon: TestTube,
      title: 'Laboratory Tests',
      description: 'Complete lab system with test ordering, sample tracking, results management, quality control, automated reporting, and reference ranges',
      color: 'from-cyan-500 to-blue-500',
      highlight: 'Quality Control'
    },
    {
      icon: Scan,
      title: 'Radiology Services',
      description: 'Imaging orders with PACS integration, radiologist assignments, report generation, digital image storage, and consultation scheduling',
      color: 'from-purple-500 to-indigo-500',
      highlight: 'Digital Imaging'
    },
    {
      icon: Pill,
      title: 'Pharmacy Inventory',
      description: 'Medication management with stock tracking, prescription processing, expiry alerts, automated reordering, drug interaction checks',
      color: 'from-green-500 to-emerald-500',
      highlight: 'Smart Inventory'
    },
    {
      icon: Droplet,
      title: 'Blood Bank',
      description: 'Blood inventory with donor management, compatibility testing, cross-matching, expiry tracking, emergency stock alerts, and donation drives',
      color: 'from-rose-500 to-red-500',
      highlight: 'Life Saving'
    },
    {
      icon: BedDouble,
      title: 'Bed Management',
      description: 'Real-time bed availability across all wards, ICU monitoring, patient assignments, transfer management, occupancy analytics, and housekeeping',
      color: 'from-sky-500 to-blue-500',
      highlight: 'Real-Time Status'
    },
    {
      icon: Building2,
      title: 'Department Management',
      description: 'Organizational structure, department heads, resource allocation, performance metrics, interdepartmental coordination, and budget tracking',
      color: 'from-slate-500 to-gray-500',
      highlight: 'Organization'
    },
    {
      icon: UserCog,
      title: 'Staff Management',
      description: 'Employee records, shift scheduling, attendance tracking, leave management, performance evaluations, payroll integration, and training records',
      color: 'from-teal-500 to-cyan-500',
      highlight: 'HR System'
    },
    {
      icon: Wrench,
      title: 'Equipment Tracking',
      description: 'Medical equipment inventory, maintenance schedules, calibration tracking, warranty management, asset depreciation, and service history',
      color: 'from-orange-500 to-amber-500',
      highlight: 'Asset Management'
    },
    {
      icon: CreditCard,
      title: 'Billing System',
      description: 'Automated invoicing, payment processing, insurance claims, credit management, payment plans, refunds, and detailed financial reporting',
      color: 'from-lime-500 to-green-500',
      highlight: 'Financial Control'
    },
    {
      icon: FileText,
      title: 'Insurance Management',
      description: 'Policy verification, pre-authorization, claims submission, eligibility checking, insurance provider coordination, and reimbursement tracking',
      color: 'from-blue-500 to-indigo-500',
      highlight: 'Claims Processing'
    },
    {
      icon: BarChart3,
      title: 'Reports & Analytics',
      description: 'Comprehensive dashboards, KPI tracking, revenue analysis, occupancy rates, predictive analytics, custom reports, and data visualization',
      color: 'from-fuchsia-500 to-purple-500',
      highlight: 'Business Intelligence'
    },
    {
      icon: Activity,
      title: 'Treatment Records',
      description: 'Complete treatment history, medication records, procedure documentation, progress notes, discharge summaries, and follow-up scheduling',
      color: 'from-pink-500 to-rose-500',
      highlight: 'Medical Records'
    },
    {
      icon: Video,
      title: 'Telemedicine Platform',
      description: 'Virtual consultations with HD video conferencing, screen sharing, digital prescriptions, remote monitoring, and secure patient communication',
      color: 'from-blue-500 to-purple-500',
      highlight: 'Remote Care'
    },
    {
      icon: FileStack,
      title: 'Electronic Health Records',
      description: 'Comprehensive EHR system with clinical documentation, medical imaging integration, lab results, medication lists, and interoperability standards',
      color: 'from-teal-500 to-green-500',
      highlight: 'Complete EHR'
    },
    {
      icon: ArrowRightLeft,
      title: 'Referral Management',
      description: 'Patient referral tracking between departments and external facilities, appointment coordination, document sharing, and status monitoring',
      color: 'from-orange-500 to-red-500',
      highlight: 'Seamless Transfers'
    }
  ];

  const capabilities = [
    {
      icon: Workflow,
      title: 'Advanced Workflows',
      description: 'Status tracking workflows for all operations from admission to discharge with automated transitions',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileSearch,
      title: 'Smart Search & Filters',
      description: 'Powerful search engine with advanced filtering, sorting, and export capabilities across all modules',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Activity,
      title: 'Real-time Updates',
      description: 'Live data synchronization with instant notifications for critical events and status changes',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Database,
      title: 'Comprehensive Data',
      description: 'Detailed records with complete audit trails, version history, and data integrity validation',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'HIPAA compliant with role-based access control, encryption, and comprehensive security protocols',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Available in English, Spanish, French, and German with customizable date and time formats',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const statistics = [
    { number: '20+', label: 'Integrated Modules', icon: Boxes, gradient: 'from-blue-500 to-cyan-500' },
    { number: '100%', label: 'HIPAA Compliant', icon: Shield, gradient: 'from-emerald-500 to-teal-500' },
    { number: '24/7', label: 'Premium Support', icon: Headphones, gradient: 'from-purple-500 to-pink-500' },
    { number: '99.9%', label: 'System Uptime', icon: Activity, gradient: 'from-amber-500 to-orange-500' }
  ];

  const benefits = [
    'Streamlined patient care workflow',
    'Reduced administrative overhead by 60%',
    'Improved operational efficiency',
    'Enhanced patient satisfaction scores',
    'Real-time decision making capabilities',
    'Comprehensive audit trails',
    'Automated billing & insurance processing',
    'Advanced analytics & reporting',
    'Mobile-responsive interface',
    'Scalable enterprise architecture',
    'Integration ready REST APIs',
    'Regular security updates'
  ];

  const testimonials = [
    {
      quote: "Transformed our hospital operations completely. The system is intuitive and powerful.",
      author: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      hospital: "Central Medical Center"
    },
    {
      quote: "Best hospital management solution we've implemented. ROI within 6 months.",
      author: "Michael Chen",
      role: "Hospital Administrator",
      hospital: "Metro Health Hospital"
    },
    {
      quote: "The emergency room module alone has saved countless lives with faster response times.",
      author: "Dr. Emily Rodriguez",
      role: "ER Department Head",
      hospital: "City General Hospital"
    }
  ];

  const [isContactDialogOpen, setContactDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hospital: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Web3Forms API endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a73632c9-298d-4ff2-b5fe-2540a8f03522',
          from_name: formData.name,
          email: formData.email,
          subject: `Contact Request from ${formData.name} - ${formData.hospital}`,
          message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Hospital: ${formData.hospital}

Message:
${formData.message}
          `,
          to: 'hetalganatra0909@gmail.com',
          phone: formData.phone,
          hospital: formData.hospital
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Close contact dialog and show success
        setContactDialogOpen(false);
        setSuccessDialogOpen(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          hospital: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative container mx-auto px-6 py-12 md:py-20">
          {/* Header */}
          <header className="flex items-center justify-between mb-16 md:mb-24 animate-in fade-in slide-in-from-top duration-700">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <Heart className="w-6 h-6 md:w-9 md:h-9 text-white animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 tracking-tight">
                  MediCare Hospital Pro
                </h1>
                <p className="text-xs md:text-sm text-gray-600">Enterprise Healthcare Management</p>
              </div>
            </div>
            <button 
              onClick={onViewDemo}
              className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
            >
              <Play className="w-4 h-4" />
              <span className="hidden md:inline">View Demo</span>
              <span className="md:hidden">Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </header>

          {/* Hero Content */}
          <div className="text-center max-w-6xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.1s' }}>
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-xs md:text-sm text-blue-700">Production-Ready Enterprise Solution</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.2s' }}>
              Transform Your Hospital
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">
                Operations Today
              </span>
            </h2>
            
            <p className="text-lg md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.3s' }}>
              The most comprehensive hospital management system with 17+ integrated modules, 
              advanced analytics, and enterprise-grade features designed for modern healthcare facilities
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={onViewDemo}
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <span className="text-base md:text-lg">Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onViewDemo}
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="text-base md:text-lg">Watch Demo</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.5s' }}>
              {statistics.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass-effect p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 group cursor-pointer">
                    <div className={`w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <p className="text-2xl md:text-4xl mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                      {stat.number}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-xs md:text-sm text-purple-700">Complete Feature Set</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-900">
              All-in-One Hospital Management
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Every module your hospital needs, integrated seamlessly into one powerful platform
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="glass-effect p-5 md:p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  }}></div>
                  
                  <div className="relative">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <div className="mb-2">
                      <h3 className="text-base md:text-lg mb-1">{feature.title}</h3>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full bg-gradient-to-r ${feature.color} text-white`}>
                        {feature.highlight}
                      </span>
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3">{feature.description}</p>
                    
                    <div className="flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs">Learn more</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-xs md:text-sm text-blue-700">Advanced Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-900">
              Enterprise-Grade Features
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Built for scale, security, and performance with cutting-edge technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-white/60 group hover:scale-105">
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${capability.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg mb-2">{capability.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-6">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-xs md:text-sm text-emerald-700">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-emerald-900">
              Benefits That Matter
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Designed to improve every aspect of your hospital operations
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 glass-effect p-4 rounded-xl hover:shadow-lg transition-all duration-300 group hover:scale-105">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm md:text-base text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
              <Users2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs md:text-sm text-indigo-700">Trusted by Healthcare Leaders</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-sm md:text-base mb-1">{testimonial.author}</p>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.hospital}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Highlights */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs md:text-sm text-blue-700">System Highlights</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-900">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <LineChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl mb-3">Interactive Dashboards</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Real-time data visualization with interactive charts, KPI tracking, and customizable widgets for instant insights
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl mb-3">Smart Notifications</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Intelligent alert system for emergencies, appointments, lab results, and critical events with customizable preferences
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl mb-3">Secure & Compliant</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                HIPAA compliant with advanced security features, role-based access control, and complete audit trails
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"></div>
          <div className="absolute w-full h-full opacity-30">
            <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Heart className="w-4 h-4 animate-pulse" />
              <span className="text-xs md:text-sm">Ready to Transform Your Hospital?</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6">
              Experience the Future of
              <br />
              Hospital Management
            </h2>
            
            <p className="text-base md:text-xl mb-8 md:mb-12 opacity-90 leading-relaxed">
              Join leading healthcare facilities worldwide in revolutionizing patient care with our comprehensive 
              enterprise solution. Start your digital transformation today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onViewDemo}
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-blue-600 rounded-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
              >
                <MousePointer2 className="w-5 h-5" />
                <span className="text-base md:text-lg">View Live Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setContactDialogOpen(true)}
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <span className="text-base md:text-lg">Contact Sales</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16">
              <div className="text-center">
                <p className="text-2xl md:text-4xl mb-1">500+</p>
                <p className="text-xs md:text-sm opacity-80">Hospitals Worldwide</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-4xl mb-1">2M+</p>
                <p className="text-xs md:text-sm opacity-80">Patients Managed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-4xl mb-1">50K+</p>
                <p className="text-xs md:text-sm opacity-80">Healthcare Staff</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-4xl mb-1">10M+</p>
                <p className="text-xs md:text-sm opacity-80">Appointments Booked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Sales</DialogTitle>
            <DialogDescription>
              Fill out the form below to get in touch with our sales team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hospital" className="text-right">
                Hospital
              </Label>
              <Input
                id="hospital"
                className="col-span-3"
                placeholder="Your hospital name"
                value={formData.hospital}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                className="col-span-3"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message Sent</DialogTitle>
            <DialogDescription>
              Your message has been sent successfully. We will get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <p className="text-sm md:text-base text-gray-700">Thank you for contacting us!</p>
            </div>
          </div>
          <Button className="mt-4" onClick={() => setSuccessDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-base md:text-lg">MediCare Hospital Pro</p>
                <p className="text-xs text-gray-400">Enterprise Healthcare Management</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs md:text-sm text-gray-400">© 2025 MediCare Hospital Pro by Hetal Ganatra. All rights reserved.</p>
              <p className="text-xs text-gray-500 mt-1">Production-Ready Enterprise Solution</p>
            </div>
          </div>
          
          {/* Additional Footer Links */}
          <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <h4 className="text-sm mb-3 text-gray-300">Product</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3 text-gray-300">Company</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3 text-gray-300">Resources</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                <li className="hover:text-white cursor-pointer transition-colors">Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-3 text-gray-300">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-white cursor-pointer transition-colors">HIPAA Compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}