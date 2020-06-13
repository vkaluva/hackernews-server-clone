const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        link: (parent, args) => {
            const id = args.id
            return links.find((link) => { return link.id == id })
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        updateLink: (parent, args) => {
            let foundIndex = links.findIndex((link) => { return link.id == args.id })
            if (foundIndex > -1) {
                const link = {
                    id: args.id,
                    description: args.description,
                    url: args.url,
                }
                links[foundIndex] = link
                return link
            }
            return null

        },
        deleteLink: (parent, args) => {
            let foundIndex = links.findIndex(link => link.id == args.id)
            if (foundIndex > -1) {
                const link = links[foundIndex]
                links.splice(foundIndex, 1)
                return link
            }
            return null
        }
    }
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))