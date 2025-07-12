// Cohere API configuration and utilities
// Replace with your actual Cohere API key
const COHERE_API_KEY = '9Dl2LITUNfilQILDe3aWRl6PXbRY3IV240QDEtnK';
const COHERE_API_URL = 'https://api.cohere.ai/v1';

interface CohereResponse {
  generations?: Array<{
    text: string;
    likelihood?: number;
  }>;
  text?: string;
  classifications?: Array<{
    prediction: string;
    confidence: number;
  }>;
}

// Cohere client class
class CohereClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string = COHERE_API_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = COHERE_API_URL;
  }

  private async makeRequest(endpoint: string, data: any): Promise<CohereResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Cohere-Version': '2022-12-06'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Cohere API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Cohere API request failed:', error);
      throw error;
    }
  }

  // Generate text using Cohere's generation model
  async generate(
    prompt: string,
    options: {
      model?: string;
      max_tokens?: number;
      temperature?: number;
      k?: number;
      p?: number;
      stop_sequences?: string[];
      return_likelihoods?: string;
    } = {}
  ): Promise<string> {
    const defaultOptions = {
      model: 'command',
      max_tokens: 300,
      temperature: 0.7,
      k: 0,
      p: 0.75,
      return_likelihoods: 'NONE'
    };

    const requestData = {
      prompt,
      ...defaultOptions,
      ...options
    };

    const response = await this.makeRequest('generate', requestData);
    return response.generations?.[0]?.text || '';
  }

  // Classify text using Cohere's classification model
  async classify(
    inputs: string[],
    examples: Array<{ text: string; label: string }>,
    options: {
      model?: string;
      preset?: string;
    } = {}
  ): Promise<Array<{ prediction: string; confidence: number }>> {
    const defaultOptions = {
      model: 'embed-english-v2.0'
    };

    const requestData = {
      inputs,
      examples,
      ...defaultOptions,
      ...options
    };

    const response = await this.makeRequest('classify', requestData);
    return response.classifications || [];
  }

  // Summarize text using Cohere's summarization
  async summarize(
    text: string,
    options: {
      model?: string;
      length?: 'short' | 'medium' | 'long';
      format?: 'paragraph' | 'bullets';
      extractiveness?: 'low' | 'medium' | 'high';
      temperature?: number;
    } = {}
  ): Promise<string> {
    const defaultOptions = {
      model: 'command',
      length: 'medium' as const,
      format: 'paragraph' as const,
      extractiveness: 'medium' as const,
      temperature: 0.3
    };

    const requestData = {
      text,
      ...defaultOptions,
      ...options
    };

    const response = await this.makeRequest('summarize', requestData);
    return response.text || '';
  }
}

// Initialize Cohere client
export const cohere = new CohereClient();

// AI Agent Analysis Functions
export const analyzeAgentBehavior = async (
  agentLogs: string,
  context?: string
): Promise<{
  summary: string;
  sentiment: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}> => {
  try {
    // Generate summary
    const summary = await cohere.summarize(agentLogs, {
      length: 'medium',
      format: 'paragraph'
    });

    // Analyze sentiment and risk
    const analysisPrompt = `
Analyze the following AI agent activity log and provide:
1. Sentiment classification (positive, neutral, negative)
2. Risk level assessment (low, medium, high)
3. Key recommendations for optimization

Agent Log: ${agentLogs}
Context: ${context || 'General AI agent activity'}

Provide a structured analysis:`;

    const analysis = await cohere.generate(analysisPrompt, {
      max_tokens: 400,
      temperature: 0.5
    });

    // Parse the analysis (simplified parsing - in production, use more robust parsing)
    const sentiment = analysis.includes('positive') ? 'positive' : 
                     analysis.includes('negative') ? 'negative' : 'neutral';
    
    const riskLevel = analysis.includes('high risk') ? 'high' :
                     analysis.includes('medium risk') ? 'medium' : 'low';

    const recommendations = analysis
      .split('\n')
      .filter(line => line.includes('recommend') || line.includes('suggest'))
      .slice(0, 3);

    return {
      summary,
      sentiment,
      riskLevel: riskLevel as 'low' | 'medium' | 'high',
      recommendations
    };
  } catch (error) {
    console.error('Agent behavior analysis failed:', error);
    throw error;
  }
};

// Generate AI Agent Insights
export const generateAgentInsights = async (
  agentData: {
    type: string;
    platform: string;
    activities: string[];
    performance: number;
  }
): Promise<{
  insights: string;
  predictions: string;
  optimizations: string[];
}> => {
  try {
    const prompt = `
Analyze AI agent performance data and generate insights:

Agent Type: ${agentData.type}
Platform: ${agentData.platform}
Recent Activities: ${agentData.activities.join(', ')}
Performance Score: ${agentData.performance}%

Generate:
1. Key insights about agent performance
2. Predictions for future behavior
3. Optimization recommendations

Provide detailed analysis:`;

    const response = await cohere.generate(prompt, {
      max_tokens: 500,
      temperature: 0.6
    });

    // Parse response (simplified - use more robust parsing in production)
    const sections = response.split('\n\n');
    
    return {
      insights: sections[0] || 'No insights available',
      predictions: sections[1] || 'No predictions available', 
      optimizations: sections.slice(2).filter(s => s.trim()).slice(0, 3)
    };
  } catch (error) {
    console.error('Agent insights generation failed:', error);
    throw error;
  }
};

// Blockchain Transaction Analysis
export const analyzeBlockchainActivity = async (
  transactionData: {
    txHash: string;
    agentAddress: string;
    action: string;
    gasUsed: number;
    timestamp: string;
  }
): Promise<{
  efficiency: number;
  costAnalysis: string;
  securityAssessment: string;
}> => {
  try {
    const prompt = `
Analyze blockchain transaction for AI agent activity:

Transaction Hash: ${transactionData.txHash}
Agent Address: ${transactionData.agentAddress}
Action Performed: ${transactionData.action}
Gas Used: ${transactionData.gasUsed}
Timestamp: ${transactionData.timestamp}

Provide analysis on:
1. Transaction efficiency (score out of 100)
2. Cost optimization opportunities
3. Security assessment

Analysis:`;

    const analysis = await cohere.generate(prompt, {
      max_tokens: 400,
      temperature: 0.4
    });

    // Extract efficiency score (simplified parsing)
    const efficiencyMatch = analysis.match(/(\d+)(?:\/100|\%)/);
    const efficiency = efficiencyMatch ? parseInt(efficiencyMatch[1]) : 75;

    const sections = analysis.split('\n').filter(line => line.trim());
    
    return {
      efficiency,
      costAnalysis: sections.find(s => s.includes('cost') || s.includes('gas')) || 'No cost analysis available',
      securityAssessment: sections.find(s => s.includes('security') || s.includes('risk')) || 'No security assessment available'
    };
  } catch (error) {
    console.error('Blockchain activity analysis failed:', error);
    throw error;
  }
};

// Configuration object
export const cohereConfig = {
  apiKey: COHERE_API_KEY,
  baseUrl: COHERE_API_URL,
  models: {
    generation: 'command',
    classification: 'embed-english-v2.0',
    summarization: 'command'
  },
  features: {
    generation: true,
    classification: true,
    summarization: true,
    agentAnalysis: true,
    blockchainAnalysis: true
  }
};