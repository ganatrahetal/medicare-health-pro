import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Search, Plus, Scissors, Clock, User, Calendar, AlertCircle, CheckCircle, ChevronRight, Activity, FileText, Heart, Users, Syringe, Droplet } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from './ui/dialog';
import { useHospitalActions } from '../hooks/useHospitalActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Surgery {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  surgeryType: string;
  surgeryCategory: 'Elective' | 'Emergency' | 'Urgent';
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  operatingRoom: string;
  primarySurgeon: string;
  assistingSurgeons: string[];
  anesthesiologist: string;
  anesthesiaType: string;
  scrubNurse: string;
  circulatingNurse: string;
  status: 'Scheduled' | 'Pre-Op' | 'In Progress' | 'Post-Op' | 'Completed' | 'Cancelled';
  preOpChecklist: {
    item: string;
    completed: boolean;
    completedBy?: string;
    time?: string;
  }[];
  diagnosis: string;
  procedure: string;
  equipmentNeeded: string[];
  bloodType: string;
  crossMatchUnits?: number;
  specialInstructions?: string;
  consent: {
    obtained: boolean;
    obtainedBy?: string;
    date?: string;
  };
  npoDuration: string;
  labResults?: {
    test: string;
    result: string;
    date: string;
  }[];
}

export function SurgeryScheduling() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const actions = useHospitalActions();

  const surgeries: Surgery[] = [
    {
      id: 'SUR-2024-001',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      age: 68,
      surgeryType: 'Hip Replacement Surgery',
      surgeryCategory: 'Elective',
      scheduledDate: '2024-11-13',
      scheduledTime: '08:00 AM',
      estimatedDuration: 180,
      operatingRoom: 'OR-3',
      primarySurgeon: 'Dr. Lisa Anderson',
      assistingSurgeons: ['Dr. Mark Thompson', 'Dr. Jennifer Lee'],
      anesthesiologist: 'Dr. Richard Chen',
      anesthesiaType: 'General',
      scrubNurse: 'Nurse Patricia Moore',
      circulatingNurse: 'Nurse Linda Harris',
      status: 'In Progress',
      preOpChecklist: [
        { item: 'Consent signed', completed: true, completedBy: 'Dr. Lisa Anderson', time: '07:00 AM' },
        { item: 'NPO status verified', completed: true, completedBy: 'Nurse Linda Harris', time: '07:15 AM' },
        { item: 'Surgical site marked', completed: true, completedBy: 'Dr. Lisa Anderson', time: '07:30 AM' },
        { item: 'Pre-op antibiotics given', completed: true, completedBy: 'Nurse Patricia Moore', time: '07:45 AM' },
        { item: 'Patient ID verified', completed: true, completedBy: 'Nurse Linda Harris', time: '07:50 AM' },
        { item: 'Allergies reviewed', completed: true, completedBy: 'Dr. Richard Chen', time: '07:55 AM' },
      ],
      diagnosis: 'Severe Osteoarthritis of Right Hip',
      procedure: 'Total Hip Arthroplasty - Right Side',
      equipmentNeeded: ['Hip Prosthesis - Size 52mm', 'Orthopedic Drill Set', 'Cement Mixing System', 'C-Arm Fluoroscopy'],
      bloodType: 'O+',
      crossMatchUnits: 2,
      consent: {
        obtained: true,
        obtainedBy: 'Dr. Lisa Anderson',
        date: '2024-11-08',
      },
      npoDuration: '8 hours',
      labResults: [
        { test: 'CBC', result: 'Normal', date: '2024-11-12' },
        { test: 'Coagulation Panel', result: 'Normal', date: '2024-11-12' },
        { test: 'Type & Cross', result: 'O+ matched', date: '2024-11-12' },
      ],
    },
    {
      id: 'SUR-2024-002',
      patientName: 'Michael Anderson',
      patientId: 'P007',
      age: 35,
      surgeryType: 'Appendectomy',
      surgeryCategory: 'Emergency',
      scheduledDate: '2024-11-13',
      scheduledTime: '11:00 AM',
      estimatedDuration: 60,
      operatingRoom: 'OR-1',
      primarySurgeon: 'Dr. Robert Kim',
      assistingSurgeons: ['Dr. Sarah Martinez'],
      anesthesiologist: 'Dr. Michael Torres',
      anesthesiaType: 'General',
      scrubNurse: 'Nurse Amanda Brown',
      circulatingNurse: 'Nurse David Lee',
      status: 'Pre-Op',
      preOpChecklist: [
        { item: 'Consent signed', completed: true, completedBy: 'Dr. Robert Kim', time: '10:15 AM' },
        { item: 'NPO status verified', completed: true, completedBy: 'Nurse David Lee', time: '10:20 AM' },
        { item: 'Surgical site marked', completed: true, completedBy: 'Dr. Robert Kim', time: '10:30 AM' },
        { item: 'Pre-op antibiotics given', completed: false },
        { item: 'Patient ID verified', completed: true, completedBy: 'Nurse David Lee', time: '10:35 AM' },
        { item: 'Allergies reviewed', completed: true, completedBy: 'Dr. Michael Torres', time: '10:40 AM' },
      ],
      diagnosis: 'Acute Appendicitis',
      procedure: 'Laparoscopic Appendectomy',
      equipmentNeeded: ['Laparoscopy Set', 'Insufflator', 'Light Source', 'Camera System'],
      bloodType: 'A+',
      consent: {
        obtained: true,
        obtainedBy: 'Dr. Robert Kim',
        date: '2024-11-13',
      },
      npoDuration: '4 hours',
      specialInstructions: 'Emergency case - peritonitis risk. Have open conversion equipment ready.',
      labResults: [
        { test: 'CBC', result: 'WBC 18,000 (elevated)', date: '2024-11-13' },
        { test: 'CT Abdomen', result: 'Inflamed appendix confirmed', date: '2024-11-13' },
      ],
    },
    {
      id: 'SUR-2024-003',
      patientName: 'Patricia Wilson',
      patientId: 'P013',
      age: 52,
      surgeryType: 'Cholecystectomy',
      surgeryCategory: 'Elective',
      scheduledDate: '2024-11-13',
      scheduledTime: '02:00 PM',
      estimatedDuration: 90,
      operatingRoom: 'OR-2',
      primarySurgeon: 'Dr. Robert Kim',
      assistingSurgeons: ['Dr. Jennifer Lee'],
      anesthesiologist: 'Dr. Richard Chen',
      anesthesiaType: 'General',
      scrubNurse: 'Nurse Patricia Moore',
      circulatingNurse: 'Nurse Jessica Brown',
      status: 'Scheduled',
      preOpChecklist: [
        { item: 'Consent signed', completed: true, completedBy: 'Dr. Robert Kim', time: '11-12 03:00 PM' },
        { item: 'NPO status verified', completed: false },
        { item: 'Surgical site marked', completed: false },
        { item: 'Pre-op antibiotics given', completed: false },
        { item: 'Patient ID verified', completed: false },
        { item: 'Allergies reviewed', completed: false },
      ],
      diagnosis: 'Chronic Cholecystitis with Cholelithiasis',
      procedure: 'Laparoscopic Cholecystectomy',
      equipmentNeeded: ['Laparoscopy Set', 'Insufflator', 'Ultrasonic Scalpel', 'Cholangiography Equipment'],
      bloodType: 'B+',
      consent: {
        obtained: true,
        obtainedBy: 'Dr. Robert Kim',
        date: '2024-11-12',
      },
      npoDuration: '8 hours',
      labResults: [
        { test: 'Liver Function', result: 'Normal', date: '2024-11-11' },
        { test: 'Ultrasound Abdomen', result: 'Multiple gallstones', date: '2024-11-10' },
      ],
    },
    {
      id: 'SUR-2024-004',
      patientName: 'James Morrison',
      patientId: 'P014',
      age: 45,
      surgeryType: 'Carpal Tunnel Release',
      surgeryCategory: 'Elective',
      scheduledDate: '2024-11-14',
      scheduledTime: '09:00 AM',
      estimatedDuration: 45,
      operatingRoom: 'OR-4',
      primarySurgeon: 'Dr. Lisa Anderson',
      assistingSurgeons: [],
      anesthesiologist: 'Dr. Michael Torres',
      anesthesiaType: 'Regional (Brachial Block)',
      scrubNurse: 'Nurse Amanda Brown',
      circulatingNurse: 'Nurse Linda Harris',
      status: 'Scheduled',
      preOpChecklist: [
        { item: 'Consent signed', completed: true, completedBy: 'Dr. Lisa Anderson', time: '11-12 02:00 PM' },
        { item: 'NPO status verified', completed: false },
        { item: 'Surgical site marked', completed: false },
        { item: 'Pre-op antibiotics given', completed: false },
        { item: 'Patient ID verified', completed: false },
        { item: 'Allergies reviewed', completed: false },
      ],
      diagnosis: 'Carpal Tunnel Syndrome - Right Hand',
      procedure: 'Open Carpal Tunnel Release',
      equipmentNeeded: ['Orthopedic Hand Set', 'Tourniquet', 'Loupes'],
      bloodType: 'AB-',
      consent: {
        obtained: true,
        obtainedBy: 'Dr. Lisa Anderson',
        date: '2024-11-12',
      },
      npoDuration: '6 hours',
      labResults: [
        { test: 'EMG/NCS', result: 'Moderate carpal tunnel confirmed', date: '2024-10-28' },
      ],
    },
    {
      id: 'SUR-2024-005',
      patientName: 'Linda Thompson',
      patientId: 'P015',
      age: 58,
      surgeryType: 'Breast Lumpectomy',
      surgeryCategory: 'Urgent',
      scheduledDate: '2024-11-14',
      scheduledTime: '10:30 AM',
      estimatedDuration: 120,
      operatingRoom: 'OR-3',
      primarySurgeon: 'Dr. Jennifer Lee',
      assistingSurgeons: ['Dr. Sarah Martinez'],
      anesthesiologist: 'Dr. Richard Chen',
      anesthesiaType: 'General',
      scrubNurse: 'Nurse Patricia Moore',
      circulatingNurse: 'Nurse Jessica Brown',
      status: 'Scheduled',
      preOpChecklist: [
        { item: 'Consent signed', completed: true, completedBy: 'Dr. Jennifer Lee', time: '11-11 01:00 PM' },
        { item: 'NPO status verified', completed: false },
        { item: 'Surgical site marked', completed: false },
        { item: 'Pre-op antibiotics given', completed: false },
        { item: 'Patient ID verified', completed: false },
        { item: 'Allergies reviewed', completed: false },
      ],
      diagnosis: 'Breast Carcinoma - Right Upper Outer Quadrant',
      procedure: 'Lumpectomy with Sentinel Node Biopsy',
      equipmentNeeded: ['Breast Surgery Set', 'Sentinel Node Detector', 'Pathology Supplies', 'Wire Localization Equipment'],
      bloodType: 'A-',
      consent: {
        obtained: true,
        obtainedBy: 'Dr. Jennifer Lee',
        date: '2024-11-11',
      },
      npoDuration: '8 hours',
      specialInstructions: 'Wire localization completed in radiology. Pathology on standby for frozen section.',
      labResults: [
        { test: 'Mammogram', result: 'Suspicious mass RUO', date: '2024-10-15' },
        { test: 'Biopsy', result: 'Invasive ductal carcinoma', date: '2024-10-25' },
        { test: 'CBC', result: 'Normal', date: '2024-11-12' },
      ],
    },
    {
      id: 'SUR-2024-006',
      patientName: 'Thomas Wright',
      patientId: 'P016',
      age: 72,
      surgeryType: 'Cataract Surgery',
      surgeryCategory: 'Elective',
      scheduledDate: '2024-11-13',
      scheduledTime: '03:30 PM',
      estimatedDuration: 30,
      operatingRoom: 'OR-4',
      primarySurgeon: 'Dr. Emily Carter',
      assistingSurgeons: [],
      anesthesiologist: 'Dr. Michael Torres',
      anesthesiaType: 'Local with Sedation',
      scrubNurse: 'Nurse Amanda Brown',
      circulatingNurse: 'Nurse David Lee',
      status: 'Completed',
      preOpChecklist: [
        { item: 'Consent signed', completed: true, completedBy: 'Dr. Emily Carter', time: '02:30 PM' },
        { item: 'NPO status verified', completed: true, completedBy: 'Nurse David Lee', time: '02:45 PM' },
        { item: 'Surgical site marked', completed: true, completedBy: 'Dr. Emily Carter', time: '03:00 PM' },
        { item: 'Pre-op antibiotics given', completed: true, completedBy: 'Nurse Amanda Brown', time: '03:15 PM' },
        { item: 'Patient ID verified', completed: true, completedBy: 'Nurse David Lee', time: '03:20 PM' },
        { item: 'Allergies reviewed', completed: true, completedBy: 'Dr. Michael Torres', time: '03:25 PM' },
      ],
      diagnosis: 'Age-related Cataract - Right Eye',
      procedure: 'Phacoemulsification with IOL Implantation',
      equipmentNeeded: ['Phaco Machine', 'IOL Lens', 'Microscope'],
      bloodType: 'O+',
      consent: {
        obtained: true,
        obtainedBy: 'Dr. Emily Carter',
        date: '2024-11-06',
      },
      npoDuration: '4 hours',
      labResults: [
        { test: 'Eye Exam', result: 'Significant visual impairment', date: '2024-11-01' },
        { test: 'Biometry', result: 'IOL power calculated', date: '2024-11-05' },
      ],
    },
  ];

  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesSearch = 
      surgery.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const surgeryDate = new Date(surgery.scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let matchesDate = true;
    if (filterDate === 'today') {
      matchesDate = surgeryDate.toDateString() === today.toDateString();
    } else if (filterDate === 'tomorrow') {
      matchesDate = surgeryDate.toDateString() === tomorrow.toDateString();
    }
    
    return matchesSearch && matchesDate;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Elective': 'bg-blue-100 text-blue-700 border-blue-200',
      'Emergency': 'bg-red-100 text-red-700 border-red-200',
      'Urgent': 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return colors[category as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Scheduled': 'bg-slate-100 text-slate-700 border-slate-200',
      'Pre-Op': 'bg-amber-100 text-amber-700 border-amber-200',
      'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
      'Post-Op': 'bg-purple-100 text-purple-700 border-purple-200',
      'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Cancelled': 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status as keyof typeof colors];
  };

  const todaySurgeries = surgeries.filter(s => s.scheduledDate === '2024-11-13').length;
  const inProgress = surgeries.filter(s => s.status === 'In Progress').length;
  const completed = surgeries.filter(s => s.status === 'Completed').length;
  const preOp = surgeries.filter(s => s.status === 'Pre-Op').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            Surgery Scheduling
          </h2>
          <p className="text-gray-600 mt-1">Manage surgical procedures and operating room schedules</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/30">
              <Plus className="w-4 h-4" />
              Schedule Surgery
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50/30 border-2">
            <DialogHeader className="border-b pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 -mx-6 -mt-6 px-6 pt-6 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl">Schedule New Surgery</DialogTitle>
                  <DialogDescription>Complete the form below to schedule a surgical procedure</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-6 py-6">
              {/* Patient Information */}
              <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <h3 className="flex items-center gap-2 text-blue-900">
                  <User className="w-5 h-5" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patient ID or Name *</Label>
                    <Input placeholder="Search patient..." className="bg-white shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Type *</Label>
                    <Select className="w-full px-3 py-2 border rounded-lg bg-white shadow-sm">
                      <SelectTrigger className="bg-white shadow-sm">
                        <SelectValue>Select blood type</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem>A+</SelectItem>
                        <SelectItem>A-</SelectItem>
                        <SelectItem>B+</SelectItem>
                        <SelectItem>B-</SelectItem>
                        <SelectItem>O+</SelectItem>
                        <SelectItem>O-</SelectItem>
                        <SelectItem>AB+</SelectItem>
                        <SelectItem>AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Surgery Details */}
              <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <h3 className="flex items-center gap-2 text-purple-900">
                  <Scissors className="w-5 h-5" />
                  Surgery Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Surgery Type *</Label>
                    <Input placeholder="e.g., Hip Replacement, Appendectomy" className="bg-white shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select className="w-full px-3 py-2 border rounded-lg bg-white shadow-sm">
                      <SelectTrigger className="bg-white shadow-sm">
                        <SelectValue>Select category</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem>Elective</SelectItem>
                        <SelectItem>Urgent</SelectItem>
                        <SelectItem>Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Diagnosis *</Label>
                    <Input placeholder="Primary diagnosis" className="bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <h3 className="flex items-center gap-2 text-emerald-900">
                  <Calendar className="w-5 h-5" />
                  Schedule & Location
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Surgery Date *</Label>
                    <Input type="date" className="bg-white shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label>Surgery Time *</Label>
                    <Input type="time" className="bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="border-t pt-4 -mx-6 -mb-6 px-6 pb-6 bg-gradient-to-r from-gray-50 to-blue-50/30">
              <Button variant="outline" className="px-6">Cancel</Button>
              <Button 
                onClick={() => actions.scheduleSurgery()}
                className="px-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg"
              >
                Schedule Surgery
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-2">Today's Surgeries</p>
                <p className="text-4xl mb-2">{todaySurgeries}</p>
                <p className="text-xs text-gray-500">Scheduled procedures</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg text-white">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-2">In Progress</p>
                <p className="text-4xl mb-2">{inProgress}</p>
                <p className="text-xs text-gray-500">Active surgeries</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg text-white">
                <Activity className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-2">Pre-Op Ready</p>
                <p className="text-4xl mb-2">{preOp}</p>
                <p className="text-xs text-gray-500">Patients ready</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg text-white">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-2">OR Utilization</p>
                <p className="text-4xl mb-2">78%</p>
                <p className="text-xs text-gray-500">Efficiency rate</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg text-white">
                <Clock className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by patient name, ID, or surgery type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gradient-to-r from-gray-50 to-blue-50/30"
              />
            </div>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[180px] bg-white shadow-sm">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Surgeries */}
      <div className="grid gap-6">
        {filteredSurgeries.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No Surgeries Found</h3>
              <p className="text-gray-600 mb-6">No surgeries scheduled for the selected date. Schedule a new surgery to get started.</p>
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Surgery
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredSurgeries.map((surgery) => {
            const checklistComplete = surgery.preOpChecklist.every(item => item.completed);
            const completedItems = surgery.preOpChecklist.filter(item => item.completed).length;
            const completionPercent = (completedItems / surgery.preOpChecklist.length) * 100;

            return (
              <Card key={surgery.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${
                  surgery.status === 'In Progress' ? 'from-blue-500 to-cyan-500' :
                  surgery.status === 'Pre-Op' ? 'from-amber-500 to-orange-500' :
                  surgery.status === 'Scheduled' ? 'from-slate-500 to-gray-500' :
                  surgery.status === 'Completed' ? 'from-green-500 to-emerald-500' :
                  'from-purple-500 to-pink-500'
                }`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                          {surgery.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="mb-1">{surgery.patientName}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="border-gray-300">{surgery.patientId}</Badge>
                            <Badge className={getCategoryColor(surgery.surgeryCategory) + ' border'}>{surgery.surgeryCategory}</Badge>
                            <Badge className={getStatusColor(surgery.status) + ' border'}>{surgery.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl mb-4">
                        <p className="text-sm mb-2 text-gray-600">
                          <span className="font-semibold">Surgery ID:</span> {surgery.id} • <span className="font-semibold">Age:</span> {surgery.age} years • <span className="font-semibold">Blood Type:</span> {surgery.bloodType}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-gray-700">Procedure:</span> {surgery.surgeryType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Surgery Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <p className="text-xs text-gray-600">Date & Time</p>
                      </div>
                      <p className="text-sm mb-1">{new Date(surgery.scheduledDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{surgery.scheduledTime}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <p className="text-xs text-gray-600">Duration</p>
                      </div>
                      <p className="text-sm">{surgery.estimatedDuration} minutes</p>
                      <p className="text-sm text-gray-600">{(surgery.estimatedDuration / 60).toFixed(1)} hours</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <p className="text-xs text-gray-600">Operating Room</p>
                      </div>
                      <p className="text-sm">{surgery.operatingRoom}</p>
                      <p className="text-sm text-gray-600">{surgery.anesthesiaType}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-orange-600" />
                        <p className="text-xs text-gray-600">Category</p>
                      </div>
                      <p className="text-sm">{surgery.surgeryCategory}</p>
                      <p className="text-sm text-gray-600">Priority</p>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="mb-6 bg-gradient-to-r from-gray-50 to-blue-50/30 p-4 rounded-xl">
                    <p className="text-sm mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">Surgical Team</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Primary Surgeon</p>
                          <p className="text-sm">{surgery.primarySurgeon}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                          <Syringe className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Anesthesiologist</p>
                          <p className="text-sm">{surgery.anesthesiologist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Scrub Nurse</p>
                          <p className="text-sm">{surgery.scrubNurse}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pre-Op Checklist */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">Pre-Op Checklist Progress</span>
                      </p>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        checklistComplete ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {completedItems}/{surgery.preOpChecklist.length} Complete
                      </span>
                    </div>
                    <Progress value={completionPercent} className="mb-4 h-2" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {surgery.preOpChecklist.map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-2 text-sm p-3 rounded-lg transition-all ${
                          item.completed 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                            : 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          )}
                          <span className="text-xs">{item.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {surgery.specialInstructions && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 shadow-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-900 mb-1">Special Instructions</p>
                          <p className="text-sm text-yellow-800">{surgery.specialInstructions}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {surgery.status === 'Scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => actions.startPreOp()}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Start Pre-Op
                      </Button>
                    )}
                    {surgery.status === 'Pre-Op' && checklistComplete && (
                      <Button 
                        size="sm" 
                        onClick={() => actions.moveToOR()}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md"
                      >
                        <ChevronRight className="w-4 h-4 mr-2" />
                        Move to OR
                      </Button>
                    )}
                    {surgery.status === 'In Progress' && (
                      <Button 
                        size="sm" 
                        onClick={() => actions.completeSurgery()}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Surgery
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedSurgery(surgery);
                        setDetailsOpen(true);
                      }}
                      className="border-2 hover:bg-blue-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Full Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => actions.downloadReport()}
                      className="border-2 hover:bg-green-50"
                    >
                      Print OR Sheet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}