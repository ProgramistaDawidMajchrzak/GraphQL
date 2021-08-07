const { default: axios } = require('axios');
const graphql = require('graphql');


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const DrinkType = new GraphQLObjectType({
    name: 'DrinksType',
    fields: () => ({

        idDrink: { type: GraphQLString },
        strDrink: { type: GraphQLString },
        strCategory: { type: GraphQLString },

    })
});
// const DrinkType = new GraphQLObjectType({
//     name: 'DrinkType',
//     fields: () => ({
//         drink: { type: GraphQLString },
//         strDrink: { type: GraphQLString },
//         strCategory: { type: GraphQLString },
//     })
// })
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        drinks: {
            type: new GraphQLList(DrinkType),
            args: { idDrink: { type: GraphQLString } },
            resolve(parent, args) {
                return axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita').then(res => res.data.drinks)
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});