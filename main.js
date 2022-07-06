let nombre, autor, codigo, registrar
const resgistro = [] 
function registrarLibro() {
  do {
  nombre = prompt("Ingrese el nombre del libro")
  autor = prompt("Ingrese el nombre del autor")
  codigo = prompt("Ingrese el codigo del libro")
  if((nombre == "") || (autor == "") || isNaN(codigo)){
    alert("Por favor ingresa los datos correctamente")
  }
} while ((nombre == "") || (autor == "") || isNaN(codigo))
const libro = new libros(nombre, autor, codigo)
resgistro.push(libro)
console.log(resgistro)
}

do{
  registrar = prompt("Decea registrar otro libro? SI/NO").toLowerCase()
  if(registrar == "si"){
    registrarLibro()
  }else if(registrar == "no"){
    alert("¡Hasta luego!")
  }else{
    alert("respuesta invalida, responde SI o NO")
  }
}while((registrar == "")||(registrar == "si"))