const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
//const expValidator = require('express-validator');


 const db = mysql.createConnection({
    host: "localhost",
    user: "cbmis",
    password:"cbmispass",
    database: "laptopshop"
 });


 db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

 });


let app = express();


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//app.use(expValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'scripts')));
app.use(express.static(path.join(__dirname,'img')));
app.use(express.static(path.join(__dirname,'css')));
//app.use(express.static(path.join(__dirname,'Syllabus')));

app.use(session({name:'sid',secret: 'test', saveUninitialized: false, resave:false}));

const redirectLogin =(req,res,next)=>{
  if(!req.session.userID){
    res.redirect('/login')
  }else{
    next()
  }
}

const redirectProfile =(req,res,next)=>{
  if(req.session.userID){
    res.redirect('/profile')
  }else{
    next()
  }
}

const redirectReg =(req,res,next)=>{
  if(req.session.userID){
    res.redirect('/logout')
  }else{
    next()
  }
}


/*app.get('/', function (req,res) {
    
})*/

app.all('/', function(req, res) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/index.html'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/index.html'));
  }
});

app.all('/Syllabus/CSEC_English_Syllabus',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/Syllabus/CSEC_English_Syllabus.pdf'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/Syllabus/CSEC_English_Syllabus.pdf'));
  }
});


app.all('/Syllabus/CSEC_Information_Technology_Syllabus',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Information_Technology_Syllabus.pdf'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Information_Technology_Syllabus.pdf'));
  }
});


app.all('/Syllabus/CSEC_Mathematics_Syllabus',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Mathematics_Syllabus.pdf'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Mathematics_Syllabus.pdf'));
  }
});


app.all('/Syllabus/CSEC_Accounts_Syllabus',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Accounts_Syllabus.pdf'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Accounts_Syllabus.pdf'));
  }
});


app.all('/Syllabus/CSEC_Chemistry_Syllabus',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Chemistry_Syllabus.pdf'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Chemistry_Syllabus.pdf'));
  }
});


app.all('/Syllabus/CSEC_Physics_Syllabus',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
  res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Physics_Syllabus.pdf'));

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/Syllabus/CSEC_Physics_Syllabus.pdf'));
  }
});


app.all('/logout',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do
    req.session.destroy();
    res.sendFile(path.join(__dirname,'/index.html'));
    }
  else if (req.method === 'GET') {
    req.session.destroy();
    res.sendFile(path.join(__dirname,'/index.html'));
  }
});

app.all('/team', function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/team.html'));
  }
});

app.all('/resources',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do

    }
  else if (req.method === 'GET') {
    res.sendFile(path.join(__dirname,'/resources.html'));
  }
});

