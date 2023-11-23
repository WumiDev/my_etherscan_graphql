const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();  

const resolvers = {

  Query: {

    // Get ETH balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total supply of Ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest ETH price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get estimated block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo GraphQL server
const server = new ApolloServer({
  
  typeDefs,
  resolvers,
  
  // Instantiate EtherDataSource for resolvers
  dataSources: () => ({ 
    ethDataSource: new EtherDataSource(),  
  }), 
});

// Start the GraphQL server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
