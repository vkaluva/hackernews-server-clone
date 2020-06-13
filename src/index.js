const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        link: (root, args, context, info) => {
            return context.prisma.link({ id: args.id })
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        updateLink: (root, args, context) => {
            return context.prisma.updateLink({
                where: { id: args.id },
                data: {
                    url: args.url,
                    description: args.description,
                }
            })

        },
        deleteLink: (root, args, context) => {
            return context.prisma.deleteLink({ id: args.id })
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