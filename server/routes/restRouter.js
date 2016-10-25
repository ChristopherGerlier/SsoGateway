/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import express from 'express';
import * as controller from '../controllers/accounts.js';
import { authenticate } from '../controllers/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/authenticate:
 *   post:
 *     tags:
 *       - Authenticate
 *     description: Authenticates a user based on email and password
 *     summary: Authenticates a user
 *     operationId: authenticate
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfully returns a JWT token
 *     parameters:
 *     - name: credentials
 *       description: credentials 
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Credentials'
 */
router.route('/authenticate')
  .all((req, res, next) => {
    console.log(req.body);
    next();
  })
  .post(authenticate);

/**
 * @swagger
 * definition:
 *   Credentials:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *
 *   Account:
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
 * /api/v1/accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns all accounts from the system
 *     summary: Find all accounts
 *     operationId: getAllAccounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of accounts
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Account'
 */
router.route('/accounts')
  .get(controller.getAllAccounts);

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns a single account based on ID
 *     summary: Find a account
 *     operationId: getAccount
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single account
 *         schema:
 *           $ref: '#/definitions/Account'
 *       405:
 *         description: Invalid input
 *         schema:
 *           $ref: '#/definitions/ErrorModel'
 *     parameters:
 *     - name: id
 *       description: ID of the account to use
 *       in: path
 *       required: true
 *       type: integer
 */
router.route('/accounts/:uid')
  .get(controller.getAccount);

/**
 * @swagger
 * /api/v1/accounts/{id}/services:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns a list of services for a single account based on user ID
 *     summary: Find all services for an account
 *     operationId: getServicesForAccount
 *     produces:
 *       - application/json
 *       - text/html
 *     responses:
 *       200:
 *         description: A list of services for a single account
 *         schema:
 *           $ref: '#/definitions/Service'
 *       405:
 *         description: Invalid input
 *         schema:
 *           $ref: '#/definitions/ErrorModel'
 *     parameters:
 *     - name: id
 *       description: ID of the account to use
 *       in: path
 *       required: true
 *       type: integer
 */
router.route('/accounts/:uid/services')
  .get(controller.getServicesForAccount);

router.use('*', (request, response, next) => {
  const error = new Error('Not supported api');
  error.status = 404;
  next(error);
});

module.exports = router;
