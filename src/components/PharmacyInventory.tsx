import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Plus, AlertTriangle, Package, TrendingDown, DollarSign, Edit2, ShoppingCart, CheckCircle, Pill } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  stockQuantity: number;
  reorderLevel: number;
  unitPrice: number;
  expiryDate: string;
  batchNumber: string;
  location: string;
  prescriptionRequired: boolean;
  dosageForm: string;
  strength: string;
}

export function PharmacyInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  
  // Dialog states
  const [addMedicineOpen, setAddMedicineOpen] = useState(false);
  const [editMedicineOpen, setEditMedicineOpen] = useState(false);
  const [reorderOpen, setReorderOpen] = useState(false);

  const medicines: Medicine[] = [
    {
      id: 'MED001',
      name: 'Metformin',
      genericName: 'Metformin Hydrochloride',
      category: 'Antidiabetic',
      manufacturer: 'PharmaCo Inc.',
      stockQuantity: 450,
      reorderLevel: 200,
      unitPrice: 0.25,
      expiryDate: '2025-08-15',
      batchNumber: 'MET-2024-A123',
      location: 'Shelf A-12',
      prescriptionRequired: true,
      dosageForm: 'Tablet',
      strength: '500mg',
    },
    {
      id: 'MED002',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin Trihydrate',
      category: 'Antibiotic',
      manufacturer: 'MediLife Labs',
      stockQuantity: 180,
      reorderLevel: 300,
      unitPrice: 0.45,
      expiryDate: '2025-03-20',
      batchNumber: 'AMX-2024-B456',
      location: 'Shelf B-05',
      prescriptionRequired: true,
      dosageForm: 'Capsule',
      strength: '250mg',
    },
    {
      id: 'MED003',
      name: 'Aspirin',
      genericName: 'Acetylsalicylic Acid',
      category: 'Analgesic',
      manufacturer: 'HealthPlus Pharma',
      stockQuantity: 850,
      reorderLevel: 500,
      unitPrice: 0.08,
      expiryDate: '2026-01-10',
      batchNumber: 'ASP-2024-C789',
      location: 'Shelf C-18',
      prescriptionRequired: false,
      dosageForm: 'Tablet',
      strength: '81mg',
    },
    {
      id: 'MED004',
      name: 'Insulin Glargine',
      genericName: 'Insulin Glargine',
      category: 'Antidiabetic',
      manufacturer: 'BioMed Solutions',
      stockQuantity: 45,
      reorderLevel: 50,
      unitPrice: 85.50,
      expiryDate: '2025-06-30',
      batchNumber: 'INS-2024-D012',
      location: 'Refrigerator R-03',
      prescriptionRequired: true,
      dosageForm: 'Injectable',
      strength: '100 units/mL',
    },
    {
      id: 'MED005',
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      category: 'Antihypertensive',
      manufacturer: 'CardioMed Inc.',
      stockQuantity: 620,
      reorderLevel: 400,
      unitPrice: 0.35,
      expiryDate: '2025-11-25',
      batchNumber: 'LIS-2024-E345',
      location: 'Shelf A-08',
      prescriptionRequired: true,
      dosageForm: 'Tablet',
      strength: '10mg',
    },
    {
      id: 'MED006',
      name: 'Albuterol',
      genericName: 'Albuterol Sulfate',
      category: 'Bronchodilator',
      manufacturer: 'RespiraTech',
      stockQuantity: 95,
      reorderLevel: 100,
      unitPrice: 42.00,
      expiryDate: '2025-09-15',
      batchNumber: 'ALB-2024-F678',
      location: 'Shelf D-22',
      prescriptionRequired: true,
      dosageForm: 'Inhaler',
      strength: '90mcg',
    },
    {
      id: 'MED007',
      name: 'Omeprazole',
      genericName: 'Omeprazole',
      category: 'Proton Pump Inhibitor',
      manufacturer: 'GastroHealth Labs',
      stockQuantity: 380,
      reorderLevel: 250,
      unitPrice: 0.55,
      expiryDate: '2025-12-10',
      batchNumber: 'OMP-2024-G901',
      location: 'Shelf B-14',
      prescriptionRequired: true,
      dosageForm: 'Capsule',
      strength: '20mg',
    },
    {
      id: 'MED008',
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      category: 'NSAID',
      manufacturer: 'PainRelief Pharma',
      stockQuantity: 25,
      reorderLevel: 400,
      unitPrice: 0.12,
      expiryDate: '2025-04-18',
      batchNumber: 'IBU-2024-H234',
      location: 'Shelf C-09',
      prescriptionRequired: false,
      dosageForm: 'Tablet',
      strength: '200mg',
    },
    {
      id: 'MED009',
      name: 'Morphine Sulfate',
      genericName: 'Morphine Sulfate',
      category: 'Opioid Analgesic',
      manufacturer: 'SecureMed Inc.',
      stockQuantity: 120,
      reorderLevel: 80,
      unitPrice: 8.75,
      expiryDate: '2025-07-22',
      batchNumber: 'MOR-2024-I567',
      location: 'Secure Cabinet S-01',
      prescriptionRequired: true,
      dosageForm: 'Injectable',
      strength: '10mg/mL',
    },
    {
      id: 'MED010',
      name: 'Atorvastatin',
      genericName: 'Atorvastatin Calcium',
      category: 'Statin',
      manufacturer: 'LipidControl Labs',
      stockQuantity: 540,
      reorderLevel: 350,
      unitPrice: 0.68,
      expiryDate: '2026-02-28',
      batchNumber: 'ATO-2024-J890',
      location: 'Shelf A-16',
      prescriptionRequired: true,
      dosageForm: 'Tablet',
      strength: '40mg',
    },
  ];

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockMedicines = medicines.filter(med => med.stockQuantity <= med.reorderLevel);
  const totalInventoryValue = medicines.reduce((sum, med) => sum + (med.stockQuantity * med.unitPrice), 0);

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    if (quantity <= reorderLevel * 0.5) return { label: 'Critical', color: 'bg-red-100 text-red-700' };
    if (quantity <= reorderLevel) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Pill className="w-7 h-7 text-green-600" />
            Pharmacy Inventory
          </h2>
          <p className="text-gray-600">Manage medicine stock and supplies</p>
        </div>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700" onClick={() => setAddMedicineOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Medicine
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items</p>
                <p className="mt-2">{medicines.length}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Low Stock Alerts</p>
                <p className="mt-2">{lowStockMedicines.length}</p>
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
                <p className="text-gray-600 text-sm">Inventory Value</p>
                <p className="mt-2">${totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockMedicines.length > 0 && (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-5 h-5" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lowStockMedicines.map((med) => (
                <div key={med.id} className="bg-white p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm">{med.name}</p>
                    <p className="text-xs text-gray-600">
                      Stock: {med.stockQuantity} (Reorder at: {med.reorderLevel})
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => { setSelectedMedicine(med); setReorderOpen(true); }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Reorder
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search medicines by name, category, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredMedicines.map((medicine) => {
          const stockStatus = getStockStatus(medicine.stockQuantity, medicine.reorderLevel);
          const expiringSoon = isExpiringSoon(medicine.expiryDate);

          return (
            <Card key={medicine.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{medicine.name}</h3>
                      <Badge variant="outline">{medicine.id}</Badge>
                      <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
                      {medicine.prescriptionRequired && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          Rx Required
                        </Badge>
                      )}
                      {expiringSoon && (
                        <Badge className="bg-orange-100 text-orange-700">
                          Expiring Soon
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Generic: {medicine.genericName} • Category: {medicine.category}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Stock Quantity</p>
                        <p className="text-sm flex items-center gap-2">
                          {medicine.stockQuantity} units
                          {medicine.stockQuantity <= medicine.reorderLevel && (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Unit Price</p>
                        <p className="text-sm">${medicine.unitPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Dosage</p>
                        <p className="text-sm">{medicine.dosageForm} - {medicine.strength}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Location</p>
                        <p className="text-sm">{medicine.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Manufacturer</p>
                        <p className="text-sm">{medicine.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Batch Number</p>
                        <p className="text-sm">{medicine.batchNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Expiry Date</p>
                        <p className={`text-sm ${expiringSoon ? 'text-orange-600' : ''}`}>
                          {new Date(medicine.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Value</p>
                        <p className="text-sm">
                          ${(medicine.stockQuantity * medicine.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => { setSelectedMedicine(medicine); setEditMedicineOpen(true); }}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {medicine.stockQuantity <= medicine.reorderLevel && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => { setSelectedMedicine(medicine); setReorderOpen(true); }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Medicine Dialog */}
      <Dialog open={addMedicineOpen} onOpenChange={setAddMedicineOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Medicine
            </DialogTitle>
            <DialogDescription>
              Add a new medicine to the pharmacy inventory
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="medicineName">Medicine Name *</Label>
              <Input id="medicineName" placeholder="e.g., Metformin" />
            </div>
            <div>
              <Label htmlFor="medicineId">Medicine ID *</Label>
              <Input id="medicineId" placeholder="e.g., MED011" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="genericName">Generic Name *</Label>
              <Input id="genericName" placeholder="e.g., Metformin Hydrochloride" />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Antidiabetic">Antidiabetic</SelectItem>
                  <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                  <SelectItem value="Analgesic">Analgesic</SelectItem>
                  <SelectItem value="Antihypertensive">Antihypertensive</SelectItem>
                  <SelectItem value="Bronchodilator">Bronchodilator</SelectItem>
                  <SelectItem value="Statin">Statin</SelectItem>
                  <SelectItem value="NSAID">NSAID</SelectItem>
                  <SelectItem value="Opioid Analgesic">Opioid Analgesic</SelectItem>
                  <SelectItem value="Proton Pump Inhibitor">Proton Pump Inhibitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input id="manufacturer" placeholder="e.g., PharmaCo Inc." />
            </div>
            <div>
              <Label htmlFor="dosageForm">Dosage Form *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Injectable">Injectable</SelectItem>
                  <SelectItem value="Inhaler">Inhaler</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Cream">Cream</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="strength">Strength *</Label>
              <Input id="strength" placeholder="e.g., 500mg" />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity *</Label>
              <Input id="stockQuantity" type="number" placeholder="0" />
            </div>
            <div>
              <Label htmlFor="reorderLevel">Reorder Level *</Label>
              <Input id="reorderLevel" type="number" placeholder="0" />
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price ($) *</Label>
              <Input id="unitPrice" type="number" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="batchNumber">Batch Number *</Label>
              <Input id="batchNumber" placeholder="e.g., MET-2024-A123" />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input id="expiryDate" type="date" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="location">Storage Location *</Label>
              <Input id="location" placeholder="e.g., Shelf A-12" />
            </div>
            <div>
              <Label htmlFor="prescriptionRequired">Prescription Required *</Label>
              <Select defaultValue="true">
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMedicineOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAddMedicineOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Medicine Dialog */}
      <Dialog open={editMedicineOpen} onOpenChange={setEditMedicineOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Edit Medicine - {selectedMedicine?.id}
            </DialogTitle>
            <DialogDescription>
              Update medicine information for {selectedMedicine?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedMedicine && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="medicineName">Medicine Name *</Label>
                <Input id="medicineName" defaultValue={selectedMedicine.name} />
              </div>
              <div>
                <Label htmlFor="medicineId">Medicine ID *</Label>
                <Input id="medicineId" defaultValue={selectedMedicine.id} disabled />
              </div>
              <div className="col-span-2">
                <Label htmlFor="genericName">Generic Name *</Label>
                <Input id="genericName" defaultValue={selectedMedicine.genericName} />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select defaultValue={selectedMedicine.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Antidiabetic">Antidiabetic</SelectItem>
                    <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                    <SelectItem value="Analgesic">Analgesic</SelectItem>
                    <SelectItem value="Antihypertensive">Antihypertensive</SelectItem>
                    <SelectItem value="Bronchodilator">Bronchodilator</SelectItem>
                    <SelectItem value="Statin">Statin</SelectItem>
                    <SelectItem value="NSAID">NSAID</SelectItem>
                    <SelectItem value="Opioid Analgesic">Opioid Analgesic</SelectItem>
                    <SelectItem value="Proton Pump Inhibitor">Proton Pump Inhibitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="manufacturer">Manufacturer *</Label>
                <Input id="manufacturer" defaultValue={selectedMedicine.manufacturer} />
              </div>
              <div>
                <Label htmlFor="dosageForm">Dosage Form *</Label>
                <Select defaultValue={selectedMedicine.dosageForm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                    <SelectItem value="Capsule">Capsule</SelectItem>
                    <SelectItem value="Injectable">Injectable</SelectItem>
                    <SelectItem value="Inhaler">Inhaler</SelectItem>
                    <SelectItem value="Syrup">Syrup</SelectItem>
                    <SelectItem value="Cream">Cream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="strength">Strength *</Label>
                <Input id="strength" defaultValue={selectedMedicine.strength} />
              </div>
              <div>
                <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                <Input id="stockQuantity" type="number" defaultValue={selectedMedicine.stockQuantity.toString()} />
              </div>
              <div>
                <Label htmlFor="reorderLevel">Reorder Level *</Label>
                <Input id="reorderLevel" type="number" defaultValue={selectedMedicine.reorderLevel.toString()} />
              </div>
              <div>
                <Label htmlFor="unitPrice">Unit Price ($) *</Label>
                <Input id="unitPrice" type="number" step="0.01" defaultValue={selectedMedicine.unitPrice.toString()} />
              </div>
              <div>
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input id="batchNumber" defaultValue={selectedMedicine.batchNumber} />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input id="expiryDate" type="date" defaultValue={selectedMedicine.expiryDate} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="location">Storage Location *</Label>
                <Input id="location" defaultValue={selectedMedicine.location} />
              </div>
              <div>
                <Label htmlFor="prescriptionRequired">Prescription Required *</Label>
                <Select defaultValue={selectedMedicine.prescriptionRequired.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMedicineOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setEditMedicineOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reorder Dialog */}
      <Dialog open={reorderOpen} onOpenChange={setReorderOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Reorder Medicine - {selectedMedicine?.id}
            </DialogTitle>
            <DialogDescription>
              Create a purchase order for {selectedMedicine?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedMedicine && (
            <div className="space-y-4">
              {/* Medicine Info Card */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Medicine Name</Label>
                    <p className="font-semibold">{selectedMedicine.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Current Stock</Label>
                    <p className="font-semibold text-red-600">{selectedMedicine.stockQuantity} units</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Reorder Level</Label>
                    <p className="font-semibold">{selectedMedicine.reorderLevel} units</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Unit Price</Label>
                    <p className="font-semibold">${selectedMedicine.unitPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Manufacturer</Label>
                    <p className="font-semibold">{selectedMedicine.manufacturer}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Dosage</Label>
                    <p className="font-semibold">{selectedMedicine.dosageForm} - {selectedMedicine.strength}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderQuantity">Order Quantity *</Label>
                  <Input 
                    id="orderQuantity" 
                    type="number" 
                    defaultValue={selectedMedicine.reorderLevel * 2} 
                    placeholder="Enter quantity" 
                  />
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Select defaultValue={selectedMedicine.manufacturer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={selectedMedicine.manufacturer}>{selectedMedicine.manufacturer}</SelectItem>
                      <SelectItem value="Alternative Supplier 1">Alternative Supplier 1</SelectItem>
                      <SelectItem value="Alternative Supplier 2">Alternative Supplier 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select defaultValue={selectedMedicine.stockQuantity <= selectedMedicine.reorderLevel * 0.5 ? "urgent" : "normal"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expectedDelivery">Expected Delivery Date *</Label>
                  <Input id="expectedDelivery" type="date" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="orderNotes">Order Notes</Label>
                  <Textarea id="orderNotes" placeholder="Any special instructions or notes..." rows={3} />
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <Label className="text-gray-700 mb-3 block">Cost Summary</Label>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Price:</span>
                    <span>${selectedMedicine.unitPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Quantity:</span>
                    <span>{selectedMedicine.reorderLevel * 2} units</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Estimated Total:</span>
                    <span className="font-semibold">${(selectedMedicine.unitPrice * selectedMedicine.reorderLevel * 2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setReorderOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setReorderOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
