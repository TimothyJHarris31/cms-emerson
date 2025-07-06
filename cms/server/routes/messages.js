const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

// GET all messages
router.get('/', (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// POST a new message
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId.toString(),
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender  // Usually the ObjectId of a Contact, or null initially
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        message: createdMessage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// PUT update an existing message by id
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      if (!message) {
        return res.status(404).json({
          message: 'Message not found.'
        });
      }

      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found' }
      });
    });
});

// DELETE an existing message by id
router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      if (!message) {
        return res.status(404).json({
          message: 'Message not found.'
        });
      }

      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: 'Message deleted successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found' }
      });
    });
});

module.exports = router;
