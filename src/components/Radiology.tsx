import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Plus, Scan, Download, Eye, Play, FileText, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface ImagingStudy {
  id: string;
  patientName: string;
  patientId: string;
  studyType: 'X-Ray' | 'CT Scan' | 'MRI' | 'Ultrasound' | 'Mammogram' | 'PET Scan' | 'Fluoroscopy';
  bodyPart: string;
  orderDate: string;
  scheduledDate?: string;
  completedDate?: string;
  status: 'Ordered' | 'Scheduled' | 'In Progress' | 'Completed' | 'Report Pending' | 'Finalized';
  priority: 'Routine' | 'Urgent' | 'STAT';
  orderedBy: string;
  technician?: string;
  radiologist?: string;
  findings?: string;
  impression?: string;
  modalityRoom: string;
  contrastUsed: boolean;
  images?: number;
}

export function Radiology() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<ImagingStudy | null>(null);
  
  // Dialog states
  const [orderStudyOpen, setOrderStudyOpen] = useState(false);
  const [viewImagesOpen, setViewImagesOpen] = useState(false);
  const [downloadReportOpen, setDownloadReportOpen] = useState(false);
  const [startStudyOpen, setStartStudyOpen] = useState(false);
  const [addReportOpen, setAddReportOpen] = useState(false);

  const studies: ImagingStudy[] = [
    {
      id: 'RAD-2024-001',
      patientName: 'John Smith',
      patientId: 'P001',
      studyType: 'CT Scan',
      bodyPart: 'Chest',
      orderDate: '2024-11-12',
      scheduledDate: '2024-11-13',
      completedDate: '2024-11-13',
      status: 'Finalized',
      priority: 'Routine',
      orderedBy: 'Dr. Emily Chen',
      technician: 'Amanda Brown',
      radiologist: 'Dr. Patricia Moore',
      findings: 'No acute cardiopulmonary abnormality. Heart size normal. Lungs clear. No pleural effusion or pneumothorax.',
      impression: 'Normal chest CT. No acute findings.',
      modalityRoom: 'CT-1',
      contrastUsed: true,
      images: 245,
    },
    {
      id: 'RAD-2024-002',
      patientName: 'Maria Garcia',
      patientId: 'P004',
      studyType: 'X-Ray',
      bodyPart: 'Chest',
      orderDate: '2024-11-13',
      scheduledDate: '2024-11-13',
      completedDate: '2024-11-13',
      status: 'Report Pending',
      priority: 'Urgent',
      orderedBy: 'Dr. James Wilson',
      technician: 'Robert Johnson',
      modalityRoom: 'X-RAY-2',
      contrastUsed: false,
      images: 2,
    },
    {
      id: 'RAD-2024-003',
      patientName: 'Thomas Anderson',
      patientId: 'P007',
      studyType: 'CT Scan',
      bodyPart: 'Head, C-Spine, Chest, Abdomen, Pelvis',
      orderDate: '2024-11-13',
      scheduledDate: '2024-11-13',
      status: 'In Progress',
      priority: 'STAT',
      orderedBy: 'Dr. Amanda Roberts',
      technician: 'Amanda Brown',
      modalityRoom: 'CT-1',
      contrastUsed: true,
      images: 0,
    },
    {
      id: 'RAD-2024-004',
      patientName: 'Linda Washington',
      patientId: 'P008',
      studyType: 'Ultrasound',
      bodyPart: 'Abdomen',
      orderDate: '2024-11-13',
      scheduledDate: '2024-11-13',
      status: 'Scheduled',
      priority: 'Routine',
      orderedBy: 'Dr. Michael Brown',
      modalityRoom: 'US-1',
      contrastUsed: false,
    },
    {
      id: 'RAD-2024-005',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      studyType: 'X-Ray',
      bodyPart: 'Left Hip',
      orderDate: '2024-11-08',
      scheduledDate: '2024-11-08',
      completedDate: '2024-11-08',
      status: 'Finalized',
      priority: 'Routine',
      orderedBy: 'Dr. Lisa Anderson',
      technician: 'Robert Johnson',
      radiologist: 'Dr. Patricia Moore',
      findings: 'Severe degenerative changes of left hip joint with joint space narrowing, subchondral sclerosis, and osteophyte formation.',
      impression: 'Severe osteoarthritis of left hip. Surgical intervention recommended.',
      modalityRoom: 'X-RAY-1',
      contrastUsed: false,
      images: 3,
    },
    {
      id: 'RAD-2024-006',
      patientName: 'Sarah Williams',
      patientId: 'P002',
      studyType: 'MRI',
      bodyPart: 'Brain',
      orderDate: '2024-11-12',
      scheduledDate: '2024-11-14',
      status: 'Scheduled',
      priority: 'Urgent',
      orderedBy: 'Dr. Michael Brown',
      modalityRoom: 'MRI-1',
      contrastUsed: true,
    },
  ];

  const filteredStudies = studies.filter(study =>
    study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.studyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors = {
      'Ordered': 'bg-gray-100 text-gray-700',
      'Scheduled': 'bg-blue-100 text-blue-700',
      'In Progress': 'bg-purple-100 text-purple-700',
      'Completed': 'bg-green-100 text-green-700',
      'Report Pending': 'bg-yellow-100 text-yellow-700',
      'Finalized': 'bg-green-100 text-green-700',
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Routine': 'bg-blue-100 text-blue-700',
      'Urgent': 'bg-orange-100 text-orange-700',
      'STAT': 'bg-red-100 text-red-700',
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Scan className="w-7 h-7 text-blue-600" />
            Radiology & Imaging
          </h2>
          <p className="text-gray-600">Manage imaging studies and reports</p>
        </div>
        <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700" onClick={() => setOrderStudyOpen(true)}>
          <Plus className="w-4 h-4" />
          Order Study
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Ordered', 'Scheduled', 'In Progress', 'Finalized'].map((status, idx) => {
          const count = studies.filter(s => s.status === status).length;
          const colors = ['bg-gray-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50'];
          const iconColors = ['text-gray-600', 'text-blue-600', 'text-purple-600', 'text-green-600'];
          
          return (
            <Card key={status}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{status}</p>
                    <p className="mt-2">{count}</p>
                  </div>
                  <div className={`${colors[idx]} ${iconColors[idx]} p-3 rounded-lg`}>
                    <Scan className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search by patient name, ID, or study type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredStudies.map((study) => (
          <Card key={study.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{study.patientName}</h3>
                    <Badge variant="outline">{study.patientId}</Badge>
                    <Badge className={getStatusColor(study.status)}>{study.status}</Badge>
                    <Badge className={getPriorityColor(study.priority)}>{study.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Study ID: {study.id}</p>
                  <p className="text-sm">
                    <span className="text-gray-600">Type:</span> {study.studyType} - {study.bodyPart}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-lg text-sm">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Ordered By</p>
                  <p>{study.orderedBy}</p>
                </div>
                {study.technician && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Technician</p>
                    <p>{study.technician}</p>
                  </div>
                )}
                {study.radiologist && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Radiologist</p>
                    <p>{study.radiologist}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Room</p>
                  <p>{study.modalityRoom}</p>
                </div>
                {study.images !== undefined && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Images</p>
                    <p>{study.images}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Contrast</p>
                  <p>{study.contrastUsed ? 'Yes' : 'No'}</p>
                </div>
              </div>

              {study.findings && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Findings</p>
                  <p className="text-sm bg-blue-50 p-3 rounded">{study.findings}</p>
                </div>
              )}

              {study.impression && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Impression</p>
                  <p className="text-sm bg-green-50 p-3 rounded">{study.impression}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {study.status === 'Scheduled' && (
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => { setSelectedStudy(study); setStartStudyOpen(true); }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Study
                  </Button>
                )}
                {study.status === 'Report Pending' && (
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => { setSelectedStudy(study); setAddReportOpen(true); }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Add Report
                  </Button>
                )}
                {(study.status === 'Completed' || study.status === 'Finalized') && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => { setSelectedStudy(study); setViewImagesOpen(true); }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Images
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => { setSelectedStudy(study); setDownloadReportOpen(true); }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Study Dialog */}
      <Dialog open={orderStudyOpen} onOpenChange={setOrderStudyOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Order Imaging Study
            </DialogTitle>
            <DialogDescription>
              Create a new radiology imaging order
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
              <Label htmlFor="studyType">Study Type *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select study type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="CT Scan">CT Scan</SelectItem>
                  <SelectItem value="MRI">MRI</SelectItem>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  <SelectItem value="Mammogram">Mammogram</SelectItem>
                  <SelectItem value="PET Scan">PET Scan</SelectItem>
                  <SelectItem value="Fluoroscopy">Fluoroscopy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bodyPart">Body Part / Region *</Label>
              <Input id="bodyPart" placeholder="e.g., Chest, Abdomen, Brain" />
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
              <Label htmlFor="scheduledDate">Scheduled Date *</Label>
              <Input id="scheduledDate" type="datetime-local" />
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
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contrastUsed">Contrast Required *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="clinicalIndication">Clinical Indication *</Label>
              <Textarea id="clinicalIndication" placeholder="Enter clinical reason for the study..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderStudyOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setOrderStudyOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Order Study
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Images Dialog */}
      <Dialog open={viewImagesOpen} onOpenChange={setViewImagesOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              View Images - {selectedStudy?.id}
            </DialogTitle>
            <DialogDescription>
              {selectedStudy?.studyType} - {selectedStudy?.bodyPart} for {selectedStudy?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedStudy && (
            <div className="space-y-4">
              {/* Study Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedStudy.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Study Type</Label>
                    <p className="font-semibold">{selectedStudy.studyType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Images</Label>
                    <p className="font-semibold">{selectedStudy.images} images</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Completed</Label>
                    <p className="font-semibold">{selectedStudy.completedDate ? new Date(selectedStudy.completedDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Image Viewer Placeholder */}
              <div className="bg-gray-900 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <ImageIcon className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-lg mb-2">DICOM Image Viewer</p>
                  <p className="text-sm">Total Images: {selectedStudy.images}</p>
                  <p className="text-xs mt-2">Use mouse wheel to scroll through images</p>
                </div>
              </div>

              {/* Image Controls */}
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Play/Pause</Button>
                <Button variant="outline" size="sm">Next</Button>
                <Button variant="outline" size="sm">Full Screen</Button>
              </div>

              {/* Viewing Tools */}
              <div className="border rounded-lg p-3">
                <Label className="text-sm mb-2 block">Viewing Tools</Label>
                <div className="grid grid-cols-5 gap-2">
                  <Button variant="outline" size="sm">Zoom</Button>
                  <Button variant="outline" size="sm">Pan</Button>
                  <Button variant="outline" size="sm">Brightness</Button>
                  <Button variant="outline" size="sm">Contrast</Button>
                  <Button variant="outline" size="sm">Measure</Button>
                </div>
              </div>

              {/* Report Summary */}
              {selectedStudy.findings && (
                <div className="border rounded-lg p-4">
                  <Label className="text-gray-700 mb-2 block">Report Summary</Label>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Findings:</p>
                      <p className="bg-blue-50 p-2 rounded mt-1">{selectedStudy.findings}</p>
                    </div>
                    {selectedStudy.impression && (
                      <div>
                        <p className="text-gray-600">Impression:</p>
                        <p className="bg-green-50 p-2 rounded mt-1">{selectedStudy.impression}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewImagesOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Images
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Report Dialog */}
      <Dialog open={downloadReportOpen} onOpenChange={setDownloadReportOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Report - {selectedStudy?.id}
            </DialogTitle>
            <DialogDescription>
              Download radiology report for {selectedStudy?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedStudy && (
            <div className="space-y-4">
              {/* Study Summary */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient Name</Label>
                    <p className="font-semibold">{selectedStudy.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Patient ID</Label>
                    <p className="font-semibold">{selectedStudy.patientId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Study Type</Label>
                    <p className="font-semibold">{selectedStudy.studyType} - {selectedStudy.bodyPart}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Study ID</Label>
                    <p className="font-semibold">{selectedStudy.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Completed Date</Label>
                    <p className="font-semibold">{selectedStudy.completedDate ? new Date(selectedStudy.completedDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Radiologist</Label>
                    <p className="font-semibold">{selectedStudy.radiologist || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="border rounded-lg p-4 max-h-[300px] overflow-y-auto">
                <Label className="text-gray-700 mb-3 block">Full Radiology Report</Label>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Clinical Indication:</p>
                    <p className="text-gray-600 mt-1">Ordered by {selectedStudy.orderedBy}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Technique:</p>
                    <p className="text-gray-600 mt-1">
                      {selectedStudy.studyType} of {selectedStudy.bodyPart}
                      {selectedStudy.contrastUsed && ' with intravenous contrast'}
                    </p>
                  </div>
                  {selectedStudy.findings && (
                    <div>
                      <p className="font-semibold text-gray-700">Findings:</p>
                      <p className="text-gray-600 mt-1 bg-blue-50 p-3 rounded">{selectedStudy.findings}</p>
                    </div>
                  )}
                  {selectedStudy.impression && (
                    <div>
                      <p className="font-semibold text-gray-700">Impression:</p>
                      <p className="text-gray-600 mt-1 bg-green-50 p-3 rounded">{selectedStudy.impression}</p>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500">
                      Electronically signed by {selectedStudy.radiologist || 'Radiologist'} on {selectedStudy.completedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="border rounded-lg p-4">
                <Label className="text-gray-700 mb-3 block">Download Options</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="format">File Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="docx">Word Document</SelectItem>
                        <SelectItem value="txt">Text File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="includeImages">Include Images</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes - Include Images</SelectItem>
                        <SelectItem value="false">No - Report Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDownloadReportOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setDownloadReportOpen(false)}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Start Study Dialog */}
      <Dialog open={startStudyOpen} onOpenChange={setStartStudyOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Study - {selectedStudy?.id}
            </DialogTitle>
            <DialogDescription>
              Begin imaging procedure for {selectedStudy?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedStudy && (
            <div className="space-y-4">
              {/* Patient & Study Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedStudy.patientName} ({selectedStudy.patientId})</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Study Type</Label>
                    <p className="font-semibold">{selectedStudy.studyType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Body Part</Label>
                    <p className="font-semibold">{selectedStudy.bodyPart}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={getPriorityColor(selectedStudy.priority)}>{selectedStudy.priority}</Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Contrast</Label>
                    <p className="font-semibold">{selectedStudy.contrastUsed ? 'Required' : 'Not Required'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Room</Label>
                    <p className="font-semibold">{selectedStudy.modalityRoom}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="technician">Technician *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Amanda Brown">Amanda Brown</SelectItem>
                      <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                      <SelectItem value="Sarah Martinez">Sarah Martinez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input id="startTime" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
                </div>
                {selectedStudy.contrastUsed && (
                  <>
                    <div>
                      <Label htmlFor="contrastType">Contrast Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contrast" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Iodinated">Iodinated Contrast</SelectItem>
                          <SelectItem value="Gadolinium">Gadolinium</SelectItem>
                          <SelectItem value="Barium">Barium Sulfate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contrastVolume">Contrast Volume (mL) *</Label>
                      <Input id="contrastVolume" type="number" placeholder="100" />
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <Label htmlFor="patientPrep">Patient Preparation Checklist</Label>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="consent" className="rounded" />
                      <label htmlFor="consent" className="text-sm">Patient consent obtained</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="allergies" className="rounded" />
                      <label htmlFor="allergies" className="text-sm">Allergy screening completed</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="pregnancy" className="rounded" />
                      <label htmlFor="pregnancy" className="text-sm">Pregnancy screening (if applicable)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="metalScreening" className="rounded" />
                      <label htmlFor="metalScreening" className="text-sm">Metal screening (for MRI)</label>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="startNotes">Study Notes</Label>
                  <Textarea id="startNotes" placeholder="Any special instructions or notes..." rows={3} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setStartStudyOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setStartStudyOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Start Procedure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Report Dialog */}
      <Dialog open={addReportOpen} onOpenChange={setAddReportOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Add Radiology Report - {selectedStudy?.id}
            </DialogTitle>
            <DialogDescription>
              Create radiology report for {selectedStudy?.patientName}
            </DialogDescription>
          </DialogHeader>

          {selectedStudy && (
            <div className="space-y-4">
              {/* Study Info */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-100">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Patient</Label>
                    <p className="font-semibold">{selectedStudy.patientName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Study Type</Label>
                    <p className="font-semibold">{selectedStudy.studyType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Body Part</Label>
                    <p className="font-semibold">{selectedStudy.bodyPart}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Images</Label>
                    <p className="font-semibold">{selectedStudy.images} images</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="radiologist">Reporting Radiologist *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select radiologist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Patricia Moore">Dr. Patricia Moore</SelectItem>
                      <SelectItem value="Dr. Richard Chen">Dr. Richard Chen</SelectItem>
                      <SelectItem value="Dr. Susan Taylor">Dr. Susan Taylor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reportDate">Report Date *</Label>
                  <Input id="reportDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="clinicalHistory">Clinical History</Label>
                  <Textarea id="clinicalHistory" placeholder="Enter clinical history and indication..." rows={2} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="technique">Technique *</Label>
                  <Textarea id="technique" placeholder="Describe imaging technique used..." rows={2} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="findings">Findings *</Label>
                  <Textarea id="findings" placeholder="Detailed description of imaging findings..." rows={5} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="impression">Impression / Conclusion *</Label>
                  <Textarea id="impression" placeholder="Summary and clinical impression..." rows={3} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea id="recommendations" placeholder="Any follow-up recommendations..." rows={2} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddReportOpen(false)}>
              Save as Draft
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAddReportOpen(false)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Finalize Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
