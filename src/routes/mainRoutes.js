const express = require('express');
const router = express.Router();
const taskProgressRoutes = require('./taskProgressRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const shopRoutes = require('./shopRoutes');
const playerRoutes = require('./playerRoutes');
const courtRoutes = require('./courtRoutes');
const userCharRelRoutes = require('./userCharRelRoutes');
const exampleController = require('../controllers/exampleController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController')



// sectionA
router.use("/task_progress", taskProgressRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes); 

// sectionB
router.use("/shop", shopRoutes);
router.use("/player", playerRoutes);
router.use("/court", courtRoutes); 
router.use("/userCharRel", userCharRelRoutes); 

// tokens
router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);


module.exports = router;