import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, DollarSign, CreditCard, FileText, Download, CheckCircle, Clock, XCircle, Eye, User, Calendar, Phone, Mail, MapPin, Droplet } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Bill {
  id: string;
  patientName: string;
  patientId: string;
  patientEmail: string;
  patientPhone: string;
  patientAddress: string;
  bloodGroup: string;
  date: string;
  services: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  balance: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paymentMethod?: string;
  insuranceClaim?: {
    provider: string;
    claimId: string;
    amount: number;
    status: string;
  };
}

export function BillingSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [moreServicesDialogOpen, setMoreServicesDialogOpen] = useState(false);

  const bills: Bill[] = [
    {
      id: 'INV-2024-001',
      patientName: 'John Smith',
      patientId: 'P001',
      patientEmail: 'john.smith@email.com',
      patientPhone: '+1 (555) 123-4567',
      patientAddress: '123 Main St, New York, NY 10001',
      bloodGroup: 'A+',
      date: '2024-11-13',
      services: [
        { description: 'Cardiology Consultation', quantity: 1, unitPrice: 250, total: 250 },
        { description: 'ECG Test', quantity: 1, unitPrice: 150, total: 150 },
        { description: 'Blood Tests', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'Room Charges (3 days)', quantity: 3, unitPrice: 500, total: 1500 },
        { description: 'Medications', quantity: 1, unitPrice: 350, total: 350 },
      ],
      subtotal: 2450,
      tax: 245,
      discount: 100,
      total: 2595,
      paid: 2595,
      balance: 0,
      status: 'Paid',
      paymentMethod: 'Insurance + Credit Card',
      insuranceClaim: {
        provider: 'Blue Cross Blue Shield',
        claimId: 'BC-2024-1234',
        amount: 1947,
        status: 'Approved',
      },
    },
    {
      id: 'INV-2024-002',
      patientName: 'Sarah Williams',
      patientId: 'P002',
      patientEmail: 'sarah.williams@email.com',
      patientPhone: '+1 (555) 234-5678',
      patientAddress: '456 Oak Ave, Los Angeles, CA 90012',
      bloodGroup: 'O-',
      date: '2024-11-12',
      services: [
        { description: 'Neurology Consultation', quantity: 1, unitPrice: 300, total: 300 },
        { description: 'MRI Scan', quantity: 1, unitPrice: 1200, total: 1200 },
        { description: 'Medications', quantity: 1, unitPrice: 180, total: 180 },
      ],
      subtotal: 1680,
      tax: 168,
      discount: 0,
      total: 1848,
      paid: 1000,
      balance: 848,
      status: 'Partial',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-2024-003',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      patientEmail: 'robert.johnson@email.com',
      patientPhone: '+1 (555) 345-6789',
      patientAddress: '789 Pine Rd, Chicago, IL 60601',
      bloodGroup: 'O+',
      date: '2024-11-08',
      services: [
        { description: 'Hip Replacement Surgery', quantity: 1, unitPrice: 15000, total: 15000 },
        { description: 'Anesthesia', quantity: 1, unitPrice: 1500, total: 1500 },
        { description: 'Operating Room', quantity: 1, unitPrice: 2500, total: 2500 },
        { description: 'Post-op Care', quantity: 5, unitPrice: 800, total: 4000 },
        { description: 'Medications', quantity: 1, unitPrice: 650, total: 650 },
        { description: 'Physical Therapy Sessions', quantity: 3, unitPrice: 120, total: 360 },
      ],
      subtotal: 24010,
      tax: 2401,
      discount: 1000,
      total: 25411,
      paid: 25411,
      balance: 0,
      status: 'Paid',
      paymentMethod: 'Insurance',
      insuranceClaim: {
        provider: 'United Healthcare',
        claimId: 'UH-2024-5678',
        amount: 25411,
        status: 'Approved',
      },
    },
    {
      id: 'INV-2024-004',
      patientName: 'Maria Garcia',
      patientId: 'P004',
      patientEmail: 'maria.garcia@email.com',
      patientPhone: '+1 (555) 456-7890',
      patientAddress: '321 Elm St, Houston, TX 77001',
      bloodGroup: 'B+',
      date: '2024-11-13',
      services: [
        { description: 'Pediatric Emergency Care', quantity: 1, unitPrice: 450, total: 450 },
        { description: 'Chest X-Ray', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'Nebulizer Treatment', quantity: 2, unitPrice: 75, total: 150 },
        { description: 'Medications', quantity: 1, unitPrice: 125, total: 125 },
      ],
      subtotal: 925,
      tax: 92.5,
      discount: 50,
      total: 967.5,
      paid: 0,
      balance: 967.5,
      status: 'Pending',
    },
    {
      id: 'INV-2024-005',
      patientName: 'David Lee',
      patientId: 'P005',
      patientEmail: 'david.lee@email.com',
      patientPhone: '+1 (555) 567-8901',
      patientAddress: '654 Maple Dr, Phoenix, AZ 85001',
      bloodGroup: 'AB+',
      date: '2024-10-28',
      services: [
        { description: 'Endocrinology Consultation', quantity: 1, unitPrice: 275, total: 275 },
        { description: 'HbA1c Test', quantity: 1, unitPrice: 85, total: 85 },
        { description: 'Lipid Panel', quantity: 1, unitPrice: 95, total: 95 },
        { description: 'Diabetes Education', quantity: 2, unitPrice: 100, total: 200 },
        { description: 'Insulin Supplies', quantity: 1, unitPrice: 320, total: 320 },
      ],
      subtotal: 975,
      tax: 97.5,
      discount: 75,
      total: 997.5,
      paid: 0,
      balance: 997.5,
      status: 'Overdue',
    },
  ];

  const filteredBills = bills.filter(bill =>
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      case 'Partial': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Overdue':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);
  const totalPaid = bills.reduce((sum, bill) => sum + bill.paid, 0);
  const totalOutstanding = bills.reduce((sum, bill) => sum + bill.balance, 0);

  const handleViewDetails = (bill: Bill) => {
    setSelectedBill(bill);
    setViewDetailsOpen(true);
  };

  const handlePaymentClick = (bill: Bill) => {
    setSelectedBill(bill);
    setPaymentAmount(bill.balance.toString());
    setPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = () => {
    // Handle payment processing here
    setPaymentDialogOpen(false);
    setPaymentMethod('');
    setPaymentAmount('');
  };

  const handleDownload = (bill: Bill) => {
    setSelectedBill(bill);
    setDownloadDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Billing & Payments</h2>
        <p className="text-gray-600">Manage invoices and payment records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="mt-2">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Amount Collected</p>
                <p className="mt-2">${totalPaid.toLocaleString()}</p>
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
                <p className="text-gray-600 text-sm">Outstanding</p>
                <p className="mt-2">${totalOutstanding.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search bills by patient name, ID, or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredBills.map((bill) => (
          <Card key={bill.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(bill.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3>{bill.patientName}</h3>
                      <Badge variant="outline">{bill.patientId}</Badge>
                      <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">Invoice: {bill.id}</p>
                    <p className="text-gray-500 text-sm">Date: {new Date(bill.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Total Amount</p>
                  <p className="text-green-600">${bill.total.toLocaleString()}</p>
                  {bill.balance > 0 && (
                    <p className="text-red-600 text-sm mt-1">Balance: ${bill.balance.toLocaleString()}</p>
                  )}
                </div>
              </div>

              {/* Services Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm mb-3">Services & Charges</p>
                <div className="space-y-2">
                  {bill.services.slice(0, 3).map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{service.description}</span>
                      <span className="text-gray-600">${service.total.toLocaleString()}</span>
                    </div>
                  ))}
                  {bill.services.length > 3 && (
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                      onClick={() => {
                        setSelectedBill(bill);
                        setMoreServicesDialogOpen(true);
                      }}
                    >
                      + {bill.services.length - 3} more services
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  {bill.paymentMethod && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4" />
                      {bill.paymentMethod}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(bill)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(bill)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {bill.balance > 0 && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handlePaymentClick(bill)}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Invoice Details - {selectedBill?.id}
            </DialogTitle>
            <DialogDescription>
              Complete invoice information and patient details
            </DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-6">
              {/* Patient Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <h3 className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Patient Name</Label>
                    <p>{selectedBill.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Patient ID</Label>
                    <p>{selectedBill.patientId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Blood Group</Label>
                    <p className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-red-600" />
                      {selectedBill.bloodGroup}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Phone</Label>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedBill.patientPhone}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-gray-600">Email</Label>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedBill.patientEmail}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-gray-600">Address</Label>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedBill.patientAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="border rounded-lg p-6">
                <h3 className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  Invoice Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-gray-600">Invoice Date</Label>
                    <p>{new Date(selectedBill.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedBill.status)}>{selectedBill.status}</Badge>
                  </div>
                </div>

                {/* Services Table */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 text-sm">Service</th>
                        <th className="text-center p-3 text-sm">Qty</th>
                        <th className="text-right p-3 text-sm">Unit Price</th>
                        <th className="text-right p-3 text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.services.map((service, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-3 text-sm">{service.description}</td>
                          <td className="text-center p-3 text-sm">{service.quantity}</td>
                          <td className="text-right p-3 text-sm">${service.unitPrice.toLocaleString()}</td>
                          <td className="text-right p-3 text-sm">${service.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${selectedBill.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span>${selectedBill.tax.toLocaleString()}</span>
                  </div>
                  {selectedBill.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${selectedBill.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t">
                    <span>Total</span>
                    <span>${selectedBill.total.toLocaleString()}</span>
                  </div>
                  {selectedBill.paid > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Paid</span>
                        <span>-${selectedBill.paid.toLocaleString()}</span>
                      </div>
                      {selectedBill.balance > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Balance Due</span>
                          <span>${selectedBill.balance.toLocaleString()}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Insurance Information */}
              {selectedBill.insuranceClaim && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
                  <h3 className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-green-600" />
                    Insurance Claim
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Provider</Label>
                      <p>{selectedBill.insuranceClaim.provider}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Claim ID</Label>
                      <p>{selectedBill.insuranceClaim.claimId}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Claim Amount</Label>
                      <p className="text-green-600">${selectedBill.insuranceClaim.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Status</Label>
                      <Badge className="bg-green-100 text-green-700">{selectedBill.insuranceClaim.status}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Close
            </Button>
            {selectedBill && selectedBill.balance > 0 && (
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setViewDetailsOpen(false);
                  handlePaymentClick(selectedBill);
                }}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Process Payment
            </DialogTitle>
            <DialogDescription>
              Complete payment for invoice {selectedBill?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Patient</span>
                  <span>{selectedBill.patientName}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Invoice Total</span>
                  <span>${selectedBill.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Already Paid</span>
                  <span className="text-green-600">${selectedBill.paid.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span>Amount Due</span>
                  <span className="text-red-600">${selectedBill.balance.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <Label>Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Payment Amount ($)</Label>
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                  <>
                    <div>
                      <Label>Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input placeholder="123" type="password" maxLength={3} />
                      </div>
                    </div>
                  </>
                ) : null}

                {paymentMethod === 'check' && (
                  <div>
                    <Label>Check Number</Label>
                    <Input placeholder="Enter check number" />
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handlePaymentSubmit}
              disabled={!paymentMethod || !paymentAmount}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* More Services Dialog */}
      <Dialog open={moreServicesDialogOpen} onOpenChange={setMoreServicesDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              More Services - {selectedBill?.id}
            </DialogTitle>
            <DialogDescription>
              Complete list of services for the invoice
            </DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-6">
              {/* Services Table */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-sm">Service</th>
                      <th className="text-center p-3 text-sm">Qty</th>
                      <th className="text-right p-3 text-sm">Unit Price</th>
                      <th className="text-right p-3 text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.services.map((service, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-3 text-sm">{service.description}</td>
                        <td className="text-center p-3 text-sm">{service.quantity}</td>
                        <td className="text-right p-3 text-sm">${service.unitPrice.toLocaleString()}</td>
                        <td className="text-right p-3 text-sm">${service.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setMoreServicesDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Dialog */}
      <Dialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice - {selectedBill?.id}
            </DialogTitle>
            <DialogDescription>
              Choose format and download the invoice
            </DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-4">
              {/* Invoice Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Patient</span>
                  <span>{selectedBill.patientName}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Invoice Date</span>
                  <span>{new Date(selectedBill.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="text-green-600">${selectedBill.total.toLocaleString()}</span>
                </div>
                {selectedBill.balance > 0 && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-gray-600">Balance Due</span>
                    <span className="text-red-600">${selectedBill.balance.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Download Options */}
              <div>
                <Label>File Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="word">Word Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Include Details</Label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select details" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Invoice Details</SelectItem>
                    <SelectItem value="summary">Summary Only</SelectItem>
                    <SelectItem value="patient">With Patient Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDownloadDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setDownloadDialogOpen(false)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}