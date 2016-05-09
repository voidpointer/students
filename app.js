var express = require('express');
var app = express();

var data = require('./students_classes');

var studentId = 1;
data.students.forEach(function(student){
	student.id = studentId++;

	var gradePoints = 0;
	student.studentClasses.forEach(function(classGrade){
		gradePoints += classGrade.grade;
	});
	student.gpa = gradePoints / student.studentClasses.length;
});

app.get('/api/classes', function (req, res) {
  res.json(data.classes);
});

app.get('/api/students/search', function (req, res) {
  res.json(data.students.filter(function(student){
  	var first = req.query.first || '',
  		last = req.query.last || '';
  	return (!first && !last) ||
  		(first && !last && first.toLowerCase() == student.first.toLowerCase()) ||
  		(!first && last && last.toLowerCase() == student.last.toLowerCase()) ||
  		(first && last && first.toLowerCase() == student.first.toLowerCase() && last.toLowerCase() == student.last.toLowerCase());
  }));
});

app.get('/api/students/:id', function (req, res) {
  res.json(data.students.filter(function(student){
  	return req.params.id == student.id;
  }));
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

