const { GraphQLServer } = require('graphql-yoga')


// in-memoery links for testing
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]


let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => {
            const id = args.id
            return links.find((link) => { return link.id == id })
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
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
})
server.start(() => console.log(`Server is running on http://localhost:4000`))