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
      name: req.body.name,
      desc: req.body.desc,
      userId: req.user._id,
      imageURI: s3Data.Location,
      objectKey: s3Data.Key,
    };
    return new Card(imageData).save();
  });
};

exports.fetchCard = function(req){
  debug('#fetchCard');
  return Card.findbyId(req.params.id)
  .then(card => {
    if (card.userId.toString() !== req.user._id.toString()){
      return Promise.reject(createError(401, 'Invalid User'));
    }
    return Promise.resolve(card);
  })
  .catch(() => Promise.reject(createError(404, 'Card not found'))
);
};

exports.deleteCard = function (req) {
  debug('#deleteCard');
  let params = {};
  return Card.findbyId(req.params.userId)
  .then(card => {
    if(card.userId.toString() !== req.params.id.toString()){
      return Promise.reject(createError(401, 'Card not associated with user' ));
    }

    if (card.userId.toString() !== req.user._id.toString()){
      return Promise.reject(createError(401, 'Invalid User'));
    }
    params = {
      Bucket: process.env.AWS_BUCKET,
      Key: card.ObjectKey,
    };
  })
  .then(() => s3.deleteObject(params))
  .then(data => {
    console.log(data);
    return Card.findByIdAndRemove(req.params.imageURI);
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};
