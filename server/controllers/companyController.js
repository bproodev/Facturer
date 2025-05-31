const { Company } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: 'Not found' });
    res.json(company);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: 'Not found' });
    await company.update(req.body);
    res.json(company);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ message: 'Not found' });
    await company.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
