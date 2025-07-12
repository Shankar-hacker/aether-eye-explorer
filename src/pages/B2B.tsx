import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  Building, 
  Users, 
  Brain, 
  Shield, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Activity,
  TrendingUp,
  Database
} from 'lucide-react';

const B2B = () => {
  const [b2bAgents, setB2bAgents] = useState([
    {
      id: 1,
      agent: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      type: 'Sales Automation',
      task: 'Lead Qualification',
      company: 'TechCorp Inc.',
      status: 'active',
      priority: 'high',
      timestamp: new Date().toISOString(),
      efficiency: 96.4,
      description: 'Qualifying leads and automating follow-up sequences for enterprise clients'
    },
    {
      id: 2,
      agent: '0x8f5C3B7A9E2D4F6B1C8A5E7D9F2B4C6E8A1B3D5F',
      type: 'Customer Support',
      task: 'Ticket Resolution',
      company: 'DataFlow Ltd.',
      status: 'completed',
      priority: 'medium',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      efficiency: 89.7,
      description: 'Resolved customer support tickets with automated responses and escalation'
    },
    {
      id: 3,
      agent: '0x2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B',
      type: 'Market Analysis',
      task: 'Competitor Research',
      company: 'InnovateCorp',
      status: 'processing',
      priority: 'low',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      efficiency: 94.2,
      description: 'Analyzing competitor strategies and market positioning across industry verticals'
    }
  ]);

  const [businessStats] = useState({
    totalClients: 89,
    activeProcesses: 234,
    avgEfficiency: 93.4,
    costSavings: '$2.4M'
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

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'Sales Automation': return <TrendingUp className="w-4 h-4" />;
      case 'Customer Support': return <Users className="w-4 h-4" />;
      case 'Market Analysis': return <BarChart3 className="w-4 h-4" />;
      default: return <Network className="w-4 h-4" />;
    }
  };

  const filteredAgents = b2bAgents.filter(agent => {
    const matchesSearch = agent.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-neural-orange/10 via-primary/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neural-orange to-primary flex items-center justify-center animate-glow-pulse">
              <Network className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">B2B AI Solutions</h1>
              <p className="text-xl text-muted-foreground">Enterprise AI agents for business automation and growth</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Clients', value: businessStats.totalClients, icon: Building, color: 'from-neural-orange to-primary' },
            { label: 'Active Processes', value: businessStats.activeProcesses, icon: Zap, color: 'from-primary to-accent' },
            { label: 'Avg Efficiency', value: `${businessStats.avgEfficiency}%`, icon: Activity, color: 'from-accent to-cyber-green' },
            { label: 'Cost Savings', value: businessStats.costSavings, icon: TrendingUp, color: 'from-cyber-green to-accent' }
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
                  placeholder="Search by task, agent type, or company..."
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

        {/* Enterprise Dashboard */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Enterprise Agents</TabsTrigger>
            <TabsTrigger value="automation">Process Automation</TabsTrigger>
            <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="blockchain-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-neural-orange/20 flex items-center justify-center">
                      {getAgentTypeIcon(agent.type)}
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
                      <p className="text-sm text-muted-foreground mb-2">{agent.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Client: {agent.company}</span>
                        <span>•</span>
                        <span>Efficiency: {agent.efficiency}%</span>
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

          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Automated Processes
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                    <span className="text-sm">Lead qualification</span>
                    <Badge className="bg-accent text-accent-foreground">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm">Invoice processing</span>
                    <Badge className="bg-primary text-primary-foreground">Scheduled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm">Report generation</span>
                    <Badge className="bg-accent text-accent-foreground">Active</Badge>
                  </div>
                </div>
              </Card>

              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Client Satisfaction
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="text-sm font-semibold text-accent">1.2min avg</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolution Rate</span>
                    <span className="text-sm font-semibold text-accent">87%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent to-cyber-green h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Revenue Impact</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">+34%</div>
                  <div className="text-sm text-muted-foreground">Through AI automation</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Process Efficiency</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">93.4%</div>
                  <div className="text-sm text-muted-foreground">Overall automation rate</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Time Savings</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">156h</div>
                  <div className="text-sm text-muted-foreground">Weekly hours saved</div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default B2B;