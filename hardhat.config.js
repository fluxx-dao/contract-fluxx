require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Plugin Tenderly (opcional - instale com: npm install --save-dev @tenderly/hardhat-tenderly)
let tenderlyPlugin;
try {
  tenderlyPlugin = require("@tenderly/hardhat-tenderly");
} catch (e) {
  // Plugin não instalado, continuar sem ele
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
        networks: {
          polygon: {
            url: process.env.INFURA_RPC_URL || process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 137,
          },
          // Rede Tenderly Fork (configure após criar fork no dashboard)
          tenderly: {
            url: process.env.TENDERLY_FORK_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
          },
          // Hardhat Fork para testes locais
          hardhat: {
            // Não usar fork por padrão - use Tenderly Fork para testes mais precisos
            // Para usar fork local, descomente abaixo e configure hardfork:
            /*
            chainId: 137,
            forking: {
              url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
              blockNumber: 79299518, // Bloco específico ajuda
            },
            hardfork: "london",
            */
            accounts: {
              count: 10,
              accountsBalance: "10000000000000000000000" // 10000 ETH
            }
          },
          // Mumbai Testnet
          mumbai: {
            url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 80001,
          },
        },
  // Configuração Tenderly (opcional)
  tenderly: {
    project: process.env.TENDERLY_PROJECT || "project",
    username: process.env.TENDERLY_USERNAME || "fluxxdao",
    privateVerification: false,
    // O access token é lido automaticamente de TENDERLY_ACCESS_TOKEN no .env
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "",
    customChains: [
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

