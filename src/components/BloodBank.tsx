import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Plus, Droplet, AlertTriangle, TrendingDown, Eye, Syringe, CheckCircle, Activity } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface BloodInventory {
  bloodType: string;
  unitsAvailable: number;
  reorderLevel: number;
  expiringUnits: { units: number; expiryDate: string }[];
  lastDonation: string;
}

interface BloodRequest {
  id: string;
  patientName: string;
  patientId: string;
  bloodType: string;
  unitsRequested: number;
  requestDate: string;
  requiredBy: string;
  status: 'Pending' | 'Cross-Matched' | 'Ready' | 'Issued' | 'Cancelled';
  priority: 'Routine' | 'Urgent' | 'Emergency';
  requestedBy: string;
  department: string;
  crossMatchComplete: boolean;
  issuedUnits?: number;
  issuedDate?: string;
  notes?: string;
}

export function BloodBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  
  // Dialog states
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [recordDonationOpen, setRecordDonationOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [crossMatchOpen, setCrossMatchOpen] = useState(false);
  const [issueBloodOpen, setIssueBloodOpen] = useState(false);

  const inventory: BloodInventory[] = [
    { bloodType: 'A+', unitsAvailable: 45, reorderLevel: 30, expiringUnits: [{ units: 3, expiryDate: '2024-11-20' }], lastDonation: '2024-11-13' },
    { bloodType: 'A-', unitsAvailable: 18, reorderLevel: 15, expiringUnits: [{ units: 2, expiryDate: '2024-11-18' }], lastDonation: '2024-11-12' },
    { bloodType: 'B+', unitsAvailable: 32, reorderLevel: 25, expiringUnits: [], lastDonation: '2024-11-13' },
    { bloodType: 'B-', unitsAvailable: 12, reorderLevel: 12, expiringUnits: [{ units: 1, expiryDate: '2024-11-16' }], lastDonation: '2024-11-11' },
    { bloodType: 'AB+', unitsAvailable: 15, reorderLevel: 10, expiringUnits: [], lastDonation: '2024-11-10' },
    { bloodType: 'AB-', unitsAvailable: 6, reorderLevel: 8, expiringUnits: [], lastDonation: '2024-11-09' },
    { bloodType: 'O+', unitsAvailable: 58, reorderLevel: 40, expiringUnits: [{ units: 5, expiryDate: '2024-11-22' }], lastDonation: '2024-11-13' },
    { bloodType: 'O-', unitsAvailable: 22, reorderLevel: 20, expiringUnits: [{ units: 2, expiryDate: '2024-11-19' }], lastDonation: '2024-11-13' },
  ];

  const requests: BloodRequest[] = [
    {
      id: 'BB-2024-001',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      bloodType: 'O+',
      unitsRequested: 2,
      requestDate: '2024-11-08',
      requiredBy: '2024-11-08 10:00 AM',
      status: 'Issued',
      priority: 'Routine',
      requestedBy: 'Dr. Lisa Anderson',
      department: 'Surgery',
      crossMatchComplete: true,
      issuedUnits: 2,
      issuedDate: '2024-11-08 09:30 AM',
    },
    {
      id: 'BB-2024-002',
      patientName: 'Thomas Anderson',
      patientId: 'P007',
      bloodType: 'A+',
      unitsRequested: 4,
      requestDate: '2024-11-13',
      requiredBy: '2024-11-13 11:00 AM',
      status: 'Cross-Matched',
      priority: 'Emergency',
      requestedBy: 'Dr. Amanda Roberts',
      department: 'Emergency',
      crossMatchComplete: true,
      notes: 'Trauma patient - multiple injuries. Type and cross completed.',
    },
    {
      id: 'BB-2024-003',
      patientName: 'Linda Thompson',
      patientId: 'P015',
      bloodType: 'A-',
      unitsRequested: 2,
      requestDate: '2024-11-13',
      requiredBy: '2024-11-14 10:00 AM',
      status: 'Pending',
      priority: 'Urgent',
      requestedBy: 'Dr. Jennifer Lee',
      department: 'Surgery',
      crossMatchComplete: false,
      notes: 'For scheduled lumpectomy tomorrow. Cross-match in progress.',
    },
    {
      id: 'BB-2024-004',
      patientName: 'Michael Stevens',
      patientId: 'P016',
      bloodType: 'O-',
      unitsRequested: 2,
      requestDate: '2024-11-13',
      requiredBy: '2024-11-13 09:00 AM',
      status: 'Ready',
      priority: 'Emergency',
      requestedBy: 'Dr. Emily Chen',
      department: 'Cardiology',
      crossMatchComplete: true,
      notes: 'MI patient - emergency catheterization.',
    },
  ];

  const filteredRequests = requests.filter(req =>
    req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (available: number, reorder: number) => {
    if (available <= reorder * 0.5) return { label: 'Critical', color: 'bg-red-100 text-red-700' };
    if (available <= reorder) return { label: 'Low', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Good', color: 'bg-green-100 text-green-700' };
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Cross-Matched': 'bg-blue-100 text-blue-700',
      'Ready': 'bg-green-100 text-green-700',
      'Issued': 'bg-gray-100 text-gray-700',
      'Cancelled': 'bg-red-100 text-red-700',
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Routine': 'bg-blue-100 text-blue-700',
      'Urgent': 'bg-orange-100 text-orange-700',
      'Emergency': 'bg-red-100 text-red-700',
    };
    return colors[priority as keyof typeof colors];
  };

  const getBloodTypeColor = (bloodType: string) => {
    // Different red shades for different blood types
    const colors: { [key: string]: string } = {
      'A+': 'from-red-500 to-rose-600',
      'A-': 'from-red-600 to-rose-700',
      'B+': 'from-rose-500 to-pink-600',
      'B-': 'from-rose-600 to-pink-700',
      'AB+': 'from-pink-500 to-rose-600',
      'AB-': 'from-pink-600 to-rose-700',
      'O+': 'from-red-600 to-red-700',
      'O-': 'from-red-700 to-red-800',
    };
    return colors[bloodType] || 'from-red-500 to-rose-600';
  };

  const totalUnits = inventory.reduce((sum, item) => sum + item.unitsAvailable, 0);
  const lowStockTypes = inventory.filter(item => item.unitsAvailable <= item.reorderLevel).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Droplet className="w-7 h-7 text-red-600 fill-red-600" />
            Blood Bank
          </h2>
          <p className="text-gray-600">Manage blood inventory and requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setRecordDonationOpen(true)}>
            <Syringe className="w-4 h-4 mr-2" />
            Record Donation
          </Button>
          <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700" onClick={() => setNewRequestOpen(true)}>
            <Plus className="w-4 h-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Units</p>
                <p className="mt-2">{totalUnits}</p>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                <Droplet className="w-6 h-6 fill-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Low Stock Types</p>
                <p className="mt-2 text-yellow-600">{lowStockTypes}</p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Requests</p>
                <p className="mt-2">{requests.filter(r => r.status !== 'Issued' && r.status !== 'Cancelled').length}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory - Visually Appealing */}
      <Card className="border-2 border-red-100 bg-gradient-to-br from-red-50/30 to-rose-50/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
              Blood Inventory
            </h3>
            <Badge className="bg-red-100 text-red-700">8 Blood Types</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {inventory.map((item) => {
              const stockStatus = getStockStatus(item.unitsAvailable, item.reorderLevel);
              
              return (
                <Card key={item.bloodType} className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center mb-4">
                      {/* Blood Type with Gradient Background */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBloodTypeColor(item.bloodType)} flex items-center justify-center shadow-lg mb-3`}>
                        <div className="relative">
                          <Droplet className="w-8 h-8 text-white fill-white" />
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-[6px]">
                            {item.bloodType}
                          </span>
                        </div>
                      </div>
                      <Badge className={stockStatus.color} className="text-xs">
                        {stockStatus.label}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Available Units - Large Display */}
                      <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                        <p className="text-gray-600 text-xs mb-1">Available Units</p>
                        <p className="text-3xl font-bold text-gray-800 text-[20px]">{item.unitsAvailable}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-500">Reorder</p>
                          <p className="font-semibold text-[15px]">{item.reorderLevel}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-500">Last Donated</p>
                          <p className="font-semibold text-[15px]">{new Date(item.lastDonation).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                      
                      {item.expiringUnits.length > 0 && (
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-2 rounded-lg">
                          <p className="text-xs text-orange-700 flex items-center gap-1 font-semibold">
                            <TrendingDown className="w-3 h-3" />
                            {item.expiringUnits[0].units} expiring soon
                          </p>
                          <p className="text-xs text-orange-600 mt-1">
                            {new Date(item.expiringUnits[0].expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      
                      {item.unitsAvailable <= item.reorderLevel && (
                        <Button size="sm" variant="outline" className="w-full text-xs border-red-300 text-red-600 hover:bg-red-50">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Request Donation
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Requests */}
      <div>
        <h3 className="mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Blood Requests
        </h3>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by patient name, ID, or blood type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{request.patientName}</h3>
                      <Badge variant="outline">{request.patientId}</Badge>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Request ID: {request.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-lg text-sm">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Blood Type</p>
                    {/* Highlighted Blood Group */}
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-br ${getBloodTypeColor(request.bloodType)} text-white px-3 py-2 rounded-lg shadow-md`}>
                      <Droplet className="w-5 h-5 fill-white" />
                      <span className="font-bold text-lg text-[15px]">{request.bloodType}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Units Requested</p>
                    <p className="text-lg font-semibold">{request.unitsRequested}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Requested By</p>
                    <p>{request.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Department</p>
                    <p>{request.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Required By</p>
                    <p>{request.requiredBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Cross-Match</p>
                    <Badge className={request.crossMatchComplete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {request.crossMatchComplete ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                  {request.issuedUnits && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Issued Units</p>
                      <p className="text-lg font-semibold">{request.issuedUnits}</p>
                    </div>
                  )}
                </div>

                {request.notes && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded mb-4">
                    <p className="text-sm">{request.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {request.status === 'Pending' && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => { setSelectedRequest(request); setCrossMatchOpen(true); }}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Start Cross-Match
                    </Button>
                  )}
                  {request.status === 'Cross-Matched' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Ready
                    </Button>
                  )}
                  {request.status === 'Ready' && (
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => { setSelectedRequest(request); setIssueBloodOpen(true); }}
                    >
                      <Droplet className="w-4 h-4 mr-2 fill-white" />
                      Issue Blood
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => { setSelectedRequest(request); setViewDetailsOpen(true); }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Request Dialog */}
      <Dialog open={newRequestOpen} onOpenChange={setNewRequestOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Blood Request
            </DialogTitle>
            <DialogDescription>
              Create a new blood transfusion request
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input id="patientId" placeholder="e.g., P001" />
            </div>
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input id="patientName" placeholder="Enter patient name" />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type Required *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
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
              <Label htmlFor="unitsRequested">Units Requested *</Label>
              <Input id="unitsRequested" type="number" placeholder="1" />
            </div>
            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Routine">Routine</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="requiredBy">Required By *</Label>
              <Input id="requiredBy" type="datetime-local" />
            </div>
            <div>
              <Label htmlFor="requestedBy">Requested By (Doctor) *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Emily Chen">Dr. Emily Chen</SelectItem>
                  <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                  <SelectItem value="Dr. Amanda Roberts">Dr. Amanda Roberts</SelectItem>
                  <SelectItem value="Dr. Jennifer Lee">Dr. Jennifer Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="ICU">ICU</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="reason">Reason for Request *</Label>
              <Textarea id="reason" placeholder="Enter medical reason for blood transfusion..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNewRequestOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setNewRequestOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Donation Dialog */}
      <Dialog open={recordDonationOpen} onOpenChange={setRecordDonationOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Syringe className="w-5 h-5" />
              Record Blood Donation
            </DialogTitle>
            <DialogDescription>
              Register a new blood donation to the inventory
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="donorName">Donor Name *</Label>
              <Input id="donorName" placeholder="Enter donor name" />
            </div>
            <div>
              <Label htmlFor="donorId">Donor ID</Label>
              <Input id="donorId" placeholder="e.g., D001" />
            </div>
            <div>
              <Label htmlFor="donorBloodType">Blood Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
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
              <Label htmlFor="unitsCollected">Units Collected *</Label>
              <Input id="unitsCollected" type="number" placeholder="1" defaultValue="1" />
            </div>
            <div>
              <Label htmlFor="donationDate">Donation Date *</Label>
              <Input id="donationDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input id="expiryDate" type="date" />
            </div>
            <div>
              <Label htmlFor="collectedBy">Collected By *</Label>
              <Input id="collectedBy" placeholder="Staff name" />
            </div>
            <div>
              <Label htmlFor="bagNumber">Bag Number *</Label>
              <Input id="bagNumber" placeholder="e.g., BAG-2024-001" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="screeningResults">Screening Results *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select screening result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass - All Tests Negative</SelectItem>
                  <SelectItem value="Fail">Fail - Unsuitable for Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="donationNotes">Additional Notes</Label>
              <Textarea id="donationNotes" placeholder="Any special notes about the donation..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRecordDonationOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setRecordDonationOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Record Donation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Request Details - {selectedRequest?.id}
            </DialogTitle>
            <DialogDescription>
              Complete information for blood transfusion request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Status Overview */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getPriorityColor(selectedRequest.priority)}>{selectedRequest.priority}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Cross-Match</Label>
                    <Badge className={selectedRequest.crossMatchComplete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {selectedRequest.crossMatchComplete ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Patient Information</Label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Patient Name</p>
                    <p className="font-semibold">{selectedRequest.patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Patient ID</p>
                    <p className="font-semibold">{selectedRequest.patientId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Blood Type Required</p>
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-br ${getBloodTypeColor(selectedRequest.bloodType)} text-white px-3 py-2 rounded-lg shadow-md mt-1`}>
                      <Droplet className="w-5 h-5 fill-white" />
                      <span className="font-bold text-[13px]">{selectedRequest.bloodType}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Units Requested</p>
                    <p className="font-semibold text-lg">{selectedRequest.unitsRequested} units</p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Request Details</Label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Request Date</p>
                    <p className="font-semibold">{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Required By</p>
                    <p className="font-semibold">{selectedRequest.requiredBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Requested By</p>
                    <p className="font-semibold">{selectedRequest.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Department</p>
                    <p className="font-semibold">{selectedRequest.department}</p>
                  </div>
                  {selectedRequest.issuedUnits && (
                    <>
                      <div>
                        <p className="text-gray-600">Issued Units</p>
                        <p className="font-semibold">{selectedRequest.issuedUnits} units</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Issued Date</p>
                        <p className="font-semibold">{selectedRequest.issuedDate}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedRequest.notes && (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <Label className="text-gray-700 block mb-2">Clinical Notes</Label>
                  <p className="text-sm">{selectedRequest.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Start Cross-Match Dialog */}
      <Dialog open={crossMatchOpen} onOpenChange={setCrossMatchOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Start Cross-Match - {selectedRequest?.id}
            </DialogTitle>
            <DialogDescription>
              Initiate compatibility testing for {selectedRequest?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Patient Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedRequest.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Blood Type</Label>
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-br ${getBloodTypeColor(selectedRequest.bloodType)} text-white px-2 py-1 rounded-lg shadow-md mt-1`}>
                      <Droplet className="w-4 h-4 fill-white" />
                      <span className="font-bold text-sm">{selectedRequest.bloodType}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Units Required</Label>
                    <p className="font-semibold">{selectedRequest.unitsRequested} units</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="technician">Lab Technician *</Label>
                  <Input id="technician" placeholder="Enter technician name" />
                </div>
                <div>
                  <Label htmlFor="crossMatchDate">Cross-Match Date *</Label>
                  <Input id="crossMatchDate" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
                </div>
                <div>
                  <Label htmlFor="donorBagNumber">Donor Bag Number *</Label>
                  <Input id="donorBagNumber" placeholder="e.g., BAG-2024-001" />
                </div>
                <div>
                  <Label htmlFor="compatibilityTest">Compatibility Test *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compatible">Compatible</SelectItem>
                      <SelectItem value="Incompatible">Incompatible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="testNotes">Test Notes</Label>
                  <Textarea id="testNotes" placeholder="Enter cross-match test results and observations..." rows={3} />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Cross-Match Procedure</p>
                    <p className="text-xs text-green-700 mt-1">Ensure patient sample is correctly labeled and compatibility testing is completed as per protocol.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCrossMatchOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCrossMatchOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Cross-Match
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Issue Blood Dialog */}
      <Dialog open={issueBloodOpen} onOpenChange={setIssueBloodOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Droplet className="w-5 h-5 fill-red-600 text-red-600" />
              Issue Blood - {selectedRequest?.id}
            </DialogTitle>
            <DialogDescription>
              Issue blood units to {selectedRequest?.patientName} ({selectedRequest?.department})
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Request Summary Card */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 border border-red-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedRequest.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Blood Type</Label>
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-br ${getBloodTypeColor(selectedRequest.bloodType)} text-white px-2 py-1 rounded-lg shadow-md mt-1`}>
                      <Droplet className="w-4 h-4 fill-white" />
                      <span className="font-bold text-sm">{selectedRequest.bloodType}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Units Requested</Label>
                    <p className="font-semibold text-lg">{selectedRequest.unitsRequested}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getPriorityColor(selectedRequest.priority)}>{selectedRequest.priority}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unitsIssued">Units to Issue *</Label>
                  <Input id="unitsIssued" type="number" defaultValue={selectedRequest.unitsRequested} max={selectedRequest.unitsRequested} />
                </div>
                <div>
                  <Label htmlFor="issueDate">Issue Date & Time *</Label>
                  <Input id="issueDate" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
                </div>
                <div>
                  <Label htmlFor="issuedBy">Issued By *</Label>
                  <Input id="issuedBy" placeholder="Staff name" />
                </div>
                <div>
                  <Label htmlFor="receivedBy">Received By *</Label>
                  <Input id="receivedBy" placeholder="Nurse/Doctor name" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="bagNumbers">Bag Numbers *</Label>
                  <Input id="bagNumbers" placeholder="Enter bag numbers (comma-separated)" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="issueNotes">Issue Notes</Label>
                  <Textarea id="issueNotes" placeholder="Any special instructions or notes..." rows={3} />
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Important</p>
                    <p className="text-xs text-red-700 mt-1">Verify patient identification and blood type before issuing. Ensure proper documentation and cold chain maintenance.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIssueBloodOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIssueBloodOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Issue Blood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}