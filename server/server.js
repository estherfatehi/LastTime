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

//returns a json object of all the tasks
app.get('/alltasks', function(req, res, next) {
	var context = {};
	conn.query('SELECT * FROM Tasks ORDER BY LastDate', function(err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		context.results = rows;
		res.send(rows);
	});
});

//inserts values into table
app.get('/insert', function(req, res, next) {
	conn.query("INSERT INTO Tasks (`LastDate`, `TaskName`, `Frequency`) VALUES (?, ?, ?)", ([req.query.date, req.query.taskname, req.query.frequency]), function(err, result) {
		if (err) {
			next(err);
			return;
		}
		console.log(result);
		res.send(result);
	});
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + ';');
});
