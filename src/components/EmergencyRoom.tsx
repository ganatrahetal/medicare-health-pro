import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Plus, AlertTriangle, Clock, Activity, User, Siren, Heart, Thermometer, Ambulance, FileText, Edit, TestTube, Scan, BedDouble, Play, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface EmergencyCase {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  arrivalTime: string;
  arrivalMode: 'Ambulance' | 'Walk-in' | 'Helicopter' | 'Police';
  chiefComplaint: string;
  triageLevel: 1 | 2 | 3 | 4 | 5;
  triageColor: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
  status: 'Waiting' | 'In Treatment' | 'Observation' | 'Admitted' | 'Discharged' | 'Transferred';
  assignedDoctor?: string;
  assignedNurse?: string;
  bedNumber?: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    respRate: number;
    temperature: number;
    oxygenSat: number;
    painScale: number;
    consciousness: string;
  };
  symptoms: string[];
  allergies: string[];
  currentMedications: string[];
  diagnosis?: string;
  treatmentPlan?: string;
  labsOrdered?: string[];
  imagingOrdered?: string[];
  consultations?: string[];
  notes?: string;
  estimatedWaitTime?: number;
}

export function EmergencyRoom() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTriage, setFilterTriage] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<EmergencyCase | null>(null);
  
  // Dialog states
  const [viewChartOpen, setViewChartOpen] = useState(false);
  const [updateVitalsOpen, setUpdateVitalsOpen] = useState(false);
  const [orderLabsOpen, setOrderLabsOpen] = useState(false);
  const [orderImagingOpen, setOrderImagingOpen] = useState(false);
  const [admitPatientOpen, setAdmitPatientOpen] = useState(false);
  const [startTreatmentOpen, setStartTreatmentOpen] = useState(false);

  const emergencyCases: EmergencyCase[] = [
    {
      id: 'ER-2024-001',
      patientName: 'Michael Stevens',
      age: 52,
      gender: 'Male',
      arrivalTime: '2024-11-13 08:45 AM',
      arrivalMode: 'Ambulance',
      chiefComplaint: 'Severe chest pain, shortness of breath',
      triageLevel: 1,
      triageColor: 'red',
      status: 'In Treatment',
      assignedDoctor: 'Dr. Emily Chen',
      assignedNurse: 'Nurse Jessica Brown',
      bedNumber: 'ER-01',
      vitals: {
        bloodPressure: '170/105',
        heartRate: 115,
        respRate: 24,
        temperature: 98.8,
        oxygenSat: 92,
        painScale: 9,
        consciousness: 'Alert',
      },
      symptoms: ['Chest pain', 'Shortness of breath', 'Sweating', 'Nausea'],
      allergies: ['Penicillin'],
      currentMedications: ['Aspirin 81mg', 'Lisinopril 10mg'],
      diagnosis: 'Suspected Myocardial Infarction',
      treatmentPlan: 'ECG, Cardiac enzymes, Oxygen therapy, IV access, Aspirin, Nitroglycerin',
      labsOrdered: ['Troponin', 'CBC', 'Comprehensive Metabolic Panel', 'Coagulation Panel'],
      imagingOrdered: ['ECG', 'Chest X-Ray'],
      consultations: ['Cardiology'],
      notes: 'Patient reports crushing chest pain radiating to left arm. Immediate cardiac workup initiated.',
    },
    {
      id: 'ER-2024-002',
      patientName: 'Emma Rodriguez',
      age: 8,
      gender: 'Female',
      arrivalTime: '2024-11-13 09:15 AM',
      arrivalMode: 'Walk-in',
      chiefComplaint: 'Difficulty breathing, wheezing',
      triageLevel: 2,
      triageColor: 'orange',
      status: 'In Treatment',
      assignedDoctor: 'Dr. James Wilson',
      assignedNurse: 'Nurse Michael Chen',
      bedNumber: 'ER-04',
      vitals: {
        bloodPressure: '95/60',
        heartRate: 125,
        respRate: 32,
        temperature: 99.2,
        oxygenSat: 89,
        painScale: 5,
        consciousness: 'Alert',
      },
      symptoms: ['Wheezing', 'Cough', 'Difficulty breathing', 'Chest tightness'],
      allergies: ['Peanuts', 'Tree nuts'],
      currentMedications: ['Albuterol inhaler PRN'],
      diagnosis: 'Acute Asthma Exacerbation',
      treatmentPlan: 'Nebulizer treatment, Oral steroids, Continuous monitoring',
      labsOrdered: ['CBC', 'Chest X-Ray'],
      imagingOrdered: ['Chest X-Ray'],
      notes: 'Pediatric patient with known asthma history. Responding well to nebulizer treatments.',
    },
    {
      id: 'ER-2024-003',
      patientName: 'Thomas Anderson',
      age: 35,
      gender: 'Male',
      arrivalTime: '2024-11-13 09:30 AM',
      arrivalMode: 'Ambulance',
      chiefComplaint: 'Motor vehicle accident - multiple injuries',
      triageLevel: 1,
      triageColor: 'red',
      status: 'In Treatment',
      assignedDoctor: 'Dr. Amanda Roberts',
      assignedNurse: 'Nurse Sarah Martinez',
      bedNumber: 'TRAUMA-01',
      vitals: {
        bloodPressure: '90/60',
        heartRate: 128,
        respRate: 22,
        temperature: 97.8,
        oxygenSat: 94,
        painScale: 8,
        consciousness: 'Alert but confused',
      },
      symptoms: ['Head injury', 'Abdominal pain', 'Left leg deformity', 'Multiple lacerations'],
      allergies: ['None known'],
      currentMedications: ['None'],
      diagnosis: 'Polytrauma - MVA',
      treatmentPlan: 'FAST exam, IV fluids, Pain management, Trauma surgery consult',
      labsOrdered: ['Type and Cross', 'CBC', 'Comprehensive Metabolic Panel', 'Coagulation Studies'],
      imagingOrdered: ['CT Head', 'CT C-spine', 'CT Chest/Abdomen/Pelvis', 'X-ray Left Leg'],
      consultations: ['Trauma Surgery', 'Orthopedics', 'Neurosurgery'],
      notes: 'Trauma activation. Multiple injuries from high-speed MVA. Stable but requires urgent surgical evaluation.',
    },
    {
      id: 'ER-2024-004',
      patientName: 'Linda Washington',
      age: 67,
      gender: 'Female',
      arrivalTime: '2024-11-13 10:00 AM',
      arrivalMode: 'Walk-in',
      chiefComplaint: 'Severe abdominal pain, vomiting',
      triageLevel: 3,
      triageColor: 'yellow',
      status: 'Waiting',
      vitals: {
        bloodPressure: '145/88',
        heartRate: 92,
        respRate: 18,
        temperature: 100.4,
        oxygenSat: 96,
        painScale: 7,
        consciousness: 'Alert',
      },
      symptoms: ['Abdominal pain', 'Nausea', 'Vomiting', 'Fever'],
      allergies: ['Sulfa drugs'],
      currentMedications: ['Metformin', 'Atorvastatin'],
      estimatedWaitTime: 30,
    },
    {
      id: 'ER-2024-005',
      patientName: 'James Patterson',
      age: 28,
      gender: 'Male',
      arrivalTime: '2024-11-13 10:20 AM',
      arrivalMode: 'Walk-in',
      chiefComplaint: 'Laceration to right hand',
      triageLevel: 4,
      triageColor: 'green',
      status: 'Waiting',
      vitals: {
        bloodPressure: '128/78',
        heartRate: 82,
        respRate: 16,
        temperature: 98.6,
        oxygenSat: 99,
        painScale: 4,
        consciousness: 'Alert',
      },
      symptoms: ['Laceration', 'Bleeding (controlled)'],
      allergies: ['None'],
      currentMedications: ['None'],
      estimatedWaitTime: 60,
    },
    {
      id: 'ER-2024-006',
      patientName: 'Patricia Moore',
      age: 45,
      gender: 'Female',
      arrivalTime: '2024-11-13 07:30 AM',
      arrivalMode: 'Ambulance',
      chiefComplaint: 'Altered mental status, suspected overdose',
      triageLevel: 1,
      triageColor: 'red',
      status: 'Observation',
      assignedDoctor: 'Dr. Amanda Roberts',
      assignedNurse: 'Nurse David Lee',
      bedNumber: 'ER-05',
      vitals: {
        bloodPressure: '100/65',
        heartRate: 58,
        respRate: 10,
        temperature: 97.2,
        oxygenSat: 91,
        painScale: 0,
        consciousness: 'Lethargic',
      },
      symptoms: ['Altered consciousness', 'Slow breathing', 'Pinpoint pupils'],
      allergies: ['Unknown'],
      currentMedications: ['Unknown'],
      diagnosis: 'Opioid Overdose',
      treatmentPlan: 'Narcan administered, IV fluids, Observation, Toxicology screen, Psychiatric consult',
      labsOrdered: ['Toxicology Screen', 'CBC', 'Comprehensive Metabolic Panel', 'Liver Function'],
      consultations: ['Psychiatry', 'Social Work'],
      notes: 'Naloxone administered by EMS. Patient responding. Monitoring in observation area.',
    },
  ];

  const filteredCases = emergencyCases.filter(c => {
    const matchesSearch = 
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTriage = filterTriage === 'all' || c.triageLevel.toString() === filterTriage;
    
    return matchesSearch && matchesTriage;
  });

  const getTriageInfo = (level: number) => {
    const info = {
      1: { label: 'Resuscitation', color: 'bg-red-600 text-white', border: 'border-red-600', time: 'Immediate' },
      2: { label: 'Emergency', color: 'bg-orange-600 text-white', border: 'border-orange-600', time: '10 mins' },
      3: { label: 'Urgent', color: 'bg-yellow-600 text-white', border: 'border-yellow-600', time: '30 mins' },
      4: { label: 'Semi-Urgent', color: 'bg-green-600 text-white', border: 'border-green-600', time: '60 mins' },
      5: { label: 'Non-Urgent', color: 'bg-blue-600 text-white', border: 'border-blue-600', time: '120 mins' },
    };
    return info[level as keyof typeof info];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Waiting': 'bg-yellow-100 text-yellow-700',
      'In Treatment': 'bg-blue-100 text-blue-700',
      'Observation': 'bg-purple-100 text-purple-700',
      'Admitted': 'bg-green-100 text-green-700',
      'Discharged': 'bg-gray-100 text-gray-700',
      'Transferred': 'bg-indigo-100 text-indigo-700',
    };
    return colors[status as keyof typeof colors];
  };

  const totalCases = emergencyCases.length;
  const activeCases = emergencyCases.filter(c => c.status === 'In Treatment' || c.status === 'Waiting').length;
  const criticalCases = emergencyCases.filter(c => c.triageLevel <= 2).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Siren className="w-7 h-7 text-red-600" />
            Emergency Room
          </h2>
          <p className="text-gray-600">Real-time emergency department management</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4" />
              Register Emergency
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Emergency Patient Registration</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Input placeholder="Patient Name" />
              <Input placeholder="Age" type="number" />
              <Input placeholder="Gender" />
              <select className="px-3 py-2 border rounded-md">
                <option>Arrival Mode</option>
                <option>Ambulance</option>
                <option>Walk-in</option>
                <option>Helicopter</option>
                <option>Police</option>
              </select>
              <Input placeholder="Chief Complaint" className="col-span-2" />
              <Input placeholder="Blood Pressure" />
              <Input placeholder="Heart Rate" type="number" />
              <Input placeholder="Respiratory Rate" type="number" />
              <Input placeholder="Temperature" type="number" step="0.1" />
              <Input placeholder="Oxygen Saturation (%)" type="number" />
              <select className="px-3 py-2 border rounded-md">
                <option>Triage Level</option>
                <option value="1">Level 1 - Resuscitation</option>
                <option value="2">Level 2 - Emergency</option>
                <option value="3">Level 3 - Urgent</option>
                <option value="4">Level 4 - Semi-Urgent</option>
                <option value="5">Level 5 - Non-Urgent</option>
              </select>
              <Input placeholder="Known Allergies" className="col-span-2" />
              <textarea 
                placeholder="Additional Notes" 
                className="col-span-2 px-3 py-2 border rounded-md min-h-[80px]"
              />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">Register Patient</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Cases</p>
                <p className="mt-2">{totalCases}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <User className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Cases</p>
                <p className="mt-2">{activeCases}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Critical</p>
                <p className="mt-2 text-red-600">{criticalCases}</p>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Wait Time</p>
                <p className="mt-2">24 mins</p>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by patient name, ID, or complaint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterTriage} onValueChange={setFilterTriage}>
          <SelectTrigger className="w-[240px] bg-white shadow-sm">
            <SelectValue placeholder="All Triage Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Triage Levels</SelectItem>
            <SelectItem value="1">Level 1 - Resuscitation</SelectItem>
            <SelectItem value="2">Level 2 - Emergency</SelectItem>
            <SelectItem value="3">Level 3 - Urgent</SelectItem>
            <SelectItem value="4">Level 4 - Semi-Urgent</SelectItem>
            <SelectItem value="5">Level 5 - Non-Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases */}
      <div className="grid gap-4">
        {filteredCases.map((emergencyCase) => {
          const triageInfo = getTriageInfo(emergencyCase.triageLevel);
          
          return (
            <Card key={emergencyCase.id} className={`border-l-4 ${triageInfo.border}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${triageInfo.color}`}>
                      <span className="text-2xl">{emergencyCase.triageLevel}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3>{emergencyCase.patientName}</h3>
                        <Badge variant="outline">{emergencyCase.id}</Badge>
                        <Badge className={triageInfo.color}>{triageInfo.label}</Badge>
                        <Badge className={getStatusColor(emergencyCase.status)}>{emergencyCase.status}</Badge>
                        {emergencyCase.arrivalMode === 'Ambulance' && (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            <Ambulance className="w-3 h-3 mr-1" />
                            Ambulance
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {emergencyCase.age} years • {emergencyCase.gender} • Arrived: {emergencyCase.arrivalTime}
                      </p>
                      <p className="text-sm mb-3">
                        <span className="text-gray-600">Chief Complaint:</span> {emergencyCase.chiefComplaint}
                      </p>

                      {/* Vitals */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-3 md:grid-cols-7 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-600">BP</p>
                            <p className={emergencyCase.vitals.bloodPressure.startsWith('17') || emergencyCase.vitals.bloodPressure.startsWith('9') ? 'text-red-600' : ''}>
                              {emergencyCase.vitals.bloodPressure}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">HR</p>
                            <p className={emergencyCase.vitals.heartRate > 100 || emergencyCase.vitals.heartRate < 60 ? 'text-red-600' : ''}>
                              {emergencyCase.vitals.heartRate} bpm
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">RR</p>
                            <p className={emergencyCase.vitals.respRate > 20 || emergencyCase.vitals.respRate < 12 ? 'text-red-600' : ''}>
                              {emergencyCase.vitals.respRate}/min
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Temp</p>
                            <p className={emergencyCase.vitals.temperature > 100 || emergencyCase.vitals.temperature < 96 ? 'text-red-600' : ''}>
                              {emergencyCase.vitals.temperature}°F
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">SpO2</p>
                            <p className={emergencyCase.vitals.oxygenSat < 95 ? 'text-red-600' : ''}>
                              {emergencyCase.vitals.oxygenSat}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Pain</p>
                            <p className={emergencyCase.vitals.painScale >= 7 ? 'text-red-600' : ''}>
                              {emergencyCase.vitals.painScale}/10
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Level</p>
                            <p>{emergencyCase.vitals.consciousness}</p>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        {emergencyCase.assignedDoctor && (
                          <div>
                            <span className="text-gray-600">Doctor:</span> {emergencyCase.assignedDoctor}
                          </div>
                        )}
                        {emergencyCase.assignedNurse && (
                          <div>
                            <span className="text-gray-600">Nurse:</span> {emergencyCase.assignedNurse}
                          </div>
                        )}
                        {emergencyCase.bedNumber && (
                          <div>
                            <span className="text-gray-600">Bed:</span> {emergencyCase.bedNumber}
                          </div>
                        )}
                        {emergencyCase.estimatedWaitTime && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <Clock className="w-4 h-4" />
                            Est. Wait: {emergencyCase.estimatedWaitTime} mins
                          </div>
                        )}
                      </div>

                      {emergencyCase.diagnosis && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded mb-3">
                          <p className="text-xs text-gray-600 mb-1">Diagnosis</p>
                          <p className="text-sm">{emergencyCase.diagnosis}</p>
                        </div>
                      )}

                      {emergencyCase.treatmentPlan && (
                        <div className="bg-blue-50 p-3 rounded mb-3">
                          <p className="text-xs text-gray-600 mb-1">Treatment Plan</p>
                          <p className="text-sm">{emergencyCase.treatmentPlan}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {emergencyCase.status === 'Waiting' && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => { setSelectedCase(emergencyCase); setStartTreatmentOpen(true); }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Treatment
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => { setSelectedCase(emergencyCase); setViewChartOpen(true); }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Full Chart
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => { setSelectedCase(emergencyCase); setUpdateVitalsOpen(true); }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Update Vitals
                  </Button>
                  {emergencyCase.status === 'In Treatment' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => { setSelectedCase(emergencyCase); setOrderLabsOpen(true); }}
                      >
                        <TestTube className="w-4 h-4 mr-2" />
                        Order Labs
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => { setSelectedCase(emergencyCase); setOrderImagingOpen(true); }}
                      >
                        <Scan className="w-4 h-4 mr-2" />
                        Order Imaging
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600 border-green-600"
                        onClick={() => { setSelectedCase(emergencyCase); setAdmitPatientOpen(true); }}
                      >
                        <BedDouble className="w-4 h-4 mr-2" />
                        Admit Patient
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* View Full Chart Dialog */}
      <Dialog open={viewChartOpen} onOpenChange={setViewChartOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Emergency Chart - {selectedCase?.id}
            </DialogTitle>
            <DialogDescription>
              Complete emergency department record for {selectedCase?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient Name</Label>
                    <p className="font-semibold">{selectedCase.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Age / Gender</Label>
                    <p className="font-semibold">{selectedCase.age} years / {selectedCase.gender}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Triage Level</Label>
                    <Badge className={getTriageInfo(selectedCase.triageLevel).color}>
                      {getTriageInfo(selectedCase.triageLevel).label}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Arrival Time</Label>
                    <p className="font-semibold">{selectedCase.arrivalTime}</p>
                  </div>
                </div>
              </div>

              {/* Chief Complaint */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-2 block">Chief Complaint</Label>
                <p className="text-sm bg-yellow-50 p-3 rounded">{selectedCase.chiefComplaint}</p>
              </div>

              {/* Vitals */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Vital Signs</Label>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Blood Pressure</p>
                    <p className="font-semibold">{selectedCase.vitals.bloodPressure} mmHg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Heart Rate</p>
                    <p className="font-semibold">{selectedCase.vitals.heartRate} bpm</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Respiratory Rate</p>
                    <p className="font-semibold">{selectedCase.vitals.respRate}/min</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Temperature</p>
                    <p className="font-semibold">{selectedCase.vitals.temperature}°F</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Oxygen Saturation</p>
                    <p className="font-semibold">{selectedCase.vitals.oxygenSat}%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Pain Scale</p>
                    <p className="font-semibold">{selectedCase.vitals.painScale}/10</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded col-span-2">
                    <p className="text-xs text-gray-600 mb-1">Level of Consciousness</p>
                    <p className="font-semibold">{selectedCase.vitals.consciousness}</p>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Symptoms</Label>
                  <div className="space-y-1">
                    {selectedCase.symptoms.map((symptom, idx) => (
                      <Badge key={idx} variant="outline" className="mr-1">{symptom}</Badge>
                    ))}
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Allergies</Label>
                  <div className="space-y-1">
                    {selectedCase.allergies.map((allergy, idx) => (
                      <Badge key={idx} className="bg-red-100 text-red-700 mr-1">{allergy}</Badge>
                    ))}
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Current Medications</Label>
                  <div className="space-y-1">
                    {selectedCase.currentMedications.map((med, idx) => (
                      <p key={idx} className="text-sm">{med}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnosis & Treatment */}
              {selectedCase.diagnosis && (
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Diagnosis</Label>
                  <p className="text-sm bg-red-50 p-3 rounded">{selectedCase.diagnosis}</p>
                </div>
              )}

              {selectedCase.treatmentPlan && (
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Treatment Plan</Label>
                  <p className="text-sm bg-blue-50 p-3 rounded">{selectedCase.treatmentPlan}</p>
                </div>
              )}

              {/* Orders */}
              <div className="grid grid-cols-2 gap-4">
                {selectedCase.labsOrdered && (
                  <div className="border rounded-lg p-4">
                    <Label className="text-gray-700 mb-2 block">Labs Ordered</Label>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedCase.labsOrdered.map((lab, idx) => (
                        <li key={idx}>{lab}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedCase.imagingOrdered && (
                  <div className="border rounded-lg p-4">
                    <Label className="text-gray-700 mb-2 block">Imaging Ordered</Label>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedCase.imagingOrdered.map((img, idx) => (
                        <li key={idx}>{img}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Consultations */}
              {selectedCase.consultations && (
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Consultations</Label>
                  <div className="space-y-1">
                    {selectedCase.consultations.map((consult, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-700 mr-2">{consult}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedCase.notes && (
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                  <Label className="text-gray-700 block mb-2">Clinical Notes</Label>
                  <p className="text-sm">{selectedCase.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewChartOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Print Chart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Vitals Dialog */}
      <Dialog open={updateVitalsOpen} onOpenChange={setUpdateVitalsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Update Vital Signs - {selectedCase?.patientName}
            </DialogTitle>
            <DialogDescription>
              Record new vital sign measurements
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedCase.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Case ID</Label>
                    <p className="font-semibold">{selectedCase.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Time</Label>
                    <p className="font-semibold">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bp">Blood Pressure *</Label>
                  <Input id="bp" placeholder="120/80" defaultValue={selectedCase.vitals.bloodPressure} />
                </div>
                <div>
                  <Label htmlFor="hr">Heart Rate (bpm) *</Label>
                  <Input id="hr" type="number" placeholder="75" defaultValue={selectedCase.vitals.heartRate} />
                </div>
                <div>
                  <Label htmlFor="rr">Respiratory Rate (/min) *</Label>
                  <Input id="rr" type="number" placeholder="16" defaultValue={selectedCase.vitals.respRate} />
                </div>
                <div>
                  <Label htmlFor="temp">Temperature (°F) *</Label>
                  <Input id="temp" type="number" step="0.1" placeholder="98.6" defaultValue={selectedCase.vitals.temperature} />
                </div>
                <div>
                  <Label htmlFor="spo2">Oxygen Saturation (%) *</Label>
                  <Input id="spo2" type="number" placeholder="98" defaultValue={selectedCase.vitals.oxygenSat} />
                </div>
                <div>
                  <Label htmlFor="pain">Pain Scale (0-10) *</Label>
                  <Input id="pain" type="number" min="0" max="10" placeholder="0" defaultValue={selectedCase.vitals.painScale} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="consciousness">Level of Consciousness *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consciousness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alert">Alert</SelectItem>
                      <SelectItem value="Alert but confused">Alert but confused</SelectItem>
                      <SelectItem value="Lethargic">Lethargic</SelectItem>
                      <SelectItem value="Obtunded">Obtunded</SelectItem>
                      <SelectItem value="Stuporous">Stuporous</SelectItem>
                      <SelectItem value="Comatose">Comatose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="vitalNotes">Notes</Label>
                  <Textarea id="vitalNotes" placeholder="Any observations or changes..." rows={3} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateVitalsOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setUpdateVitalsOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Vitals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Labs Dialog */}
      <Dialog open={orderLabsOpen} onOpenChange={setOrderLabsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              Order Laboratory Tests - {selectedCase?.patientName}
            </DialogTitle>
            <DialogDescription>
              Select laboratory tests to order
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedCase.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Case ID</Label>
                    <p className="font-semibold">{selectedCase.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getTriageInfo(selectedCase.triageLevel).color}>
                      {selectedCase.triageLevel <= 2 ? 'STAT' : 'Routine'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 max-h-[400px] overflow-y-auto">
                <Label className="text-gray-700 mb-3 block">Select Laboratory Tests</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Complete Blood Count (CBC)',
                    'Comprehensive Metabolic Panel',
                    'Liver Function Tests',
                    'Lipid Panel',
                    'Thyroid Function Tests',
                    'Troponin',
                    'BNP',
                    'D-Dimer',
                    'Coagulation Panel (PT/INR/PTT)',
                    'Blood Culture',
                    'Urinalysis',
                    'Urine Culture',
                    'Blood Type & Screen',
                    'Type & Cross Match',
                    'Arterial Blood Gas (ABG)',
                    'Toxicology Screen',
                    'Pregnancy Test (HCG)',
                    'Hemoglobin A1c'
                  ].map((test) => (
                    <div key={test} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <input type="checkbox" id={test} className="rounded" />
                      <label htmlFor={test} className="text-sm cursor-pointer">{test}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="labNotes">Clinical Indication *</Label>
                <Textarea id="labNotes" placeholder="Reason for ordering labs..." rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderLabsOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={() => setOrderLabsOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Order Labs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Imaging Dialog */}
      <Dialog open={orderImagingOpen} onOpenChange={setOrderImagingOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5" />
              Order Imaging Studies - {selectedCase?.patientName}
            </DialogTitle>
            <DialogDescription>
              Select imaging studies to order
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedCase.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Case ID</Label>
                    <p className="font-semibold">{selectedCase.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getTriageInfo(selectedCase.triageLevel).color}>
                      {selectedCase.triageLevel <= 2 ? 'STAT' : 'Routine'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 max-h-[400px] overflow-y-auto">
                <Label className="text-gray-700 mb-3 block">Select Imaging Studies</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'X-Ray - Chest',
                    'X-Ray - Abdomen',
                    'X-Ray - Extremity',
                    'X-Ray - Spine',
                    'CT Head (non-contrast)',
                    'CT Head (with contrast)',
                    'CT Chest',
                    'CT Abdomen/Pelvis',
                    'CT Angiography',
                    'MRI Brain',
                    'MRI Spine',
                    'Ultrasound Abdomen',
                    'Ultrasound Pelvic',
                    'Ultrasound FAST',
                    'Echocardiogram',
                    'ECG/EKG',
                    'Portable X-Ray',
                    'Fluoroscopy'
                  ].map((study) => (
                    <div key={study} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <input type="checkbox" id={study} className="rounded" />
                      <label htmlFor={study} className="text-sm cursor-pointer">{study}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="contrast">Contrast Required</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - With Contrast</SelectItem>
                    <SelectItem value="no">No - Without Contrast</SelectItem>
                    <SelectItem value="both">Both With and Without</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="imagingNotes">Clinical Indication *</Label>
                <Textarea id="imagingNotes" placeholder="Reason for imaging..." rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderImagingOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setOrderImagingOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Order Imaging
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admit Patient Dialog */}
      <Dialog open={admitPatientOpen} onOpenChange={setAdmitPatientOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BedDouble className="w-5 h-5" />
              Admit Patient - {selectedCase?.patientName}
            </DialogTitle>
            <DialogDescription>
              Complete hospital admission from emergency department
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedCase.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Case ID</Label>
                    <p className="font-semibold">{selectedCase.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Diagnosis</Label>
                    <p className="font-semibold">{selectedCase.diagnosis || 'Pending'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admitDept">Admitting Department *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="ICU">Intensive Care Unit (ICU)</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Obstetrics">Obstetrics</SelectItem>
                      <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="admitPhysician">Admitting Physician *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select physician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Emily Chen">Dr. Emily Chen</SelectItem>
                      <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                      <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                      <SelectItem value="Dr. Michael Brown">Dr. Michael Brown</SelectItem>
                      <SelectItem value="Dr. Sarah Martinez">Dr. Sarah Martinez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedAssignment">Bed Assignment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="301-A">Room 301-A (Available)</SelectItem>
                      <SelectItem value="302-B">Room 302-B (Available)</SelectItem>
                      <SelectItem value="ICU-1">ICU Bed 1 (Available)</SelectItem>
                      <SelectItem value="ICU-2">ICU Bed 2 (Available)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="admitStatus">Admission Status *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Observation">Observation (less than 24 hrs)</SelectItem>
                      <SelectItem value="Inpatient">Inpatient</SelectItem>
                      <SelectItem value="Critical">Critical Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="admitDiagnosis">Admitting Diagnosis *</Label>
                  <Input id="admitDiagnosis" placeholder="Primary diagnosis" defaultValue={selectedCase.diagnosis} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="admitNotes">Admission Orders & Instructions *</Label>
                  <Textarea id="admitNotes" placeholder="Enter admission orders, diet, activity level, etc..." rows={4} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAdmitPatientOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAdmitPatientOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Admission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Start Treatment Dialog */}
      <Dialog open={startTreatmentOpen} onOpenChange={setStartTreatmentOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Treatment - {selectedCase?.patientName}
            </DialogTitle>
            <DialogDescription>
              Begin emergency treatment and assign medical team
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedCase.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Triage Level</Label>
                    <Badge className={getTriageInfo(selectedCase.triageLevel).color}>
                      Level {selectedCase.triageLevel}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Chief Complaint</Label>
                    <p className="font-semibold text-xs">{selectedCase.chiefComplaint.substring(0, 30)}...</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Wait Time</Label>
                    <p className="font-semibold">{selectedCase.estimatedWaitTime || 0} mins</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignDoctor">Assign Physician *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select physician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Emily Chen">Dr. Emily Chen - Available</SelectItem>
                      <SelectItem value="Dr. James Wilson">Dr. James Wilson - Available</SelectItem>
                      <SelectItem value="Dr. Amanda Roberts">Dr. Amanda Roberts - Busy</SelectItem>
                      <SelectItem value="Dr. Michael Brown">Dr. Michael Brown - Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignNurse">Assign Nurse *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nurse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nurse Jessica Brown">Nurse Jessica Brown</SelectItem>
                      <SelectItem value="Nurse Michael Chen">Nurse Michael Chen</SelectItem>
                      <SelectItem value="Nurse Sarah Martinez">Nurse Sarah Martinez</SelectItem>
                      <SelectItem value="Nurse David Lee">Nurse David Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignBed">Assign Treatment Bay *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ER-01">ER Bay 01 - Available</SelectItem>
                      <SelectItem value="ER-02">ER Bay 02 - Available</SelectItem>
                      <SelectItem value="ER-03">ER Bay 03 - Available</SelectItem>
                      <SelectItem value="TRAUMA-01">Trauma Bay 01 - Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="initialOrders">Initial Treatment Orders</Label>
                  <Textarea id="initialOrders" placeholder="Enter initial treatment orders (IV access, oxygen, medications, etc)..." rows={4} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setStartTreatmentOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStartTreatmentOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Start Treatment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
