import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Stethoscope, BedDouble, Activity, TrendingUp, Phone, Mail } from 'lucide-react';
import { Badge } from './ui/badge';

interface Department {
  id: string;
  name: string;
  head: string;
  doctors: number;
  nurses: number;
  beds: number;
  occupiedBeds: number;
  patients: number;
  phone: string;
  email: string;
  location: string;
  equipment: string[];
  specialties: string[];
  performance: {
    patientSatisfaction: number;
    averageWaitTime: string;
    successRate: number;
  };
}

export function DepartmentManagement() {
  const departments: Department[] = [
    {
      id: 'DEPT001',
      name: 'Cardiology',
      head: 'Dr. Emily Chen',
      doctors: 8,
      nurses: 15,
      beds: 20,
      occupiedBeds: 16,
      patients: 45,
      phone: '+1 (555) 100-0001',
      email: 'cardiology@hospital.com',
      location: 'Building A, Floor 3',
      equipment: ['ECG Machine', 'Echocardiogram', 'Stress Test Equipment', 'Holter Monitor'],
      specialties: ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure Management'],
      performance: {
        patientSatisfaction: 94,
        averageWaitTime: '25 mins',
        successRate: 96,
      },
    },
    {
      id: 'DEPT002',
      name: 'Neurology',
      head: 'Dr. Michael Brown',
      doctors: 6,
      nurses: 12,
      beds: 15,
      occupiedBeds: 11,
      patients: 32,
      phone: '+1 (555) 100-0002',
      email: 'neurology@hospital.com',
      location: 'Building A, Floor 4',
      equipment: ['EEG Machine', 'EMG Equipment', 'MRI Scanner', 'CT Scanner'],
      specialties: ['Epilepsy', 'Stroke Care', 'Movement Disorders', 'Neuro-oncology'],
      performance: {
        patientSatisfaction: 92,
        averageWaitTime: '30 mins',
        successRate: 94,
      },
    },
    {
      id: 'DEPT003',
      name: 'Orthopedics',
      head: 'Dr. Lisa Anderson',
      doctors: 10,
      nurses: 18,
      beds: 25,
      occupiedBeds: 22,
      patients: 58,
      phone: '+1 (555) 100-0003',
      email: 'orthopedics@hospital.com',
      location: 'Building B, Floor 2',
      equipment: ['X-Ray Machine', 'Arthroscopy Equipment', 'Bone Densitometer', 'Physical Therapy Units'],
      specialties: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma Care'],
      performance: {
        patientSatisfaction: 95,
        averageWaitTime: '20 mins',
        successRate: 97,
      },
    },
    {
      id: 'DEPT004',
      name: 'Pediatrics',
      head: 'Dr. James Wilson',
      doctors: 12,
      nurses: 20,
      beds: 30,
      occupiedBeds: 18,
      patients: 67,
      phone: '+1 (555) 100-0004',
      email: 'pediatrics@hospital.com',
      location: 'Building C, Floor 1-2',
      equipment: ['Pediatric Ventilators', 'Incubators', 'Phototherapy Units', 'Pediatric Monitors'],
      specialties: ['Neonatology', 'Pediatric Cardiology', 'Pediatric Oncology', 'Adolescent Medicine'],
      performance: {
        patientSatisfaction: 96,
        averageWaitTime: '15 mins',
        successRate: 98,
      },
    },
    {
      id: 'DEPT005',
      name: 'Emergency',
      head: 'Dr. Amanda Roberts',
      doctors: 15,
      nurses: 25,
      beds: 20,
      occupiedBeds: 14,
      patients: 89,
      phone: '+1 (555) 100-0005',
      email: 'emergency@hospital.com',
      location: 'Building A, Ground Floor',
      equipment: ['Trauma Carts', 'Defibrillators', 'Ventilators', 'Ultrasound Machines'],
      specialties: ['Trauma Care', 'Critical Care', 'Emergency Medicine', 'Toxicology'],
      performance: {
        patientSatisfaction: 90,
        averageWaitTime: '10 mins',
        successRate: 95,
      },
    },
    {
      id: 'DEPT006',
      name: 'Surgery',
      head: 'Dr. Robert Kim',
      doctors: 14,
      nurses: 22,
      beds: 18,
      occupiedBeds: 15,
      patients: 41,
      phone: '+1 (555) 100-0006',
      email: 'surgery@hospital.com',
      location: 'Building B, Floor 3-4',
      equipment: ['Operating Tables', 'Surgical Lights', 'Anesthesia Machines', 'Laparoscopic Equipment'],
      specialties: ['General Surgery', 'Minimally Invasive Surgery', 'Colorectal Surgery', 'Bariatric Surgery'],
      performance: {
        patientSatisfaction: 93,
        averageWaitTime: '35 mins',
        successRate: 96,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Department Management</h2>
        <p className="text-gray-600">Overview of all hospital departments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{dept.name}</CardTitle>
                  <p className="text-gray-600 text-sm mt-1">Head: {dept.head}</p>
                  <p className="text-gray-500 text-xs mt-1">{dept.location}</p>
                </div>
                <Badge variant="outline">{dept.id}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Staff & Capacity */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-xs">Doctors</span>
                  </div>
                  <p className="text-blue-900">{dept.doctors}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Nurses</span>
                  </div>
                  <p className="text-green-900">{dept.nurses}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs">Patients</span>
                  </div>
                  <p className="text-purple-900">{dept.patients}</p>
                </div>
              </div>

              {/* Bed Capacity */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Bed Capacity</span>
                  </div>
                  <span className="text-sm">
                    {dept.occupiedBeds}/{dept.beds}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (dept.occupiedBeds / dept.beds) * 100 > 80
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${(dept.occupiedBeds / dept.beds) * 100}%` }}
                  />
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Satisfaction</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-sm">{dept.performance.patientSatisfaction}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg Wait</p>
                  <p className="text-sm">{dept.performance.averageWaitTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Success Rate</p>
                  <p className="text-sm">{dept.performance.successRate}%</p>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-3 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {dept.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {dept.email}
                </div>
              </div>

              {/* Specialties */}
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-600 mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {dept.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-600 mb-2">Key Equipment</p>
                <div className="grid grid-cols-2 gap-2">
                  {dept.equipment.map((item, idx) => (
                    <div key={idx} className="text-xs bg-gray-50 px-2 py-1 rounded">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
