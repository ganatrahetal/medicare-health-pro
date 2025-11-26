import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from './ui/dialog';
import { Search, Plus, Mail, Phone, Calendar, Award, Users, Clock, FileText, GraduationCap, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  qualifications: string[];
  experience: number;
  phone: string;
  email: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
  patientsToday: number;
  totalPatients: number;
  rating: number;
  consultationFee: number;
  availability: 'Available' | 'Busy' | 'Off Duty';
  licenseNumber: string;
}

export function DoctorManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [qualificationsOpen, setQualificationsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const doctors: Doctor[] = [
    {
      id: 'D001',
      name: 'Dr. Emily Chen',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      qualifications: ['MBBS', 'MD (Cardiology)', 'FACC'],
      experience: 15,
      phone: '+1 (555) 111-2222',
      email: 'emily.chen@hospital.com',
      schedule: [
        { day: 'Monday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Tuesday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Wednesday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Thursday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Friday', startTime: '09:00 AM', endTime: '01:00 PM', available: true },
        { day: 'Saturday', startTime: 'Off', endTime: 'Off', available: false },
        { day: 'Sunday', startTime: 'Off', endTime: 'Off', available: false },
      ],
      patientsToday: 12,
      totalPatients: 1247,
      rating: 4.8,
      consultationFee: 250,
      availability: 'Available',
      licenseNumber: 'MC-89234',
    },
    {
      id: 'D002',
      name: 'Dr. Michael Brown',
      specialization: 'Neurologist',
      department: 'Neurology',
      qualifications: ['MBBS', 'MD (Neurology)', 'DNB'],
      experience: 12,
      phone: '+1 (555) 222-3333',
      email: 'michael.brown@hospital.com',
      schedule: [
        { day: 'Monday', startTime: '10:00 AM', endTime: '06:00 PM', available: true },
        { day: 'Tuesday', startTime: '10:00 AM', endTime: '06:00 PM', available: true },
        { day: 'Wednesday', startTime: '10:00 AM', endTime: '06:00 PM', available: true },
        { day: 'Thursday', startTime: '10:00 AM', endTime: '06:00 PM', available: true },
        { day: 'Friday', startTime: '10:00 AM', endTime: '02:00 PM', available: true },
        { day: 'Saturday', startTime: 'Off', endTime: 'Off', available: false },
        { day: 'Sunday', startTime: 'Off', endTime: 'Off', available: false },
      ],
      patientsToday: 8,
      totalPatients: 892,
      rating: 4.7,
      consultationFee: 300,
      availability: 'Busy',
      licenseNumber: 'MC-78921',
    },
    {
      id: 'D003',
      name: 'Dr. Lisa Anderson',
      specialization: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      qualifications: ['MBBS', 'MS (Orthopedics)', 'FICS'],
      experience: 18,
      phone: '+1 (555) 333-4444',
      email: 'lisa.anderson@hospital.com',
      schedule: [
        { day: 'Monday', startTime: '08:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Tuesday', startTime: '08:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Wednesday', startTime: 'Surgery', endTime: 'Surgery', available: false },
        { day: 'Thursday', startTime: '08:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Friday', startTime: '08:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Saturday', startTime: '09:00 AM', endTime: '12:00 PM', available: true },
        { day: 'Sunday', startTime: 'Off', endTime: 'Off', available: false },
      ],
      patientsToday: 6,
      totalPatients: 1534,
      rating: 4.9,
      consultationFee: 350,
      availability: 'Available',
      licenseNumber: 'MC-65478',
    },
    {
      id: 'D004',
      name: 'Dr. James Wilson',
      specialization: 'Pediatrician',
      department: 'Pediatrics',
      qualifications: ['MBBS', 'MD (Pediatrics)', 'FIAP'],
      experience: 10,
      phone: '+1 (555) 444-5555',
      email: 'james.wilson@hospital.com',
      schedule: [
        { day: 'Monday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Tuesday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Wednesday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Thursday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Friday', startTime: '09:00 AM', endTime: '05:00 PM', available: true },
        { day: 'Saturday', startTime: 'Off', endTime: 'Off', available: false },
        { day: 'Sunday', startTime: 'Off', endTime: 'Off', available: false },
      ],
      patientsToday: 15,
      totalPatients: 2108,
      rating: 4.9,
      consultationFee: 200,
      availability: 'Available',
      licenseNumber: 'MC-54321',
    },
    {
      id: 'D005',
      name: 'Dr. Sarah Martinez',
      specialization: 'Endocrinologist',
      department: 'Endocrinology',
      qualifications: ['MBBS', 'MD (Internal Medicine)', 'DM (Endocrinology)'],
      experience: 14,
      phone: '+1 (555) 555-6666',
      email: 'sarah.martinez@hospital.com',
      schedule: [
        { day: 'Monday', startTime: '10:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Tuesday', startTime: '10:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Wednesday', startTime: '10:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Thursday', startTime: '10:00 AM', endTime: '04:00 PM', available: true },
        { day: 'Friday', startTime: 'Off', endTime: 'Off', available: false },
        { day: 'Saturday', startTime: '10:00 AM', endTime: '02:00 PM', available: true },
        { day: 'Sunday', startTime: 'Off', endTime: 'Off', available: false },
      ],
      patientsToday: 0,
      totalPatients: 756,
      rating: 4.6,
      consultationFee: 275,
      availability: 'Off Duty',
      licenseNumber: 'MC-43210',
    },
    {
      id: 'D006',
      name: 'Dr. Robert Kim',
      specialization: 'General Surgeon',
      department: 'Surgery',
      qualifications: ['MBBS', 'MS (General Surgery)', 'FACS'],
      experience: 20,
      phone: '+1 (555) 666-7777',
      email: 'robert.kim@hospital.com',
      schedule: [
        { day: 'Monday', startTime: 'Surgery', endTime: 'Surgery', available: false },
        { day: 'Tuesday', startTime: '02:00 PM', endTime: '06:00 PM', available: true },
        { day: 'Wednesday', startTime: 'Surgery', endTime: 'Surgery', available: false },
        { day: 'Thursday', startTime: '02:00 PM', endTime: '06:00 PM', available: true },
        { day: 'Friday', startTime: 'Surgery', endTime: 'Surgery', available: false },
        { day: 'Saturday', startTime: 'Off', endTime: 'Off', available: false },
        { day: 'Sunday', startTime: 'Off', endTime: 'Off', available: false },
      ],
      patientsToday: 3,
      totalPatients: 1876,
      rating: 4.8,
      consultationFee: 400,
      availability: 'Busy',
      licenseNumber: 'MC-32109',
    },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Off Duty': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Doctor Management</h2>
          <p className="text-gray-600">Manage doctor profiles and schedules</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Specialization" />
              <Input placeholder="Department" />
              <Input placeholder="License Number" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Email" />
              <Input placeholder="Experience (years)" type="number" />
              <Input placeholder="Consultation Fee ($)" type="number" />
              <Input placeholder="Qualifications (comma separated)" className="col-span-2" />
            </div>
            <Button className="w-full">Add Doctor</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search doctors by name, specialization, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <span className="text-xl font-semibold">
                      {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <p className="text-blue-600 text-sm mt-1 font-medium">{doctor.specialization}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getAvailabilityColor(doctor.availability)} border`}>
                        {doctor.availability}
                      </Badge>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs mb-1">Department</p>
                  <p className="text-sm font-medium">{doctor.department}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs mb-1">Experience</p>
                  <p className="text-sm font-medium">{doctor.experience} years</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs mb-1">License No.</p>
                  <p className="text-sm font-medium">{doctor.licenseNumber}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs mb-1">Consultation Fee</p>
                  <p className="text-sm font-medium">${doctor.consultationFee}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <Phone className="w-4 h-4" />
                {doctor.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <Mail className="w-4 h-4" />
                {doctor.email}
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Qualifications</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => { setSelectedDoctor(doctor); setQualificationsOpen(true); }}
                  >
                    <GraduationCap className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {doctor.qualifications.map((qual, idx) => (
                    <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {qual}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Today: {doctor.patientsToday} patients</span>
                  </div>
                  <div className="text-gray-600">
                    Total: {doctor.totalPatients.toLocaleString()}
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-2 hover:bg-blue-50"
                onClick={() => { setSelectedDoctor(doctor); setScheduleOpen(true); }}
              >
                <Clock className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Qualifications Dialog */}
      <Dialog open={qualificationsOpen} onOpenChange={setQualificationsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Professional Qualifications - {selectedDoctor?.name}
            </DialogTitle>
            <DialogDescription>
              Complete educational background and professional credentials
            </DialogDescription>
          </DialogHeader>

          {selectedDoctor && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Doctor Name</Label>
                    <p className="font-semibold">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Specialization</Label>
                    <p className="font-semibold">{selectedDoctor.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Experience</Label>
                    <p className="font-semibold">{selectedDoctor.experience} years</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Educational Qualifications</Label>
                <div className="space-y-3">
                  {selectedDoctor.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-purple-900">{qual}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {qual.includes('MBBS') && 'Bachelor of Medicine, Bachelor of Surgery'}
                          {qual.includes('MD') && 'Doctor of Medicine'}
                          {qual.includes('MS') && 'Master of Surgery'}
                          {qual.includes('DM') && 'Doctorate of Medicine (Super Specialty)'}
                          {qual.includes('DNB') && 'Diplomate of National Board'}
                          {qual.includes('FACC') && 'Fellow of American College of Cardiology'}
                          {qual.includes('FICS') && 'Fellow of International College of Surgeons'}
                          {qual.includes('FIAP') && 'Fellow of Indian Academy of Pediatrics'}
                          {qual.includes('FACS') && 'Fellow of American College of Surgeons'}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Professional Details</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Medical License</p>
                    <p className="font-semibold">{selectedDoctor.licenseNumber}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Department</p>
                    <p className="font-semibold">{selectedDoctor.department}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{selectedDoctor.rating} / 5.0</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 mb-1">Total Patients</p>
                    <p className="font-semibold">{selectedDoctor.totalPatients.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Certification Status:</strong> All qualifications have been verified and are up to date. Medical license is active and in good standing.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setQualificationsOpen(false)}>
              Close
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <FileText className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Schedule Dialog */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Weekly Schedule - {selectedDoctor?.name}
            </DialogTitle>
            <DialogDescription>
              Complete weekly consultation schedule and availability
            </DialogDescription>
          </DialogHeader>

          {selectedDoctor && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Doctor</Label>
                    <p className="font-semibold">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Specialization</Label>
                    <p className="font-semibold">{selectedDoctor.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Consultation Fee</Label>
                    <p className="font-semibold">${selectedDoctor.consultationFee}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Current Status</Label>
                    <Badge className={getAvailabilityColor(selectedDoctor.availability)}>
                      {selectedDoctor.availability}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <Label className="text-gray-700">Weekly Schedule</Label>
                </div>
                <div className="divide-y">
                  {selectedDoctor.schedule.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-4 transition-colors ${
                        slot.available 
                          ? 'bg-green-50 hover:bg-green-100' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          slot.available ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <span className="font-semibold w-24">{slot.day}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {slot.available ? (
                          <>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-green-600" />
                                <span className="text-green-700 font-medium">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">Available</Badge>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-500 font-medium">
                              {slot.startTime}
                            </span>
                            <Badge className="bg-gray-200 text-gray-600">Not Available</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">Total Available Days</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {selectedDoctor.schedule.filter(s => s.available).length} days
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-xs text-gray-600 mb-1">Avg. Patients/Day</p>
                  <p className="text-lg font-semibold text-green-700">
                    {Math.round(selectedDoctor.totalPatients / 365)} patients
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <p className="text-xs text-gray-600 mb-1">Today's Appointments</p>
                  <p className="text-lg font-semibold text-purple-700">
                    {selectedDoctor.patientsToday} patients
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Note:</strong> Schedule may change due to emergency procedures or urgent consultations. Please call to confirm availability before visiting.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
