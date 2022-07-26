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
const container = document.getElementById('books')
const codeLabel = document.getElementById('code')
const formSearch = document.getElementById('formSearch')


function checkLocalStorage() {
  if (localStorage.getItem('books')) {
    register = JSON.parse(localStorage.getItem('books'))
    const lastBook = register.length
    code = lastBook + 1
    codeLabel.innerHTML = code
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault()

  let name = document.getElementById('name').value.toLowerCase()
  let autor = document.getElementById('autor').value.toLowerCase()
  let genres = document.getElementById('genres').value.toLowerCase()

  if (name == "" || autor == "" || genres == "") {
    alert('Por favor ingresa datos validos')
  } else {
    const book = new Books(name, autor, genres, code)
    register.push(book)
    code++
    localStorage.setItem('books', JSON.stringify(register))
    codeLabel.innerText = code
    modal('Registro Correcto','Ahora puede encontrar el libro en el registro', 'success')
  }
  form.reset()
})

function showBooks(param) {
  param.forEach(bookSearch => {
    container.innerHTML += `
      <div class="card" id="cardId${bookSearch.code}">
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

function searchName() {
  let searchedName = search.value.toLowerCase()
  let filterName = register.filter(book => book.name == searchedName)
  if (filterName.length == 0) {
    modal('Error','Nombre no encontrado', 'error')
  } else {
    showBooks(filterName)
  }
}

function searchAutor() {
  let searchedAutor = search.value.toLowerCase()
  let filterAutor = register.filter(book => book.autor == searchedAutor)
  if (filterAutor.length == 0) {
    modal('Error','Autor no encontrado', 'error')
  } else {
    showBooks(filterAutor)
  }
}

function searchGenres() {
  let searchedGenres = search.value.toLowerCase()
  let filterGenres = register.filter(book => book.genres == searchedGenres)
  if (filterGenres.length == 0) {
    modal('Error','Género no encontrado','error')
  } else {
    showBooks(filterGenres)
  }
}

function searchCode() {
  let searchedCode = parseInt(search.value)
  let filterCode = register.find(book => book.code == searchedCode)
  if (filterCode == undefined) {
    modal('Error','Código no encontrado','error')
  } else {
    container.innerHTML += `
      <div class="card" id="cardId${filterCode.code}">
      <div class="card__section">
        <h2 class="card__subtitle">Nombre</h2>
        <p class="card__text">${filterCode.name}</p>
      </div>
      <div class="card__section">
        <h2 class="card__subtitle">Autor</h2>
        <p class="card__text">${filterCode.autor}</p>
      </div>
      <div class="card__section">
        <h2 class="card__subtitle">Genero</h2>
        <p class="card__text">${filterCode.genres}</p>
      </div>
      <div class="card__section">
        <h2 class="card__subtitle">Código</h2>
        <p class="card__text">${filterCode.code}</p>
      </div>
    </div>
      `
  }
}

btnSearch.addEventListener('click', (e) => {
  e.preventDefault()
  container.innerHTML = ""
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
      if(register.length > 0){
        showBooks(register)
      }else{
        modal('Error','Aun no se ha registrado ningún libro','error')
      }
      break
  }
  formSearch.reset()
})

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
  }
})

function modal(title,text,icon){
  Swal.fire({
  title: title,
  text: text,
  icon: icon,
  confirmButtonText: 'OK'
  })
}

checkLocalStorage()