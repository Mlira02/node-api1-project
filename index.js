const express = require('express');
const Users = require('./data/db.js');
const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(() => {
        res.status(500).json({
            Message: 'Error with request...',
        });
    });
});

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res
            .status(404)
            .json({ message: 'User with that ID does not exist...' });
        }
    })
    .catch(() => {
        res
        .status(500)
        .json({ Message: 'Error with request...' });
    });
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res
            .status(400)
            .json({ Message: 'Please provide name and bio for the user.' });
    } else {
        Users.insert(req.body)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(() => {
                res.status(500).json({
                    Message:
                        'Error with request...',
                });
            });
    }
});

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            if (count && count > 0) 
            {
                res.status(200).json({
                    message: 'the user was deleted.',
                });
            } 
            else 
            {
                res
                    .status(404)
                    .json({ message: 'ID does not exist' });
            }
        })
        .catch(() => {
            res.status(500).json({ Message: 'Error removing user...' });
        });
});

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) 
    {
        res
            .status(400)
            .json({ Message: 'Name and bio required' });
    } 
    else 
    {
        Users.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'ID does not exist...',
                        });
                }
            })
            .catch(() => {
                res.status(500).json({
                    Message: 'Error with request...',
                });
            });
    }
});

const port = 4000;
server.listen(port, () => console.log('API running on port 4000...'));