const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  // Initialize sequence values by querying the sequence document in DB
  Sequence.findOne()
    .then(sequence => {
      if (!sequence) {
        throw new Error('No sequence document found in database.');
      }
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId || 0;
      maxMessageId = sequence.maxMessageId || 0;
      maxContactId = sequence.maxContactId || 0;
    })
    .catch(err => {
      console.error('Error initializing sequence generator:', err);
    });
}

// The function to generate the next unique id for a given collection type
SequenceGenerator.prototype.nextId = async function(collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;

    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;

    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;

    default:
      return -1;  // Unknown collection type
  }

  try {
    await Sequence.updateOne(
      { _id: sequenceId },
      { $set: updateObject }
    );
  } catch (err) {
    console.error('Error updating sequence:', err);
    return null;
  }

  return nextId;
};

module.exports = SequenceGenerator;
