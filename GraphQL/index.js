const {ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

// Define default data
// Songs
let songs = [
    {
        id: '1',
        title: 'Let It Be',
        artist: '1',
        genre: 'Pop',
        album: 'Let It Be',
        year: 1970,
    },
    {
        id: '2',
        title: 'I Want You (She\'s So Heavy)',
        artist: '1',
        genre: 'Psychedelic rock',
        album: 'Abbey Road',
        year: 1969,
    },
    {
        id: '3',
        title: 'Gucci Gang',
        artist: '2',
        genre: 'Trap',
        album: 'Lil Pump',
        year: 2017,
    },
    {
        id: '4',
        title: 'It\'s Oh So Quiet',
        artist: '3',
        genre: 'Jazz',
        album: 'Post',
        year: 1995,
    }
]
// Artists
let artists = [
    {
        id: '1',
        name: 'The Beatles',
        country: 'England',
        label: 'Apple Records',
        songs: ['1', '2'],
    },
    {
        id: '2',
        name: 'Lil Pump',
        country: 'United States',
        label: 'The Lights Global',
        songs: ['3'],
    },
    {
        id: '3',
        name: 'Björk',
        country: 'Iceland',
        label: 'One Little Independent Records',
        songs: ['4'],
    },
]


// What the server does when receiving requests
const resolvers = {
    Query: {
        // Get all songs
        songs: () => songs,
        // Get song by id
        song: (parent, args) => {
            return songs.find(song => song.id === args.id);
        },
        // Get all Artists
        artists: () => artists,
        // Get song by id
        artist: (parent, args) => {
            return artists.find(artist => artist.id === args.id);
        }
    },
    Mutation: {
        // song mutations:
        // add song to playlist
        addSong: (parent, args) => {
            const song = {
                id: String(songs.length + 1),
                title: args.title || '',
                artist: args.artist || '',
                genre: args.genre || '',
                album: args.album || '',
                year: args.year || 0,
            };
            songs.push(song);
            return song;
        },
        // Update existing song
        updateSong: (parent, args) => {
            const index = songs.findIndex(song => song.id === args.id);
            const song = {
                id: args.id,
                title: args.title,
                artist: args.artist,
                genre: args.genre,
                album: args.album,
                year: args.year,
            };
            songs[index] = song;
            return song;
        },
        // Delete song mutation
        removeSong: (parent, args) => {
            const removedSong = songs.find(
                song => song.id === args.id
            );
            songs = songs.filter(song => song.id !== args.id);
            return removedSong;
        },

        // artists mutations
        // add artist to db
        addArtist: (parent, args) => {
            const artist = {
                id: String(artists.length + 1),
                name: args.name || '',
                country: args.country || '',
                label: args.label || '',
                songs: []
            };
            artists.push(artist);
            return artist;
        },
        // Update existing artist
        updateArtist: (parent, args) => {
            const index = artists.findIndex(artist => artist.id === args.id);
            const artist = {
                id: args.id,
                name: args.name,
                country: args.country,
                label: args.label,
                songs: artists[index].songs
            };
            artists[index] = artist;
            return artist;
        },
        // Delete artist mutation
        removeArtist: (parent, args) => {
            const removedArtist = artists.find(
                artist => artist.id === args.id
            );
            artists = artists.filter(artist => artist.id !== args.id);
            return removedArtist;
        },
    },
    Song: {
        artist: parent =>
            artists.find(({ id }) => parent.artist === id),
    },
    Artist: {
        async songs(parent) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const artist = songs.filter(({id}) =>
                parent.songs.includes(id)
            );
            return artist
        }
    }

};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`🎶 Graphql Server has started at port "${url}" !!!`);
});
