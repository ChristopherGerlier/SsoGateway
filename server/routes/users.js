/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import express from 'express';
import * as controller from '../controllers/users.js';

const router = express.Router();
/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       password:
 *         type: string
 *       stream:
 *         type: string
 *
 *   Service:
 *     properties:
 *       id:
 *         type: integer
 *       service:
 *         type: string
 *
 *   ErrorModel:
 *     type: object
 *     required:
 *     - message
 *     - code
 *     properties:
 *       message:
 *         type: string
 *       code:
 *         type: string
 *         minimum: 100
 *         maximum: 600
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users from the system
 *     summary: Find all users
 *     operationId: getAllUsers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get('/users', controller.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single user based on ID
 *     summary: Find a user
 *     operationId: getUser
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/User'
 *       405:
 *         description: Invalid input
 *         schema:
 *           $ref: '#/definitions/ErrorModel'
 *     parameters:
 *     - name: id
 *       description: ID of the user to use
 *       in: path
 *       required: true
 *       type: integer
 */
router.get('/users/:uid', controller.getUser);
/**
 * @swagger
 * /api/users/{id}/services:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of services for a single user based on ID
 *     summary: Find all services for a user
 *     operationId: getServicesForUser
 *     produces:
 *       - application/json
 *       - text/html
 *     responses:
 *       200:
 *         description: A list of services for a single user
 *         schema:
 *           $ref: '#/definitions/Service'
 *       405:
 *         description: Invalid input
 *         schema:
 *           $ref: '#/definitions/ErrorModel'
 *     parameters:
 *     - name: id
 *       description: ID of the user to use
 *       in: path
 *       required: true
 *       type: integer
 */
router.get('/users/:uid/services', controller.getServicesForUser);
router.use('*', (request, response, next) => {
  const error = new Error('Not supported api');
  error.status = 404;
  next(error);
});

module.exports = router;
