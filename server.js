import { ApolloServer, gql } from 'apollo-server'
import { users, orders, foods } from './data.js'


const schema = gql`
    type Query{
        users: [User!]!
        orders: [Order!]!
        foods: [Food!]!
    }

    type User{
        user_id: ID!
        username: String!
        contact: String!
        orders:[Order!]!
        foods:[Food!]!
    }

    type Order{
        order_id: ID!
        user_id: ID!
        food_id: ID!
        count: Int!
    }

    type Food{
        food_id: ID!
        food_name: String!
        orders: [Order!]!
    }

`


const resolvers = {
    Query: {
        users: () => users,
        orders: () => orders,
        foods: () => foods,
    },

    User: {
        user_id: ( ) => user_id,
        username: () => username,
        contact: () => contact,
        orders: () => {
            console.log(user_id);
            return orders.filter( order => order.user_id == user_id)
        },
    },
    Order: {
        order_id: () => order_id,
        user_id: () => user_id,
        food_id: () => food_id,
        count: () => count,
    },

    Food: {
        food_id: () => food_id,
        food_name: () => food_name,
        orders: () => {
            return orders.filter( order => order.count == count)
        },
    }

}


const server = new ApolloServer({ typeDefs: schema, resolvers: resolvers })
server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
