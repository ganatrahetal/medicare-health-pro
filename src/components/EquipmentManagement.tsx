import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Plus, Wrench, AlertTriangle, Calendar, CheckCircle, Edit2, Eye, History } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Equipment {
  id: string;
  name: string;
  category: 'Diagnostic' | 'Surgical' | 'Life Support' | 'Monitoring' | 'Laboratory' | 'Therapeutic';
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
  department: string;
  purchaseDate: string;
  purchasePrice: number;
  status: 'Operational' | 'In Use' | 'Maintenance' | 'Out of Service' | 'Retired';
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  maintenanceSchedule: 'Monthly' | 'Quarterly' | 'Annually';
  warrantyExpiry?: string;
  calibrationDate?: string;
  nextCalibrationDate?: string;
  assignedTo?: string;
  utilizationRate?: number;
  maintenanceHistory: {
    date: string;
    type: string;
    technician: string;
    notes: string;
  }[];
}

export function EquipmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [addEquipmentOpen, setAddEquipmentOpen] = useState(false);
  const [scheduleMaintenanceOpen, setScheduleMaintenanceOpen] = useState(false);
  const [viewHistoryOpen, setViewHistoryOpen] = useState(false);
  const [editDetailsOpen, setEditDetailsOpen] = useState(false);

  const equipment: Equipment[] = [
    {
      id: 'EQ-2024-001',
      name: 'MRI Scanner',
      category: 'Diagnostic',
      manufacturer: 'Siemens Healthineers',
      model: 'MAGNETOM Vida 3T',
      serialNumber: 'MRI-89234',
      location: 'Radiology - Room MRI-1',
      department: 'Radiology',
      purchaseDate: '2022-03-15',
      purchasePrice: 2500000,
      status: 'Operational',
      lastMaintenanceDate: '2024-10-15',
      nextMaintenanceDate: '2025-01-15',
      maintenanceSchedule: 'Quarterly',
      warrantyExpiry: '2025-03-15',
      calibrationDate: '2024-10-15',
      nextCalibrationDate: '2024-12-15',
      utilizationRate: 87,
      maintenanceHistory: [
        { date: '2024-10-15', type: 'Preventive Maintenance', technician: 'John Tech', notes: 'Routine inspection and calibration completed.' },
        { date: '2024-07-10', type: 'Preventive Maintenance', technician: 'Sarah Engineer', notes: 'All systems checked. Cooling system serviced.' },
      ],
    },
    {
      id: 'EQ-2024-002',
      name: 'CT Scanner',
      category: 'Diagnostic',
      manufacturer: 'GE Healthcare',
      model: 'Revolution CT',
      serialNumber: 'CT-45678',
      location: 'Radiology - Room CT-1',
      department: 'Radiology',
      purchaseDate: '2021-08-20',
      purchasePrice: 1800000,
      status: 'In Use',
      lastMaintenanceDate: '2024-09-20',
      nextMaintenanceDate: '2024-12-20',
      maintenanceSchedule: 'Quarterly',
      warrantyExpiry: '2024-08-20',
      calibrationDate: '2024-09-20',
      nextCalibrationDate: '2024-11-20',
      assignedTo: 'Amanda Brown',
      utilizationRate: 92,
      maintenanceHistory: [
        { date: '2024-09-20', type: 'Preventive Maintenance', technician: 'Mike Service', notes: 'Tube replacement and system calibration.' },
      ],
    },
    {
      id: 'EQ-2024-003',
      name: 'Ventilator',
      category: 'Life Support',
      manufacturer: 'Dräger',
      model: 'Evita V800',
      serialNumber: 'VENT-12345',
      location: 'ICU - Bed 5',
      department: 'ICU',
      purchaseDate: '2023-01-10',
      purchasePrice: 45000,
      status: 'In Use',
      lastMaintenanceDate: '2024-11-01',
      nextMaintenanceDate: '2024-12-01',
      maintenanceSchedule: 'Monthly',
      warrantyExpiry: '2026-01-10',
      calibrationDate: '2024-11-01',
      nextCalibrationDate: '2024-12-01',
      assignedTo: 'Patient - ICU Bed 5',
      utilizationRate: 100,
      maintenanceHistory: [
        { date: '2024-11-01', type: 'Preventive Maintenance', technician: 'Respiratory Tech', notes: 'Filter replacement and calibration check.' },
      ],
    },
    {
      id: 'EQ-2024-004',
      name: 'Anesthesia Machine',
      category: 'Surgical',
      manufacturer: 'Dräger',
      model: 'Fabius Plus',
      serialNumber: 'ANES-67890',
      location: 'OR-3',
      department: 'Surgery',
      purchaseDate: '2022-06-15',
      purchasePrice: 65000,
      status: 'Maintenance',
      lastMaintenanceDate: '2024-11-13',
      nextMaintenanceDate: '2024-12-13',
      maintenanceSchedule: 'Monthly',
      warrantyExpiry: '2025-06-15',
      calibrationDate: '2024-10-13',
      nextCalibrationDate: '2024-11-20',
      utilizationRate: 78,
      maintenanceHistory: [
        { date: '2024-11-13', type: 'Corrective Maintenance', technician: 'Biomedical Engineer', notes: 'Vaporizer malfunction. Parts ordered. Expected back in service 11/15.' },
      ],
    },
    {
      id: 'EQ-2024-005',
      name: 'Patient Monitor',
      category: 'Monitoring',
      manufacturer: 'Philips',
      model: 'IntelliVue MX800',
      serialNumber: 'MON-23456',
      location: 'Emergency - Bed 1',
      department: 'Emergency',
      purchaseDate: '2023-05-20',
      purchasePrice: 12000,
      status: 'Operational',
      lastMaintenanceDate: '2024-08-20',
      nextMaintenanceDate: '2024-11-20',
      maintenanceSchedule: 'Quarterly',
      warrantyExpiry: '2026-05-20',
      calibrationDate: '2024-08-20',
      nextCalibrationDate: '2024-11-20',
      utilizationRate: 95,
      maintenanceHistory: [
        { date: '2024-08-20', type: 'Preventive Maintenance', technician: 'Biomed Tech', notes: 'All parameters tested. Battery replaced.' },
      ],
    },
    {
      id: 'EQ-2024-006',
      name: 'Ultrasound Machine',
      category: 'Diagnostic',
      manufacturer: 'GE Healthcare',
      model: 'LOGIQ E10',
      serialNumber: 'US-34567',
      location: 'Radiology - Room US-1',
      department: 'Radiology',
      purchaseDate: '2023-09-10',
      purchasePrice: 85000,
      status: 'Operational',
      lastMaintenanceDate: '2024-09-10',
      nextMaintenanceDate: '2024-12-10',
      maintenanceSchedule: 'Quarterly',
      warrantyExpiry: '2026-09-10',
      utilizationRate: 72,
      maintenanceHistory: [
        { date: '2024-09-10', type: 'Preventive Maintenance', technician: 'Service Engineer', notes: 'Probe inspection and software update completed.' },
      ],
    },
    {
      id: 'EQ-2024-007',
      name: 'Defibrillator',
      category: 'Life Support',
      manufacturer: 'ZOLL',
      model: 'X Series',
      serialNumber: 'DEFIB-45678',
      location: 'Emergency',
      department: 'Emergency',
      purchaseDate: '2022-11-05',
      purchasePrice: 18000,
      status: 'Out of Service',
      lastMaintenanceDate: '2024-11-12',
      nextMaintenanceDate: '2024-11-15',
      maintenanceSchedule: 'Quarterly',
      warrantyExpiry: '2025-11-05',
      calibrationDate: '2024-08-05',
      nextCalibrationDate: '2024-11-15',
      utilizationRate: 65,
      maintenanceHistory: [
        { date: '2024-11-12', type: 'Corrective Maintenance', technician: 'Emergency Equipment Tech', notes: 'Battery failure. Replacement ordered. Unit out of service.' },
      ],
    },
    {
      id: 'EQ-2024-008',
      name: 'Blood Gas Analyzer',
      category: 'Laboratory',
      manufacturer: 'Radiometer',
      model: 'ABL90 FLEX PLUS',
      serialNumber: 'LAB-56789',
      location: 'Laboratory - Room 2',
      department: 'Laboratory',
      purchaseDate: '2022-04-12',
      purchasePrice: 35000,
      status: 'Operational',
      lastMaintenanceDate: '2024-10-12',
      nextMaintenanceDate: '2025-01-12',
      maintenanceSchedule: 'Quarterly',
      warrantyExpiry: '2025-04-12',
      calibrationDate: '2024-10-12',
      nextCalibrationDate: '2024-11-12',
      utilizationRate: 88,
      maintenanceHistory: [
        { date: '2024-10-12', type: 'Preventive Maintenance', technician: 'Lab Equipment Tech', notes: 'Quality control checks passed. Reagent pack replaced.' },
      ],
    },
  ];

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = 
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || eq.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'Operational': 'bg-green-100 text-green-700',
      'In Use': 'bg-blue-100 text-blue-700',
      'Maintenance': 'bg-yellow-100 text-yellow-700',
      'Out of Service': 'bg-red-100 text-red-700',
      'Retired': 'bg-gray-100 text-gray-700',
    };
    return colors[status as keyof typeof colors];
  };

  const isMaintenanceDue = (nextDate: string) => {
    const next = new Date(nextDate);
    const today = new Date();
    const daysUntil = Math.floor((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7;
  };

  const totalEquipment = equipment.length;
  const operational = equipment.filter(e => e.status === 'Operational').length;
  const maintenance = equipment.filter(e => e.status === 'Maintenance' || e.status === 'Out of Service').length;
  const maintenanceDue = equipment.filter(e => isMaintenanceDue(e.nextMaintenanceDate)).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Wrench className="w-7 h-7 text-blue-600" />
            Equipment Management
          </h2>
          <p className="text-gray-600">Track and maintain hospital equipment</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setAddEquipmentOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Equipment
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Equipment</p>
                <p className="mt-2">{totalEquipment}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Wrench className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Operational</p>
                <p className="mt-2">{operational}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Needs Maintenance</p>
                <p className="mt-2 text-yellow-600">{maintenance}</p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Wrench className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Due Soon</p>
                <p className="mt-2 text-orange-600">{maintenanceDue}</p>
              </div>
              <div className="bg-orange-50 text-orange-600 p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
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
            placeholder="Search by name, ID, serial number, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Operational">Operational</SelectItem>
            <SelectItem value="In Use">In Use</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Out of Service">Out of Service</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Equipment List */}
      <div className="grid gap-4">
        {filteredEquipment.map((eq) => {
          const maintenanceDueSoon = isMaintenanceDue(eq.nextMaintenanceDate);

          return (
            <Card key={eq.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{eq.name}</h3>
                      <Badge variant="outline">{eq.id}</Badge>
                      <Badge className={getStatusColor(eq.status)}>{eq.status}</Badge>
                      {maintenanceDueSoon && (
                        <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Maintenance Due Soon
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {eq.manufacturer} {eq.model} • Serial: {eq.serialNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {eq.category} • Department: {eq.department}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-lg text-sm">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Location</p>
                    <p>{eq.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Purchase Date</p>
                    <p>{new Date(eq.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Purchase Price</p>
                    <p>${eq.purchasePrice.toLocaleString()}</p>
                  </div>
                  {eq.warrantyExpiry && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Warranty Expiry</p>
                      <p>{new Date(eq.warrantyExpiry).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Last Maintenance</p>
                    <p>{new Date(eq.lastMaintenanceDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Next Maintenance</p>
                    <p className={maintenanceDueSoon ? 'text-orange-600' : ''}>
                      {new Date(eq.nextMaintenanceDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Schedule</p>
                    <p>{eq.maintenanceSchedule}</p>
                  </div>
                  {eq.utilizationRate && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Utilization</p>
                      <p>{eq.utilizationRate}%</p>
                    </div>
                  )}
                  {eq.assignedTo && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Assigned To</p>
                      <p>{eq.assignedTo}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {eq.status === 'Operational' && maintenanceDueSoon && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-orange-600 border-orange-600"
                      onClick={() => {
                        setSelectedEquipment(eq);
                        setScheduleMaintenanceOpen(true);
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedEquipment(eq);
                      setViewHistoryOpen(true);
                    }}
                  >
                    <History className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedEquipment(eq);
                      setEditDetailsOpen(true);
                    }}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Details
                  </Button>
                  {(eq.status === 'Maintenance' || eq.status === 'Out of Service') && (
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Operational
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Equipment Dialog */}
      <Dialog open={addEquipmentOpen} onOpenChange={setAddEquipmentOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Equipment
            </DialogTitle>
            <DialogDescription>
              Register new equipment in the hospital inventory
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Equipment Name *</Label>
                <Input placeholder="e.g., MRI Scanner" />
              </div>
              <div>
                <Label>Category *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diagnostic">Diagnostic</SelectItem>
                    <SelectItem value="surgical">Surgical</SelectItem>
                    <SelectItem value="lifesupport">Life Support</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="therapeutic">Therapeutic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Manufacturer *</Label>
                <Input placeholder="e.g., Siemens Healthineers" />
              </div>
              <div>
                <Label>Model *</Label>
                <Input placeholder="e.g., MAGNETOM Vida 3T" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Serial Number *</Label>
                <Input placeholder="e.g., MRI-89234" />
              </div>
              <div>
                <Label>Purchase Price ($) *</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radiology">Radiology</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="icu">ICU</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Location *</Label>
                <Input placeholder="e.g., Room MRI-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Purchase Date *</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Warranty Expiry</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Maintenance Schedule *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Initial Status *</Label>
                <Select defaultValue="operational">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="inuse">In Use</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddEquipmentOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddEquipmentOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Maintenance Dialog */}
      <Dialog open={scheduleMaintenanceOpen} onOpenChange={setScheduleMaintenanceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Maintenance - {selectedEquipment?.id}
            </DialogTitle>
            <DialogDescription>
              Schedule maintenance for {selectedEquipment?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedEquipment && (
            <div className="space-y-4">
              {/* Equipment Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Equipment</span>
                  <span>{selectedEquipment.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Location</span>
                  <span>{selectedEquipment.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Maintenance</span>
                  <span>{new Date(selectedEquipment.lastMaintenanceDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Maintenance Form */}
              <div>
                <Label>Maintenance Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventive">Preventive Maintenance</SelectItem>
                    <SelectItem value="corrective">Corrective Maintenance</SelectItem>
                    <SelectItem value="calibration">Calibration</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Scheduled Date *</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <Label>Assigned Technician *</Label>
                <Input placeholder="Enter technician name" />
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Enter maintenance notes or requirements..." rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleMaintenanceOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => setScheduleMaintenanceOpen(false)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Schedule Maintenance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View History Dialog */}
      <Dialog open={viewHistoryOpen} onOpenChange={setViewHistoryOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Maintenance History - {selectedEquipment?.id}
            </DialogTitle>
            <DialogDescription>
              Complete maintenance and service history for {selectedEquipment?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedEquipment && (
            <div className="space-y-6">
              {/* Equipment Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <h3 className="flex items-center gap-2 mb-4">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  Equipment Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Name</Label>
                    <p>{selectedEquipment.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Serial Number</Label>
                    <p>{selectedEquipment.serialNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Location</Label>
                    <p>{selectedEquipment.location}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedEquipment.status)}>{selectedEquipment.status}</Badge>
                  </div>
                </div>
              </div>

              {/* Maintenance History */}
              <div>
                <h3 className="mb-4">Maintenance Records</h3>
                <div className="space-y-3">
                  {selectedEquipment.maintenanceHistory.map((record, idx) => (
                    <div key={idx} className="border rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{record.type}</p>
                          <p className="text-sm text-gray-600">Technician: {record.technician}</p>
                        </div>
                        <Badge variant="outline">
                          {new Date(record.date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">{record.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="mb-3">Maintenance Schedule</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Last Maintenance</Label>
                    <p>{new Date(selectedEquipment.lastMaintenanceDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Next Maintenance</Label>
                    <p className={isMaintenanceDue(selectedEquipment.nextMaintenanceDate) ? 'text-orange-600' : ''}>
                      {new Date(selectedEquipment.nextMaintenanceDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Schedule</Label>
                    <p>{selectedEquipment.maintenanceSchedule}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Total Records</Label>
                    <p>{selectedEquipment.maintenanceHistory.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewHistoryOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Details Dialog */}
      <Dialog open={editDetailsOpen} onOpenChange={setEditDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Edit Equipment - {selectedEquipment?.id}
            </DialogTitle>
            <DialogDescription>
              Update equipment information and settings
            </DialogDescription>
          </DialogHeader>

          {selectedEquipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Equipment Name *</Label>
                  <Input defaultValue={selectedEquipment.name} />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select defaultValue={selectedEquipment.category.toLowerCase().replace(' ', '')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diagnostic">Diagnostic</SelectItem>
                      <SelectItem value="surgical">Surgical</SelectItem>
                      <SelectItem value="lifesupport">Life Support</SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                      <SelectItem value="therapeutic">Therapeutic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Manufacturer *</Label>
                  <Input defaultValue={selectedEquipment.manufacturer} />
                </div>
                <div>
                  <Label>Model *</Label>
                  <Input defaultValue={selectedEquipment.model} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Serial Number *</Label>
                  <Input defaultValue={selectedEquipment.serialNumber} disabled />
                </div>
                <div>
                  <Label>Status *</Label>
                  <Select defaultValue={selectedEquipment.status.toLowerCase().replace(' ', '')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="inuse">In Use</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="outofservice">Out of Service</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department *</Label>
                  <Input defaultValue={selectedEquipment.department} />
                </div>
                <div>
                  <Label>Location *</Label>
                  <Input defaultValue={selectedEquipment.location} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Maintenance Schedule *</Label>
                  <Select defaultValue={selectedEquipment.maintenanceSchedule.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Utilization Rate (%)</Label>
                  <Input type="number" defaultValue={selectedEquipment.utilizationRate} max="100" />
                </div>
              </div>

              {selectedEquipment.assignedTo && (
                <div>
                  <Label>Assigned To</Label>
                  <Input defaultValue={selectedEquipment.assignedTo} />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDetailsOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setEditDetailsOpen(false)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}