const router = require('express').Router();
const { Building, Management, Unit, BuildingAmenities, UnitAmenities } = require('../models');

router.get('/', async (req, res) => {
  try {
    const buildingData = await Building.findAll({
      include: [
        { model: BuildingAmenities, as: 'building_amenities' },
        { model: Management, as: 'management' },
        {
          model: Unit,
          as: 'units',
          include: [{ model: UnitAmenities, as: 'unit_amenities' }],
        },
      ],
    });

    const buildings = buildingData.map((building) => building.get({ plain: true }));
    res.render('homepage', {
      buildings,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/managements/:id', async (req, res) => {
  try {
    const managementData = await Management.findByPk(req.params.id, {
      include: [{ model: Building, as: 'buildings' }],
    });

    const singleManagementData = managementData.get({ plain: true });

    const buildingData = await Building.findAll({
      include: [
        { model: BuildingAmenities, as: 'building_amenities' },
        { model: Management, as: 'management' },
        {
          model: Unit,
          as: 'units',
          include: [{ model: UnitAmenities, as: 'unit_amenities' }],
        },
      ],
      where: {
        management_id: req.params.id,
      },
    });

    const buildings = buildingData.map((building) => building.get({ plain: true }));
    res.render('managements', {
      singleManagementData,
      buildings,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/buildings/:id', async (req, res) => {
  try {
    const buildingData = await Building.findByPk(req.params.id, {
      include: [
        { model: BuildingAmenities, as: 'building_amenities' },
        { model: Management, as: 'management' },
        {
          model: Unit,
          as: 'units',
          include: [{ model: UnitAmenities, as: 'unit_amenities' }],
        },
      ],
    });

    const singleBuildingData = buildingData.get({ plain: true });

    const unitData = await Unit.findAll({
      include: [
        { model: Building, as: 'building' },
        { model: UnitAmenities, as: 'unit_amenities' },
      ],
      where: {
        building_id: req.params.id,
      },
    });
    // res.status(200).json(unitData);

    const units = unitData.map((unit) => unit.get({ plain: true }));
    res.render('buildings', {
      units,
      singleBuildingData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/units/:id', async (req, res) => {
  try {
    const unitData = await Unit.findByPk(req.params.id, {
      include: [
        { model: Building, as: 'building' },
        { model: UnitAmenities, as: 'unit_amenities' },
      ],
    });

    const unit = unitData.get({ plain: true });
    res.render('unit', {
      unit,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new-listing/management', async (req, res) => {
  try {
    const mgmtCompanies = await Management.findAll({ order: [['management_name', 'ASC']] });
    const mgmt = mgmtCompanies.map((m) => m.get({ plain: true }));
    res.render('new-listing', { mgmt });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get management by user inputted management company name for building list
router.get('/new-listing/management/buildings/:name', async (req, res) => {
  try {
    const mgmtData = await Management.findAll({ where: { management_name: req.params.name } });
    const mgmt = mgmtData.map((m) => m.get({ plain: true }));
    console.log(mgmtData);
    res.render('new-listing-new-mgmt-building', { mgmt });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit-listing', async (req, res) => {
  try {
    res.render('edit-listing');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
