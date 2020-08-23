const express = require('express');
const router = express.Router();

//Define starting artists
let data = [
  {
    id: 1,
    name: 'The Beatles',
    country: 'England',
    label: 'Apple Records',
    songs: [0, 1],
  },
  {
    id: 2,
    name: 'Lil Pump',
    country: 'United States',
    label: 'The Lights Global',
    songs: [2],
  },
  {
    id: 3,
    name: 'Björk',
    country: 'Iceland',
    label: 'One Little Independent Records',
    songs: [3],
  },
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
    name: req.body.name,
    country: req.body.country,
    label: req.body.label,
    songs: req.body.songs,
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
      name: req.body.name,
      country: req.body.country,
      label: req.body.label,
      songs: req.body.songs,
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