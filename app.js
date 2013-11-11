/*hola a migos
/**
 * Module dependencies.
 */ 
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var models = require('./models');
models.createSchema(mongoose);

var fs = require('fs');
var async = require('async');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'hola' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/index', routes.index);
app.post('/', routes.index);
app.get('/users', user.list);
app.get('/registro', routes.registro);

app.post("/index", function(req,res){
  var nombreu = req.body.nombres;
  var apellido = req.body.apellido;
  var dia = req.body.dia;
  var mes = req.body.mes;
  var año = req.body.año;
  var sexo = req.body.sexo;
  var cedula = req.body.cedula;
  var celular = req.body.celular;
  var cuenta = req.body.cuenta;
  var direccion = req.body.direccion;
  var email = req.body.correo;
  var nick = req.body.nick;
  var contraseña = req.body.contraseña;
  var saldo = req.body.saldo;
  Usuario.findOne(req.params.nick, function (err, doc) {
  if(doc.nick == nick){
    res.render('registro',{mensaje: "El usuario ya existe"});
  }
  else
  {
     new Usuario({ 
          nombre: nombreu,
          apellido: apellido,
          dia: dia,
          mes: mes,
          año: año,
          sexo: sexo,
          cedula: cedula,
          cuenta: cuenta,
          direccion: direccion,
          celular: celular,
          correo: email,
          nick: nick,
          contraseña: contraseña
        }).save(function(err,docs){
          if(err) res.send("error");
          res.send(docs);
        res.render('index');
        });
      }    
      });  
  });
app.get('/recarga', function(req, res){
  var mensajer = req.params.mensaje
  if (req.session.miVariable!=null) {        
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, resources) {
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, docs) {      
    res.render("recarga", {
      usuarios: resources,
      users: docs,
      title: "Recargar Movil",
      mensaje: mensajer
      });
    });
  });              
}else{
    res.render('index',{mensaje: "Debes iniciar sesion.",title:'Login'});
  };     
});
app.get('/recarga/:mensaje', function(req, res){
  var mensajer = req.params.mensaje
  if (req.session.miVariable!=null) {        
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, resources) {
   
    res.render("tablareca", {
      usuarios: resources,
      
      title: "Recargar Movil",
      mensaje: mensajer
      });
    
  });               
}else{
    res.render('index',{mensaje: "Debes iniciar sesion.",title:'Login'});
  };     
});

app.post('/recarga', function(req, res){
  var nusaldo = req.body.carga;
    if (req.session.miVariable!=null) {
      Usuario.findOne({nick: req.session.miVariable},function (err,doc){
      Usuario.findOne({nick: req.session.miVariable}).exec(function (err, docs) { 
      var saldos = doc.saldo;
      var nSaldo;
      if(saldos == 10000 || saldos<=nusaldo || saldos<=10000){
        var mensaje= "No posee fondos suficientes para esta operacion"; 
        res.redirect("/recarga/" + mensaje);
      }else{ 
       users: docs,
       nSaldo = saldos-nusaldo;
       doc.saldo =nSaldo;
  
      if (nSaldo<10000) {
        var mensaje= "No posee fondos suficientes para esta operacion"; 
        res.redirect("/recarga/" + mensaje);
      }else{
       doc.save();
       var mensaje= "Recargar Realizada Correctamente."; 
        res.redirect("/recarga/" + mensaje);
          };
        }; 
      });
    });
  }else{
      res.render('index',{mensaje: "Debes iniciar sesion.",title:'Login'});
    }; 
});
app.get('/inicio', function(req, res){
  if (req.session.miVariable != null) {
    Usuario.findOne({nick: req.session.miVariable}, function  (err, docs) {
      res.render('inicio', {users: docs, title: 'Inicio'});
    })
  }else{
    res.render('index',{mensaje: "No has iniciado sesion.", title: 'Login'});
  };
});    
app.post("/inicio", function(req, res){
Usuario.findOne({nick: req.body.nicks, contraseña: req.body.contraseñas } ,function (err, usuario) {
    //Se verifica si encontro algun usuario 
    if (usuario == null) {
      //como no encontro ningun usuario re direcciona a login con un mensaje 
      res.render('index',{mensaje: "La contraseña y el usuario que introdujiste no coinciden.", title: 'Login'});
    }else{
      req.session.miVariable = usuario.nick;
      res.render('inicio' ,{users: usuario , usua: req.session.loggedIn, title: 'Inicio'});
    } 
  }); 
});

app.get("/salAhorro", function (req , res) {
if (req.session.miVariable != null){
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, resources) {
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, docs){
    if(resources.cuenta=="Ahorros"){
    res.render("salAhorro", {
      usuarios: resources,
      users: docs,
      title: "Saldo Cuenta Ahorro"                  
        });
     }else{
      res.render("index", {mensaje: "usted no porsee cuenta de Ahorros"});
     }
      });
    });

  }else{
    res.render("index" ,{  mensaje: "Debes iniciar sesion"});
  };
 });
app.get("/salCorriente", function (req , res) {
if (req.session.miVariable != null){
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, resources) {
  Usuario.findOne({nick: req.session.miVariable}).exec(function (err, docs){
    if(resources.cuenta=="Corriente"){
    res.render("salCorriente", {
      usuarios: resources,
      users: docs,
      title: "Saldo Cuenta Corriente"                  
        });
     }else{
      res.render("index", {mensaje: "usted no posee cuenta Corriente"});
     }
      });
    });

  }else{
    res.render("index" ,{  mensaje: "Debes iniciar sesion"});
  };
 });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});