const { ApolloServer, gql } = require("apollo-server");
const faker = require('faker');
const fs = require('fs');
const data = fs.readFileSync('./pages/data.json', 'utf8')
const dataone = require('./data/get-blog-posts.js');
console.log(dataone);
const ParsedData = JSON.parse(data);
console.log(ParsedData)
let ID = ParsedData.allCats.map(r => {
  return r.name;
});
console.log(ID);
const typeDefs = gql`
type Node {
  id: ID!
  parent: Node!
  children: [Node!]!
  internal: Internal!
}
type Internal {
  type: String!
}
  type Cat{
    id:ID!
    name:String!
    age:Int!
    nice:Boolean
  }
  type Query {
    allCats: [Cat!]!
  }
`;

const mocks = {
  ID: () => faker.random.uuid(),
  Int: () => faker.random.number({ min: 1, max: 10 }),
  String: () => faker.name.firstName(),
  Boolean: () => faker.random.boolean()
}

const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen().then(({ url }) => console.log(`Server Running on port ${url}`));
