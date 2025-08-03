const { body } = require('express-validator');

exports.addCommentValidator = [
  body('text').notEmpty().withMessage('Comment text is required')
];
