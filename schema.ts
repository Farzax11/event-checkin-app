import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    events: [Event!]!
  }

  type Query {
    events: [Event!]!
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createEvent(name: String!, location: String!, startTime: String!): Event!
    joinEvent(eventId: ID!, userId: ID!): Event!
  }
`;
