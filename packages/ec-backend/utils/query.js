/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const _ = require('lodash');
const db = require('../api/models');

module.exports = (modelName) => ({
  findPage: async (queryParams, populates = []) => {
    const { page = 1, pageSize = 20, _sort = {} } = queryParams;
    _.unset(queryParams, 'page');
    _.unset(queryParams, 'pageSize');
    _.unset(queryParams, '_sort');
    _.unset(queryParams, 'limit');
    _.unset(queryParams, 'skip');
    if (!_.isEmpty(_sort)) {
      _sort.created_at = 'desc';
    }
    const total = await db[modelName].estimatedDocumentCount();
    const results = await db[modelName]
      .find(queryParams)
      .sort(_sort)
      .limit(_.toInteger(pageSize))
      .skip((page - 1) * pageSize)
      .populate(populates);

    return {
      results,
      pagination: {
        page: _.toInteger(page),
        pageSize: _.toInteger(pageSize),
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    };
  },

  create: async (params, populates) => {
    const entity = new db[modelName](params);
    await entity.save();

    if (!populates) {
      return entity;
    }
    
    db[modelName].populate(entity, populates, function (err, result) {
      if (err) {
        throw err;
      }

      return result;
    });
  },

  updateById: (id, params) => db[modelName].findByIdAndUpdate(id, params),

  deleteById: (id) => db[modelName].findByIdAndDelete(id),

  findById: (id, populates) => db[modelName].findById(id).populate(populates),

  findOne: (params, populates) => db[modelName].findOne(params).populate(populates),

  count: (params) => db[modelName].countDocuments(params),
});
