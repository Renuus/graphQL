const express = require('express');
const router = express.Router();

//Define starting songs
let data = [
    {
        id: 1,
        title: 'Let It Be',
        artist: 1,
        genre: 'Pop',
        album: 'Let It Be',
        year: 1970,
    },
    {
        id: 2,
        title: 'I Want You (She\'s So Heavy)',
        artistId: 1,
        genre: 'Psychedelic rock',
        album: 'Abbey Road',
        year: 1969,
    },
    {
        id: 3,
        title: 'Gucci Gang',
        artist: 2,
        genre: 'Trap',
        album: 'Lil Pump',
        year: 2017,
    },
    {
        id: 4,
        title: 'It\'s Oh So Quiet',
        artist: 3,
        genre: 'Jazz',
        album: 'Post',
        year: 1995,
    }
];

// Handle the requests.
// READ
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
router.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);

    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    let newItem = {
        id: newId,
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        album: req.body.album,
        year: req.body.year,
    };

    data.push(newItem);

    res.status(201).json(newItem);
});

// UPDATE
router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            album: req.body.album,
            year: req.body.year,
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updated);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});


module.exports = router;