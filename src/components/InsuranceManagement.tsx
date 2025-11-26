import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Plus, FileText, CheckCircle, Clock, XCircle, AlertCircle, DollarSign, Download, Edit2, Eye, User, Calendar, Droplet, Phone, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface InsuranceClaim {
  id: string;
  patientName: string;
  patientId: string;
  patientEmail?: string;
  patientPhone?: string;
  bloodGroup?: string;
  provider: string;
  policyNumber: string;
  claimAmount: number;
  approvedAmount?: number;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Partially Approved' | 'Denied' | 'Resubmitted';
  submissionDate: string;
  reviewDate?: string;
  approvalDate?: string;
  serviceDate: string;
  serviceType: string;
  diagnosisCode: string;
  procedureCode: string;
  denialReason?: string;
  notes?: string;
}

export function InsuranceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [submitClaimOpen, setSubmitClaimOpen] = useState(false);
  const [appealDialogOpen, setAppealDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);

  const claims: InsuranceClaim[] = [
    {
      id: 'CLM-2024-001',
      patientName: 'John Smith',
      patientId: 'P001',
      patientEmail: 'john.smith@email.com',
      patientPhone: '+1 (555) 123-4567',
      bloodGroup: 'A+',
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC-89234567',
      claimAmount: 2595.00,
      approvedAmount: 1947.00,
      status: 'Approved',
      submissionDate: '2024-11-11',
      reviewDate: '2024-11-12',
      approvalDate: '2024-11-12',
      serviceDate: '2024-11-10',
      serviceType: 'Inpatient Hospital Stay',
      diagnosisCode: 'I49.9',
      procedureCode: '99223',
      notes: '75% coverage approved. Patient responsible for copay and deductible.',
    },
    {
      id: 'CLM-2024-002',
      patientName: 'Sarah Williams',
      patientId: 'P002',
      patientEmail: 'sarah.williams@email.com',
      patientPhone: '+1 (555) 234-5678',
      bloodGroup: 'O-',
      provider: 'United Healthcare',
      policyNumber: 'UH-12345678',
      claimAmount: 1848.00,
      status: 'Under Review',
      submissionDate: '2024-11-12',
      reviewDate: '2024-11-13',
      serviceDate: '2024-11-11',
      serviceType: 'MRI Scan - Brain',
      diagnosisCode: 'G43.909',
      procedureCode: '70551',
      notes: 'Awaiting medical records review.',
    },
    {
      id: 'CLM-2024-003',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      patientEmail: 'robert.johnson@email.com',
      patientPhone: '+1 (555) 345-6789',
      bloodGroup: 'O+',
      provider: 'Aetna',
      policyNumber: 'AET-98765432',
      claimAmount: 25411.00,
      approvedAmount: 25411.00,
      status: 'Approved',
      submissionDate: '2024-11-08',
      reviewDate: '2024-11-09',
      approvalDate: '2024-11-10',
      serviceDate: '2024-11-08',
      serviceType: 'Hip Replacement Surgery',
      diagnosisCode: 'M16.11',
      procedureCode: '27130',
      notes: 'Pre-authorized surgery. Full coverage approved.',
    },
    {
      id: 'CLM-2024-004',
      patientName: 'Maria Garcia',
      patientId: 'P004',
      patientEmail: 'maria.garcia@email.com',
      patientPhone: '+1 (555) 456-7890',
      bloodGroup: 'B+',
      provider: 'Cigna',
      policyNumber: 'CIG-11223344',
      claimAmount: 967.50,
      status: 'Submitted',
      submissionDate: '2024-11-13',
      serviceDate: '2024-11-13',
      serviceType: 'Pediatric Emergency Care',
      diagnosisCode: 'J45.901',
      procedureCode: '99284',
      notes: 'Emergency treatment for asthma exacerbation.',
    },
    {
      id: 'CLM-2024-005',
      patientName: 'David Lee',
      patientId: 'P005',
      patientEmail: 'david.lee@email.com',
      patientPhone: '+1 (555) 567-8901',
      bloodGroup: 'AB+',
      provider: 'Humana',
      policyNumber: 'HUM-55667788',
      claimAmount: 997.50,
      approvedAmount: 750.00,
      status: 'Partially Approved',
      submissionDate: '2024-10-28',
      reviewDate: '2024-10-30',
      approvalDate: '2024-11-01',
      serviceDate: '2024-10-28',
      serviceType: 'Diabetes Management',
      diagnosisCode: 'E11.9',
      procedureCode: '99214',
      notes: 'Educational services not covered under plan. Medical consultation approved.',
    },
    {
      id: 'CLM-2024-006',
      patientName: 'Emily Davis',
      patientId: 'P006',
      patientEmail: 'emily.davis@email.com',
      patientPhone: '+1 (555) 678-9012',
      bloodGroup: 'A-',
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BC-22334455',
      claimAmount: 1250.00,
      status: 'Denied',
      submissionDate: '2024-11-05',
      reviewDate: '2024-11-07',
      serviceDate: '2024-11-04',
      serviceType: 'Elective Cosmetic Procedure',
      diagnosisCode: 'Z41.1',
      procedureCode: '15823',
      denialReason: 'Service not medically necessary. Cosmetic procedures not covered under policy.',
      notes: 'Patient may appeal decision with additional medical documentation.',
    },
  ];

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Denied':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Under Review':
      case 'Submitted':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Partially Approved':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'Resubmitted':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Denied': return 'bg-red-100 text-red-700';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700';
      case 'Submitted': return 'bg-blue-100 text-blue-700';
      case 'Partially Approved': return 'bg-indigo-100 text-indigo-700';
      case 'Resubmitted': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProviderLogo = (provider: string) => {
    const logos: { [key: string]: { bg: string; text: string; initials: string } } = {
      'Blue Cross Blue Shield': { 
        bg: 'bg-gradient-to-br from-blue-600 to-blue-800', 
        text: 'text-white',
        initials: 'BCBS'
      },
      'United Healthcare': { 
        bg: 'bg-gradient-to-br from-sky-500 to-sky-700', 
        text: 'text-white',
        initials: 'UHC'
      },
      'Aetna': { 
        bg: 'bg-gradient-to-br from-purple-600 to-purple-800', 
        text: 'text-white',
        initials: 'AET'
      },
      'Cigna': { 
        bg: 'bg-gradient-to-br from-orange-500 to-orange-700', 
        text: 'text-white',
        initials: 'CIG'
      },
      'Humana': { 
        bg: 'bg-gradient-to-br from-green-600 to-green-800', 
        text: 'text-white',
        initials: 'HUM'
      },
    };
    
    return logos[provider] || { 
      bg: 'bg-gradient-to-br from-gray-600 to-gray-800', 
      text: 'text-white',
      initials: 'INS'
    };
  };

  const handleViewDetails = (claim: InsuranceClaim) => {
    setSelectedClaim(claim);
    setViewDetailsOpen(true);
  };

  const handleAppealClaim = (claim: InsuranceClaim) => {
    setSelectedClaim(claim);
    setAppealDialogOpen(true);
  };

  const handleProcessPayment = (claim: InsuranceClaim) => {
    setSelectedClaim(claim);
    setPaymentDialogOpen(true);
  };

  const handlePrintClaim = (claim: InsuranceClaim) => {
    setSelectedClaim(claim);
    setPrintDialogOpen(true);
  };

  const statuses = ['all', 'Submitted', 'Under Review', 'Approved', 'Partially Approved', 'Denied', 'Resubmitted'];

  const stats = {
    total: claims.length,
    approved: claims.filter(c => c.status === 'Approved').length,
    pending: claims.filter(c => c.status === 'Under Review' || c.status === 'Submitted').length,
    denied: claims.filter(c => c.status === 'Denied').length,
    totalAmount: claims.reduce((sum, c) => sum + c.claimAmount, 0),
    approvedAmount: claims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Insurance Claims Management</h2>
          <p className="text-gray-600">Track and manage insurance claims</p>
        </div>
        <Dialog open={submitClaimOpen} onOpenChange={setSubmitClaimOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Submit Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Insurance Claim</DialogTitle>
              <DialogDescription>Enter claim information for insurance processing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient ID</Label>
                  <Input placeholder="P001" />
                </div>
                <div>
                  <Label>Patient Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Insurance Provider</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                      <SelectItem value="uhc">United Healthcare</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="humana">Humana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Policy Number</Label>
                  <Input placeholder="BC-12345678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Service Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Service Type</Label>
                  <Input placeholder="Consultation, Surgery, etc." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Diagnosis Code (ICD-10)</Label>
                  <Input placeholder="I49.9" />
                </div>
                <div>
                  <Label>Procedure Code (CPT)</Label>
                  <Input placeholder="99223" />
                </div>
              </div>
              <div>
                <Label>Claim Amount ($)</Label>
                <Input type="number" placeholder="1000.00" />
              </div>
              <div>
                <Label>Additional Notes</Label>
                <Textarea placeholder="Enter any additional information..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSubmitClaimOpen(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setSubmitClaimOpen(false)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Claim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Claims</p>
                <p className="mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="mt-2">{stats.approved}</p>
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
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="mt-2">{stats.pending}</p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved Amount</p>
                <p className="mt-2">${stats.approvedAmount.toLocaleString()}</p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search claims by patient name, claim ID, or patient ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Claims List */}
      <div className="grid gap-4">
        {filteredClaims.map((claim) => {
          const providerLogo = getProviderLogo(claim.provider);
          return (
          <Card key={claim.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(claim.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3>{claim.patientName}</h3>
                      <Badge variant="outline">{claim.patientId}</Badge>
                      <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">Claim ID: {claim.id}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <div className={`${providerLogo.bg} ${providerLogo.text} px-2.5 py-1 rounded-md text-xs shadow-sm`}>
                        {providerLogo.initials}
                      </div>
                      <span>{claim.provider}</span>
                      <span>•</span>
                      <span>Policy: {claim.policyNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Claim Amount</p>
                  <p className="text-blue-600">${claim.claimAmount.toLocaleString()}</p>
                  {claim.approvedAmount && (
                    <p className="text-green-600 text-sm mt-1">Approved: ${claim.approvedAmount.toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Service Type:</span>
                    <span className="ml-2">{claim.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Service Date:</span>
                    <span className="ml-2">{new Date(claim.serviceDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Submission Date:</span>
                    <span className="ml-2">{new Date(claim.submissionDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Diagnosis Code:</span>
                    <span className="ml-2">{claim.diagnosisCode}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewDetails(claim)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {claim.status === 'Denied' && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-orange-600 border-orange-600"
                    onClick={() => handleAppealClaim(claim)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Appeal Claim
                  </Button>
                )}
                {(claim.status === 'Approved' || claim.status === 'Partially Approved') && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-green-600 border-green-600"
                    onClick={() => handleProcessPayment(claim)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Process Payment
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handlePrintClaim(claim)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Print Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Claim Details - {selectedClaim?.id}
            </DialogTitle>
            <DialogDescription>
              Complete insurance claim information
            </DialogDescription>
          </DialogHeader>

          {selectedClaim && (
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
                    <p>{selectedClaim.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Patient ID</Label>
                    <p>{selectedClaim.patientId}</p>
                  </div>
                  {selectedClaim.bloodGroup && (
                    <div>
                      <Label className="text-gray-600">Blood Group</Label>
                      <p className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-red-600" />
                        {selectedClaim.bloodGroup}
                      </p>
                    </div>
                  )}
                  {selectedClaim.patientPhone && (
                    <div>
                      <Label className="text-gray-600">Phone</Label>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedClaim.patientPhone}
                      </p>
                    </div>
                  )}
                  {selectedClaim.patientEmail && (
                    <div className="col-span-2">
                      <Label className="text-gray-600">Email</Label>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedClaim.patientEmail}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Insurance Information */}
              <div className="border rounded-lg p-6">
                <h3 className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Insurance Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Insurance Provider</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`${getProviderLogo(selectedClaim.provider).bg} ${getProviderLogo(selectedClaim.provider).text} px-2.5 py-1.5 rounded-md text-xs shadow-sm`}>
                        {getProviderLogo(selectedClaim.provider).initials}
                      </div>
                      <p>{selectedClaim.provider}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Policy Number</Label>
                    <p>{selectedClaim.policyNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedClaim.status)}>{selectedClaim.status}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Claim Amount</Label>
                    <p className="text-blue-600">${selectedClaim.claimAmount.toLocaleString()}</p>
                  </div>
                  {selectedClaim.approvedAmount && (
                    <div>
                      <Label className="text-gray-600">Approved Amount</Label>
                      <p className="text-green-600">${selectedClaim.approvedAmount.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Information */}
              <div className="border rounded-lg p-6">
                <h3 className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  Service Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Service Type</Label>
                    <p>{selectedClaim.serviceType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Service Date</Label>
                    <p>{new Date(selectedClaim.serviceDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Diagnosis Code</Label>
                    <p>{selectedClaim.diagnosisCode}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Procedure Code</Label>
                    <p>{selectedClaim.procedureCode}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Submission Date</Label>
                    <p>{new Date(selectedClaim.submissionDate).toLocaleDateString()}</p>
                  </div>
                  {selectedClaim.reviewDate && (
                    <div>
                      <Label className="text-gray-600">Review Date</Label>
                      <p>{new Date(selectedClaim.reviewDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {selectedClaim.approvalDate && (
                    <div>
                      <Label className="text-gray-600">Approval Date</Label>
                      <p>{new Date(selectedClaim.approvalDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes and Denial Reason */}
              {(selectedClaim.notes || selectedClaim.denialReason) && (
                <div className={`rounded-lg p-6 border ${selectedClaim.denialReason ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="flex items-center gap-2 mb-2">
                    <AlertCircle className={`w-5 h-5 ${selectedClaim.denialReason ? 'text-red-600' : 'text-gray-600'}`} />
                    {selectedClaim.denialReason ? 'Denial Reason' : 'Notes'}
                  </h3>
                  <p className="text-sm">{selectedClaim.denialReason || selectedClaim.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Close
            </Button>
            {selectedClaim?.status === 'Denied' && (
              <Button 
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  setViewDetailsOpen(false);
                  handleAppealClaim(selectedClaim);
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Appeal Claim
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appeal Dialog */}
      <Dialog open={appealDialogOpen} onOpenChange={setAppealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Appeal Claim - {selectedClaim?.id}
            </DialogTitle>
            <DialogDescription>
              Submit an appeal with supporting documentation
            </DialogDescription>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm">
                  <span className="text-gray-600">Original Denial Reason:</span><br />
                  {selectedClaim.denialReason}
                </p>
              </div>

              <div>
                <Label>Appeal Justification</Label>
                <Textarea 
                  placeholder="Explain why this claim should be reconsidered..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Supporting Documentation</Label>
                <Input type="file" multiple />
                <p className="text-xs text-gray-500 mt-1">Upload medical records, physician notes, or other supporting documents</p>
              </div>

              <div>
                <Label>Contact Person</Label>
                <Input placeholder="Dr. Name or Case Manager" />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAppealDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => setAppealDialogOpen(false)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Appeal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Processing Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Process Insurance Payment
            </DialogTitle>
            <DialogDescription>
              Record payment received from insurance provider
            </DialogDescription>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Claim Amount:</span>
                  <span>${selectedClaim.claimAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Approved Amount:</span>
                  <span className="text-green-600">${selectedClaim.approvedAmount?.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <Label>Payment Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <Label>Payment Amount ($)</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedClaim.approvedAmount}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label>Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eft">Electronic Funds Transfer (EFT)</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="wire">Wire Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Reference Number</Label>
                <Input placeholder="Payment reference or check number" />
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea 
                  placeholder="Additional payment notes..."
                  rows={2}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setPaymentDialogOpen(false)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Print Claim Dialog */}
      <Dialog open={printDialogOpen} onOpenChange={setPrintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Print Claim - {selectedClaim?.id}
            </DialogTitle>
            <DialogDescription>
              Prepare and print the insurance claim document
            </DialogDescription>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Claim Amount:</span>
                  <span>${selectedClaim.claimAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Approved Amount:</span>
                  <span className="text-green-600">${selectedClaim.approvedAmount?.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <Label>Print Options</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select details" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Claim Details</SelectItem>
                    <SelectItem value="summary">Summary Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea 
                  placeholder="Additional print notes..."
                  rows={2}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPrintDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setPrintDialogOpen(false)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Print Claim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}