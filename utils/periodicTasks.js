const Key = require("../models/keyModel");

const releaseBlockedKeys = async () => {
  const expiredTime = new Date(Date.now() - 60000); // 60 seconds ago
  await Key.updateMany(
    { isBlocked: true, blockedAt: { $lte: expiredTime } },
    { isBlocked: false, blockedAt: null }
  );
};

const deleteExpiredKeys = async () => {
  const expiredTime = new Date(Date.now() - 300000); // 5 minutes 
  await Key.deleteMany({ createdAt: { $lte: expiredTime } });
};

module.exports = {
  releaseBlockedKeys,
  deleteExpiredKeys,
};
