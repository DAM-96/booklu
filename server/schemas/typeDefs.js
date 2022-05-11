const { gql } = require("apollo-server-express");

let typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        users: [User]
        user(userId: ID!): User
    }
`

module.exports = { typeDefs };