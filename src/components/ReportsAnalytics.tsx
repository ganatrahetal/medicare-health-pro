import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, TrendingUp, Download, Calendar, Users, DollarSign, Activity, BedDouble } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ReportsAnalytics() {
  // Revenue Data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 485000, expenses: 320000, profit: 165000 },
    { month: 'Feb', revenue: 512000, expenses: 335000, profit: 177000 },
    { month: 'Mar', revenue: 538000, expenses: 348000, profit: 190000 },
    { month: 'Apr', revenue: 495000, expenses: 328000, profit: 167000 },
    { month: 'May', revenue: 567000, expenses: 365000, profit: 202000 },
    { month: 'Jun', revenue: 589000, expenses: 378000, profit: 211000 },
    { month: 'Jul', revenue: 612000, expenses: 392000, profit: 220000 },
    { month: 'Aug', revenue: 598000, expenses: 385000, profit: 213000 },
    { month: 'Sep', revenue: 625000, expenses: 398000, profit: 227000 },
    { month: 'Oct', revenue: 648000, expenses: 410000, profit: 238000 },
    { month: 'Nov', revenue: 635000, expenses: 405000, profit: 230000 },
  ];

  // Patient Demographics
  const patientDemographics = [
    { ageGroup: '0-18', patients: 485 },
    { ageGroup: '19-35', patients: 756 },
    { ageGroup: '36-50', patients: 892 },
    { ageGroup: '51-65', patients: 1024 },
    { ageGroup: '65+', patients: 1342 },
  ];

  // Department Performance
  const departmentPerformance = [
    { department: 'Cardiology', patients: 1245, revenue: 285000, satisfaction: 94 },
    { department: 'Neurology', patients: 892, revenue: 198000, satisfaction: 92 },
    { department: 'Orthopedics', patients: 1534, revenue: 412000, satisfaction: 95 },
    { department: 'Pediatrics', patients: 2108, revenue: 256000, satisfaction: 96 },
    { department: 'Emergency', patients: 3245, revenue: 478000, satisfaction: 90 },
    { department: 'Surgery', patients: 678, revenue: 892000, satisfaction: 93 },
  ];

  // Bed Occupancy
  const bedOccupancy = [
    { date: 'Nov 01', occupancy: 78 },
    { date: 'Nov 03', occupancy: 82 },
    { date: 'Nov 05', occupancy: 85 },
    { date: 'Nov 07', occupancy: 79 },
    { date: 'Nov 09', occupancy: 88 },
    { date: 'Nov 11', occupancy: 91 },
    { date: 'Nov 13', occupancy: 86 },
  ];

  // Admission vs Discharge
  const admissionDischarge = [
    { month: 'May', admissions: 334, discharges: 320 },
    { month: 'Jun', admissions: 358, discharges: 342 },
    { month: 'Jul', admissions: 385, discharges: 368 },
    { month: 'Aug', admissions: 372, discharges: 359 },
    { month: 'Sep', admissions: 396, discharges: 378 },
    { month: 'Oct', admissions: 412, discharges: 398 },
    { month: 'Nov', admissions: 428, discharges: 415 },
  ];

  // Insurance Claims
  const insuranceData = [
    { provider: 'Blue Cross', claims: 245, approved: 234, amount: 1250000 },
    { provider: 'United Healthcare', claims: 198, approved: 189, amount: 980000 },
    { provider: 'Aetna', claims: 156, approved: 148, amount: 756000 },
    { provider: 'Cigna', claims: 134, approved: 125, amount: 645000 },
    { provider: 'Medicare', claims: 312, approved: 298, amount: 1568000 },
    { provider: 'Medicaid', claims: 289, approved: 278, amount: 1234000 },
  ];

  // Staff Productivity
  const staffProductivity = [
    { role: 'Doctors', count: 142, patientsPerDay: 18 },
    { role: 'Nurses', count: 385, patientsPerDay: 8 },
    { role: 'Technicians', count: 98, tasksPerDay: 25 },
    { role: 'Pharmacists', count: 32, prescriptionsPerDay: 45 },
    { role: 'Lab Techs', count: 45, testsPerDay: 35 },
  ];

  // Surgery Statistics
  const surgeryData = [
    { type: 'Elective', count: 245, avgDuration: 180, successRate: 97 },
    { type: 'Emergency', count: 89, avgDuration: 120, successRate: 95 },
    { type: 'Urgent', count: 134, avgDuration: 150, successRate: 96 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            Reports & Analytics
          </h2>
          <p className="text-gray-600">Comprehensive hospital performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Monthly Revenue</p>
                <p className="mt-2">$635,000</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">+8.2%</span>
                </div>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Patients</p>
                <p className="mt-2">4,499</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">+12.5%</span>
                </div>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bed Occupancy</p>
                <p className="mt-2">86%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-600 text-sm">+3.1%</span>
                </div>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <BedDouble className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Satisfaction</p>
                <p className="mt-2">93.5%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">+2.3%</span>
                </div>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Profit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Revenue" />
                <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#10b981" name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientDemographics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#8b5cf6" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-gray-600">Department</th>
                  <th className="text-right p-3 text-sm text-gray-600">Patients</th>
                  <th className="text-right p-3 text-sm text-gray-600">Revenue</th>
                  <th className="text-right p-3 text-sm text-gray-600">Satisfaction</th>
                  <th className="text-right p-3 text-sm text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((dept, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{dept.department}</td>
                    <td className="p-3 text-right">{dept.patients.toLocaleString()}</td>
                    <td className="p-3 text-right">${(dept.revenue / 1000).toFixed(0)}K</td>
                    <td className="p-3 text-right">{dept.satisfaction}%</td>
                    <td className="p-3 text-right">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${dept.satisfaction}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bed Occupancy and Admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bed Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bedOccupancy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="occupancy" stroke="#f59e0b" strokeWidth={2} name="Occupancy %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admissions vs Discharges</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={admissionDischarge}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="admissions" fill="#3b82f6" name="Admissions" />
                <Bar dataKey="discharges" fill="#10b981" name="Discharges" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Claims */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Claims by Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insuranceData.map((provider, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="mb-3">{provider.provider}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Claims:</span>
                    <span>{provider.claims}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved:</span>
                    <span className="text-green-600">{provider.approved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approval Rate:</span>
                    <span>{((provider.approved / provider.claims) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-blue-600">${(provider.amount / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Productivity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Staff Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={staffProductivity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, percent }) => `${role} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {staffProductivity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Surgery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surgeryData.map((surgery, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4>{surgery.type}</h4>
                    <span className="text-blue-600">{surgery.count} surgeries</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Avg Duration</p>
                      <p>{surgery.avgDuration} mins</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Success Rate</p>
                      <p className="text-green-600">{surgery.successRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Financial Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Patient Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Staff Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Operational Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Quality Metrics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Insurance Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Equipment Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Custom Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
