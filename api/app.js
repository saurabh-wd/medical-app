const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors());
// Map global promise - get rid of mongo warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/patient-api', {useNewUrlParser: true})


const Patients = require('./models/Patients');
const Drugs = require('./models/Drugs');
const PORT = process.env.PORT || 5000;

// CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
      return res.status(200).json({});
  }
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/list', function(req, res, next) {next();},
    function(req, res, next) {
    	console.log('hgdhsdh',res,req)
        var pageNo          = req.body.pageNo;
        var recordPerPage   = req.body.recordPerPage;
        var sortCol         = req.body.sortCol?req.body.sortCol : 'modified';
        var sortType        = req.body.sortType?req.body.sortType : 'desc';

        var sortObj = {};
        sortObj[sortCol] = sortType;

        Patients.find()
        .limit(recordPerPage)
        .skip((pageNo - 1) * recordPerPage)
        .sort(sortObj)
        .exec(function(err, records) {
            if (err) {
                return next(err);
            }
            Patients.find().count().exec(function(err1, ev1) {                
                res.json({data:records, summary:{total:ev1}});
            });            
        });
    }
);

app.get('/:patientId', function(req, res, next) {
    Patients.findOne({ _id: req.params.patientId }, function(err, event) {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
});

app.post('/check-duplicate', function(req, res, next) {next();},
    function(req, res, next) {
        
        var first_name      = req.body.name.first_name;
        var last_name       = req.body.name.last_name;
        var id              = req.body.id;

        var where           = {first_name: first_name, last_name: last_name};

        if(id != '' && typeof(id) !== 'undefined') {
            where._id = {$ne : id};
        }
        Patients.find(where).count().exec(function(err, count) {
            if (err) {
                return next(err);
            }
            res.json({data:{count:count}});         
        });
    }
);
app.post('/', function(req, res, next) {   
    var body = req.body;     
    body['created'] = new Date();
    body['modified'] = new Date();
    var row = new Patients(body);  
    console.log('row',row)   
    row.save(function(err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log(post);
        res.json(row);
    });
});

app.put('/', function(req, res, next) {
    Patients.findOne({ _id: req.body._id }, function(err, patient) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            patient[x] = req.body[x] || patient[x]
        }

        patient.save(function(err, patient) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(patient);
        });
    });
});

app.delete('/', function(req, res, next) {    
    const ids = (req.headers.ids).split(',');
    let count = 0;
    for(let i=0; i<ids.length; i++) {
        Patients.findOneAndDelete({_id:ids[i]}, function(err, event) {
            if (!err) {
                count += 1;
            }  else {
                console.log(err);
            }           
        });
    }

    if(count == ids.length) {
        res.json({status:'success'});
    } else if(count == 0){
        res.json({status:'failed'});
    } else {
        res.json({status:'partial'});
    }
    
});




app.post('/drug-list', function(req, res, next) {next();},
    function(req, res, next) {        
        var pageNo          = req.body.pageNo;
        var recordPerPage   = req.body.recordPerPage;
        var sortCol         = req.body.sortCol?req.body.sortCol : 'modified';
        var sortType        = req.body.sortType?req.body.sortType : 'desc';

        var sortObj = {};
        sortObj[sortCol] = sortType;


        Drugs.find()
        .limit(recordPerPage)
        .skip((pageNo - 1) * recordPerPage)
        .sort(sortObj)
        .exec(function(err, records) {
            if (err) {
                return next(err);
            }
            Patients.find().count().exec(function(err1, ev1) {                
                res.json({data:records, summary:{total:ev1}});
            });            
        });
    }
);

app.get('/drug/:drugId', function(req, res, next) {
    Drugs.findOne({ _id: req.params.drugId }, function(err, event) {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
});

app.post('/check-duplicate-drug', function(req, res, next) {next();},
    function(req, res, next) {
        
        var drug_name      = req.body.name.drug_name;        
        var id              = req.body.id;

        var where           = {drug_name: drugName};

        if(id != '' && typeof(id) !== 'undefined') {
            where._id = {$ne : id};
        }
        Drugs.find(where).count().exec(function(err, count) {
            if (err) {
                return next(err);
            }
            res.json({data:{count:count}});         
        });
    }
);
app.post('/drug', function(req, res, next) {   
    var body = req.body;     
    body['created'] = new Date();
    body['modified'] = new Date();
    var row = new Drugs(body);     
    row.save(function(err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(row);
    });
});

app.put('/drug', function(req, res, next) {
    Drugs.findOne({ _id: req.body._id }, function(err, drug) {
        if (err) {
            return res.status(500).send(err);
        }

        for (var x in req.body) {
            drug[x] = req.body[x] || drug[x]
        }

        drug.save(function(err, drug) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(drug);
        });
    });
});

app.delete('/drug', function(req, res, next) {    
    const ids = (req.headers.ids).split(',');
    let count = 0;
    for(let i=0; i<ids.length; i++) {
        Drugs.findOneAndDelete({_id:ids[i]}, function(err, event) {
            if (!err) {
                count += 1;
            }  else {
                console.log(err);
            }           
        });
    }

    if(count == ids.length) {
        res.json({status:'success'});
    } else if(count == 0){
        res.json({status:'failed'});
    } else {
        res.json({status:'partial'});
    }   
});




// 404 redirection
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Listen on port
app.listen(PORT, function() {
  console.log('[SERVER]: Running on port ' + PORT);
});