app.all('/profile',redirectLogin, function(req, res, next) {
  if(req.method === 'POST') {
  //nothing to do

    }
  else if (req.method === 'GET') {
    // just returnign the form to display.
    console.log("Testing profile")
    let sql = "select s.FIRSTNAME,s.LASTNAME,s.EMAIL,t.DOB,";
        sql += "t.TELE,t.GENDER,t.ADDRESS,t.COURSES from _USERS as s ";
        sql += ",_STUDENTS as t where t.USERNAME=s.USERNAME and s.USERNAME= '" + req.session.userID + "'";
      console.log(sql);
      db.query(sql, (err, data) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 33')
          console.log(err)

          //res.status(500).send({message: err}); 
        }
        else {
          // returns the data retrieved from the database in list form
          //console.log(data +"info from DATABASE")



let html=         '<!DOCTYPE html>'+
'<html>'+
'<head>'+
  '<title>'+ req.session.userID +' Profile</title>' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
         '<script type = '+'"text/javascript" src="jquery.js" >'+'</script>'+
        '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">'+
        '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>'+
        '<script type = "text/javascript" src=""></script>'+
        '<script type = "text/javascript" src="_toglog.js"></script>'+

       
        '<link rel = "stylesheet" href = "styles.css" type="text/css" />'+
    
'</head>'+
'<body id="profile">'+

  '<div class = "col-12 container">'+
      '<div class="row">'+
                      
                '<nav class=" col-12 navbar navbar-expand-lg navbar-light bg-light">'+
                    '<a class="navbar-brand"><img class = "lg" src="fly.jpg"></a>'+
                    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">'+
                      '<span class="navbar-toggler-icon"></span>'+
                    '</button>'+
                    '<div class="collapse navbar-collapse" id="navbarNav">'+
                      '<ul class="navbar-nav">'+
                        '<li class="nav-item active">'+
                          '<a class="nav-link" href="/">Home <span class="sr-only">Home</span></a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                          '<a class="nav-link" href="/resources">Resources</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                          '<a class="nav-link" href="/studentReg">Course Registration</a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                            '<a class="nav-link" href="/team">Meet the Team</a>'+
                          '</li>'+
                          '<li id = "profile">' +
                            '<a id = "proflink"></a>'+
                        '</li>'+
                        '<li class="nav-item">'+
                          '<form id="logchange">'+
                            '<button  class=" btn1 btn btn-outline-success my-2 my-sm-0 logchnbtn"></button>'+
                            '</form>'+
                          '</li>'+
                      '</ul>'+
                    '</div>'+
                  '</nav>'+
        '</div>'+


          '<div class = "col-3"></div>'+ 
          '<div class = "col-6 box">'+  

            '<div class = "row">'+
               '<div class = "col-3"></div>'+
                '<div class = "col-6">'+
                    '<h3 class = "formhead"> Welcome '+ req.session.userID  +'</h3>'+
                '</div>'+
                '<div class = "col-3"></div>'+
            '</div>'+

              '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">Username: </label></div>  '+
                                    '<div class="col-6">'+                                      
                                        '<span id="uname">'+req.session.userID+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+


                
                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">Firstname: </label></div>'+  
                                    '<div class="col-6"> '+'                                       '+
                                       ' <span id="fname">'+data[0].FIRSTNAME+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+


                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">Lastname: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="lname">'+data[0].LASTNAME+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+


                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">Email: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="email">'+data[0].EMAIL+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+
                 
                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">DOB: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="dob">'+data[0].DOB+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+


                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">TELE: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="tele">'+data[0].TELE+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+ 

                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">GENDER: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="gender">'+data[0].GENDER+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+
                

                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">ADDRESS: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="address">'+data[0].ADDRESS+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+


                '<div class = "row">'+
              '<div class = "col-3"><label for="" class="nameLabel">COURSES: </label></div>  '+
                                    '<div class="col-6">'+
                                        '<span id="courses">'+data[0].COURSES+'</span>'+
                                    '</div>'+
                                    '<div class = "col-3"></div>'+
                '</div>'+

            '</div>'+

            '<div class = "col-3"></div>'+


            '</div>' +
                
'</body>'+
'</html>'
          res.send(html);
         // res.sendFile(path.join(__dirname,'/profile.html'));
          

        }
      }) 
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 44')
        console.log(err)
        //res.status(500).send({message: err}); 
      });

    //res.sendFile(path.join(__dirname,'/profile.html'));
  }
  
});


app.all('/login', redirectProfile, function(req, res, next) {
  if(req.method === 'POST') {

   if(req.body.login){
      // really just searchig for the user information based on the username provided.
      // returns all data for said user - you may modify to only return fields that are necessary
      let sql = "SELECT * FROM _USERS WHERE USERNAME = '" + req.body.username + "' and PASSWORD ='" + req.body.password+"'" ;
      console.log(sql);
      db.query(sql, (err, data) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 33')
          console.log(err)

          //res.status(500).send({message: err}); 
        }
        else {
          // returns the data retrieved from the database in list form
          //console.log(data +"info from DATABASE")

         
          if(data.length==1)
          {
            let userID =data[0].USERNAME
              req.session.userID= userID;
              console.log(req.session.userID)
            res.send(true);
          }else{
            res.send(false);

          }
          
          

        }
      }) 
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 44')
        console.log(err)
        //res.status(500).send({message: err}); 
      });
     // db.close();
    }

    }
  else if (req.method === 'GET') {
    // just returnign the form to display.
    console.log("Testing login")
    res.sendFile(path.join(__dirname,'/login.html'));
  }
  
});


app.all('/studentReg', redirectLogin,function(req, res, next) {
  if(req.method === 'POST') {

//testing area
let gender = req.body.gender,
    fname= req.body.firstname,
    lname = req.body.lastname,
    dob= req.body.dob,
    tele=parseInt(req.body.tele),
    addr=req.body.address,
    courses=req.body.courses;



console.log(tele)
console.log("gender test")

      let sql = "INSERT INTO _STUDENTS(USERNAME, FIRSTNAME, LASTNAME, DOB, TELE, GENDER, ADDRESS , COURSES)" 
      sql = sql + " VALUES('" + req.session.userID  + "', '" +fname+ "', '" + lname + "', '" + dob + "', '" + tele   + "', '" + gender+ "', '" + addr + "', '" + courses + "')";
      //console.log(sql)
      db.query(sql, (err) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 1')
          console.log(err)
          //res.status(500).send({message: err}); 
        }
        else {
          // once all is good, it returns this message to user. 
           console.log("are you here")
          res.status(200).send({message: 'SUCCESSFULLY INSERTED'}); 

        }
      })
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 2')
        //res.status(500).send({message: err}); 
      }); 
