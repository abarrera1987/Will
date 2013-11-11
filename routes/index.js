
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Login' });
};

exports.registro = function(req, res){
  res.render('registro', { title: 'Digital Transfer' });
};
exports.recarga = function(req, res){
  res.render('recarga', { title: 'Recargar Movil' });
};
exports.inicio = function(req, res){
  res.render('inicio', { title: 'Digital Transfer' });
};
exports.salAhorro = function (req, res) {
	res.render('salAhorro', {title: 'Saldo Cuenta Ahorro'})
}
exports.salCorriente = function (req, res) {
	res.render('salCorriente', {title: 'Saldo Cuenta Corriente'})
}