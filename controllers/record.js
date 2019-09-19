const moment = require('moment');
const winston = require('winston');
const Joi = require('joi');

const { Records } = require('../models/records');
const MessageHandler = require('../libs/messageHandler');

module.exports = {
  getRecords: async (req, res) => {
    const startDate = req.body.startDate || '';
    const endDate = req.body.endDate || '';
    const minCount = req.body.minCount || '';
    const maxCount = req.body.maxCount || '';

    const objToValidate = {
      startDate,
      endDate,
      minCount,
      maxCount
    };

    try {
      const schema = Joi.object({
        startDate: Joi.string().regex(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).required(),
        endDate: Joi.string().regex(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/).required(),
        minCount: Joi.number().integer().required(),
        maxCount: Joi.number().integer().required()
      });

      const result = await Joi.validate(objToValidate, schema);
    } catch (err) {
      return new MessageHandler(req, res)
          .badRequest()
          .setMessageCode('2')
          .handle();           
    }

    try {
      const records = await Records.aggregate([
        {
          $project: {
            _id: false,
            key: true,
            createdAt: true,
            totalCount: { $sum: "$counts"}
          },          
        },
        { 
          $match: {
            totalCount: { $gte: parseInt(minCount), $lte: parseInt(maxCount) },
            createdAt: {
              $gte: moment(startDate, 'YYYY-MM-DD').add(1, 'day').toDate(),
              $lte: moment(endDate, 'YYYY-MM-DD').add(1, 'day').toDate()
            }
          }
        },
      ]);
      // Send response
      return new MessageHandler(req, res)
          .success()
          .setMessageCode('0')
          .setData('records', records)
          .handle();
    }
    catch (err) { 
      winston.error(err.message, err);
      return new MessageHandler(req, res)
          .badRequest()
          .setMessageCode('1')
          .handle();      
    }
  },

};
