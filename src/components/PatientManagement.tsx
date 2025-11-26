import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, Edit, Eye, Phone, Mail, MapPin, Calendar, FileText, Activity, Pill, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  admissionDate: string;
  condition: string;
  status: 'Admitted' | 'Outpatient' | 'Discharged' | 'Critical';
  assignedDoctor: string;
  department: string;
  roomNumber?: string;
  insuranceId: string;
  allergies: string[];
  medicalHistory: {
    date: string;
    diagnosis: string;
    treatment: string;
    doctor: string;
  }[];
  currentMedications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
  }[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
    lastUpdated: string;
  };
}

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const patients: Patient[] = [
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, New York, NY 10001',
      bloodGroup: 'A+',
      emergencyContact: '+1 (555) 987-6543',
      admissionDate: '2024-11-10',
      condition: 'Cardiac Arrhythmia',
      status: 'Admitted',
      assignedDoctor: 'Dr. Emily Chen',
      department: 'Cardiology',
      roomNumber: '305',
      insuranceId: 'INS-2024-001',
      allergies: ['Penicillin', 'Latex'],
      medicalHistory: [
        { date: '2024-11-10', diagnosis: 'Cardiac Arrhythmia', treatment: 'Beta-blockers prescribed', doctor: 'Dr. Emily Chen' },
        { date: '2024-08-15', diagnosis: 'Hypertension', treatment: 'ACE inhibitors', doctor: 'Dr. James Wilson' },
      ],
      currentMedications: [
        { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', startDate: '2024-11-10' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', startDate: '2024-08-15' },
      ],
      vitals: {
        bloodPressure: '130/85',
        heartRate: 78,
        temperature: 98.6,
        weight: 185,
        height: 72,
        lastUpdated: '2024-11-13 08:30 AM',
      },
    },
    {
      id: 'P002',
      name: 'Sarah Williams',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'sarah.w@email.com',
      address: '456 Oak Ave, Los Angeles, CA 90028',
      bloodGroup: 'B-',
      emergencyContact: '+1 (555) 876-5432',
      admissionDate: '2024-11-12',
      condition: 'Migraine Management',
      status: 'Outpatient',
      assignedDoctor: 'Dr. Michael Brown',
      department: 'Neurology',
      insuranceId: 'INS-2024-002',
      allergies: ['Sulfa drugs'],
      medicalHistory: [
        { date: '2024-11-12', diagnosis: 'Chronic Migraine', treatment: 'Preventive medication', doctor: 'Dr. Michael Brown' },
        { date: '2024-06-20', diagnosis: 'Stress-induced headaches', treatment: 'Lifestyle modifications', doctor: 'Dr. Michael Brown' },
      ],
      currentMedications: [
        { name: 'Topiramate', dosage: '25mg', frequency: 'Once daily', startDate: '2024-11-12' },
        { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', startDate: '2024-11-12' },
      ],
      vitals: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 98.4,
        weight: 145,
        height: 65,
        lastUpdated: '2024-11-12 02:15 PM',
      },
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 68,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'r.johnson@email.com',
      address: '789 Pine Rd, Chicago, IL 60601',
      bloodGroup: 'O+',
      emergencyContact: '+1 (555) 765-4321',
      admissionDate: '2024-11-08',
      condition: 'Hip Replacement Surgery',
      status: 'Admitted',
      assignedDoctor: 'Dr. Lisa Anderson',
      department: 'Orthopedics',
      roomNumber: '412',
      insuranceId: 'INS-2024-003',
      allergies: ['None'],
      medicalHistory: [
        { date: '2024-11-08', diagnosis: 'Severe Osteoarthritis', treatment: 'Hip replacement surgery', doctor: 'Dr. Lisa Anderson' },
        { date: '2024-09-10', diagnosis: 'Osteoarthritis', treatment: 'Physical therapy', doctor: 'Dr. Lisa Anderson' },
      ],
      currentMedications: [
        { name: 'Morphine', dosage: '10mg', frequency: 'Every 4 hours', startDate: '2024-11-08' },
        { name: 'Enoxaparin', dosage: '40mg', frequency: 'Once daily', startDate: '2024-11-08' },
        { name: 'Acetaminophen', dosage: '650mg', frequency: 'Every 6 hours', startDate: '2024-11-08' },
      ],
      vitals: {
        bloodPressure: '135/88',
        heartRate: 68,
        temperature: 98.8,
        weight: 195,
        height: 70,
        lastUpdated: '2024-11-13 07:00 AM',
      },
    },
    {
      id: 'P004',
      name: 'Maria Garcia',
      age: 8,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'garcia.family@email.com',
      address: '321 Elm St, Houston, TX 77001',
      bloodGroup: 'AB+',
      emergencyContact: '+1 (555) 654-3210',
      admissionDate: '2024-11-13',
      condition: 'Acute Bronchitis',
      status: 'Admitted',
      assignedDoctor: 'Dr. James Wilson',
      department: 'Pediatrics',
      roomNumber: '218',
      insuranceId: 'INS-2024-004',
      allergies: ['Peanuts', 'Tree nuts'],
      medicalHistory: [
        { date: '2024-11-13', diagnosis: 'Acute Bronchitis', treatment: 'Nebulizer therapy, antibiotics', doctor: 'Dr. James Wilson' },
        { date: '2024-03-15', diagnosis: 'Common cold', treatment: 'Symptomatic care', doctor: 'Dr. James Wilson' },
      ],
      currentMedications: [
        { name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', startDate: '2024-11-13' },
        { name: 'Albuterol', dosage: '2 puffs', frequency: 'Every 4 hours', startDate: '2024-11-13' },
      ],
      vitals: {
        bloodPressure: '95/60',
        heartRate: 95,
        temperature: 99.8,
        weight: 55,
        height: 50,
        lastUpdated: '2024-11-13 09:45 AM',
      },
    },
    {
      id: 'P005',
      name: 'David Lee',
      age: 55,
      gender: 'Male',
      phone: '+1 (555) 567-8901',
      email: 'david.lee@email.com',
      address: '654 Maple Dr, Seattle, WA 98101',
      bloodGroup: 'A-',
      emergencyContact: '+1 (555) 543-2109',
      admissionDate: '2024-10-28',
      condition: 'Type 2 Diabetes Management',
      status: 'Discharged',
      assignedDoctor: 'Dr. Sarah Martinez',
      department: 'Endocrinology',
      insuranceId: 'INS-2024-005',
      allergies: ['None'],
      medicalHistory: [
        { date: '2024-10-28', diagnosis: 'Type 2 Diabetes', treatment: 'Insulin therapy initiated', doctor: 'Dr. Sarah Martinez' },
        { date: '2024-07-10', diagnosis: 'Pre-diabetes', treatment: 'Dietary changes', doctor: 'Dr. Sarah Martinez' },
      ],
      currentMedications: [
        { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', startDate: '2024-10-28' },
        { name: 'Insulin Glargine', dosage: '20 units', frequency: 'Once daily', startDate: '2024-10-28' },
      ],
      vitals: {
        bloodPressure: '128/82',
        heartRate: 74,
        temperature: 98.5,
        weight: 210,
        height: 69,
        lastUpdated: '2024-11-01 10:30 AM',
      },
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Admitted': return 'bg-blue-100 text-blue-700';
      case 'Outpatient': return 'bg-green-100 text-green-700';
      case 'Discharged': return 'bg-gray-100 text-gray-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Patient Management</h2>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Age" type="number" />
              <Input placeholder="Gender" />
              <Input placeholder="Blood Group" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Email" />
              <Input placeholder="Emergency Contact" className="col-span-2" />
              <Input placeholder="Address" className="col-span-2" />
              <Input placeholder="Insurance ID" />
              <Input placeholder="Allergies (comma separated)" className="col-span-2" />
            </div>
            <Button className="w-full">Register Patient</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search patients by name, ID, or condition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3>{patient.name}</h3>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                      <span className="text-gray-500 text-sm">ID: {patient.id}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 mt-3">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        {patient.age} years, {patient.gender}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-4 h-4" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Activity className="w-4 h-4" />
                        {patient.bloodGroup}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FileText className="w-4 h-4" />
                        {patient.department}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="text-gray-600">Condition:</span> {patient.condition}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600">Doctor:</span> {patient.assignedDoctor}
                        {patient.roomNumber && <span className="text-gray-600"> • Room: {patient.roomNumber}</span>}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { setSelectedPatient(patient); setViewOpen(true); }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setSelectedPatient(patient); setEditOpen(true); }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Patient Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPatient && (
            <div>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Patient Details - {selectedPatient.name}
                </DialogTitle>
                <DialogDescription>
                  Complete medical record and health information
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medical">Medical History</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  {/* Patient Info Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label className="text-gray-600">Patient ID</Label>
                        <p className="font-semibold">{selectedPatient.id}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Blood Group</Label>
                        <Badge className="bg-red-100 text-red-700">{selectedPatient.bloodGroup}</Badge>
                      </div>
                      <div>
                        <Label className="text-gray-600">Status</Label>
                        <Badge className={getStatusColor(selectedPatient.status)}>{selectedPatient.status}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-gray-600 text-xs">Phone</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <p className="font-medium">{selectedPatient.phone}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-gray-600 text-xs">Email</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <p className="font-medium">{selectedPatient.email}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <Label className="text-gray-600 text-xs">Address</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <p className="font-medium">{selectedPatient.address}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-gray-600 text-xs">Emergency Contact</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-red-600" />
                        <p className="font-medium">{selectedPatient.emergencyContact}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-gray-600 text-xs">Insurance ID</Label>
                      <p className="font-medium mt-1">{selectedPatient.insuranceId}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg col-span-2 border border-red-200">
                      <Label className="text-gray-700 text-xs flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        Allergies
                      </Label>
                      <div className="flex gap-2 mt-2">
                        {selectedPatient.allergies.map((allergy, idx) => (
                          <Badge key={idx} className="bg-red-100 text-red-700 border-red-200">{allergy}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="medical">
                  <div className="space-y-3">
                    {selectedPatient.medicalHistory.map((record, idx) => (
                      <Card key={idx} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-gray-600" />
                                <p className="text-gray-600 text-sm">{record.date}</p>
                              </div>
                              <p className="font-semibold text-lg">{record.diagnosis}</p>
                              <p className="text-gray-600 text-sm mt-1 bg-blue-50 p-2 rounded">{record.treatment}</p>
                            </div>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{record.doctor}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="medications">
                  <div className="space-y-3">
                    {selectedPatient.currentMedications.map((med, idx) => (
                      <Card key={idx} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <Pill className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-lg">{med.name}</p>
                              <div className="grid grid-cols-3 gap-4 mt-2">
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-600">Dosage</p>
                                  <p className="font-medium">{med.dosage}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-600">Frequency</p>
                                  <p className="font-medium">{med.frequency}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-600">Started</p>
                                  <p className="font-medium">{med.startDate}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="vitals">
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b">
                        <Label className="text-gray-700 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-blue-600" />
                          Latest Vital Signs
                        </Label>
                        <p className="text-sm text-gray-600">Last Updated: {selectedPatient.vitals.lastUpdated}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-lg border border-red-100">
                          <Label className="text-xs text-gray-600">Blood Pressure</Label>
                          <p className="text-2xl font-semibold mt-1">{selectedPatient.vitals.bloodPressure}</p>
                          <p className="text-xs text-gray-600">mmHg</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                          <Label className="text-xs text-gray-600">Heart Rate</Label>
                          <p className="text-2xl font-semibold mt-1">{selectedPatient.vitals.heartRate}</p>
                          <p className="text-xs text-gray-600">bpm</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-100">
                          <Label className="text-xs text-gray-600">Temperature</Label>
                          <p className="text-2xl font-semibold mt-1">{selectedPatient.vitals.temperature}</p>
                          <p className="text-xs text-gray-600">°F</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                          <Label className="text-xs text-gray-600">Weight</Label>
                          <p className="text-2xl font-semibold mt-1">{selectedPatient.vitals.weight}</p>
                          <p className="text-xs text-gray-600">lbs</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                          <Label className="text-xs text-gray-600">Height</Label>
                          <p className="text-2xl font-semibold mt-1">{selectedPatient.vitals.height}</p>
                          <p className="text-xs text-gray-600">inches</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                          <Label className="text-xs text-gray-600">BMI</Label>
                          <p className="text-2xl font-semibold mt-1">{((selectedPatient.vitals.weight / (selectedPatient.vitals.height * selectedPatient.vitals.height)) * 703).toFixed(1)}</p>
                          <p className="text-xs text-gray-600">kg/m²</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Patient Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Patient Information - {selectedPatient?.name}
            </DialogTitle>
            <DialogDescription>
              Update patient details and medical information
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[calc(85vh-180px)] pr-2">
            {selectedPatient && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-100">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">Patient ID</Label>
                      <p className="font-semibold">{selectedPatient.id}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Current Status</Label>
                      <Badge className={getStatusColor(selectedPatient.status)}>{selectedPatient.status}</Badge>
                    </div>
                    <div>
                      <Label className="text-gray-600">Department</Label>
                      <p className="font-semibold">{selectedPatient.department}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="editName">Full Name *</Label>
                    <Input id="editName" defaultValue={selectedPatient.name} />
                  </div>
                  <div>
                    <Label htmlFor="editAge">Age *</Label>
                    <Input id="editAge" type="number" defaultValue={selectedPatient.age} />
                  </div>
                  <div>
                    <Label htmlFor="editGender">Gender *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedPatient.gender} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editBlood">Blood Group *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedPatient.bloodGroup} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editPhone">Phone Number *</Label>
                    <Input id="editPhone" defaultValue={selectedPatient.phone} />
                  </div>
                  <div>
                    <Label htmlFor="editEmail">Email *</Label>
                    <Input id="editEmail" type="email" defaultValue={selectedPatient.email} />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="editAddress">Address *</Label>
                    <Input id="editAddress" defaultValue={selectedPatient.address} />
                  </div>
                  <div>
                    <Label htmlFor="editEmergency">Emergency Contact *</Label>
                    <Input id="editEmergency" defaultValue={selectedPatient.emergencyContact} />
                  </div>
                  <div>
                    <Label htmlFor="editInsurance">Insurance ID</Label>
                    <Input id="editInsurance" defaultValue={selectedPatient.insuranceId} />
                  </div>
                  <div>
                    <Label htmlFor="editStatus">Patient Status *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedPatient.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admitted">Admitted</SelectItem>
                        <SelectItem value="Outpatient">Outpatient</SelectItem>
                        <SelectItem value="Discharged">Discharged</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editRoom">Room Number</Label>
                    <Input id="editRoom" defaultValue={selectedPatient.roomNumber || ''} placeholder="Optional" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="editCondition">Current Condition *</Label>
                    <Input id="editCondition" defaultValue={selectedPatient.condition} />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="editAllergies">Known Allergies</Label>
                    <Input id="editAllergies" defaultValue={selectedPatient.allergies.join(', ')} placeholder="Comma separated" />
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-3 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>Note:</strong> Changes to patient information will be recorded in the system audit log.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => setEditOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}