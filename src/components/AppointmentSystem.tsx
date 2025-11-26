import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from './ui/dialog';
import { Calendar, Clock, Plus, Search, CheckCircle, XCircle, AlertCircle, Edit2, Play, Ban } from 'lucide-react';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Surgery';
  status: 'Scheduled' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  reason: string;
  notes?: string;
}

export function AppointmentSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Dialog states
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const appointments: Appointment[] = [
    {
      id: 'APT001',
      patientName: 'John Smith',
      patientId: 'P001',
      doctorName: 'Dr. Emily Chen',
      department: 'Cardiology',
      date: '2024-11-13',
      time: '09:00 AM',
      type: 'Consultation',
      status: 'Confirmed',
      reason: 'Chest pain and irregular heartbeat',
    },
    {
      id: 'APT002',
      patientName: 'Sarah Williams',
      patientId: 'P002',
      doctorName: 'Dr. Michael Brown',
      department: 'Neurology',
      date: '2024-11-13',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'In Progress',
      reason: 'Migraine follow-up consultation',
    },
    {
      id: 'APT003',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      doctorName: 'Dr. Lisa Anderson',
      department: 'Orthopedics',
      date: '2024-11-13',
      time: '11:00 AM',
      type: 'Follow-up',
      status: 'Scheduled',
      reason: 'Post-surgery check-up',
    },
    {
      id: 'APT004',
      patientName: 'Maria Garcia',
      patientId: 'P004',
      doctorName: 'Dr. James Wilson',
      department: 'Pediatrics',
      date: '2024-11-13',
      time: '02:00 PM',
      type: 'Emergency',
      status: 'Confirmed',
      reason: 'Respiratory distress',
    },
    {
      id: 'APT005',
      patientName: 'David Lee',
      patientId: 'P005',
      doctorName: 'Dr. Sarah Martinez',
      department: 'Endocrinology',
      date: '2024-11-13',
      time: '03:30 PM',
      type: 'Consultation',
      status: 'Scheduled',
      reason: 'Diabetes management',
    },
    {
      id: 'APT006',
      patientName: 'Jennifer Taylor',
      patientId: 'P006',
      doctorName: 'Dr. Emily Chen',
      department: 'Cardiology',
      date: '2024-11-14',
      time: '09:30 AM',
      type: 'Follow-up',
      status: 'Scheduled',
      reason: 'Blood pressure monitoring',
    },
    {
      id: 'APT007',
      patientName: 'Michael Anderson',
      patientId: 'P007',
      doctorName: 'Dr. Robert Kim',
      department: 'Surgery',
      date: '2024-11-14',
      time: '02:00 PM',
      type: 'Surgery',
      status: 'Confirmed',
      reason: 'Appendectomy',
    },
    {
      id: 'APT008',
      patientName: 'Patricia Moore',
      patientId: 'P008',
      doctorName: 'Dr. Lisa Anderson',
      department: 'Orthopedics',
      date: '2024-11-15',
      time: '10:00 AM',
      type: 'Consultation',
      status: 'Scheduled',
      reason: 'Knee pain assessment',
    },
    {
      id: 'APT009',
      patientName: 'Thomas White',
      patientId: 'P009',
      doctorName: 'Dr. Michael Brown',
      department: 'Neurology',
      date: '2024-11-12',
      time: '03:00 PM',
      type: 'Consultation',
      status: 'Completed',
      reason: 'Headache and dizziness',
      notes: 'Prescribed medication, follow-up in 2 weeks',
    },
    {
      id: 'APT010',
      patientName: 'Linda Harris',
      patientId: 'P010',
      doctorName: 'Dr. James Wilson',
      department: 'Pediatrics',
      date: '2024-11-11',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'Cancelled',
      reason: 'Routine check-up',
      notes: 'Patient rescheduled',
    },
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Emergency': return 'bg-red-100 text-red-700';
      case 'Surgery': return 'bg-orange-100 text-orange-700';
      case 'Follow-up': return 'bg-blue-100 text-blue-700';
      case 'Consultation': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'In Progress':
        return <AlertCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Appointment System</h2>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Enter the details of the new appointment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Input placeholder="Patient ID or Name" className="col-span-2" />
              <Input placeholder="Doctor Name" />
              <Input placeholder="Department" />
              <Input type="date" placeholder="Date" />
              <Input type="time" placeholder="Time" />
              <select className="col-span-2 px-3 py-2 border rounded-md">
                <option>Appointment Type</option>
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Emergency</option>
                <option>Surgery</option>
              </select>
              <Input placeholder="Reason for Visit" className="col-span-2" />
              <Textarea 
                placeholder="Additional Notes (Optional)" 
                className="col-span-2 px-3 py-2 border rounded-md min-h-[80px]"
              />
            </div>
            <DialogFooter>
              <Button className="w-full">Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(appointment.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{appointment.patientName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {appointment.patientId}
                          </Badge>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <Badge className={getTypeColor(appointment.type)}>
                            {appointment.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">Appointment ID: {appointment.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-gray-600 text-xs mb-1">Doctor</p>
                        <p className="text-sm">{appointment.doctorName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">Department</p>
                        <p className="text-sm">{appointment.department}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">Date</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">Time</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-3 h-3" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Reason for Visit</p>
                      <p className="text-sm">{appointment.reason}</p>
                      {appointment.notes && (
                        <>
                          <p className="text-xs text-gray-600 mt-2 mb-1">Notes</p>
                          <p className="text-sm text-gray-700">{appointment.notes}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {appointment.status === 'Scheduled' && (
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                      Confirm
                    </Button>
                  )}
                  {(appointment.status === 'Scheduled' || appointment.status === 'Confirmed') && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => { setSelectedAppointment(appointment); setRescheduleOpen(true); }}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Reschedule
                    </Button>
                  )}
                  {appointment.status === 'Confirmed' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-purple-600 border-purple-600"
                      onClick={() => { setSelectedAppointment(appointment); setStartOpen(true); }}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {appointment.status === 'In Progress' && (
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete
                    </Button>
                  )}
                  {(appointment.status === 'Scheduled' || appointment.status === 'Confirmed') && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-600"
                      onClick={() => { setSelectedAppointment(appointment); setCancelOpen(true); }}
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reschedule Appointment Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Reschedule Appointment - {selectedAppointment?.id}
            </DialogTitle>
            <DialogDescription>
              Change the date and time for {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedAppointment.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Current Date</Label>
                    <p className="font-semibold">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Current Time</Label>
                    <p className="font-semibold">{selectedAppointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newDate">New Date *</Label>
                  <Input id="newDate" type="date" defaultValue={selectedAppointment.date} />
                </div>
                <div>
                  <Label htmlFor="newTime">New Time *</Label>
                  <Input id="newTime" type="time" defaultValue="09:00" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="newDoctor">Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedAppointment.doctorName} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Emily Chen">Dr. Emily Chen</SelectItem>
                      <SelectItem value="Dr. Michael Brown">Dr. Michael Brown</SelectItem>
                      <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                      <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                      <SelectItem value="Dr. Sarah Martinez">Dr. Sarah Martinez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="rescheduleReason">Reason for Rescheduling *</Label>
                  <Textarea id="rescheduleReason" placeholder="Enter reason..." rows={3} />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Patient will be notified via SMS and email about the rescheduled appointment.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setRescheduleOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Start Appointment Dialog */}
      <Dialog open={startOpen} onOpenChange={setStartOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Appointment - {selectedAppointment?.id}
            </DialogTitle>
            <DialogDescription>
              Begin consultation with {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedAppointment.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Doctor</Label>
                    <p className="font-semibold">{selectedAppointment.doctorName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Type</Label>
                    <Badge className={getTypeColor(selectedAppointment.type)}>{selectedAppointment.type}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Time</Label>
                    <p className="font-semibold">{selectedAppointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50">
                <Label className="text-gray-700 mb-2 block">Chief Complaint</Label>
                <p className="text-sm">{selectedAppointment.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomNumber">Consultation Room *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Room-101">Room 101 - Available</SelectItem>
                      <SelectItem value="Room-102">Room 102 - Available</SelectItem>
                      <SelectItem value="Room-103">Room 103 - Available</SelectItem>
                      <SelectItem value="Room-201">Room 201 - Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startTime">Actual Start Time</Label>
                  <Input id="startTime" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
                </div>
              </div>

              <div>
                <Label htmlFor="initialNotes">Initial Assessment Notes</Label>
                <Textarea id="initialNotes" placeholder="Enter initial observations..." rows={4} />
              </div>

              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Pre-Appointment Checklist</p>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="patientCheckin" className="rounded" />
                        <label htmlFor="patientCheckin" className="text-xs text-green-700">Patient checked in</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="vitalsRecorded" className="rounded" />
                        <label htmlFor="vitalsRecorded" className="text-xs text-green-700">Vitals recorded</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="insuranceVerified" className="rounded" />
                        <label htmlFor="insuranceVerified" className="text-xs text-green-700">Insurance verified</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setStartOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setStartOpen(false)}>
              <Play className="w-4 h-4 mr-2" />
              Start Consultation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="w-5 h-5" />
              Cancel Appointment - {selectedAppointment?.id}
            </DialogTitle>
            <DialogDescription>
              Cancel appointment for {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedAppointment.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Date & Time</Label>
                    <p className="font-semibold">{new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Doctor</Label>
                    <p className="font-semibold">{selectedAppointment.doctorName}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="cancelReason">Reason for Cancellation *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient-request">Patient Request</SelectItem>
                    <SelectItem value="doctor-unavailable">Doctor Unavailable</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="no-show">Patient No-Show</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cancelNotes">Additional Notes</Label>
                <Textarea id="cancelNotes" placeholder="Enter additional details..." rows={3} />
              </div>

              <div>
                <Label className="mb-2 block">Notification Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="notifySMS" className="rounded" defaultChecked />
                    <label htmlFor="notifySMS" className="text-sm">Send SMS notification to patient</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="notifyEmail" className="rounded" defaultChecked />
                    <label htmlFor="notifyEmail" className="text-sm">Send email notification to patient</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="offerReschedule" className="rounded" />
                    <label htmlFor="offerReschedule" className="text-sm">Offer rescheduling options</label>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This action will cancel the appointment and notify the patient. This cannot be undone.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Go Back
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setCancelOpen(false)}>
              <Ban className="w-4 h-4 mr-2" />
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}