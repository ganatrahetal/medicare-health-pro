import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Plus, UserCog, Mail, Phone, Calendar, Award, Clock, Edit2, CheckCircle, Star, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface StaffMember {
  id: string;
  name: string;
  role: 'Nurse' | 'Technician' | 'Admin' | 'Support' | 'Pharmacist' | 'Lab Tech' | 'Radiologist Tech';
  department: string;
  employeeId: string;
  phone: string;
  email: string;
  shift: 'Day' | 'Night' | 'Rotating';
  status: 'Active' | 'On Leave' | 'Off Duty';
  joiningDate: string;
  experience: number;
  certifications: string[];
  specializations?: string[];
  rating: number;
  patientsHandled?: number;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [viewScheduleOpen, setViewScheduleOpen] = useState(false);
  const [editStaffOpen, setEditStaffOpen] = useState(false);

  const staff: StaffMember[] = [
    {
      id: 'STF001',
      name: 'Jessica Brown',
      role: 'Nurse',
      department: 'Emergency',
      employeeId: 'EMP-2024-001',
      phone: '+1 (555) 111-0001',
      email: 'j.brown@hospital.com',
      shift: 'Day',
      status: 'Active',
      joiningDate: '2020-03-15',
      experience: 8,
      certifications: ['RN', 'BLS', 'ACLS', 'PALS'],
      specializations: ['Emergency Care', 'Trauma'],
      rating: 4.9,
      patientsHandled: 2450,
      schedule: [
        { day: 'Monday', startTime: '07:00 AM', endTime: '07:00 PM' },
        { day: 'Tuesday', startTime: '07:00 AM', endTime: '07:00 PM' },
        { day: 'Friday', startTime: '07:00 AM', endTime: '07:00 PM' },
      ],
    },
    {
      id: 'STF002',
      name: 'Michael Chen',
      role: 'Nurse',
      department: 'Pediatrics',
      employeeId: 'EMP-2024-002',
      phone: '+1 (555) 111-0002',
      email: 'm.chen@hospital.com',
      shift: 'Day',
      status: 'Active',
      joiningDate: '2019-06-20',
      experience: 10,
      certifications: ['RN', 'BLS', 'PALS', 'NRP'],
      specializations: ['Pediatric Care', 'NICU'],
      rating: 4.8,
      patientsHandled: 3120,
      schedule: [
        { day: 'Monday', startTime: '07:00 AM', endTime: '03:00 PM' },
        { day: 'Tuesday', startTime: '07:00 AM', endTime: '03:00 PM' },
        { day: 'Wednesday', startTime: '07:00 AM', endTime: '03:00 PM' },
        { day: 'Thursday', startTime: '07:00 AM', endTime: '03:00 PM' },
        { day: 'Friday', startTime: '07:00 AM', endTime: '03:00 PM' },
      ],
    },
    {
      id: 'STF003',
      name: 'Sarah Martinez',
      role: 'Pharmacist',
      department: 'Pharmacy',
      employeeId: 'EMP-2024-003',
      phone: '+1 (555) 111-0003',
      email: 's.martinez@hospital.com',
      shift: 'Day',
      status: 'Active',
      joiningDate: '2021-01-10',
      experience: 6,
      certifications: ['PharmD', 'Board Certified'],
      rating: 4.7,
      schedule: [
        { day: 'Monday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Tuesday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Wednesday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Thursday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Friday', startTime: '08:00 AM', endTime: '05:00 PM' },
      ],
    },
    {
      id: 'STF004',
      name: 'David Lee',
      role: 'Lab Tech',
      department: 'Laboratory',
      employeeId: 'EMP-2024-004',
      phone: '+1 (555) 111-0004',
      email: 'd.lee@hospital.com',
      shift: 'Night',
      status: 'Active',
      joiningDate: '2022-08-15',
      experience: 4,
      certifications: ['MLT', 'ASCP Certified'],
      specializations: ['Hematology', 'Chemistry'],
      rating: 4.6,
      schedule: [
        { day: 'Monday', startTime: '11:00 PM', endTime: '07:00 AM' },
        { day: 'Tuesday', startTime: '11:00 PM', endTime: '07:00 AM' },
        { day: 'Wednesday', startTime: '11:00 PM', endTime: '07:00 AM' },
        { day: 'Thursday', startTime: '11:00 PM', endTime: '07:00 AM' },
      ],
    },
    {
      id: 'STF005',
      name: 'Amanda Brown',
      role: 'Technician',
      department: 'Radiology',
      employeeId: 'EMP-2024-005',
      phone: '+1 (555) 111-0005',
      email: 'a.brown@hospital.com',
      shift: 'Rotating',
      status: 'Active',
      joiningDate: '2020-11-01',
      experience: 7,
      certifications: ['ARRT', 'CT Certified', 'MRI Certified'],
      specializations: ['CT', 'MRI', 'X-Ray'],
      rating: 4.8,
      schedule: [
        { day: 'Monday', startTime: '07:00 AM', endTime: '03:00 PM' },
        { day: 'Tuesday', startTime: '07:00 AM', endTime: '03:00 PM' },
        { day: 'Wednesday', startTime: '03:00 PM', endTime: '11:00 PM' },
        { day: 'Thursday', startTime: '03:00 PM', endTime: '11:00 PM' },
      ],
    },
    {
      id: 'STF006',
      name: 'Patricia Moore',
      role: 'Nurse',
      department: 'Surgery',
      employeeId: 'EMP-2024-006',
      phone: '+1 (555) 111-0006',
      email: 'p.moore@hospital.com',
      shift: 'Day',
      status: 'On Leave',
      joiningDate: '2018-02-20',
      experience: 12,
      certifications: ['RN', 'CNOR', 'BLS', 'ACLS'],
      specializations: ['Operating Room', 'Surgical Assist'],
      rating: 4.9,
      patientsHandled: 4200,
      schedule: [],
    },
    {
      id: 'STF007',
      name: 'Robert Wilson',
      role: 'Admin',
      department: 'Administration',
      employeeId: 'EMP-2024-007',
      phone: '+1 (555) 111-0007',
      email: 'r.wilson@hospital.com',
      shift: 'Day',
      status: 'Active',
      joiningDate: '2019-09-01',
      experience: 9,
      certifications: ['Healthcare Administration', 'MBA'],
      rating: 4.5,
      schedule: [
        { day: 'Monday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Tuesday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Wednesday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Thursday', startTime: '08:00 AM', endTime: '05:00 PM' },
        { day: 'Friday', startTime: '08:00 AM', endTime: '05:00 PM' },
      ],
    },
    {
      id: 'STF008',
      name: 'Linda Harris',
      role: 'Nurse',
      department: 'ICU',
      employeeId: 'EMP-2024-008',
      phone: '+1 (555) 111-0008',
      email: 'l.harris@hospital.com',
      shift: 'Night',
      status: 'Active',
      joiningDate: '2021-04-15',
      experience: 5,
      certifications: ['RN', 'CCRN', 'BLS', 'ACLS'],
      specializations: ['Critical Care', 'Ventilator Management'],
      rating: 4.7,
      patientsHandled: 1850,
      schedule: [
        { day: 'Sunday', startTime: '07:00 PM', endTime: '07:00 AM' },
        { day: 'Monday', startTime: '07:00 PM', endTime: '07:00 AM' },
        { day: 'Tuesday', startTime: '07:00 PM', endTime: '07:00 AM' },
      ],
    },
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-700',
      'On Leave': 'bg-yellow-100 text-yellow-700',
      'Off Duty': 'bg-gray-100 text-gray-700',
    };
    return colors[status as keyof typeof colors];
  };

  const getShiftColor = (shift: string) => {
    const colors = {
      'Day': 'bg-blue-100 text-blue-700',
      'Night': 'bg-purple-100 text-purple-700',
      'Rotating': 'bg-orange-100 text-orange-700',
    };
    return colors[shift as keyof typeof colors];
  };

  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'Active').length;
  const nurses = staff.filter(s => s.role === 'Nurse').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <UserCog className="w-7 h-7 text-blue-600" />
            Staff Management
          </h2>
          <p className="text-gray-600">Manage hospital staff and their schedules</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setAddStaffOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Staff</p>
                <p className="mt-2">{totalStaff}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <UserCog className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="mt-2">{activeStaff}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <UserCog className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Nurses</p>
                <p className="mt-2">{nurses}</p>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <UserCog className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Rating</p>
                <p className="mt-2">4.7</p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Award className="w-6 h-6" />
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
            placeholder="Search by name, employee ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Nurse">Nurse</SelectItem>
            <SelectItem value="Technician">Technician</SelectItem>
            <SelectItem value="Pharmacist">Pharmacist</SelectItem>
            <SelectItem value="Lab Tech">Lab Tech</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Support">Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStaff.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-blue-600 text-sm">{member.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                      <Badge className={getShiftColor(member.shift)}>{member.shift}</Badge>
                      {member.rating && (
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{member.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Employee ID:</span> {member.employeeId}
                </div>
                <div>
                  <span className="text-gray-600">Department:</span> {member.department}
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span> {member.experience} years
                </div>
                <div>
                  <span className="text-gray-600">Joined:</span> {new Date(member.joiningDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {member.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Certifications
                </p>
                <div className="flex flex-wrap gap-1">
                  {member.certifications.map((cert, idx) => (
                    <Badge key={idx} className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200">{cert}</Badge>
                  ))}
                </div>
              </div>

              {member.specializations && member.specializations.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specializations.map((spec, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs text-blue-600">{spec}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {member.patientsHandled && (
                <div className="bg-blue-50 p-2 rounded text-sm">
                  <span className="text-gray-600">Patients Handled:</span> {member.patientsHandled.toLocaleString()}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedStaff(member); setViewScheduleOpen(true); }}>
                  <Clock className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setSelectedStaff(member); setEditStaffOpen(true); }}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Staff Dialog */}
      <Dialog open={addStaffOpen} onOpenChange={setAddStaffOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Staff Member
            </DialogTitle>
            <DialogDescription>
              Add a new staff member to the hospital system
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
            <div>
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input id="employeeId" placeholder="e.g., EMP-2024-001" />
            </div>
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Technician">Technician</SelectItem>
                  <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="Lab Tech">Lab Tech</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Input id="department" placeholder="Enter department" />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" placeholder="email@hospital.com" />
            </div>
            <div>
              <Label htmlFor="shift">Shift *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                  <SelectItem value="Rotating">Rotating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select defaultValue="Active">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Off Duty">Off Duty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="joiningDate">Joining Date *</Label>
              <Input id="joiningDate" type="date" />
            </div>
            <div>
              <Label htmlFor="experience">Experience (years)</Label>
              <Input id="experience" type="number" placeholder="0" />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" step="0.1" placeholder="0.0" max="5" />
            </div>
            <div>
              <Label htmlFor="patientsHandled">Patients Handled</Label>
              <Input id="patientsHandled" type="number" placeholder="0" />
            </div>
            <div className="col-span-3">
              <Label htmlFor="certifications">Certifications</Label>
              <Input id="certifications" placeholder="Enter certifications separated by commas (e.g., RN, BLS, ACLS)" />
            </div>
            <div className="col-span-3">
              <Label htmlFor="specializations">Specializations</Label>
              <Input id="specializations" placeholder="Enter specializations separated by commas" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddStaffOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddStaffOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Schedule Dialog */}
      <Dialog open={viewScheduleOpen} onOpenChange={setViewScheduleOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Weekly Schedule - {selectedStaff?.name}
            </DialogTitle>
            <DialogDescription>
              View the weekly work schedule for {selectedStaff?.role} in {selectedStaff?.department}
            </DialogDescription>
          </DialogHeader>

          {selectedStaff && (
            <div className="space-y-4">
              {/* Staff Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Employee ID</Label>
                    <p>{selectedStaff.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Shift Type</Label>
                    <Badge className={getShiftColor(selectedStaff.shift)}>{selectedStaff.shift}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedStaff.status)}>{selectedStaff.status}</Badge>
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 border-b">Day</th>
                      <th className="text-left p-3 border-b">Start Time</th>
                      <th className="text-left p-3 border-b">End Time</th>
                      <th className="text-left p-3 border-b">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStaff.schedule.length > 0 ? (
                      selectedStaff.schedule.map((shift, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-3">{shift.day}</td>
                          <td className="p-3">{shift.startTime}</td>
                          <td className="p-3">{shift.endTime}</td>
                          <td className="p-3 text-gray-600">Full Shift</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-gray-500">
                          No schedule available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewScheduleOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={editStaffOpen} onOpenChange={setEditStaffOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Edit Staff Member - {selectedStaff?.employeeId}
            </DialogTitle>
            <DialogDescription>
              Update information for {selectedStaff?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" placeholder="Enter name" defaultValue={selectedStaff?.name} />
            </div>
            <div>
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input id="employeeId" placeholder="e.g., EMP-2024-001" defaultValue={selectedStaff?.employeeId} disabled />
            </div>
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select defaultValue={selectedStaff?.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Technician">Technician</SelectItem>
                  <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="Lab Tech">Lab Tech</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Input id="department" placeholder="Enter department" defaultValue={selectedStaff?.department} />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue={selectedStaff?.phone} />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" placeholder="email@hospital.com" defaultValue={selectedStaff?.email} />
            </div>
            <div>
              <Label htmlFor="shift">Shift *</Label>
              <Select defaultValue={selectedStaff?.shift}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                  <SelectItem value="Rotating">Rotating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select defaultValue={selectedStaff?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Off Duty">Off Duty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="joiningDate">Joining Date *</Label>
              <Input id="joiningDate" type="date" defaultValue={selectedStaff?.joiningDate} />
            </div>
            <div>
              <Label htmlFor="experience">Experience (years)</Label>
              <Input id="experience" type="number" placeholder="0" defaultValue={selectedStaff?.experience.toString()} />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" step="0.1" placeholder="0.0" max="5" defaultValue={selectedStaff?.rating.toString()} />
            </div>
            <div>
              <Label htmlFor="patientsHandled">Patients Handled</Label>
              <Input id="patientsHandled" type="number" placeholder="0" defaultValue={selectedStaff?.patientsHandled?.toString()} />
            </div>
            <div className="col-span-3">
              <Label htmlFor="certifications">Certifications</Label>
              <Input id="certifications" placeholder="Enter certifications separated by commas" defaultValue={selectedStaff?.certifications.join(', ')} />
            </div>
            <div className="col-span-3">
              <Label htmlFor="specializations">Specializations</Label>
              <Input id="specializations" placeholder="Enter specializations separated by commas" defaultValue={selectedStaff?.specializations?.join(', ')} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStaffOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditStaffOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}