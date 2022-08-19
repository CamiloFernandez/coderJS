class Books {
  constructor(name, autor, genres, code) {
    this.name = name,
      this.autor = autor,
      this.genres = genres,
      this.code = code
  }
}

let code = 1
let option
let register = []

const form = document.getElementById('form')
const select = document.getElementById('select')
const search = document.getElementById('search')
const btnSearch = document.getElementById('btn-search')
const container = document.getElementById('cardsContainer')
const codeLabel = document.getElementById('code')
const formSearch = document.getElementById('formSearch')
const deleteBook = document.getElementById('deleteBook')
const loginWindow = document.getElementById('login')
const loginForm = document.getElementById('login-form')
const btnLogin = document.getElementById('btn-login')

//Chequea el local storage, trae lo datos guardados y actualiza el código de los libros

function checkLocalStorage() {
  if (localStorage.getItem('books')) {
    register = JSON.parse(localStorage.getItem('books'))
    if (register.length > 0) {
      let indexLastItem = (register.length - 1)
      let lastCode = register[indexLastItem].code
      code = lastCode + 1
    } else {
      code = 1
    }
    codeLabel.innerHTML = code
  }
}

//Trae los datos de usuarios desde el json

async function login(){
  const users = await fetch('../json/users.json')
  const parsedUsers = await users.json()
  return parsedUsers
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const loginUser = document.getElementById('user').value
    const loginPasswor = document.getElementById('password').value
  login().then(users =>{
    let logedUser = users.find(user => user.username == loginUser)
    if(logedUser == undefined){
      modal('Acceso denegado','Usuario o contraseña equivocados','error', 'center')
    }else{
      if(loginPasswor == logedUser.password){
      loginWindow.classList.remove('show-login')
    }else{
      modal('Acceso denegado','Usuario o contraseña equivocados','error', 'center')
    }
    }
  })
})

//Trae los datos desde el formulario, los convierte un objeto, lo pushea al array de libros y guarda el local storage

form.addEventListener('submit', (e) => {
  e.preventDefault()

  let name = document.getElementById('name').value.toLowerCase()
  let autor = document.getElementById('autor').value.toLowerCase()
  let genres = document.getElementById('genres').value.toLowerCase()

  const book = new Books(name, autor, genres, code)
  register.push(book)
  code++
  localStorage.setItem('books', JSON.stringify(register))
  codeLabel.innerText = code
  modal('Registro Correcto', `Ahora puede encontrar "${name}" en el registro`, 'success' )

  form.reset()
})

//Toma como parametro un array resulante de filtrar por nombre, autor, genero o codigo y los enseña todos en pantalla

function showBooks(param) {
  container.innerHTML =''
  param.forEach((bookSearch, index) => {
    container.innerHTML += `
    <div class="card card-animation" id="cardId${index}">
      <button class="btn-close" id="btn${index}"></button>
      <div class="card__section">
        <h2 class="card__subtitle">Nombre</h2>
        <p class="card__text">${bookSearch.name}</p>
      </div>
      <div class="card__section">
        <h2 class="card__subtitle">Autor</h2>
        <p class="card__text">${bookSearch.autor}</p>
      </div>
      <div class="card__section">
        <h2 class="card__subtitle">Genero</h2>
        <p class="card__text">${bookSearch.genres}</p>
      </div>
      <div class="card__section">
        <h2 class="card__subtitle">Código</h2>
        <p class="card__text">${bookSearch.code}</p>
      </div>
    </div>
      `
  })
}

//Le agrega la funcionalidad de quitar del DOM a los botones de las card
container.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    let card = e.target.parentNode
    card.classList.toggle('card-animation')
    card.classList.add('card-delete')
    function removeCard() {
      card.remove()
    }
    setTimeout(removeCard, 400)
  }
})

//Toma como parametro un codigo dado por el usuario,  busca y elimina el libro del array de libros y del local storage

function deleteBookfuntion(param) {
  let index = register.findIndex(book => book.code == param)
  register.splice(index, 1)
  localStorage.setItem('books', JSON.stringify(register))
  checkLocalStorage()
  container.innerHTML = ""
  modal('Eliminado', 'Libro eliminado exitosamente', 'success')
}

