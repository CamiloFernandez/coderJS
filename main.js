let nombre, autor, codigo, registrar
const resgistro = []

function registrarLibro() {
  do {
    nombre = prompt("Ingrese el nombre del libro")
    autor = prompt("Ingrese el nombre del autor")
    codigo = prompt("Ingrese el código del libro(numérico)")

    if ((nombre == "") || (autor == "") || isNaN(codigo)) {
      alert("Por favor ingresa los datos correctamente")
    } else {
      alert("El libro se ha registrado correctamente")
    }
  } while ((nombre == "") || (autor == "") || isNaN(codigo))
  const libro = new libros(nombre, autor, codigo)
  resgistro.push(libro)
  console.log(resgistro)
}

do {
  registrar = prompt("¿Desea registrar otro libro? SI/NO").toLowerCase()
  if (registrar == "si") {
    registrarLibro()
  } else if (registrar == "no") {
    alert("¡Hasta luego!")
  } else {
    alert("Respuesta invalida, responde SI o NO")
  }
} while ((registrar == "") || (registrar == "si") || (registrar != "no"))