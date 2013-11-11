exports.createSchema = function(mongoose){
mongoose.connect("mongodb://localhost/dt");
//Documento Logo encargado del almacenamiento de los logos 	
var UsuarioSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	dia: Number,
	mes: Number,
	año: Number,
	sexo: String, 
	cedula: String,
	celular: String,
	correo: String,
	nick: String,
	cuenta: String,
	direccion: String,
	contraseña: String,
	date: { type: Date, default: Date.now},
	saldo: { type: Number, default: "100000"}, 
});
Usuario = mongoose.model("usuarios",UsuarioSchema);

}