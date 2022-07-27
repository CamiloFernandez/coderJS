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
  modal('Registro Correcto', 'Ahora puede encontrar el libro en el registro', 'success')

  form.reset()
})

function showBooks(param) {
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

function deleteBookf(param) {
  let index = register.findIndex(book => book.code == param)
  register.splice(index, 1)
  localStorage.setItem('books', JSON.stringify(register))
  checkLocalStorage()
  container.innerHTML = ""
}

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
          console.log(result.value)
          if (result.value) {
            deleteBookf(book)
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

function searchName() {
  let searchedName = search.value.toLowerCase()
  let filterName = register.filter(book => book.name == searchedName)
  if (filterName.length == 0) {
    modal('Error', 'Nombre no encontrado', 'error')
  } else {
    showBooks(filterName)
  }
}

function searchAutor() {
  let searchedAutor = search.value.toLowerCase()
  let filterAutor = register.filter(book => book.autor == searchedAutor)
  if (filterAutor.length == 0) {
    modal('Error', 'Autor no encontrado', 'error')
  } else {
    showBooks(filterAutor)
  }
}

function searchGenres() {
  let searchedGenres = search.value.toLowerCase()
  let filterGenres = register.filter(book => book.genres == searchedGenres)
  if (filterGenres.length == 0) {
    modal('Error', 'Género no encontrado', 'error')
  } else {
    showBooks(filterGenres)
  }
}

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
      if (register.length > 0) {
        showBooks(register)
      } else {
        modal('Error', 'No se ha encontrado ningún libro en el registro', 'error')
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

function modal(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  })
}

checkLocalStorage()
