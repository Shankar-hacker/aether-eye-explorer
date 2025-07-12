import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Building, 
  FileText, 
  Brain, 
  Users, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
  Scale,
  Globe
} from 'lucide-react';

const Government = () => {
  const [govAgents, setGovAgents] = useState([
    {
      id: 1,
      agent: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      type: 'Policy Analysis',
      task: 'Budget Allocation Review',
      department: 'Treasury Department',
      status: 'active',
      security: 'classified',
      timestamp: new Date().toISOString(),
      accuracy: 97.8,
      description: 'Analyzing government spending patterns and budget allocation efficiency'
    },
    {
      id: 2,
      agent: '0x8f5C3B7A9E2D4F6B1C8A5E7D9F2B4C6E8A1B3D5F',
      type: 'Regulatory Compliance',
      task: 'Environmental Impact Assessment',
      department: 'EPA',
      status: 'completed',
      security: 'public',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      accuracy: 94.3,
      description: 'Completed environmental impact analysis for infrastructure projects'
    },
    {
      id: 3,
      agent: '0x2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B',
      type: 'Public Service',
      task: 'Citizen Request Processing',
      department: 'DMV',
      status: 'processing',
      security: 'internal',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      accuracy: 91.7,
      description: 'Processing citizen service requests and automating response workflows'
    }
  ]);

  const [govStats] = useState({
    totalDepartments: 42,
    activeProjects: 156,
    avgCompliance: 96.2,
    citizensSserved: 12847
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'processing': return <Clock className="w-4 h-4 text-primary" />;
      case 'active': return <Activity className="w-4 h-4 text-accent" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'classified': return 'bg-destructive text-destructive-foreground';
      case 'internal': return 'bg-primary text-primary-foreground';
      case 'public': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'Policy Analysis': return <Scale className="w-4 h-4" />;
      case 'Regulatory Compliance': return <FileText className="w-4 h-4" />;
      case 'Public Service': return <Users className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const filteredAgents = govAgents.filter(agent => {
    const matchesSearch = agent.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center animate-glow-pulse">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Government AI Systems</h1>
              <p className="text-xl text-muted-foreground">Secure AI agents for public sector and civic technology</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Government Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Departments', value: govStats.totalDepartments, icon: Building, color: 'from-accent to-primary' },
            { label: 'Active Projects', value: govStats.activeProjects, icon: FileText, color: 'from-primary to-accent' },
            { label: 'Compliance Rate', value: `${govStats.avgCompliance}%`, icon: Shield, color: 'from-cyber-green to-accent' },
            { label: 'Citizens Served', value: govStats.citizensSserved.toLocaleString(), icon: Users, color: 'from-neural-orange to-accent' }
          ].map((stat, index) => (
            <Card key={index} className="blockchain-card p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="blockchain-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by task, agent type, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
                size="sm"
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === 'processing' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('processing')}
                size="sm"
              >
                Processing
              </Button>
            </div>
          </div>
        </Card>

        {/* Government Dashboard */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Government Agents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance & Security</TabsTrigger>
            <TabsTrigger value="public">Public Services</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="blockchain-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      {getAgentTypeIcon(agent.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground">{agent.task}</h4>
                        {getStatusIcon(agent.status)}
                        <Badge className={getSecurityColor(agent.security)}>
                          {agent.security}
                        </Badge>
                        <Badge variant="outline">{agent.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{agent.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Dept: {agent.department}</span>
                        <span>•</span>
                        <span>Accuracy: {agent.accuracy}%</span>
                        <span>•</span>
                        <span className="font-mono">{agent.agent}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    <div>{new Date(agent.timestamp).toLocaleTimeString()}</div>
                    <div>{new Date(agent.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Security Protocols
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Encryption</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      AES-256
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Access Control</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Multi-Factor
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Audit Trail</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Scale className="w-5 h-5 mr-2 text-primary" />
                  Regulatory Compliance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">FISMA Compliance</span>
                    <span className="text-sm font-semibold text-accent">100%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Privacy Standards</span>
                    <span className="text-sm font-semibold text-accent">98.7%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent to-cyber-green h-2 rounded-full" style={{width: '98.7%'}}></div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="public" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Service Efficiency</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">Automated processing rate</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Citizen Satisfaction</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.6★</div>
                  <div className="text-sm text-muted-foreground">Average service rating</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Cost Reduction</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">42%</div>
                  <div className="text-sm text-muted-foreground">Through AI automation</div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Government;