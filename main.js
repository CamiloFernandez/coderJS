class Libros {
  constructor(nombre, autor, genero, codigo) {
    this.nombre = nombre,
    this.autor = autor,
    this.genero = genero,
    this.codigo = codigo
  }
}

const registro = []

//Funcion para registrar los libros

function registrarLibro() {
  let nombre, autor, genero, codigo

  do {
    nombre = prompt("Por favor ingrese el nombre del libro.").toLowerCase()
    autor = prompt("Por favor ingrese el nombre del autor.").toLowerCase()
    genero = prompt("Por favor ingrese el genero del libro.").toLowerCase()
    codigo = parseInt(prompt("Por favor Ingrese el código del libro.(numérico mayor a 0)"))

    if (nombre == "" || autor == "" || genero== "" || codigo == 0) {
      alert("Por favor ingresa los datos correctamente.")
    } else {
      alert("El libro se ha registrado correctamente.")
    }
  } while (nombre == "" || autor == "" || genero== "" || codigo == 0)
  const libro = new Libros(nombre, autor, genero, codigo)
  registro.push(libro)
}

//Funcion para buscar un libro por su codigo y mostrarlo en consola

function consultarCodigo(registro){
 let consultaCodigo = parseInt (prompt("Por favor ingrese el codigo del libro."))
 let codigoBuscado = registro.find(libro => libro.codigo == consultaCodigo)

 if(consultaCodigo == undefined){
  alert("Código no encontrado.")
 }else{
  console.log(codigoBuscado)
 }
}

//Funcion para buscar un libro por su nombre y mostrarlo en consola

function consultarNombre(registro){
  let consultaNombre = prompt("Por favor ingrese el nombre del libro.").toLowerCase()
  let nombreBuscado = registro.find(libro => libro.nombre == consultaNombre)

  if(consultaNombre  == undefined){
    console.log("Nombre no encontrado")
  }else{
    console.log(nombreBuscado)
  }
}

//Funcion para buscar libros por el nombre del autor y mostrarlos en consola

function consultarAutor(registro){
  let consultaAutor = prompt("Por favor ingrese el nombre del autor.").toLowerCase()
  let autorBuscado = registro.filter(libro => libro.autor == consultaAutor)

  if(autorBuscado.length == 0){
    alert("Autor no encontrado")
  }else{
   autorBuscado.forEach(librosAutor => console.log(librosAutor))
  }
}

//Funcion para buscar libros por el genero y mostrarlos en consola

function consultarGenero(registro){
  let consultaGenero = prompt("Por favor ingrese el genero.").toLowerCase()
  let generoBuscado = registro.filter(libro => libro.genero == consultaGenero)

  if(generoBuscado.length == 0){
    alert("Genero no encontrado")
  }else{
    generoBuscado.forEach(librosGenero => console.log(librosGenero))
  }
}

//FUncion para mostrar todos los libros registrados

function mostrarTodos(registro){
  registro.forEach(librosTodos => console.log(librosTodos))
}

//Elegir con que parametro buscar los libros

function consultarLibro(){
 let consulta = parseInt(prompt(`Ingrese un número para:
 1- Consultar libro por su codigo.
 2- Consultar libro por su nombre.
 3- Consultar libros por su autor.
 4- Consultar libros por su genero.
 5- Ver todos los libros registrados.
 `))

 switch(consulta){
  case 1:
    consultarCodigo(registro)
    break
  case 2:
    consultarNombre(registro)
    break
  case 3:
    consultarAutor(registro)
    break
  case 4:
    consultarGenero(registro)
    break
  case 5:
    mostrarTodos(registro)
    break
  default:
    alert("Por favor ingrese una opción valida")
 }
}

let inicio

do{
  inicio = parseInt(prompt(`Ingrese un número para:
  1- Registrar libros.
  2- Consultar libros.
  3- Salir.
  `)) 
  if(inicio == 1){
    registrarLibro()
  }else if(inicio == 2){
    consultarLibro()
  }else if(inicio == 3){
    alert("¡Hasta luego!")
  }else{
    alert("Por favor ingrese una opción valida.")
  }
  }while(inicio != 3)