import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home route
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
router.get('/', (req, res) => {
  res.send('Welcome to Berkay Game API');
});

/**
 * @swagger
 * /about:
 *   get:
 *     summary: About route
 *     responses:
 *       200:
 *         description: Returns information about the API
 */
router.get('/about', (req, res) => {
  res.send('This is the about page of Berkay Game API');
});

/**
 * @swagger
 * /playground:
 *   get:
 *     summary: Playground route
 *     responses:
 *       200:
 *         description: Returns playground information
 */
router.get('/playground', (req, res) => {
  res.send('This is the playground page of Berkay Game API');
});

/**
 * @swagger
 * /userProfile:
 *   get:
 *     summary: User Profile route
 *     responses:
 *       200:
 *         description: Returns user profile information
 */
router.get('/userProfile', (req, res) => {
  res.send('This is the user profile page of Berkay Game API');
});

export default router;
