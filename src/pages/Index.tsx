import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Brain, Shield, Zap, TrendingUp, Users, Database, Network } from 'lucide-react';

const Index = () => {
  const [agentActivities, setAgentActivities] = useState([
    {
      id: 1,
      agent: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      action: 'Financial Analysis',
      summary: 'Analyzed market trends for DeFi protocols',
      timestamp: new Date().toISOString(),
      platform: 'Finance',
      status: 'completed'
    },
    {
      id: 2,
      agent: '0x8f5C3B7A9E2D4F6B1C8A5E7D9F2B4C6E8A1B3D5F',
      action: 'Health Data Processing',
      summary: 'Processed patient records for anomaly detection',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      platform: 'Health',
      status: 'processing'
    },
    {
      id: 3,
      agent: '0x2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B',
      action: 'Government Data Analysis',
      summary: 'Analyzed public spending patterns',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      platform: 'Government',
      status: 'completed'
    }
  ]);

  const [stats] = useState({
    totalAgents: 1247,
    activeSessions: 89,
    dataProcessed: '2.4TB',
    blockchainTxs: 15678
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent text-accent-foreground';
      case 'processing': return 'bg-primary text-primary-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Finance': return <TrendingUp className="w-4 h-4" />;
      case 'Health': return <Activity className="w-4 h-4" />;
      case 'Government': return <Shield className="w-4 h-4" />;
      case 'Personal': return <Users className="w-4 h-4" />;
      case 'B2B': return <Network className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-glow-pulse">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">AetherScope</h1>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              AI Agent Intelligence
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Monitor, analyze, and understand AI agent behavior across decentralized networks. 
              Built on Ethereum blockchain for transparent and verifiable AI operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="cyber-button">
                <Zap className="w-5 h-5 mr-2" />
                <span>Explore Dashboard</span>
              </Button>
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Database className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Active Agents', value: stats.totalAgents.toLocaleString(), icon: Brain },
            { label: 'Live Sessions', value: stats.activeSessions, icon: Activity },
            { label: 'Data Processed', value: stats.dataProcessed, icon: Database },
            { label: 'Blockchain Txs', value: stats.blockchainTxs.toLocaleString(), icon: Network }
          ].map((stat, index) => (
            <Card key={index} className="blockchain-card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Recent Agent Activities</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {agentActivities.map((activity) => (
              <Card key={activity.id} className="blockchain-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      {getPlatformIcon(activity.platform)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground">{activity.action}</h4>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                        <Badge variant="outline">{activity.platform}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.summary}</p>
                      <div className="text-xs font-mono text-muted-foreground">
                        Agent: {activity.agent}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Explore AI Agent Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Healthcare', icon: Activity, description: 'Medical AI agents and health data analysis', route: '/health' },
              { name: 'Finance', icon: TrendingUp, description: 'Financial AI and trading algorithms', route: '/finance' },
              { name: 'Personal', icon: Users, description: 'Personal AI assistants and productivity', route: '/personal' },
              { name: 'B2B Solutions', icon: Network, description: 'Enterprise AI and business automation', route: '/b2b' },
              { name: 'Government', icon: Shield, description: 'Public sector AI and civic technology', route: '/government' },
              { name: 'Research', icon: Brain, description: 'AI research and experimental agents', route: '/research' }
            ].map((platform, index) => (
              <Card key={index} className="blockchain-card p-6 cursor-pointer group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:animate-pulse-ring">
                    <platform.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{platform.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{platform.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore Platform
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
