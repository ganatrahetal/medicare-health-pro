import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Plus, Download, CheckCircle, Clock, AlertCircle, TestTube, FileText, Syringe, Edit } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testType: string;
  orderedBy: string;
  orderDate: string;
  sampleCollectionDate?: string;
  resultDate?: string;
  status: 'Ordered' | 'Sample Collected' | 'In Progress' | 'Completed' | 'Abnormal';
  priority: 'Routine' | 'Urgent' | 'STAT';
  results?: {
    parameter: string;
    value: string;
    unit: string;
    normalRange: string;
    flag?: 'High' | 'Low' | 'Normal';
  }[];
  technician?: string;
  notes?: string;
}

export function LabTests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  
  // Dialog states
  const [orderTestOpen, setOrderTestOpen] = useState(false);
  const [viewReportOpen, setViewReportOpen] = useState(false);
  const [enterResultsOpen, setEnterResultsOpen] = useState(false);
  const [collectSampleOpen, setCollectSampleOpen] = useState(false);

  const labTests: LabTest[] = [
    {
      id: 'LAB-2024-001',
      patientName: 'John Smith',
      patientId: 'P001',
      testType: 'Complete Blood Count (CBC)',
      orderedBy: 'Dr. Emily Chen',
      orderDate: '2024-11-10',
      sampleCollectionDate: '2024-11-10',
      resultDate: '2024-11-11',
      status: 'Completed',
      priority: 'Routine',
      technician: 'Sarah Tech',
      results: [
        { parameter: 'WBC Count', value: '7.5', unit: 'K/uL', normalRange: '4.5-11.0', flag: 'Normal' },
        { parameter: 'RBC Count', value: '4.8', unit: 'M/uL', normalRange: '4.5-5.9', flag: 'Normal' },
        { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', normalRange: '13.5-17.5', flag: 'Normal' },
        { parameter: 'Hematocrit', value: '42', unit: '%', normalRange: '38.8-50.0', flag: 'Normal' },
        { parameter: 'Platelet Count', value: '250', unit: 'K/uL', normalRange: '150-400', flag: 'Normal' },
      ],
    },
    {
      id: 'LAB-2024-002',
      patientName: 'Sarah Williams',
      patientId: 'P002',
      testType: 'Lipid Panel',
      orderedBy: 'Dr. Michael Brown',
      orderDate: '2024-11-12',
      sampleCollectionDate: '2024-11-12',
      resultDate: '2024-11-13',
      status: 'Abnormal',
      priority: 'Routine',
      technician: 'Mike Labs',
      results: [
        { parameter: 'Total Cholesterol', value: '245', unit: 'mg/dL', normalRange: '<200', flag: 'High' },
        { parameter: 'LDL Cholesterol', value: '165', unit: 'mg/dL', normalRange: '<100', flag: 'High' },
        { parameter: 'HDL Cholesterol', value: '38', unit: 'mg/dL', normalRange: '>40', flag: 'Low' },
        { parameter: 'Triglycerides', value: '210', unit: 'mg/dL', normalRange: '<150', flag: 'High' },
      ],
      notes: 'Patient advised to follow up with physician for dietary and medication counseling.',
    },
    {
      id: 'LAB-2024-003',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      testType: 'Comprehensive Metabolic Panel',
      orderedBy: 'Dr. Lisa Anderson',
      orderDate: '2024-11-08',
      sampleCollectionDate: '2024-11-08',
      status: 'In Progress',
      priority: 'Routine',
      technician: 'Linda Lab',
    },
    {
      id: 'LAB-2024-004',
      patientName: 'Maria Garcia',
      patientId: 'P004',
      testType: 'Chest X-Ray',
      orderedBy: 'Dr. James Wilson',
      orderDate: '2024-11-13',
      sampleCollectionDate: '2024-11-13',
      status: 'Sample Collected',
      priority: 'Urgent',
    },
    {
      id: 'LAB-2024-005',
      patientName: 'David Lee',
      patientId: 'P005',
      testType: 'HbA1c',
      orderedBy: 'Dr. Sarah Martinez',
      orderDate: '2024-10-28',
      sampleCollectionDate: '2024-10-28',
      resultDate: '2024-10-29',
      status: 'Completed',
      priority: 'Routine',
      technician: 'Sarah Tech',
      results: [
        { parameter: 'Hemoglobin A1c', value: '7.8', unit: '%', normalRange: '<5.7', flag: 'High' },
      ],
      notes: 'Elevated HbA1c indicates poor glycemic control over the past 3 months.',
    },
    {
      id: 'LAB-2024-006',
      patientName: 'Jennifer Taylor',
      patientId: 'P006',
      testType: 'Urinalysis',
      orderedBy: 'Dr. Emily Chen',
      orderDate: '2024-11-13',
      status: 'Ordered',
      priority: 'Routine',
    },
    {
      id: 'LAB-2024-007',
      patientName: 'Michael Anderson',
      patientId: 'P007',
      testType: 'Blood Culture',
      orderedBy: 'Dr. Amanda Roberts',
      orderDate: '2024-11-13',
      sampleCollectionDate: '2024-11-13',
      status: 'In Progress',
      priority: 'STAT',
      notes: 'Patient with suspected sepsis. Results needed urgently.',
    },
    {
      id: 'LAB-2024-008',
      patientName: 'Patricia Moore',
      patientId: 'P008',
      testType: 'Thyroid Function Test',
      orderedBy: 'Dr. Sarah Martinez',
      orderDate: '2024-11-11',
      sampleCollectionDate: '2024-11-11',
      resultDate: '2024-11-12',
      status: 'Completed',
      priority: 'Routine',
      technician: 'Mike Labs',
      results: [
        { parameter: 'TSH', value: '2.5', unit: 'mIU/L', normalRange: '0.4-4.0', flag: 'Normal' },
        { parameter: 'Free T4', value: '1.2', unit: 'ng/dL', normalRange: '0.8-1.8', flag: 'Normal' },
        { parameter: 'Free T3', value: '3.1', unit: 'pg/mL', normalRange: '2.3-4.2', flag: 'Normal' },
      ],
    },
  ];

  const filteredTests = labTests.filter(test =>
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Sample Collected': return 'bg-purple-100 text-purple-700';
      case 'Ordered': return 'bg-gray-100 text-gray-700';
      case 'Abnormal': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'STAT': return 'bg-red-100 text-red-700';
      case 'Urgent': return 'bg-orange-100 text-orange-700';
      case 'Routine': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Abnormal':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getResultFlag = (flag?: string) => {
    if (!flag) return null;
    switch (flag) {
      case 'High':
        return <span className="text-red-600">↑</span>;
      case 'Low':
        return <span className="text-blue-600">↓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <TestTube className="w-7 h-7 text-cyan-600" />
            Laboratory Tests
          </h2>
          <p className="text-gray-600">Manage lab orders and results</p>
        </div>
        <Button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700" onClick={() => setOrderTestOpen(true)}>
          <Plus className="w-4 h-4" />
          Order New Test
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search lab tests by patient name, ID, or test type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredTests.map((test) => (
          <Card key={test.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(test.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{test.patientName}</h3>
                      <Badge variant="outline">{test.patientId}</Badge>
                      <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                      <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">
                      Test ID: {test.id} • {test.testType}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Ordered by: {test.orderedBy} • Date: {new Date(test.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Order Date</p>
                  <p className="text-sm">{new Date(test.orderDate).toLocaleDateString()}</p>
                </div>
                {test.sampleCollectionDate && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Sample Collected</p>
                    <p className="text-sm">{new Date(test.sampleCollectionDate).toLocaleDateString()}</p>
                  </div>
                )}
                {test.resultDate && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Result Date</p>
                    <p className="text-sm">{new Date(test.resultDate).toLocaleDateString()}</p>
                  </div>
                )}
                {test.technician && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Technician</p>
                    <p className="text-sm">{test.technician}</p>
                  </div>
                )}
              </div>

              {test.results && test.results.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm mb-3">Test Results</p>
                  <div className="space-y-2">
                    {test.results.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>{result.parameter}</span>
                          {getResultFlag(result.flag)}
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <span className={result.flag && result.flag !== 'Normal' ? 'text-red-600' : ''}>
                            {result.value} {result.unit}
                          </span>
                          <span className="text-gray-500 text-xs">
                            Ref: {result.normalRange}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {test.notes && (
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-3 rounded mb-4">
                  <p className="text-xs text-gray-600 mb-1">Notes</p>
                  <p className="text-sm">{test.notes}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {test.status === 'Ordered' && (
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => { setSelectedTest(test); setCollectSampleOpen(true); }}
                  >
                    <Syringe className="w-4 h-4 mr-2" />
                    Collect Sample
                  </Button>
                )}
                {test.status === 'Sample Collected' && (
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <TestTube className="w-4 h-4 mr-2" />
                    Start Processing
                  </Button>
                )}
                {test.status === 'In Progress' && (
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => { setSelectedTest(test); setEnterResultsOpen(true); }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Enter Results
                  </Button>
                )}
                {(test.status === 'Completed' || test.status === 'Abnormal') && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => { setSelectedTest(test); setViewReportOpen(true); }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order New Test Dialog */}
      <Dialog open={orderTestOpen} onOpenChange={setOrderTestOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Order Laboratory Test
            </DialogTitle>
            <DialogDescription>
              Create a new laboratory test order
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
              <Label htmlFor="testType">Test Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</SelectItem>
                  <SelectItem value="Comprehensive Metabolic Panel">Comprehensive Metabolic Panel</SelectItem>
                  <SelectItem value="Lipid Panel">Lipid Panel</SelectItem>
                  <SelectItem value="Thyroid Function Test">Thyroid Function Test</SelectItem>
                  <SelectItem value="Hemoglobin A1c">Hemoglobin A1c (HbA1c)</SelectItem>
                  <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                  <SelectItem value="Blood Culture">Blood Culture</SelectItem>
                  <SelectItem value="Liver Function Test">Liver Function Test</SelectItem>
                  <SelectItem value="Coagulation Panel">Coagulation Panel (PT/INR/PTT)</SelectItem>
                  <SelectItem value="Vitamin D">Vitamin D</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="STAT">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="orderedBy">Ordering Physician *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select physician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Emily Chen">Dr. Emily Chen</SelectItem>
                  <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                  <SelectItem value="Dr. Amanda Roberts">Dr. Amanda Roberts</SelectItem>
                  <SelectItem value="Dr. Michael Brown">Dr. Michael Brown</SelectItem>
                  <SelectItem value="Dr. Sarah Martinez">Dr. Sarah Martinez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fasting">Fasting Required *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes - Fasting Required</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="clinicalIndication">Clinical Indication *</Label>
              <Textarea id="clinicalIndication" placeholder="Enter reason for test and clinical information..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderTestOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={() => setOrderTestOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Order Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Full Report Dialog */}
      <Dialog open={viewReportOpen} onOpenChange={setViewReportOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Laboratory Report - {selectedTest?.id}
            </DialogTitle>
            <DialogDescription>
              Complete laboratory test results for {selectedTest?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-4">
              {/* Patient & Test Info */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient Name</Label>
                    <p className="font-semibold">{selectedTest.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Patient ID</Label>
                    <p className="font-semibold">{selectedTest.patientId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Test Type</Label>
                    <p className="font-semibold">{selectedTest.testType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Test ID</Label>
                    <p className="font-semibold">{selectedTest.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Order Date</Label>
                    <p className="font-semibold">{new Date(selectedTest.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Result Date</Label>
                    <p className="font-semibold">{selectedTest.resultDate ? new Date(selectedTest.resultDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Ordered By</Label>
                    <p className="font-semibold">{selectedTest.orderedBy}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Technician</Label>
                    <p className="font-semibold">{selectedTest.technician || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              {selectedTest.results && selectedTest.results.length > 0 && (
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-3 block">Test Results</Label>
                  <div className="space-y-3">
                    {selectedTest.results.map((result, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Parameter</p>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{result.parameter}</p>
                              {getResultFlag(result.flag)}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Value</p>
                            <p className={`font-semibold ${result.flag && result.flag !== 'Normal' ? 'text-red-600' : 'text-green-600'}`}>
                              {result.value} {result.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Normal Range</p>
                            <p className="font-semibold">{result.normalRange}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Status</p>
                            <Badge className={result.flag === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {result.flag || 'Normal'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Notes */}
              {selectedTest.notes && (
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                  <Label className="text-gray-700 block mb-2">Clinical Notes</Label>
                  <p className="text-sm">{selectedTest.notes}</p>
                </div>
              )}

              {/* Report Summary */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Report Summary</Label>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={getStatusColor(selectedTest.status)}>{selectedTest.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <Badge className={getPriorityColor(selectedTest.priority)}>{selectedTest.priority}</Badge>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-600">Report finalized by:</span>
                    <span className="font-semibold">{selectedTest.technician || 'Lab Staff'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewReportOpen(false)}>
              Close
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enter Results Dialog */}
      <Dialog open={enterResultsOpen} onOpenChange={setEnterResultsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Enter Test Results - {selectedTest?.id}
            </DialogTitle>
            <DialogDescription>
              Enter laboratory test results for {selectedTest?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-4">
              {/* Test Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedTest.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Test Type</Label>
                    <p className="font-semibold">{selectedTest.testType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getPriorityColor(selectedTest.priority)}>{selectedTest.priority}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Sample Date</Label>
                    <p className="font-semibold">{selectedTest.sampleCollectionDate ? new Date(selectedTest.sampleCollectionDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="technician">Lab Technician *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Tech">Sarah Tech</SelectItem>
                      <SelectItem value="Mike Labs">Mike Labs</SelectItem>
                      <SelectItem value="Linda Lab">Linda Lab</SelectItem>
                      <SelectItem value="David Lee">David Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="resultDate">Result Date *</Label>
                  <Input id="resultDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              {/* Result Entry Fields */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Enter Test Parameters</Label>
                <p className="text-sm text-gray-600 mb-4">Add results for each parameter of the {selectedTest.testType}</p>
                
                <div className="space-y-3">
                  {/* Example parameter entries */}
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="grid grid-cols-4 gap-3 bg-gray-50 p-3 rounded-lg">
                      <div>
                        <Label className="text-xs">Parameter</Label>
                        <Input placeholder="e.g., WBC Count" className="h-9" />
                      </div>
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input placeholder="e.g., 7.5" className="h-9" />
                      </div>
                      <div>
                        <Label className="text-xs">Unit</Label>
                        <Input placeholder="e.g., K/uL" className="h-9" />
                      </div>
                      <div>
                        <Label className="text-xs">Normal Range</Label>
                        <Input placeholder="e.g., 4.5-11.0" className="h-9" />
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Parameters
                </Button>
              </div>

              {/* Clinical Notes */}
              <div>
                <Label htmlFor="resultNotes">Clinical Notes / Interpretation</Label>
                <Textarea id="resultNotes" placeholder="Enter any relevant notes or interpretation..." rows={4} />
              </div>

              {/* Quality Control */}
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Quality Control Checklist</p>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="calibration" className="rounded" />
                        <label htmlFor="calibration" className="text-xs text-green-700">Equipment calibration verified</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="sampleQuality" className="rounded" />
                        <label htmlFor="sampleQuality" className="text-xs text-green-700">Sample quality acceptable</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="qcResults" className="rounded" />
                        <label htmlFor="qcResults" className="text-xs text-green-700">QC results within acceptable range</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEnterResultsOpen(false)}>
              Save as Draft
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setEnterResultsOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Finalize Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Collect Sample Dialog */}
      <Dialog open={collectSampleOpen} onOpenChange={setCollectSampleOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Syringe className="w-5 h-5" />
              Collect Sample - {selectedTest?.id}
            </DialogTitle>
            <DialogDescription>
              Record sample collection for {selectedTest?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-4">
              {/* Test Info Card */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedTest.patientName} ({selectedTest.patientId})</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Test Type</Label>
                    <p className="font-semibold">{selectedTest.testType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getPriorityColor(selectedTest.priority)}>{selectedTest.priority}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="collectionDate">Collection Date *</Label>
                  <Input id="collectionDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <Label htmlFor="collectionTime">Collection Time *</Label>
                  <Input id="collectionTime" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
                </div>
                <div>
                  <Label htmlFor="collectedBy">Collected By *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Tech">Sarah Tech</SelectItem>
                      <SelectItem value="Mike Labs">Mike Labs</SelectItem>
                      <SelectItem value="Linda Lab">Linda Lab</SelectItem>
                      <SelectItem value="David Lee">David Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sampleType">Sample Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sample type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blood - Venous">Blood - Venous</SelectItem>
                      <SelectItem value="Blood - Capillary">Blood - Capillary</SelectItem>
                      <SelectItem value="Blood - Arterial">Blood - Arterial</SelectItem>
                      <SelectItem value="Urine">Urine</SelectItem>
                      <SelectItem value="Serum">Serum</SelectItem>
                      <SelectItem value="Plasma">Plasma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="containerType">Container Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select container" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EDTA Tube">EDTA Tube (Purple)</SelectItem>
                      <SelectItem value="Serum Tube">Serum Tube (Red)</SelectItem>
                      <SelectItem value="Heparin Tube">Heparin Tube (Green)</SelectItem>
                      <SelectItem value="Citrate Tube">Citrate Tube (Blue)</SelectItem>
                      <SelectItem value="Fluoride Tube">Fluoride Tube (Gray)</SelectItem>
                      <SelectItem value="Urine Container">Urine Container</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="volumeCollected">Volume Collected (mL) *</Label>
                  <Input id="volumeCollected" type="number" placeholder="5" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="collectionSite">Collection Site</Label>
                  <Input id="collectionSite" placeholder="e.g., Left antecubital fossa" />
                </div>
              </div>

              {/* Patient Verification Checklist */}
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Patient Verification & Safety</p>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="patientId" className="rounded" />
                        <label htmlFor="patientId" className="text-xs text-blue-700">Patient ID verified with wristband</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="fastingStatus" className="rounded" />
                        <label htmlFor="fastingStatus" className="text-xs text-blue-700">Fasting status confirmed (if required)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="labeledProperly" className="rounded" />
                        <label htmlFor="labeledProperly" className="text-xs text-blue-700">Sample labeled properly with patient details</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="noComplications" className="rounded" />
                        <label htmlFor="noComplications" className="text-xs text-blue-700">No complications during collection</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="collectionNotes">Collection Notes</Label>
                <Textarea id="collectionNotes" placeholder="Any special notes about the collection..." rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCollectSampleOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCollectSampleOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
