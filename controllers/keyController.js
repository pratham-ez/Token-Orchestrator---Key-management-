const Key = require("../models/keyModel");
const { v4: uuidv4 } = require("uuid");

exports.createKey = async (req, res) => {
  const keyId = uuidv4();
  const key = new Key({ keyId });
  await key.save();
  res.status(201).json({ keyId });
};

exports.getKey = async (req, res) => {
    try {
      const key = await Key.findOneAndUpdate(
        { isBlocked: false }, 
        { isBlocked: true, blockedAt: new Date() }, 
        { new: true, sort: { createdAt: 1 } }
      );
  
      if (key) {
        res.status(200).json({ keyId: key.keyId });
      } else {
        res.status(404).json({});
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getKeyById = async (req, res) => {
  const key = await Key.findOne({ keyId: req.params.id });

  if (key) {
    res.status(200).json(key);
  } else {
    res.status(404).json({});
  }
};

exports.deleteKey = async (req, res) => {
  const result = await Key.deleteOne({ keyId: req.params.id });

  if (result.deletedCount === 1) {
    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
};

exports.unblockKey = async (req, res) => {
  const result = await Key.updateOne(
    { keyId: req.params.id },
    { isBlocked: false, blockedAt: null }
  );

  if (result.modifiedCount === 1) {
    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
};

exports.keepAliveKey = async (req, res) => {
  const result = await Key.updateOne(
    { keyId: req.params.id },
    { createdAt: new Date() }
  );

  if (result.matchedCount === 1) {
    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
};
