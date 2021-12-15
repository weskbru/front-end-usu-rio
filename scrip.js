
listaDeUsuario = [];

// função criada para gravar nome + email do ususario no banco de dados
function gravarUsuario() {
    
  id = document.getElementById("id").value;
  nome = document.getElementById("nome").value;
  email = document.getElementById("email").value;
  url = `nome=${nome}&email=${email}`;

  // aqui esta o metodo usado para fazer a gravação com ajax
  const xhttp = new XMLHttpRequest();

  // função para verificar e atualizar os input nome e email com o mesmo id 
  if(id == ''){
    xhttp.open( "POST", "https://app-senai-21.herokuapp.com/demo/add?" + url); // a variavel url usada para concatena com o metodo post e add
  }else{
    xhttp.open( "PUT", `https://app-senai-21.herokuapp.com/demo/update/${id}?${url}`);
  }

  xhttp.send();
  xhttp.onload = function () {
    alert(this.responseText);
    atualizarTabela();
    limparCampo();  
  };
}

// criação da função limpar campos de cadastro do ususario
function limparCampo() {
  document.getElementById("id").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
}

// criação da função atualizar tabela de cadastro
function atualizarTabela() {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "https://app-senai-21.herokuapp.com/demo/all");
  xhttp.send();
  xhttp.onload = function () {
    
    listaDeUsuario = JSON.parse(this.responseText); // faz a conversão da variavel listaDeUsuario
    texto = "";

    // fazendo o laço de repetição
    for (i in listaDeUsuario) {
      usuario = listaDeUsuario[i];
      texto += `<tr onclick='carregarUsuario(${i})'><td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td></tr>`;
      // variavel texto concatenando com tabela e fazendo atualizações das linhas  com id , nome , email
    }

    document.getElementById("corpo-tabela").innerHTML = texto;

  };
}

// função que faz o preenchimento dos campos das caixas de cadastros
function carregarUsuario(i) {
  
  u = listaDeUsuario[i];
  document.getElementById("id").value = u.id;
  document.getElementById("nome").value = u.nome; // preencher o input nome
  document.getElementById("email").value = u.email; // preencher o input email
}

// função criada para deleta usuario
function apagarUsuario() {
  id = document.getElementById("id").value;

  // função criada para verificar se tem algum nome e email de usuário selecionado com uma caixa de mensage
  if(id == ''){
    alert("necessário selecionar algum registro!");
    return;
  }
  
  // função criada para questionar a ação do usuário com uma ciaxa de mensage
  if (!confirm("Realmente deseja apagar esse registro?")) {
    return;
  }

  // aqui esta o metodo usado para fazer a gravação
  const xhttp = new XMLHttpRequest();
  xhttp.open( "DELETE", "https://app-senai-21.herokuapp.com/demo/delete/" + id); 
  xhttp.send();
  xhttp.onload = function () {
    alert(this.responseText);
    atualizarTabela();
    limparCampo();
  };
}