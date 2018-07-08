'use strict';

const graphql = require('graphql');
const data = require('./data.json');

const userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        name: {
            type: graphql.GraphQLString
        },
        id: {
            type: graphql.GraphQLInt
        },
        location: {
            type: graphql.GraphQLString
        }
    }
});

const postType = new graphql.GraphQLObjectType({
    name: 'Post',
    fields: {
        title: {
            type: graphql.GraphQLString
        },
        id: {
            type: graphql.GraphQLInt
        },
        body: {
            type: graphql.GraphQLString
        },
        author: {
            type: graphql.GraphQLString
        }
    }
});

const commentType = new graphql.GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: {
            type: graphql.GraphQLInt
        },
        body: {
            type: graphql.GraphQLString
        },
        votes: {
            type: graphql.GraphQLInt
        },
        postId: {
            type: graphql.GraphQLInt
        },
        userId: {
            type: graphql.GraphQLInt
        }
    }
});

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql.GraphQLInt
                }
            },
            resolve: (root, args) => {
                const {users} = data;
                console.log('root', root)

                const userData = users.filter(user => {
                    console.log('user.id', user.id, 'args.id', args.id)
                    return user.id === args.id ? user : null
                });

                console.log('user', userData);
                return userData[0];
            }
        },
        post: {
            type: postType
        },
        comment: {
            type: commentType
        }
    }
});


const schema = new graphql.GraphQLSchema({
    query: queryType
});

module.exports = schema;
