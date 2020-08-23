const { gql } = require('apollo-server');

const typeDefs = gql`
    type Song {
        id: ID!
        title: String!
        artist: Artist
        genre: String
        album: String
        year: Int
    }
    type Artist {
        id: ID!
        name: String!
        country: String
        label: String
        songs: [Song]
    }
    
    type Query {   
        songs: [Song]
        song(id: ID!): Song
        artists: [Artist]
        artist(id: ID!): Artist
    }
    type Mutation {
        addSong(
            title: String!
            artist: ID!
            genre: String
            album: String
            year: Int
        ): Song!
        
        updateSong(
            id: ID!
            title: String
            artist: ID!
            genre: String
            album: String
            year: Int
        ): Song!
        
        removeSong(
            id: ID!
        ): Song!

        addArtist(
            name: String!
            country: String
            label: String
        ): Artist!

        updateArtist(
            id: ID!
            name: String!
            country: String
            label: String
        ): Artist!

        removeArtist(
            id: ID!
        ): Artist!
    }
`;

module.exports = typeDefs;