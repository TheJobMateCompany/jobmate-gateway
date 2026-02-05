export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User
  }

  type JobCard {
    id: ID!
    title: String!
    company: String
    isApproved: Boolean
  }

  type Query {
    me: User # Placeholder
  }

  type Mutation {
    # Auth
    login(email: String!, password: String!): AuthPayload
    
    # Discovery
    addJobUrl(url: String!): JobCard
  }
`;