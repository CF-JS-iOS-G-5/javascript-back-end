'use strict';

const Card = require('../models/cards');
const User = require('../models/user');
const debug = require('debug')('bizapp:card-controller');
const createError = require('http-errors');
const fs = require('fs');
const del = require('del');
const path = require('path');
const dataDir = `${__dirname}/../db`;
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));
const s3 = new AWS.S3();

function s3UploadProm(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) =>{
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = exports = {};

exports.createCard = function(req, res) {
  debug('#createCard');
  if (!req.file) return createError(400, 'Resource Required');
  if (!req.file.path) return createError(500, 'File not saved.');
  let ext = path.extname(req.file.originalName);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.uuid}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };
  return User.findbyId(req.params.id)
  .then(() => s3UploadProm(params))
  .then(s3Data => {
    del([`${dataDir}/*`]);
    let imageData = {
      name:
    }
  })
};
