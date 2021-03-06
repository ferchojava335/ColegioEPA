var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


/*
 * GET studentlist.
 */
router.get('/teachers/:id', function(req, res) {
    var db = req.db;
    console.log('message'+req.params.id);
    var teacherId = req.body.teacherId != null ? req.body.teacherId : req.params.id;
    console.log('teacherId:'+teacherId);
    db.collection('teacherList',function(err, collection) {
        collection.findOne({'_id' : new BSON.ObjectID(teacherId)}, function(err, teacher) {
            console.log('teacher value:'+teacher);
            res.json({teacher: teacher});
        });
    });
});

/*
 * GET studentlist.
 */
router.get('/teachers', function(req, res) {
    var db = req.db;
    db.collection('teacherList',function(err, collection) {
        collection.find().toArray(function(err, items) {
            var allTeachers = {
                teachers:items
            };
            res.send(allTeachers);
    });
   });
});


router.get('/teachers/:id', function(req, res) {
    var db = req.db;
    var teacherId = BSON.ObjectID.createFromHexString(req.params.id);
    console.log('teacherId',teacherId);
    db.collection('teacherList',function(err, collection) {
        console.log('teacherId2',teacherId);
        collection.findOne({'_id': new BSON.ObjectID(teacherId)}, function(err, teacher) {
            console.log(err);
            console.log(teacher);
            res.send(teacher);
        });
    });
});

/*
 * POST to addstudent.
 */
router.post('/teachers', function(req, res) {
    var teacher = req.body.teacher;
    var db = req.db;
    console.log('Adding teacher: ' + JSON.stringify(teacher));
    console.log('Adding teacher: ' + JSON.stringify(req.body.teacher));
    db.collection('teacherList', function(err, collection) {
        collection.insert(teacher, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred ' + err});
            } else {
                var record = result[0];
                res.json({teacher:record});
            }
        });
    });
});

router.put('/teachers/:id' , function(req, res) {
    var db = req.db;
    var id = req.params.id;
    var teacher = req.body.teacher;
    console.log(JSON.stringify(req.body));
    db.collection('teacherList').update({_id: new BSON.ObjectID(id)},teacher, {safe:true}, function(err, result){
        if (err) {
            console.log('Error updating teacher: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log('' + result + ' document(s) updated');
            teacher._id = id;
            res.json({teacher:teacher});
        }
    });

});
/*
 * DELETE to deletestudent.
 */
router.delete('/teachers/:id', function(req, res) {
    var db = req.db;
    var teacherToDelete = req.params.id;
    db.collection('teacherList').removeById(teacherToDelete, function(err, result) {
         if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.json({});
        }
    });
});
module.exports = router;
