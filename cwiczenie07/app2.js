/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */
 
import express from 'express';
import morgan from 'morgan';
/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment
/* ************************************************ */
app.use(morgan('dev'));
app.set('view engine', 'pug')
/* ******** */
/* "Routes" */
/* ******** */
/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.get('/', (request, response) => {
    response.render('index'); // Render the 'index' view
});
/* ************************************************ */
app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});