//end of testing area
  }
  else if (req.method === 'GET') {
    // just returnign the form to display.
    console.log("Testing studentReg")
    res.sendFile(path.join(__dirname,'/studentReg.html'));
  }
  
});

//email route for checking existing email in db
app.all('/email',  async function(req, res, next) {
  if(req.method === 'POST') {
    if(req.body.esearch){
      // really just searchig for the user information based on the email provided.
      // returns all data for said user - you may modify to only return fields that are necessary
      let sql = "SELECT * FROM _USERS WHERE EMAIL = '" + req.body.email + "'";
      console.log(sql);
      await db.query(sql, (err, data) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 33e')
          res.status(500).send({message: err}); 
        }
        else {
          // returns the data retrieved from the database in list form
          res.send(data);
        }
      }) 
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 44e')
        res.status(500).send({message: err}); 
      });
    }
    
  }else if(req.method === 'GET') {

  }
});



//username route for checking existing username in db
app.all('/susername',  async function(req, res, next) {
  if(req.method === 'POST') {
   
      // really just searchig for the user information based on the username provided.
      // returns all data for said user - you may modify to only return fields that are necessary

      let sql = "SELECT * FROM _STUDENTS WHERE USERNAME = '" + req.body.username + "'";
      console.log(sql);
     await db.query(sql, (err, data) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 33')
          console.log(err)
          res.status(500).send({message: err}); 
        }
        else {
          // returns the data retrieved from the database in list form
          res.send(data);
          
        }
      }) 
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 44')
        console.log(err)
        res.status(500).send({message: err}); 
      });
    
    
    
  }else if(req.method === 'GET') {

  }
});

//username route for checking existing username in db
app.all('/username',  async function(req, res, next) {
  if(req.method === 'POST') {
   if(req.body.search){
      // really just searchig for the user information based on the username provided.
      // returns all data for said user - you may modify to only return fields that are necessary
      let sql = "SELECT * FROM _USERS WHERE USERNAME = '" + req.body.username + "'";
      console.log(sql);
     await db.query(sql, (err, data) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 33')
          res.status(500).send({message: err}); 
        }
        else {
          // returns the data retrieved from the database in list form
          res.send(data);
        }
      }) 
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 44')
        res.status(500).send({message: err}); 
      });
    
    
    }
    
  }else if(req.method === 'GET') {

  }
});

app.all('/name',  async function(req, res, next) {
  if(req.method === 'POST') {
   if(req.body.student){
      // really just searchig for the user information based on the username provided.
      // returns all data for said user - you may modify to only return fields that are necessary
      let sql = "SELECT * FROM _STUDENTS WHERE FIRSTNAME = '" + req.body.firstname + "'";
      console.log(sql);
     await db.query(sql, (err, data) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 33')
          console.log(err)
          res.status(500).send({message: err}); 
        }
        else {
          // returns the data retrieved from the database in list form
       
            console.log("sending over data")

            res.send(data);

        }
      }) 
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 44')
        console.log(err)
        res.status(500).send({message: err}); 
      });
    
    }
    
  }else if(req.method === 'GET') {

  }
});

