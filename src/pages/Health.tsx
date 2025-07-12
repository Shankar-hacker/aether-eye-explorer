import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Heart, 
  Brain, 
  Shield, 
  Search, 
  Filter, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Database
} from 'lucide-react';

const Health = () => {
  const [healthAgents, setHealthAgents] = useState([
    {
      id: 1,
      agent: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      type: 'Diagnostic AI',
      task: 'Radiology Analysis',
      patient: 'Patient-7823',
      status: 'completed',
      priority: 'high',
      timestamp: new Date().toISOString(),
      accuracy: 94.7,
      findings: 'Detected potential anomaly in chest X-ray requiring follow-up'
    },
    {
      id: 2,
      agent: '0x8f5C3B7A9E2D4F6B1C8A5E7D9F2B4C6E8A1B3D5F',
      type: 'Treatment AI',
      task: 'Drug Interaction Check',
      patient: 'Patient-9156',
      status: 'processing',
      priority: 'medium',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      accuracy: 98.2,
      findings: 'Analyzing potential interactions between prescribed medications'
    },
    {
      id: 3,
      agent: '0x2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B',
      type: 'Monitoring AI',
      task: 'Vital Signs Analysis',
      patient: 'Patient-3045',
      status: 'active',
      priority: 'low',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      accuracy: 99.1,
      findings: 'Continuous monitoring shows stable patient condition'
    }
  ]);

  const [stats] = useState({
    totalDiagnoses: 15847,
    activeMonitoring: 234,
    avgAccuracy: 96.8,
    criticalAlerts: 12
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredAgents = healthAgents.filter(agent => {
    const matchesSearch = agent.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-glow-pulse">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Healthcare AI Agents</h1>
              <p className="text-xl text-muted-foreground">Medical AI system monitoring and analysis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Diagnoses', value: stats.totalDiagnoses.toLocaleString(), icon: Brain, color: 'from-primary to-primary/80' },
            { label: 'Active Monitoring', value: stats.activeMonitoring, icon: Activity, color: 'from-accent to-accent/80' },
            { label: 'Avg Accuracy', value: `${stats.avgAccuracy}%`, icon: TrendingUp, color: 'from-cyber-green to-accent' },
            { label: 'Critical Alerts', value: stats.criticalAlerts, icon: AlertTriangle, color: 'from-destructive to-destructive/80' }
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
                  placeholder="Search by task, agent type, or patient ID..."
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
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                size="sm"
              >
                Active
              </Button>
            </div>
          </div>
        </Card>

        {/* Agents List */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Agent Activities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="blockchain-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground">{agent.task}</h4>
                        {getStatusIcon(agent.status)}
                        <Badge className={getPriorityColor(agent.priority)}>
                          {agent.priority}
                        </Badge>
                        <Badge variant="outline">{agent.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{agent.findings}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Patient: {agent.patient}</span>
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Diagnostic Accuracy</span>
                    <span className="text-sm font-semibold text-accent">96.8%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '96.8%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="text-sm font-semibold text-accent">1.2s avg</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </Card>

              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Security Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Encryption</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">HIPAA Compliance</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Health;