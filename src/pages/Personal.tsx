import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Brain, 
  Shield, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Activity
} from 'lucide-react';

const Personal = () => {
  const [personalAgents, setPersonalAgents] = useState([
    {
      id: 1,
      agent: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      type: 'Virtual Assistant',
      task: 'Schedule Management',
      user: 'User-7823',
      status: 'active',
      priority: 'high',
      timestamp: new Date().toISOString(),
      efficiency: 94.7,
      description: 'Managing calendar events and sending meeting reminders'
    },
    {
      id: 2,
      agent: '0x8f5C3B7A9E2D4F6B1C8A5E7D9F2B4C6E8A1B3D5F',
      type: 'Content Creator',
      task: 'Social Media Posts',
      user: 'User-9156',
      status: 'completed',
      priority: 'medium',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      efficiency: 88.2,
      description: 'Created and scheduled social media content across platforms'
    },
    {
      id: 3,
      agent: '0x2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B',
      type: 'Learning Assistant',
      task: 'Study Plan Creation',
      user: 'User-3045',
      status: 'processing',
      priority: 'low',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      efficiency: 92.1,
      description: 'Analyzing learning patterns and creating personalized study schedule'
    }
  ]);

  const [stats] = useState({
    totalTasks: 2847,
    activeAssistants: 12,
    avgEfficiency: 91.7,
    userSatisfaction: 4.8
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
      case 'Virtual Assistant': return <Calendar className="w-4 h-4" />;
      case 'Content Creator': return <MessageSquare className="w-4 h-4" />;
      case 'Learning Assistant': return <Brain className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredAgents = personalAgents.filter(agent => {
    const matchesSearch = agent.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-primary/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyber-purple to-primary flex items-center justify-center animate-glow-pulse">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Personal AI Agents</h1>
              <p className="text-xl text-muted-foreground">Your personalized AI assistants and productivity tools</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tasks', value: stats.totalTasks.toLocaleString(), icon: Zap, color: 'from-cyber-purple to-primary' },
            { label: 'Active Assistants', value: stats.activeAssistants, icon: Users, color: 'from-primary to-accent' },
            { label: 'Avg Efficiency', value: `${stats.avgEfficiency}%`, icon: Activity, color: 'from-accent to-cyber-green' },
            { label: 'User Rating', value: `${stats.userSatisfaction}★`, icon: Star, color: 'from-neural-orange to-accent' }
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
                  placeholder="Search by task, agent type, or user..."
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

        {/* Personal Assistant Dashboard */}
        <Tabs defaultValue="assistants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assistants">AI Assistants</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="insights">Personal Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="assistants" className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="blockchain-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-cyber-purple/20 flex items-center justify-center">
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
                        <span>User: {agent.user}</span>
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

          <TabsContent value="productivity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Daily Schedule
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm">Morning workout</span>
                    <span className="text-xs text-muted-foreground">07:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm">Team meeting</span>
                    <span className="text-xs text-muted-foreground">09:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm">Project review</span>
                    <span className="text-xs text-muted-foreground">02:00 PM</span>
                  </div>
                </div>
              </Card>

              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Task Automation
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Email sorting</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bill reminders</span>
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Social posts</span>
                    <Badge className="bg-primary text-primary-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      Scheduled
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Weekly Productivity</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">+12% from last week</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Tasks Completed</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">142</div>
                  <div className="text-sm text-muted-foreground">This week</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Time Saved</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">8.4h</div>
                  <div className="text-sm text-muted-foreground">Through automation</div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Personal;