//Pide un codigo al usuario, lo busca y ejecuta la funcion para borrar libros usando el codigo dado

function deleteBookSwal() {
  Swal.fire({
    title: "Eliminar Libro",
    text: "Ingresa el código del libro a eliminar del registro:",
    input: 'number',
    showCancelButton: true,
    cancelButtonText: "CANCELAR"
  }).then((result) => {
    let book = result.value
    if (book != undefined) {
      let bookDelete = register.find(item => item.code == book)
      if (bookDelete == undefined) {
        Swal.fire("Libro no encontrado", "El codigo ingresado no corresponde a ningun libro en el registro", "error")
      } else {
        Swal.fire({
          title: "Eliminar Libro",
          text: `¿Seguro de querer eliminar el libro "${bookDelete.name}"?`,
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "CANCELAR"
        }).then((result) => {
          if (result.value) {
            deleteBookfuntion(book)
          }
        })
      }
    }
  })
}

deleteBook.addEventListener('click', (e) => {
  e.preventDefault()
  deleteBookSwal()
})

//Busca los libros a los que corresponda el nombre ingresado y ejecuta la funcion para mostrarlos en el DOM

function searchName() {
  let searchedName = search.value.toLowerCase()
  let filterName = register.filter(book => book.name == searchedName)
  if (filterName.length == 0) {
    modal('Error', 'Nombre no encontrado', 'error')
  } else {
    showBooks(filterName)
  }
}

//Busca los libros a los que corresponda el autor ingresado y ejecuta la funcion para mostrarlos en el DOM

function searchAutor() {
  let searchedAutor = search.value.toLowerCase()
  let filterAutor = register.filter(book => book.autor == searchedAutor)
  if (filterAutor.length == 0) {
    modal('Error', 'Autor no encontrado', 'error')
  } else {
    showBooks(filterAutor)
  }
}

//Busca los libros a los que corresponda el genero ingresado y ejecuta la funcion para mostrarlos en el DOM

function searchGenres() {
  let searchedGenres = search.value.toLowerCase()
  let filterGenres = register.filter(book => book.genres == searchedGenres)
  if (filterGenres.length == 0) {
    modal('Error', 'Género no encontrado', 'error')
  } else {
    showBooks(filterGenres)
  }
}

//Busca los libros a los que corresponda el codigo ingresado y ejecuta la funcion para mostrarlos en el DOM

function searchCode() {
  let searchedCode = parseInt(search.value)
  let filterCode = register.find(book => book.code == searchedCode)
  if (filterCode == undefined) {
    modal('Error', 'Código no encontrado', 'error')
  } else {
    let filterCodeArray = []
    filterCodeArray.push(filterCode)
    showBooks(filterCodeArray)
  }
}

function showAll(){
  if (register.length > 0) {
    showBooks(register)
  }else {
    modal('Error', 'No se ha encontrado ningún libro en el registro', 'error')
}
}

//Comprueba la opcion seleccionada en el select y ejecuta una funcion dependiendo de cual opcion esta en el select

btnSearch.addEventListener('click', (e) => {
  e.preventDefault()
  switch (option) {
    case 'name':
      searchName()
      break
    case 'autor':
      searchAutor()
      break
    case 'genres':
      searchGenres()
      break
    case 'code':
      searchCode()
      break
    case 'all':
      showAll()
      break
  }
  search.value = ''
})

//Actualiza el placeholder dependiendo de la opcion seleccionada y se se selecciono "all" ejecuta la funcion para mostrar todos en el DO;

select.addEventListener('change', () => {
  option = document.getElementById('select').value
  switch (option) {
    case 'name':
      search.placeholder = 'Ingrese el nombre del libro'
      break
    case 'autor':
      search.placeholder = 'Ingrese el autor del libro'
      break
    case 'genres':
      search.placeholder = 'Ingrese el genero del libro'
      break
    case 'code':
      search.placeholder = 'Ingrese el código del libro'
      break
    case 'all':
      search.placeholder = 'Se enseñaran todos los libros'
      showAll()
      break  
  }
})

function modal(title, text, icon, position = 'bottom') {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    position: position,
  })
}

checkLocalStorage()
