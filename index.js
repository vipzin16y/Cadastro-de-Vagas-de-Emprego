let vagas = JSON.parse(localStorage.getItem("vagas")) || []

const listaVagas = document.getElementById("listaVagas")

function salvarVagas() {
  localStorage.setItem("vagas", JSON.stringify(vagas))
}

function criarVaga() {
  const nome = document.getElementById("nome").value
  const descricao = document.getElementById("descricao").value
  const data = document.getElementById("data").value

  if (!nome || !descricao || !data) {
    alert("Preencha todos os campos!")
    return
  }

  vagas.push({
    nome,
    descricao,
    data,
    candidatos: []
  })

  salvarVagas()
  listarVagas()

  document.getElementById("nome").value = ""
  document.getElementById("descricao").value = ""
  document.getElementById("data").value = ""
}

function listarVagas() {
  listaVagas.innerHTML = ""

  vagas.forEach((vaga, indice) => {
    const div = document.createElement("div")
    div.className = "vaga"

    div.innerHTML = `
      <strong>${vaga.nome}</strong>
      <p>${vaga.descricao}</p>
      <p>Data limite: ${vaga.data}</p>
      <p>Candidatos: ${vaga.candidatos.length}</p>

      <input type="text" placeholder="Nome do candidato" id="candidato-${indice}">
      <button onclick="inscreverCandidato(${indice})">Inscrever</button>
      <button onclick="excluirVaga(${indice})">Excluir</button>
    `

    listaVagas.appendChild(div)
  })
}

function inscreverCandidato(indice) {
  const input = document.getElementById(`candidato-${indice}`)
  const nome = input.value

  if (!nome) {
    alert("Digite o nome do candidato!")
    return
  }

  vagas[indice].candidatos.push(nome)
  salvarVagas()
  listarVagas()
}

function excluirVaga(indice) {
  if (confirm("Deseja excluir essa vaga?")) {
    vagas.splice(indice, 1)
    salvarVagas()
    listarVagas()
  }
}

/* 🌙 DARK MODE */
const toggleTheme = document.getElementById("toggleTheme")

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    toggleTheme.textContent = "☀️ Modo Claro"
    localStorage.setItem("tema", "dark")
  } else {
    toggleTheme.textContent = "🌙 Modo Escuro"
    localStorage.setItem("tema", "light")
  }
})

if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark")
  toggleTheme.textContent = "☀️ Modo Claro"
}

listarVagas()
