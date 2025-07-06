const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // e.g. 'documents', 'messages', 'contacts'
  maxDocumentId: { type: Number, default: 0 },
  maxMessageId: { type: Number, default: 0 },
  maxContactId: { type: Number, default: 0 }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
