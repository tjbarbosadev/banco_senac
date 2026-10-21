// 1. Dados em Memória
const clientes = [
  { cpf: "111.222.333-44", senha: "123", nome: "Dennis Lopes", saldo: 5000 },
  { cpf: "222.333.444-55", senha: "123", nome: "Nicolas Silva", saldo: 1500 },
  { cpf: "333.444.555-66", senha: "123", nome: "Ana Maria", saldo: 3000 },
  { cpf: "444.555.666-77", senha: "123", nome: "Bruno Costa", saldo: 500 },
  { cpf: "555.666.777-88", senha: "123", nome: "Carla Souza", saldo: 10000 },
];

let usuarioLogado = null;

// 2. Seleção de Elementos (DOM)
const secaoLogin = document.querySelector("#login-section");
const secaoCadastro = document.querySelector("#cadastro-section");
const secaoSucesso = document.querySelector("#sucesso-section");
const secaoPainel = document.querySelector("#painel-section");

const campoSaldo = document.querySelector("#saldo-valor");
const boasVindas = document.querySelector("#boas-vindas");
const loginErro = document.querySelector("#login-erro");

// 3. Alternância entre Telas (Login <-> Cadastro)
document.querySelector("#link-ir-cadastro").addEventListener("click", (e) => {
  e.preventDefault();
  secaoLogin.style.display = "none";
  secaoCadastro.style.display = "block";
});

document.querySelector("#link-voltar-login").addEventListener("click", (e) => {
  e.preventDefault();
  secaoCadastro.style.display = "none";
  secaoLogin.style.display = "block";
});

// 4. Eventos de Login
document.querySelector("#btn-login").addEventListener("click", () => {
  const cpfDigitado = document.querySelector("#input-cpf").value.trim();
  const senhaDigitada = document.querySelector("#input-senha").value.trim();

  console.log("cpfValidFormat", cpfValidFormat(cpfDigitado));

  const clienteEncontrado = clientes.find(
    (c) => c.cpf === cpfDigitado && c.senha === senhaDigitada
  );

  if (clienteEncontrado) {
    usuarioLogado = clienteEncontrado;
    loginErro.style.display = "none";
    secaoLogin.style.display = "none";
    secaoPainel.style.display = "block";

    campoSaldo.textContent = `R$ ${usuarioLogado.saldo.toFixed(2)}`;
    boasVindas.textContent = `Olá, ${usuarioLogado.nome}`;
  } else {
    loginErro.style.display = "block";
  }
});

// 5. Lógica de Submissão de Cadastro (Onde aplicaremos as RegEx)
document.querySelector("#form-cadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = formCadastro.querySelector("#cad-nome").value.trim();
  const cpf = formCadastro.querySelector("#cad-cpf").value.trim();
  const email = formCadastro.querySelector("#cad-email").value.trim();
  const celular = formCadastro.querySelector("#cad-celular").value.trim();
  const senha = formCadastro.querySelector("#cad-senha").value.trim();
  const confirmaSenha = formCadastro
    .querySelector("#cad-confirma-senha")
    .value.trim();

  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexCelular = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

  if (!regexNome.test(nome)) {
    alert("Nome inválido. Use apenas letras e espaços.");
    return;
  }

  if (!regexCPF.test(cpf)) {
    alert("CPF inválido. Use o formato 000.000.000-00.");
    return;
  }

  if (!regexEmail.test(email)) {
    alert("E-mail inválido.");
    return;
  }

  if (!regexCelular.test(celular)) {
    alert("Celular inválido. Use o formato (00) 00000-0000.");
    return;
  }

  if (senha !== confirmaSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  alert("Cadastro realizado com sucesso!");
  secaoCadastro.style.display = "none";
  secaoSucesso.style.display = "block";
});
document.querySelector("#form-cadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  // TODO: Os alunos vão validar os campos com RegEx e conferir se as senhas coincidem.
  // Após a validação com sucesso, transita para a tela de análise:
  secaoCadastro.style.display = "none";
  secaoSucesso.style.display = "block";
});

// 6. Botão para voltar ao início a partir da tela de sucesso
document.querySelector("#btn-voltar-inicio").addEventListener("click", () => {
  location.reload();
});

// 7. Operações Bancárias (Espaço reservado para as próximas aulas / API)
document.querySelector("#btn-depositar").addEventListener("click", () => {});
document.querySelector("#btn-sacar").addEventListener("click", () => {});
document.querySelector("#btn-transferir").addEventListener("click", () => {});

document.querySelector("#btn-sair").addEventListener("click", () => {
  location.reload();
});

// formatar cpf
function cpfValidFormat(number) {
  const regexCPF = /^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/g;
  return regexCPF.test(number);
}

// 8. Seleciona o formulário de cadastro na página
const formCadastro = document.querySelector("#form-cadastro");
if (formCadastro) {
  formCadastro.addEventListener("input", () => {
    const dadosRascunho = {
      nome: formCadastro.querySelector("#cad-nome").value,
      cpf: formCadastro.querySelector("#cad-cpf").value,
      email: formCadastro.querySelector("#cad-email").value,
      celular: formCadastro.querySelector("#cad-celular").value,
      cep: formCadastro.querySelector("#cad-cep").value,
      endereco: formCadastro.querySelector("#cad-endereco").value,
      cidade: formCadastro.querySelector("#cad-cidade").value,
      estado: formCadastro.querySelector("#cad-estado").value,
      senha: formCadastro.querySelector("#cad-senha").value,
      confirmaSenha: formCadastro.querySelector("#cad-confirma-senha").value,
    };

    localStorage.setItem(
      "senac_rascunho_cadastro",
      JSON.stringify(dadosRascunho)
    );
  });
}

// 9. Executado recuperação dos dados assim que a página é carregada
if (localStorage.getItem("cadastroRascunho")) {
  const draft = JSON.parse(localStorage.getItem("cadastroRascunho"));
  formCadastro.querySelector("#cad-nome").value = draft.nome || "";
  formCadastro.querySelector("#cad-cpf").value = draft.cpf || "";
  formCadastro.querySelector("#cad-email").value = draft.email || "";
  formCadastro.querySelector("#cad-celular").value = draft.celular || "";
  formCadastro.querySelector("#cad-cep").value = draft.cep || "";
  formCadastro.querySelector("#cad-endereco").value = draft.endereco || "";
  formCadastro.querySelector("#cad-cidade").value = draft.cidade || "";
  formCadastro.querySelector("#cad-estado").value = draft.estado || "";
  formCadastro.querySelector("#cad-senha").value = draft.senha || "";
  formCadastro.querySelector("#cad-confirma-senha").value =
    draft.confirmaSenha || "";
}

// 10. Limpeza ao submeter o formulário com sucesso
formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();

  // Remova o rascunho do localStorage
  localStorage.removeItem("cadastroRascunho");

  // Resete o formulário
  formCadastro.reset();

  secaoCadastro.style.display = "none";
  secaoSucesso.style.display = "block";
});

// 11. Botão de descarte manual do rascunho
const btnLimparRascunho = document.querySelector("#link-limpar-rascunho");

if (btnLimparRascunho) {
  btnLimparRascunho.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Deseja realmente descartar o rascunho do cadastro?")) {
      localStorage.removeItem("senac_rascunho_cadastro");
      formCadastro.reset();
    }
  });
}
