const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

// GET list of all documents
router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json(documents);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// POST a new document
router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId.toString(),
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// PUT update an existing document by id
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found.'
        });
      }

      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
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
        message: 'Document not found.',
        error: { document: 'Document not found' }
      });
    });
});

// DELETE an existing document by id
router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: "Document not found."
        });
      }

      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
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
        message: 'Document not found.',
        error: { document: 'Document not found' }
      });
    });
});

module.exports = router;
