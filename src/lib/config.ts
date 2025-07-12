// AetherScope Configuration
// This file contains all the configuration settings for your AetherScope application

// ============================================================================
// SUPABASE CONFIGURATION
// ============================================================================
// To get your Supabase credentials:
// 1. Go to https://supabase.com/dashboard
// 2. Create a new project or select existing one
// 3. Go to Settings > API
// 4. Copy the URL and anon public key

export const SUPABASE_CONFIG = {
  // Replace with your actual Supabase project URL
  url: 'https://your-project-id.supabase.co',
  
  // Replace with your actual Supabase anon key (this is safe to expose in frontend)
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here',
  
  // Database table schemas for AetherScope
  tables: {
    agent_activities: 'agent_activities',
    users: 'users',
    blockchain_transactions: 'blockchain_transactions',
    ai_insights: 'ai_insights'
  },
  
  // Real-time channels
  channels: {
    agent_activities: 'agent_activities_channel',
    system_alerts: 'system_alerts_channel'
  }
};

// ============================================================================
// COHERE API CONFIGURATION  
// ============================================================================
// To get your Cohere API key:
// 1. Go to https://dashboard.cohere.ai/
// 2. Sign up or log in
// 3. Go to API Keys section
// 4. Generate a new API key

export const COHERE_CONFIG = {
  // Replace with your actual Cohere API key
  apiKey: 'your-cohere-api-key-here',
  
  // Cohere API endpoints
  baseUrl: 'https://api.cohere.ai/v1',
  
  // Model configurations
  models: {
    generation: 'command',
    classification: 'embed-english-v2.0',
    summarization: 'command',
    embedding: 'embed-english-v2.0'
  },
  
  // Default parameters for different use cases
  defaults: {
    agentAnalysis: {
      max_tokens: 400,
      temperature: 0.5,
      model: 'command'
    },
    summarization: {
      length: 'medium',
      format: 'paragraph',
      extractiveness: 'medium',
      temperature: 0.3
    },
    classification: {
      model: 'embed-english-v2.0'
    }
  }
};

// ============================================================================
// BLOCKCHAIN CONFIGURATION
// ============================================================================
// Ethereum and blockchain-related settings

export const BLOCKCHAIN_CONFIG = {
  // Ethereum network settings
  networks: {
    mainnet: {
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/your-infura-key',
      chainId: 1,
      explorerUrl: 'https://etherscan.io'
    },
    sepolia: {
      name: 'Sepolia Testnet', 
      rpcUrl: 'https://sepolia.infura.io/v3/your-infura-key',
      chainId: 11155111,
      explorerUrl: 'https://sepolia.etherscan.io'
    }
  },
  
  // Smart contract addresses (replace with your deployed contracts)
  contracts: {
    AetherScopeLogger: {
      address: '0x742d35Cc6639C0532fEb96b9db9E0Db8b7d6C7e8',
      abi: [] // Add your contract ABI here
    }
  },
  
  // Default network for the application
  defaultNetwork: 'sepolia'
};

// ============================================================================
// IPFS CONFIGURATION
// ============================================================================
// IPFS settings for storing agent logs and metadata

export const IPFS_CONFIG = {
  // Pinata (recommended IPFS provider)
  pinata: {
    apiKey: 'your-pinata-api-key',
    secretKey: 'your-pinata-secret-key',
    baseUrl: 'https://api.pinata.cloud'
  },
  
  // Web3.Storage alternative
  web3Storage: {
    token: 'your-web3-storage-token',
    baseUrl: 'https://api.web3.storage'
  },
  
  // Default gateway for reading IPFS content
  gateway: 'https://gateway.pinata.cloud/ipfs/'
};

// ============================================================================
// APPLICATION CONFIGURATION
// ============================================================================

export const APP_CONFIG = {
  // Application metadata
  name: 'AetherScope',
  version: '1.0.0',
  description: 'AI Agent Intelligence Platform on Blockchain',
  
  // Feature flags
  features: {
    authentication: true,
    realTimeUpdates: true,
    blockchainIntegration: true,
    aiAnalysis: true,
    agentMonitoring: true
  },
  
  // UI/UX settings
  ui: {
    theme: 'blockchain-dark',
    animations: true,
    refreshInterval: 30000, // 30 seconds
    maxAgentActivities: 100
  },
  
  // Analytics and monitoring
  analytics: {
    enabled: true,
    events: [
      'agent_activity_view',
      'dashboard_load',
      'authentication_success',
      'error_occurred'
    ]
  }
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const validateConfig = () => {
  const issues: string[] = [];
  
  // Check Supabase configuration
  if (SUPABASE_CONFIG.url === 'https://your-project-id.supabase.co') {
    issues.push('Supabase URL not configured');
  }
  
  if (SUPABASE_CONFIG.anonKey.includes('your-anon-key-here')) {
    issues.push('Supabase anon key not configured');
  }
  
  // Check Cohere configuration
  if (COHERE_CONFIG.apiKey === 'your-cohere-api-key-here') {
    issues.push('Cohere API key not configured');
  }
  
  // Check blockchain configuration
  if (BLOCKCHAIN_CONFIG.networks.mainnet.rpcUrl.includes('your-infura-key')) {
    issues.push('Ethereum RPC URL not configured');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

// ============================================================================
// ENVIRONMENT-SPECIFIC CONFIGURATIONS
// ============================================================================

export const getEnvironmentConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    isDevelopment,
    isProduction,
    
    // Use different settings based on environment
    blockchain: {
      ...BLOCKCHAIN_CONFIG,
      defaultNetwork: isDevelopment ? 'sepolia' : 'mainnet'
    },
    
    ui: {
      ...APP_CONFIG.ui,
      refreshInterval: isDevelopment ? 10000 : 30000 // Faster refresh in dev
    },
    
    logging: {
      level: isDevelopment ? 'debug' : 'error',
      console: isDevelopment,
      remote: isProduction
    }
  };
};

// Export all configurations
export default {
  supabase: SUPABASE_CONFIG,
  cohere: COHERE_CONFIG,
  blockchain: BLOCKCHAIN_CONFIG,
  ipfs: IPFS_CONFIG,
  app: APP_CONFIG,
  validate: validateConfig,
  getEnvironment: getEnvironmentConfig
};