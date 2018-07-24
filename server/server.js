const express = require('express');
const path = require('path');
const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'user1',
	password: 'helloworld',
	database: 'lasttime'
});

const app = express();
app.set('port', 3001);

// app.get('*', (req, res)=>{
// 	res.sendFile(path.join(__dirname, '../build/index.html'));
// })

conn.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + conn.threadId);
});

app.get('/test', function(req, res, next) {
	var context = {};
	conn.query('SELECT * FROM Tasks', function(err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		context.results = rows;
		console.log(context);
		res.send(rows);
	});
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + ';');
});
