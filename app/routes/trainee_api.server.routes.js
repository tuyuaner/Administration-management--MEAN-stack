module.exports = function(app) {
var trainee_api = require('../controllers/trainee_api.server.controller');
app.get('/api/getAllTrainees',trainee_api.getAllTrainees);
app.get('/api/getTrainee/:id',trainee_api.getTrainee);
app.post('/api/saveTrainee', trainee_api.saveTrainee);
// app.delete('/api/deleteTrainee/:id', trainee_api.delete);
};
