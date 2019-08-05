import express from 'express';
import * as accounts from '../controllers/accounts.js';
import * as groups from '../controllers/groups.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();


// mandatory auth middleware
router.use(authorize);

/**
 * @swagger
 * /api/v1/authenticate:
 *   post:
 *     tags:
 *       - Authenticate
 *     description: Authenticates an account based on email and password
 *     summary: Authenticates an account
 *     operationId: authenticate
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: successfully created a JWT token
 *         schema:
 *           $ref: '#/definitions/Authorization'
 *       401:
 *         description: Invalid credentials
 *     parameters:
 *     - name: credentials
 *       description: credentials
 *       in: body
 *       required: true
 *       schema:
 *         $ref: '#/definitions/Credentials'
 */
router.route('/authenticate')
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
 *   Authorization:
 *     properties:
 *       token:
 *         type: string
 *       expires:
 *         type: string
 *       email:
 *         type: string
 *       accountInfo:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           role:
 *             type: string
 *           services:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Service'
 *
 *
 *   Account:
 *     properties:
 *       id:
 *         type: integer
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
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
  .get(accounts.getAllAccounts);

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
  .get(accounts.getAccount);

/**
 * @swagger
 * /api/v1/groups/{id}/services:
 *   get:
 *     tags:
 *       - Groups
 *     description: Returns a list of services authorized for a group
 *     summary: Find all services for a group
 *     operationId: getServicesForGroup
 *     produces:
 *       - application/json
 *       - text/html
 *     responses:
 *       200:
 *         description: A list of services authorized for a group
 *         schema:
 *           $ref: '#/definitions/Service'
 *       405:
 *         description: Invalid input
 *         schema:
 *           $ref: '#/definitions/ErrorModel'
 *     parameters:
 *     - name: name
 *       description: name of the group to use
 *       in: path
 *       required: true
 *       type: integer
 */
router.route('/groups/:groupname/services')
  .get(groups.getServicesForGroup);

router.use('*', (request, response, next) => {
  const error = new Error('Not supported api');
  error.status = 404;
  next(error);
});

module.exports = router;
