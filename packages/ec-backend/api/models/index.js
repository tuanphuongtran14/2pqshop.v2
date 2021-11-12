const mongoose = require('mongoose');
const dbConfig = require('../../configs/database');
const userModel = require('./user.model');
const roleModel = require('./role.model');
const permissionModel = require('./permission.model');
const productModel = require('./product.model');
const categoryModel = require('./category.model');
const tagModel = require('./tag.model');
const variationModel = require('./variation.model');

const db = {};
db.url = dbConfig.URL;
db.mongoose = mongoose;
db.User = userModel.initializeModel(mongoose);
db.Role = roleModel.initializeModel(mongoose);
db.Permission = permissionModel.initializeModel(mongoose);
db.Product = productModel.initializeModel(mongoose);
db.Category = categoryModel.initializeModel(mongoose);
db.Tag = tagModel.initializeModel(mongoose);
db.Variation = variationModel.initializeModel(mongoose);

module.exports = db;
