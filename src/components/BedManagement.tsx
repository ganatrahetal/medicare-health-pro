import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, BedDouble, User, Clock, Plus, Edit2, Trash2, CheckCircle, UserPlus, LogOut, Wrench } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Bed {
  id: string;
  roomNumber: string;
  bedNumber: string;
  ward: string;
  floor: string;
  bedType: 'General' | 'ICU' | 'Private' | 'Semi-Private' | 'Emergency';
  status: 'Available' | 'Occupied' | 'Under Maintenance' | 'Reserved';
  patientName?: string;
  patientId?: string;
  admissionDate?: string;
  assignedDoctor?: string;
  condition?: string;
  dailyRate: number;
  features: string[];
}

export function BedManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWard, setFilterWard] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  
  // Dialog states
  const [addBedOpen, setAddBedOpen] = useState(false);
  const [editBedOpen, setEditBedOpen] = useState(false);
  const [assignPatientOpen, setAssignPatientOpen] = useState(false);
  const [dischargeOpen, setDischargeOpen] = useState(false);
  const [confirmReservationOpen, setConfirmReservationOpen] = useState(false);
  const [markAvailableOpen, setMarkAvailableOpen] = useState(false);

  const beds: Bed[] = [
    {
      id: 'BED001',
      roomNumber: '305',
      bedNumber: 'A',
      ward: 'Cardiology',
      floor: '3rd Floor',
      bedType: 'General',
      status: 'Occupied',
      patientName: 'John Smith',
      patientId: 'P001',
      admissionDate: '2024-11-10',
      assignedDoctor: 'Dr. Emily Chen',
      condition: 'Cardiac Arrhythmia',
      dailyRate: 500,
      features: ['Oxygen Support', 'Cardiac Monitor', 'Adjustable Bed'],
    },
    {
      id: 'BED002',
      roomNumber: '305',
      bedNumber: 'B',
      ward: 'Cardiology',
      floor: '3rd Floor',
      bedType: 'General',
      status: 'Available',
      dailyRate: 500,
      features: ['Oxygen Support', 'Cardiac Monitor', 'Adjustable Bed'],
    },
    {
      id: 'BED003',
      roomNumber: '412',
      bedNumber: 'A',
      ward: 'Orthopedics',
      floor: '4th Floor',
      bedType: 'Private',
      status: 'Occupied',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      admissionDate: '2024-11-08',
      assignedDoctor: 'Dr. Lisa Anderson',
      condition: 'Post Hip Replacement',
      dailyRate: 800,
      features: ['Private Room', 'En-suite Bathroom', 'TV', 'Oxygen Support', 'Adjustable Bed'],
    },
    {
      id: 'BED004',
      roomNumber: '218',
      bedNumber: 'A',
      ward: 'Pediatrics',
      floor: '2nd Floor',
      bedType: 'General',
      status: 'Occupied',
      patientName: 'Maria Garcia',
      patientId: 'P004',
      admissionDate: '2024-11-13',
      assignedDoctor: 'Dr. James Wilson',
      condition: 'Acute Bronchitis',
      dailyRate: 450,
      features: ['Pediatric Equipment', 'Oxygen Support', 'Parent Bed'],
    },
    {
      id: 'BED005',
      roomNumber: '218',
      bedNumber: 'B',
      ward: 'Pediatrics',
      floor: '2nd Floor',
      bedType: 'General',
      status: 'Available',
      dailyRate: 450,
      features: ['Pediatric Equipment', 'Oxygen Support', 'Parent Bed'],
    },
    {
      id: 'BED006',
      roomNumber: 'ICU-01',
      bedNumber: 'A',
      ward: 'ICU',
      floor: '5th Floor',
      bedType: 'ICU',
      status: 'Occupied',
      patientName: 'Thomas Martinez',
      patientId: 'P011',
      admissionDate: '2024-11-12',
      assignedDoctor: 'Dr. Amanda Roberts',
      condition: 'Post-Surgical Critical',
      dailyRate: 2500,
      features: ['Ventilator', 'Multiple Monitors', 'Isolation Capable', '24/7 Nursing'],
    },
    {
      id: 'BED007',
      roomNumber: 'ICU-02',
      bedNumber: 'A',
      ward: 'ICU',
      floor: '5th Floor',
      bedType: 'ICU',
      status: 'Available',
      dailyRate: 2500,
      features: ['Ventilator', 'Multiple Monitors', 'Isolation Capable', '24/7 Nursing'],
    },
    {
      id: 'BED008',
      roomNumber: '201',
      bedNumber: 'A',
      ward: 'Surgery',
      floor: '2nd Floor',
      bedType: 'Semi-Private',
      status: 'Reserved',
      dailyRate: 650,
      features: ['Semi-Private', 'Post-Op Equipment', 'Oxygen Support'],
    },
    {
      id: 'BED009',
      roomNumber: 'ER-05',
      bedNumber: 'A',
      ward: 'Emergency',
      floor: 'Ground Floor',
      bedType: 'Emergency',
      status: 'Available',
      dailyRate: 300,
      features: ['Emergency Equipment', 'Monitoring', 'Quick Access'],
    },
    {
      id: 'BED010',
      roomNumber: 'ER-06',
      bedNumber: 'A',
      ward: 'Emergency',
      floor: 'Ground Floor',
      bedType: 'Emergency',
      status: 'Occupied',
      patientName: 'Linda Harris',
      patientId: 'P012',
      admissionDate: '2024-11-13',
      assignedDoctor: 'Dr. Amanda Roberts',
      condition: 'Acute Chest Pain',
      dailyRate: 300,
      features: ['Emergency Equipment', 'Monitoring', 'Quick Access'],
    },
    {
      id: 'BED011',
      roomNumber: '410',
      bedNumber: 'A',
      ward: 'Neurology',
      floor: '4th Floor',
      bedType: 'General',
      status: 'Under Maintenance',
      dailyRate: 500,
      features: ['Neurological Monitoring', 'Adjustable Bed'],
    },
    {
      id: 'BED012',
      roomNumber: '310',
      bedNumber: 'A',
      ward: 'Cardiology',
      floor: '3rd Floor',
      bedType: 'Private',
      status: 'Available',
      dailyRate: 850,
      features: ['Private Room', 'Cardiac Monitor', 'En-suite Bathroom', 'TV'],
    },
  ];

  const wards = ['all', ...Array.from(new Set(beds.map(bed => bed.ward)))];

  const filteredBeds = beds.filter(bed => {
    const matchesSearch = 
      bed.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patientId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWard = filterWard === 'all' || bed.ward === filterWard;
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    
    return matchesSearch && matchesWard && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Occupied': return 'bg-blue-100 text-blue-700';
      case 'Reserved': return 'bg-yellow-100 text-yellow-700';
      case 'Under Maintenance': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBedTypeColor = (type: string) => {
    switch (type) {
      case 'ICU': return 'bg-red-100 text-red-700';
      case 'Private': return 'bg-purple-100 text-purple-700';
      case 'Emergency': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getDaysAdmitted = (admissionDate?: string) => {
    if (!admissionDate) return null;
    const today = new Date();
    const admission = new Date(admissionDate);
    const days = Math.floor((today.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const totalBeds = beds.length;
  const availableBeds = beds.filter(b => b.status === 'Available').length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <BedDouble className="w-7 h-7 text-blue-600" />
            Bed Management
          </h2>
          <p className="text-gray-600">Monitor and manage hospital bed availability</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setAddBedOpen(true)}>
          <Plus className="w-4 h-4" />
          Add New Bed
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Beds</p>
                <p className="mt-2">{totalBeds}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <BedDouble className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available</p>
                <p className="mt-2">{availableBeds}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <BedDouble className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Occupied</p>
                <p className="mt-2">{occupiedBeds}</p>
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
                <p className="text-gray-600 text-sm">Occupancy Rate</p>
                <p className="mt-2">{occupancyRate}%</p>
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
            placeholder="Search by room, bed, or patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterWard} onValueChange={setFilterWard}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by ward" />
          </SelectTrigger>
          <SelectContent>
            {wards.map(ward => (
              <SelectItem key={ward} value={ward}>
                {ward === 'all' ? 'All Wards' : ward}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Occupied">Occupied</SelectItem>
            <SelectItem value="Reserved">Reserved</SelectItem>
            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBeds.map((bed) => {
          const daysAdmitted = getDaysAdmitted(bed.admissionDate);

          return (
            <Card key={bed.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Room {bed.roomNumber} - Bed {bed.bedNumber}
                    </CardTitle>
                    <p className="text-gray-600 text-sm mt-1">{bed.ward} • {bed.floor}</p>
                  </div>
                  <Badge className={getStatusColor(bed.status)}>{bed.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getBedTypeColor(bed.bedType)}>{bed.bedType}</Badge>
                  <span className="text-sm text-gray-600">${bed.dailyRate}/day</span>
                </div>

                {bed.status === 'Occupied' && bed.patientName && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <p className="text-sm">{bed.patientName}</p>
                      <Badge variant="outline" className="text-xs">{bed.patientId}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Condition: {bed.condition}</p>
                    <p className="text-xs text-gray-600 mb-1">Doctor: {bed.assignedDoctor}</p>
                    {bed.admissionDate && (
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                        <Clock className="w-3 h-3" />
                        Admitted: {new Date(bed.admissionDate).toLocaleDateString()}
                        {daysAdmitted !== null && ` (${daysAdmitted} ${daysAdmitted === 1 ? 'day' : 'days'})`}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-600 mb-2">Features</p>
                  <div className="flex flex-wrap gap-1">
                    {bed.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {bed.status === 'Available' && (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => { setSelectedBed(bed); setAssignPatientOpen(true); }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign Patient
                    </Button>
                  )}
                  {bed.status === 'Occupied' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => { setSelectedBed(bed); setDischargeOpen(true); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Discharge
                    </Button>
                  )}
                  {bed.status === 'Reserved' && (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => { setSelectedBed(bed); setConfirmReservationOpen(true); }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                  )}
                  {bed.status === 'Under Maintenance' && (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => { setSelectedBed(bed); setMarkAvailableOpen(true); }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Available
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => { setSelectedBed(bed); setEditBedOpen(true); }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Bed Dialog */}
      <Dialog open={addBedOpen} onOpenChange={setAddBedOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Bed
            </DialogTitle>
            <DialogDescription>
              Add a new bed to the hospital inventory
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="roomNumber">Room Number *</Label>
              <Input id="roomNumber" placeholder="e.g., 305" />
            </div>
            <div>
              <Label htmlFor="bedNumber">Bed Number *</Label>
              <Input id="bedNumber" placeholder="e.g., A" />
            </div>
            <div>
              <Label htmlFor="bedId">Bed ID *</Label>
              <Input id="bedId" placeholder="e.g., BED013" />
            </div>
            <div>
              <Label htmlFor="ward">Ward *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="floor">Floor *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                  <SelectItem value="1st Floor">1st Floor</SelectItem>
                  <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                  <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                  <SelectItem value="4th Floor">4th Floor</SelectItem>
                  <SelectItem value="5th Floor">5th Floor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bedType">Bed Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select bed type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Semi-Private">Semi-Private</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select defaultValue="Available">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
              <Input id="dailyRate" type="number" placeholder="500" />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input id="features" placeholder="e.g., Oxygen Support, Cardiac Monitor, Adjustable Bed" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddBedOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddBedOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Add Bed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Bed Dialog */}
      <Dialog open={editBedOpen} onOpenChange={setEditBedOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Edit Bed - {selectedBed?.id}
            </DialogTitle>
            <DialogDescription>
              Update bed information for Room {selectedBed?.roomNumber} - Bed {selectedBed?.bedNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="roomNumber">Room Number *</Label>
              <Input id="roomNumber" defaultValue={selectedBed?.roomNumber} />
            </div>
            <div>
              <Label htmlFor="bedNumber">Bed Number *</Label>
              <Input id="bedNumber" defaultValue={selectedBed?.bedNumber} />
            </div>
            <div>
              <Label htmlFor="bedId">Bed ID *</Label>
              <Input id="bedId" defaultValue={selectedBed?.id} disabled />
            </div>
            <div>
              <Label htmlFor="ward">Ward *</Label>
              <Select defaultValue={selectedBed?.ward}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="floor">Floor *</Label>
              <Select defaultValue={selectedBed?.floor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                  <SelectItem value="1st Floor">1st Floor</SelectItem>
                  <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                  <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                  <SelectItem value="4th Floor">4th Floor</SelectItem>
                  <SelectItem value="5th Floor">5th Floor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bedType">Bed Type *</Label>
              <Select defaultValue={selectedBed?.bedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bed type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Semi-Private">Semi-Private</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select defaultValue={selectedBed?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
              <Input id="dailyRate" type="number" defaultValue={selectedBed?.dailyRate.toString()} />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input id="features" defaultValue={selectedBed?.features.join(', ')} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditBedOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditBedOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Patient Dialog */}
      <Dialog open={assignPatientOpen} onOpenChange={setAssignPatientOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Assign Patient to Bed
            </DialogTitle>
            <DialogDescription>
              Assign a patient to Room {selectedBed?.roomNumber} - Bed {selectedBed?.bedNumber} ({selectedBed?.ward})
            </DialogDescription>
          </DialogHeader>

          {/* Bed Info Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <Label className="text-gray-600">Bed ID</Label>
                <p>{selectedBed?.id}</p>
              </div>
              <div>
                <Label className="text-gray-600">Bed Type</Label>
                <Badge className={getBedTypeColor(selectedBed?.bedType || '')}>{selectedBed?.bedType}</Badge>
              </div>
              <div>
                <Label className="text-gray-600">Daily Rate</Label>
                <p>${selectedBed?.dailyRate}/day</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input id="patientId" placeholder="e.g., P013" />
            </div>
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input id="patientName" placeholder="Enter patient name" />
            </div>
            <div>
              <Label htmlFor="assignedDoctor">Assigned Doctor *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Emily Chen">Dr. Emily Chen</SelectItem>
                  <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                  <SelectItem value="Dr. Amanda Roberts">Dr. Amanda Roberts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="admissionDate">Admission Date *</Label>
              <Input id="admissionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="condition">Medical Condition *</Label>
              <Input id="condition" placeholder="Enter patient's condition" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any special requirements or notes..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignPatientOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAssignPatientOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Assign Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Discharge Patient Dialog */}
      <Dialog open={dischargeOpen} onOpenChange={setDischargeOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Discharge Patient
            </DialogTitle>
            <DialogDescription>
              Process discharge for {selectedBed?.patientName} from Room {selectedBed?.roomNumber} - Bed {selectedBed?.bedNumber}
            </DialogDescription>
          </DialogHeader>

          {/* Patient Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-gray-600">Patient Name</Label>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedBed?.patientName}
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Patient ID</Label>
                <p>{selectedBed?.patientId}</p>
              </div>
              <div>
                <Label className="text-gray-600">Admission Date</Label>
                <p>{selectedBed?.admissionDate ? new Date(selectedBed.admissionDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <Label className="text-gray-600">Days Admitted</Label>
                <p>{getDaysAdmitted(selectedBed?.admissionDate)} days</p>
              </div>
              <div>
                <Label className="text-gray-600">Condition</Label>
                <p>{selectedBed?.condition}</p>
              </div>
              <div>
                <Label className="text-gray-600">Assigned Doctor</Label>
                <p>{selectedBed?.assignedDoctor}</p>
              </div>
            </div>
          </div>

          {/* Billing Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <Label className="text-gray-700">Billing Summary</Label>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Rate:</span>
                <span>${selectedBed?.dailyRate}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Days:</span>
                <span>{getDaysAdmitted(selectedBed?.admissionDate)} days</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total Bed Charges:</span>
                <span>${((selectedBed?.dailyRate || 0) * (getDaysAdmitted(selectedBed?.admissionDate) || 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dischargeDate">Discharge Date *</Label>
              <Input id="dischargeDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <Label htmlFor="dischargeTime">Discharge Time *</Label>
              <Input id="dischargeTime" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="dischargeNotes">Discharge Summary *</Label>
              <Textarea id="dischargeNotes" placeholder="Enter discharge summary and instructions..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDischargeOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setDischargeOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Process Discharge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Reservation Dialog */}
      <Dialog open={confirmReservationOpen} onOpenChange={setConfirmReservationOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Confirm Bed Reservation
            </DialogTitle>
            <DialogDescription>
              Confirm reservation for Room {selectedBed?.roomNumber} - Bed {selectedBed?.bedNumber} ({selectedBed?.ward})
            </DialogDescription>
          </DialogHeader>

          {/* Bed Info Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-100">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <Label className="text-gray-600">Bed ID</Label>
                <p>{selectedBed?.id}</p>
              </div>
              <div>
                <Label className="text-gray-600">Bed Type</Label>
                <Badge className={getBedTypeColor(selectedBed?.bedType || '')}>{selectedBed?.bedType}</Badge>
              </div>
              <div>
                <Label className="text-gray-600">Daily Rate</Label>
                <p>${selectedBed?.dailyRate}/day</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input id="patientId" placeholder="e.g., P013" />
            </div>
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input id="patientName" placeholder="Enter patient name" />
            </div>
            <div>
              <Label htmlFor="doctor">Assigned Doctor *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Emily Chen">Dr. Emily Chen</SelectItem>
                  <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                  <SelectItem value="Dr. Amanda Roberts">Dr. Amanda Roberts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="admissionDate">Expected Admission *</Label>
              <Input id="admissionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="reason">Reason for Admission *</Label>
              <Input id="reason" placeholder="Enter reason for admission" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="confirmNotes">Additional Notes</Label>
              <Textarea id="confirmNotes" placeholder="Any special requirements or notes..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmReservationOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={() => setConfirmReservationOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm & Occupy Bed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mark Available Dialog */}
      <Dialog open={markAvailableOpen} onOpenChange={setMarkAvailableOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Mark Bed as Available
            </DialogTitle>
            <DialogDescription>
              Complete maintenance and mark Room {selectedBed?.roomNumber} - Bed {selectedBed?.bedNumber} as available
            </DialogDescription>
          </DialogHeader>

          {/* Bed Info Card */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-100">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <Label className="text-gray-600">Bed ID</Label>
                <p>{selectedBed?.id}</p>
              </div>
              <div>
                <Label className="text-gray-600">Ward</Label>
                <p>{selectedBed?.ward}</p>
              </div>
              <div>
                <Label className="text-gray-600">Bed Type</Label>
                <Badge className={getBedTypeColor(selectedBed?.bedType || '')}>{selectedBed?.bedType}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="maintenanceCompleted">Maintenance Completed By *</Label>
              <Input id="maintenanceCompleted" placeholder="Enter technician name" />
            </div>
            <div>
              <Label htmlFor="completionDate">Completion Date *</Label>
              <Input id="completionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <Label htmlFor="maintenanceSummary">Maintenance Summary *</Label>
              <Textarea id="maintenanceSummary" placeholder="Describe the maintenance work completed..." rows={4} />
            </div>
            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm">Bed Inspection Checklist</p>
                <p className="text-xs text-gray-600">Confirm all equipment is functional and bed is ready for patient use</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMarkAvailableOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setMarkAvailableOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Available
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
