const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/controller.js');
 
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
	app.post('/api/auth/signin', controller.signin);
	
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

	app.post('/api/test/products',[authJwt.verifyToken], controller.product_create);
	
	app.get('/api/products', controller.userProducts);

	app.get('/api/products/:id', controller.product_details);

	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

	app.get('/test', controller.test);

	app.post('/api/userfirst', controller.user_firstcreate);

	app.get('/api/userfirst', [authJwt.verifyToken], controller.userLiat);

	app.get('/api/userfirst/:id', controller.seorang_user);
}