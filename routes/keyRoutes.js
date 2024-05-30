const express = require("express");
const {
  createKey,
  getKey,
  getKeyById,
  deleteKey,
  unblockKey,
  keepAliveKey,
} = require("../controllers/keyController");

const router = express.Router();

router.post("/keys", createKey);
router.get("/keys", getKey);
router.get("/keys/:id", getKeyById);
router.delete("/keys/:id", deleteKey);
router.put("/keys/:id", unblockKey);
router.put("/keepalive/:id", keepAliveKey);

module.exports = router;