//update route for checking existing user in db
app.all('/update',  async function(req, res, next) {
  if(req.method === 'POST') {
   if(req.body.update && req.body.user) {
      //if the update flag is set then update the user data based on the userid 
      // submitted in form
      let sql = "UPDATE _USERS SET USERNAME = '" + req.body.username + "', FIRSTNAME = '" + req.body.firstname;
        sql = sql + "', LASTNAME = '" + req.body.lastname + "', EMAIL = '" + req.body.email + "', PASSWORD = '" + req.body.password + "'";
        sql = sql + " WHERE USERID = " + req.body.userid + "";
      
     await db.query(sql, (err) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 11')
          res.status(500).send({message: err}); 
        }
        else {
          // once all is good, it returns this message to user.
          res.status(200).send({message: 'SUCCESSFULLY UPDATED'}); 
        }
      })
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 22')
        res.status(500).send({message: err}); 
      }); 
    }else if(req.body.update && req.body.student) {
      //if the update flag is set then update the user data based on the userid 
      // submitted in form
      let gender = req.body.gender,
    fname= req.body.firstname,
    lname = req.body.lastname,
    dob= req.body.dob,
    tele=parseInt(req.body.tele),
    addr=req.body.address,
    courses=req.body.courses;


      console.log(req.session.userID + " Testing update call")
      let sql = "UPDATE _STUDENTS SET USERNAME = '" + req.session.userID + "', FIRSTNAME = '" + fname;
        sql = sql + "', LASTNAME = '" + lname + "', DOB = '" + dob + "', TELE = '" + tele + "', GENDER= '" + gender + "', ADDRESS = '" + addr + "', COURSES= '" + courses + "'";
        sql = sql + " WHERE COURSEID = " + req.body.courseid + "";
      
     await db.query(sql, (err) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 11')
          console.log(err)
         // res.status(500).send({message: err}); 
        }
        else {
          // once all is good, it returns this message to user.
          //res.status(200).send({message: 'SUCCESSFULLY UPDATED'}); 
          res.send(true);
        }
      })
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 22')
        console.log(err)
        res.status(500).send({message: err}); 
      }); 
    }
  }else if(req.method === 'GET') {

  }
});

app.all('/usercheck', function(req, res, next) {
  if(req.method === 'POST') {
    console.log("Testing userlogged in post b4")
 if(req.body.usercheck) {
  if(req.session.userID != null){
      res.send(true);
    }else{
      res.send(false);
    }
 }

    }
  else if (req.method === 'GET') {
     if(req.session.usercheck) {
  if(req.body.userID != null){
      res.send(true);
    }else{
      res.send(false);
    }
  }
}
});


app.all('/userreturn', function(req, res, next) {
  if(req.method === 'POST') {
    console.log("Testing userlogged in post  userreturn b4")
 if(req.body.usercheck) {
    console.log(req.session.userID)
  if(req.session.userID != null){
    console.log("returning user id")
    res.send(req.session.userID);
      
    }else{
      
      console.log("returning user id not null")
      res.send("");
    }
 }

    }
  else if (req.method === 'GET') {
     if(req.session.usercheck) {
  if(req.body.userID != null){
    res.send("");
  }else{
    res.send(req.session.userID);
    }
  }
}
});

app.all('/cancel', function(req, res, next) {
  if(req.method === 'POST') {
    console.log("Testing Cancel post b4")
 if(req.body.cancel) {
  console.log("Testing Cancel post after")
      let data=true;
      res.send(data);
    }
    }
  else if (req.method === 'GET') {
     if(req.body.cancel) {
      console.log("Testing Cancel get")
      let data=true;
      res.send(data);
    }
  }
});

app.all('/signup', function(req, res, next) {
  if(req.method === 'POST') {
 if(req.body.signup){
      let data = true;
      console.log("Testing get request")
      res.send(data);
    }
    
    }
  else if (req.method === 'GET') {
  }
});

app.all('/register', redirectReg, async function(req, res, next) {
  if(req.method === 'POST') {
      
      console.log(req.body.lastname)
      let sql = "INSERT INTO _USERS(USERNAME, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, SALT)" 
      sql = sql + " VALUES('" + req.body.username + "', '" + req.body.firstname + "', '" + req.body.lastname + "', '" + req.body.email + "', '" + req.body.password + "', 102);";
      console.log(sql)
       await db.query(sql, (err) => {
        if(err) {
          // if there's an error when returning query
          console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 1 failed')
          console.log(err)
          //res.status(500).send({message: err}); 
        }
        else {
          // once all is good, it returns this message to user. 
          //res.status(200).send({message: 'SUCCESSFULLY INSERTED'}); 
          res.send(true);
        }
      })
      .on('error', (err) => {
        // if there's an error when trying to execute query (DATABASE likely unavailable or TABLE fields not availabe
        // View server and browser logs to see actual error
        console.log('YOU MIGHT WANT TO CUSTOMIZE THIS MESSAGE 2 bwoy oh bwoy')
        console.log(err)
        //res.status(500).send({message: err}); 
      }); 
    
  }
  else if (req.method === 'GET') {
    // just returnign the form to display.

    res.sendFile(path.join(__dirname,'/registerForm.html'));
  

}
  
});
 
app.listen(3000);
