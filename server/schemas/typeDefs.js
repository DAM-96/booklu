const { gql } = require("apollo-server-express");
const bookData = `
{
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}
`

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

    type Auth {
        token: ID!
        user: User
    }

    input BookData ${bookData}

    type Query {
        users: [User]
        user(userId: ID!): User
        getMe: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveBook(input: BookData): User
        deleteBook(bookId: ID!): User
    }
`

module.exports = { typeDefs };