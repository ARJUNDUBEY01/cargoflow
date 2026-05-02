const express = require('express');
const {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/fleet.controllers');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router
  .route('/')
  .get(getVehicles)
  .post(addVehicle);

router
  .route('/:id')
  .put(updateVehicle)
  .delete(deleteVehicle);

module.exports = router;
