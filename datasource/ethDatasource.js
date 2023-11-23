const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik Buterin's public Ethereum address 
// Used as an example address for balance check
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Etherscan API Data Source
// Extends RESTDataSource to call Etherscan APIs
class EtherDataSource extends RESTDataSource {

  constructor() {
    super(); 
    // Base URL for Etherscan API 
    this.baseURL = "https://api.etherscan.io/api";
  }

  async etherBalanceByAddress() {
    // Get ETH balance for an address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
   // Get total supply of Ether
    return this.get(  
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getLatestEthereumPrice() {
    // Get latest ETH price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() {
    // Get estimated block confirmation time
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;
