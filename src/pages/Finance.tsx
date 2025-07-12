import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Brain, 
  Shield, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Finance = () => {
  const [financialAgents, setFinancialAgents] = useState([
    {
      id: 1,
      agent: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      type: 'Trading Bot',
      strategy: 'DeFi Arbitrage',
      portfolio: 'Portfolio-Alpha',
      status: 'active',
      performance: '+12.4%',
      risk: 'medium',
      timestamp: new Date().toISOString(),
      tvl: '$2.4M',
      trades: 1247,
      analysis: 'Executing arbitrage opportunities across Uniswap and SushiSwap'
    },
    {
      id: 2,
      agent: '0x8f5C3B7A9E2D4F6B1C8A5E7D9F2B4C6E8A1B3D5F',
      type: 'Risk Assessment',
      strategy: 'Portfolio Analysis',
      portfolio: 'Portfolio-Beta',
      status: 'completed',
      performance: '+8.7%',
      risk: 'low',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      tvl: '$890K',
      trades: 543,
      analysis: 'Comprehensive risk assessment completed with recommendations'
    },
    {
      id: 3,
      agent: '0x2A4B6C8D0E2F4A6B8C0D2E4F6A8B0C2D4E6F8A0B',
      type: 'Market Predictor',
      strategy: 'Sentiment Analysis',
      portfolio: 'Portfolio-Gamma',
      status: 'processing',
      performance: '+5.2%',
      risk: 'high',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      tvl: '$3.8M',
      trades: 2156,
      analysis: 'Analyzing social sentiment and market trends for prediction models'
    }
  ]);

  const [marketData] = useState({
    totalTVL: '$7.09M',
    activeTrades: 3946,
    avgReturn: '+8.8%',
    riskAlerts: 3
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4 text-accent" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'processing': return <Clock className="w-4 h-4 text-primary" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    return performance.startsWith('+') ? 
      <TrendingUp className="w-4 h-4 text-accent" /> : 
      <TrendingDown className="w-4 h-4 text-destructive" />;
  };

  const filteredAgents = financialAgents.filter(agent => {
    const matchesSearch = agent.strategy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.portfolio.toLowerCase().includes(searchTerm.toLowerCase());
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
              <DollarSign className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Financial AI Agents</h1>
              <p className="text-xl text-muted-foreground">DeFi trading bots and financial analysis systems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total TVL', value: marketData.totalTVL, icon: DollarSign, color: 'from-accent to-accent/80' },
            { label: 'Active Trades', value: marketData.activeTrades.toLocaleString(), icon: Activity, color: 'from-primary to-primary/80' },
            { label: 'Avg Return', value: marketData.avgReturn, icon: TrendingUp, color: 'from-cyber-green to-accent' },
            { label: 'Risk Alerts', value: marketData.riskAlerts, icon: AlertTriangle, color: 'from-destructive to-destructive/80' }
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
                  placeholder="Search by strategy, agent type, or portfolio..."
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

        {/* Trading Dashboard */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Trading Agents</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
            <TabsTrigger value="market">Market Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="blockchain-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground">{agent.strategy}</h4>
                        {getStatusIcon(agent.status)}
                        <Badge className={getRiskColor(agent.risk)}>
                          {agent.risk} risk
                        </Badge>
                        <Badge variant="outline">{agent.type}</Badge>
                        <div className="flex items-center space-x-1">
                          {getPerformanceIcon(agent.performance)}
                          <span className={`text-sm font-semibold ${agent.performance.startsWith('+') ? 'text-accent' : 'text-destructive'}`}>
                            {agent.performance}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{agent.analysis}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Portfolio: {agent.portfolio}</span>
                        <span>•</span>
                        <span>TVL: {agent.tvl}</span>
                        <span>•</span>
                        <span>Trades: {agent.trades}</span>
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

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-primary" />
                  Asset Allocation
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ETH</span>
                    <span className="text-sm font-semibold text-accent">45.2%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '45.2%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">BTC</span>
                    <span className="text-sm font-semibold text-accent">28.7%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style={{width: '28.7%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">DeFi Tokens</span>
                    <span className="text-sm font-semibold text-accent">26.1%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyber-green to-accent h-2 rounded-full" style={{width: '26.1%'}}></div>
                  </div>
                </div>
              </Card>

              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">24h Returns</span>
                    <span className="text-sm font-semibold text-accent">+2.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">7d Returns</span>
                    <span className="text-sm font-semibold text-accent">+8.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">30d Returns</span>
                    <span className="text-sm font-semibold text-accent">+15.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                    <span className="text-sm font-semibold text-accent">1.42</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Market Sentiment</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">Bullish</div>
                  <div className="text-sm text-muted-foreground">Based on social sentiment analysis</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Fear & Greed Index</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">72</div>
                  <div className="text-sm text-muted-foreground">Greed (Favorable for trading)</div>
                </div>
              </Card>
              
              <Card className="blockchain-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Gas Price</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">23</div>
                  <div className="text-sm text-muted-foreground">gwei (Optimal for transactions)</div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Finance;