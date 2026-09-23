
S1_Tutorial_Setup_POO.md

100%
# S1 · Mãos à Obra — Setup do ambiente e os quatro pilares em código

**Programação Web · UEPB · 2026.2 · Prof. Rodrigo Alves Costa**
**Quarta-feira, 23/09/2026 · 2h**

| Bloco | Duração | O que acontece |
|---|---|---|
| Abertura | ~10 min | Conferir quem já tem o quê instalado |
| **Parte A** — Setup replicado | ~50 min | Node.js, VS Code, Git, GitHub |
| **Parte B** — Os quatro pilares em código | ~50 min | Conta bancária em JS, um commit por pilar, primeiro push |
| Fechamento | ~10 min | Plenária, checklist e entrega no Classroom |

**Entregável:** link do seu repositório público `progweb-p1-nome-sobrenome`, com o push feito, na atividade da S1 no Google Classroom. Prazo: quinta 24/09, 23h59.

**Traga:** notebook carregado e conta no GitHub já criada.

---

## Hoje vimos…

1. **Abstração** (Liskov, 1974): ficar com o essencial e expor um contrato. Hoje: a classe `Conta` e, no fim, a classe abstrata com `new.target`.
2. **Encapsulamento** (Parnas, 1972): o objeto é dono do seu estado. Hoje: `#saldo`, `get` e `set`.
3. **Herança** (Simula 67): especializar sem copiar, só quando passa no teste do "é-um". Hoje: `extends` e `super`.
4. **Polimorfismo**: a mesma mensagem, respostas diferentes. Hoje: `tarifaMensal()` sem nenhum `if`.
5. **`class` em JavaScript é açúcar sobre protótipos** (ES2015) e, na dúvida entre herdar e compor, componha (GoF, 1994). Hoje: o desafio opcional do `Extrato`.

> **Como ler este tutorial.** Blocos marcados com **Windows** ou **Linux** são alternativos: siga só o do seu sistema. Todo passo termina com um **✅ Checkpoint**. Não avance sem passar por ele; se travar, vá à seção [Problemas comuns](#problemas-comuns) ou levante a mão.

---

# PARTE A — Setup replicado (~50 min)

## Passo A1 — Abrir o terminal certo

- **Windows:** menu Iniciar → digite `PowerShell` → abra o **Windows PowerShell** (ou o **Terminal**). Não precisa ser como administrador.
- **Linux:** `Ctrl + Alt + T`.

✅ **Checkpoint:** um terminal aberto, com o cursor piscando.

---

## Passo A2 — Node.js (LTS)

Vamos instalar a versão **LTS (Long-Term Support, suporte de longo prazo)**, que hoje é a **v24**. O mínimo aceito na disciplina é a **v22**, porque na S5 usaremos o módulo nativo `node:sqlite`, que não existe antes dela.

> Em 28/10/2026 a v26 também vira LTS. Qualquer uma das duas serve; quem instalar hoje fica com a 24 e não precisa trocar.

### Windows

Opção 1, pelo terminal (recomendada):

```powershell
winget install OpenJS.NodeJS.LTS
```

Opção 2, pelo instalador: baixe o **LTS** em <https://nodejs.org>, execute o `.msi` e avance com as opções padrão (deixe marcada a opção **Add to PATH**).

**Feche o terminal e abra de novo** (o PATH só é relido em terminais novos).

### Linux (Ubuntu, Mint, Debian e derivados)

Usaremos o **nvm (Node Version Manager)**, que instala o Node na sua pasta de usuário, sem `sudo`. Isso evita a versão antiga que vem no `apt`.

```bash
sudo apt update && sudo apt install -y curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

Feche e abra o terminal (ou rode `source ~/.bashrc`) e então:

```bash
nvm install --lts
nvm alias default 'lts/*'
```

> Se a página <https://github.com/nvm-sh/nvm> mostrar uma versão do nvm mais nova que a 0.40.5, use o comando que estiver lá.

### ✅ Checkpoint A2

```bash
node -v
npm -v
```

- `node -v` deve mostrar **`v22.x.x` ou superior** (o esperado hoje é `v24.x.x`).
- `npm -v` deve mostrar `10.x` ou `11.x`.

Teste final, que prova que o `node:sqlite` da S5 vai funcionar na sua máquina:

```bash
node -e "require('node:sqlite'); console.log('sqlite ok')"
```

Deve imprimir `sqlite ok` (na v22 pode vir junto um aviso `ExperimentalWarning`; tudo bem).

---

## Passo A3 — Git

### Windows

```powershell
winget install Git.Git
```

Ou baixe em <https://git-scm.com/downloads> e avance com as opções padrão. Feche e reabra o terminal.

### Linux

```bash
sudo apt install -y git
```

### Configuração (todos os sistemas)

Use o **seu nome** e o **mesmo e-mail da sua conta do GitHub**. É isso que aparece em cada commit e é por aí que eu vejo quem fez o quê.

```bash
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu-email@exemplo.com"
git config --global init.defaultBranch main
```

### ✅ Checkpoint A3

```bash
git --version
git config --global --list
```

- `git --version` deve mostrar `git version 2.x`.
- A lista deve conter as três linhas: `user.name=…`, `user.email=…` e `init.defaultbranch=main`.

---

## Passo A4 — VS Code e extensões

### Windows

```powershell
winget install Microsoft.VisualStudioCode
```

Ou baixe em <https://code.visualstudio.com>. No instalador, marque **"Adicionar em PATH"** e **"Abrir com Code"**.

### Linux

```bash
sudo snap install code --classic
```

(Sem snap? Baixe o `.deb` em <https://code.visualstudio.com> e rode `sudo apt install ./code_*.deb`.)

### Extensões

Feche e reabra o terminal e rode, **uma linha de cada vez**:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension rangav.vscode-thunder-client
```

| Extensão | Para que serve | Quando usamos |
|---|---|---|
| **ESLint** | aponta erros e más práticas em JS | a partir da S2 |
| **Prettier** | formata o código ao salvar | sempre |
| **GitLens** | mostra o histórico do Git dentro do editor | sempre |
| **Thunder Client** | cliente HTTP para testar a API sem sair do VS Code | **S3** em diante |

Prefere pelo mouse? No VS Code, `Ctrl + Shift + X`, busque cada nome e clique em **Install**.

Para formatar ao salvar: `Ctrl + ,` → busque **Format On Save** → marque. Depois busque **Default Formatter** → escolha **Prettier**.

### ✅ Checkpoint A4

```bash
code --version
code --list-extensions
```

A lista deve conter `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode`, `eamodio.gitlens` e `rangav.vscode-thunder-client`. No VS Code, um ícone de **raio** aparece na barra lateral esquerda (é o Thunder Client).

---

## Passo A5 — Conta no GitHub e autenticação

Se ainda não tem conta: <https://github.com/signup>. Use um nome de usuário profissional (ele vai para o seu currículo) e **confirme o e-mail**.

O GitHub **não aceita a senha da conta** no `git push`. Precisamos autenticar a máquina uma vez. O caminho mais simples é o **GitHub CLI** (`gh`), a ferramenta oficial de linha de comando.

### Windows

```powershell
winget install GitHub.cli
```

Feche e reabra o terminal.

### Linux

```bash
sudo apt install -y gh
```

### Login (todos os sistemas)

```bash
gh auth login
```

Responda assim:

| Pergunta | Resposta |
|---|---|
| Where do you use GitHub? | `GitHub.com` |
| Preferred protocol for Git operations? | `HTTPS` |
| Authenticate Git with your GitHub credentials? | `Yes` |
| How would you like to authenticate? | `Login with a web browser` |

O terminal mostra um **código de 8 caracteres**. Aperte Enter, o navegador abre, cole o código e autorize.

### ✅ Checkpoint A5

```bash
gh auth status
```

Deve aparecer `✓ Logged in to github.com account SEU-USUARIO`.

> Não conseguiu instalar o `gh`? Há dois planos B (token e SSH) na seção [Problemas comuns](#problemas-comuns).

### 🏁 Fim da Parte A

Rode tudo de uma vez e confira:

```bash
node -v && npm -v && git --version && code --version && gh auth status
```

Cinco respostas, nenhum erro. Ambiente pronto para o semestre.

---

# PARTE B — Os quatro pilares em código (~50 min)

Vamos construir um mini domínio de **conta bancária**, um pilar por vez, e registrar cada pilar em um commit. O domínio não é por acaso: na S3 a API que eu demonstro é bancária (Cliente e Conta).

> ⚠️ **O que esta aula NÃO faz:** nenhuma modelagem e nenhum código do **seu** Projeto 1. Isso nasce na S2. Hoje o repositório do P1 sai só com o `README.md` inicial e a pasta `s1/` com os exercícios da aula.

## Passo B1 — A pasta do repositório

O nome segue a convenção da disciplina: **`progweb-p1-nome-sobrenome`**, em minúsculas, sem acentos e sem espaços. Exemplo: `progweb-p1-maria-silva`.

```bash
cd ~
mkdir progweb-p1-nome-sobrenome
cd progweb-p1-nome-sobrenome
git init
code .
```

(No Windows, `cd ~` leva para `C:\Users\SeuUsuario`. Se preferir, crie dentro de `Documentos`.)

No VS Code, crie na raiz o arquivo **`README.md`**:

```markdown
# Projeto 1 — Programação Web (UEPB · 2026.2)

**Aluno(a):** Seu Nome Completo
**Disciplina:** Programação Web · Prof. Rodrigo Alves Costa

## Sobre

Aplicação fullstack (API Express em camadas + SQLite + frontend Bootstrap com Vanilla JS).
O domínio do projeto será definido na Semana 2.

## Estrutura

- `s1/` — exercícios da Semana 1: os quatro pilares da POO em JavaScript.
```

E o arquivo **`.gitignore`**:

```gitignore
node_modules/
.env
.DS_Store
```

Agora a pasta dos exercícios. No terminal do VS Code (`` Ctrl + ` ``):

```bash
mkdir s1
cd s1
npm init -y
npm pkg set type=module
```

O `type=module` liga os **ES Modules** (`import` / `export`), o padrão que usaremos no semestre inteiro.

Primeiro commit (volte para a raiz antes):

```bash
cd ..
git add .
git commit -m "chore: estrutura inicial do repositório"
```

### ✅ Checkpoint B1

```bash
git log --oneline
```

Mostra **um** commit. E `git status` responde `nothing to commit, working tree clean`.

---

## Passo B2 — Pilar 1: Abstração

De tudo o que uma conta bancária real tem, ficamos com o essencial: número, titular, saldo, depositar e sacar.

Crie **`s1/Conta.js`**:

```js
// s1/Conta.js — v1: abstração
export class Conta {
  constructor(numero, titular) {
    this.numero = numero;
    this.titular = titular;
    this.saldo = 0; // ainda público: o próximo pilar resolve isso
  }

  depositar(valor) {
    this.saldo += valor;
  }

  sacar(valor) {
    this.saldo -= valor;
  }
}
```

Crie **`s1/main.js`**:

```js
// s1/main.js — v1
import { Conta } from './Conta.js';

const c1 = new Conta('0001', 'Ana Lima');
const c2 = new Conta('0002', 'Bruno Souza');

c1.depositar(100);
c1.sacar(30);

console.log(c1);
console.log('Saldo da c2:', c2.saldo); // cada objeto tem o seu próprio estado

// O que a segunda-feira prometeu: class é açúcar sobre protótipos
console.log(typeof Conta);
console.log(Object.getPrototypeOf(c1) === Conta.prototype);
console.log(Object.hasOwn(c1, 'sacar')); // o método mora no protótipo, não no objeto
```

Rode:

```bash
cd s1
node main.js
```

### ✅ Checkpoint B2

```text
Conta { numero: '0001', titular: 'Ana Lima', saldo: 70 }
Saldo da c2: 0
function
true
false
```

Commit:

```bash
git add .
git commit -m "feat(s1): abstração - classe Conta"
```

---

## Passo B3 — Pilar 2: Encapsulamento

O problema da v1: qualquer um pode escrever `c1.saldo = -5000`. Vamos tornar o saldo **privado de verdade** com `#` (ES2022), liberar a **leitura** com um getter e proteger o titular com um setter.

Substitua todo o **`s1/Conta.js`**:

```js
// s1/Conta.js — v2: encapsulamento
export class Conta {
  #saldo = 0; // campo privado: só o código DENTRO desta classe enxerga
  #titular;

  constructor(numero, titular) {
    this.numero = numero;
    this.titular = titular; // passa pelo setter abaixo
  }

  // getter: leitura liberada. Não há setter: escrever, só por depositar/sacar
  get saldo() {
    return this.#saldo;
  }

  get titular() {
    return this.#titular;
  }

  // setter: escrita liberada, mas com regra
  set titular(nome) {
    if (typeof nome !== 'string' || nome.trim().length < 3) {
      throw new Error('Titular inválido');
    }
    this.#titular = nome.trim();
  }

  depositar(valor) {
    if (!(valor > 0)) throw new Error('Depósito deve ser positivo');
    this.#saldo += valor;
  }

  sacar(valor) {
    if (!(valor > 0)) throw new Error('Saque deve ser positivo');
    if (valor > this.#saldo) throw new Error('Saldo insuficiente');
    this.#saldo -= valor;
  }
}
```

> Por que `!(valor > 0)` e não `valor <= 0`? Porque `undefined`, `NaN` e `'banana'` também precisam ser barrados, e `NaN <= 0` é `false`.

Substitua todo o **`s1/main.js`**:

```js
// s1/main.js — v2
import { Conta } from './Conta.js';

const conta = new Conta('0001', 'Ana Lima');
conta.depositar(100);
conta.sacar(30);
console.log('Saldo:', conta.saldo);

// Quatro tentativas de burlar as regras
const tentativas = [
  () => { conta.saldo = -5000; },
  () => conta.depositar(-50),
  () => conta.sacar(1000),
  () => { conta.titular = ''; },
];

for (const tentar of tentativas) {
  try {
    tentar();
  } catch (e) {
    console.log('Bloqueado →', e.message);
  }
}

console.log('Saldo continua:', conta.saldo);
console.log(conta); // repare: #saldo e #titular não aparecem
```

```bash
node main.js
```

### ✅ Checkpoint B3

```text
Saldo: 70
Bloqueado → Cannot set property saldo of #<Conta> which has only a getter
Bloqueado → Depósito deve ser positivo
Bloqueado → Saldo insuficiente
Bloqueado → Titular inválido
Saldo continua: 70
Conta { numero: '0001' }
```

**Experimento (faça e desfaça):** acrescente `console.log(conta.#saldo);` no fim do `main.js` e rode. O programa **nem começa**: `SyntaxError: Private field '#saldo' must be declared in an enclosing class`. É a linguagem garantindo o encapsulamento. Apague a linha.

```bash
git add .
git commit -m "feat(s1): encapsulamento - campos privados, get e set"
```

---

## Passo B4 — Pilar 3: Herança

Conta corrente **é uma** conta (com limite). Conta poupança **é uma** conta (que rende). Passa no teste do "é-um".

Um detalhe importante: a subclasse **não enxerga** `#saldo`. Ela precisa usar a interface pública da mãe. Por isso, em **`s1/Conta.js`**, acrescente o método `saldoDisponivel()` e troque **uma linha** do `sacar`:

```js
  // (novo) quanto dá para sacar agora? As subclasses podem redefinir.
  saldoDisponivel() {
    return this.#saldo;
  }

  sacar(valor) {
    if (!(valor > 0)) throw new Error('Saque deve ser positivo');
    if (valor > this.saldoDisponivel()) throw new Error('Saldo insuficiente'); // ← mudou
    this.#saldo -= valor;
  }
```

Crie **`s1/ContaCorrente.js`**:

```js
// s1/ContaCorrente.js
import { Conta } from './Conta.js';

export class ContaCorrente extends Conta {
  constructor(numero, titular, limite = 500) {
    super(numero, titular); // obrigatório ANTES de usar this
    this.limite = limite;
  }

  // sobrescrita: conta corrente pode entrar no limite
  saldoDisponivel() {
    return this.saldo + this.limite;
  }
}
```

Crie **`s1/ContaPoupanca.js`**:

```js
// s1/ContaPoupanca.js
import { Conta } from './Conta.js';

export class ContaPoupanca extends Conta {
  constructor(numero, titular, taxaMensal = 0.005) {
    super(numero, titular);
    this.taxaMensal = taxaMensal;
  }

  // comportamento que só a poupança tem
  render() {
    const rendimento = this.saldo * this.taxaMensal;
    if (rendimento > 0) this.depositar(rendimento); // usa a interface pública da mãe
    return rendimento;
  }
}
```

Substitua todo o **`s1/main.js`**:

```js
// s1/main.js — v3
import { Conta } from './Conta.js';
import { ContaCorrente } from './ContaCorrente.js';
import { ContaPoupanca } from './ContaPoupanca.js';

const cc = new ContaCorrente('0001', 'Ana Lima', 500);
const cp = new ContaPoupanca('0002', 'Bruno Souza');

cc.depositar(100); // depositar() foi herdado de Conta
cc.sacar(400); // só passa por causa do limite
console.log('CC saldo:', cc.saldo);

cp.depositar(1000);
console.log('Rendeu:', cp.render(), '→ saldo:', cp.saldo);

try {
  cp.sacar(5000); // poupança não tem limite
} catch (e) {
  console.log('Poupança →', e.message);
}

console.log(cc instanceof ContaCorrente, cc instanceof Conta);
// A cadeia de protótipos, à mostra:
console.log(Object.getPrototypeOf(ContaCorrente.prototype) === Conta.prototype);
```

```bash
node main.js
```

### ✅ Checkpoint B4

```text
CC saldo: -300
Rendeu: 5 → saldo: 1005
Poupança → Saldo insuficiente
true true
true
```

**Experimento (faça e desfaça):** em `ContaCorrente.js`, mova `this.limite = limite;` para **antes** do `super(...)`. Resultado: `ReferenceError: Must call super constructor in derived class before accessing 'this'`. Desfaça.

```bash
git add .
git commit -m "feat(s1): herança - ContaCorrente e ContaPoupanca"
```

---

## Passo B5 — Pilar 4: Polimorfismo (e a classe abstrata)

Todo fim de mês o banco cobra tarifa: R$ 12,90 da corrente, nada da poupança. Em vez de um `if (tipo === ...)`, cada classe responde à mensagem `tarifaMensal()` do seu jeito.

E já que toda conta agora é corrente ou poupança, vamos fechar a abstração: `Conta` vira **abstrata**.

Em **`s1/Conta.js`**, acrescente a guarda no começo do `constructor`:

```js
  constructor(numero, titular) {
    if (new.target === Conta) {
      throw new Error('Conta é abstrata: crie ContaCorrente ou ContaPoupanca');
    }
    this.numero = numero;
    this.titular = titular;
  }
```

E, no fim da classe (antes do último `}`), acrescente:

```js
  // "método abstrato": cada tipo de conta TEM de dizer quanto cobra
  tarifaMensal() {
    throw new Error('tarifaMensal() precisa ser implementado na subclasse');
  }

  // sobrescrevendo um método que veio de Object.prototype
  toString() {
    return `${this.constructor.name} ${this.numero} · ${this.titular} · R$ ${this.saldo.toFixed(2)}`;
  }
```

Em **`s1/ContaCorrente.js`**, dentro da classe:

```js
  tarifaMensal() {
    return 12.9;
  }
```

Em **`s1/ContaPoupanca.js`**, dentro da classe:

```js
  tarifaMensal() {
    return 0;
  }
```

Substitua todo o **`s1/main.js`**:

```js
// s1/main.js — v4: polimorfismo
import { Conta } from './Conta.js';
import { ContaCorrente } from './ContaCorrente.js';
import { ContaPoupanca } from './ContaPoupanca.js';

const contas = [
  new ContaCorrente('0001', 'Ana Lima', 500),
  new ContaPoupanca('0002', 'Bruno Souza'),
];

contas.forEach((c) => c.depositar(1000));

// Mesma mensagem, respostas diferentes: quem decide é o objeto, não um if
function fecharMes(listaDeContas) {
  for (const conta of listaDeContas) {
    const tarifa = conta.tarifaMensal();
    if (tarifa > 0) conta.sacar(tarifa);
    console.log(`${conta} (tarifa: R$ ${tarifa.toFixed(2)})`);
  }
}

fecharMes(contas);

// A abstração protegida: ninguém cria uma "conta genérica"
try {
  new Conta('0003', 'Carla Dias');
} catch (e) {
  console.log('Erro esperado →', e.message);
}
```

```bash
node main.js
```

### ✅ Checkpoint B5

```text
ContaCorrente 0001 · Ana Lima · R$ 987.10 (tarifa: R$ 12.90)
ContaPoupanca 0002 · Bruno Souza · R$ 1000.00 (tarifa: R$ 0.00)
Erro esperado → Conta é abstrata: crie ContaCorrente ou ContaPoupanca
```

**Para pensar:** se o banco lançar uma `ContaSalario`, quantas linhas de `fecharMes()` mudam? (Nenhuma. É esse o ponto.)

```bash
git add .
git commit -m "feat(s1): polimorfismo - tarifaMensal e Conta abstrata"
```

---

## Passo B6 — Publicar no GitHub: o primeiro push

Volte para a **raiz do repositório** (`cd ..`) e confira: `git status` limpo e `git log --oneline` com **cinco** commits.

Com o `gh` autenticado, um comando cria o repositório **público** no GitHub, conecta como `origin` e faz o push:

```bash
gh repo create progweb-p1-nome-sobrenome --public --source=. --remote=origin --push
```

<details>
<summary><strong>Sem o gh? Caminho pelo site</strong></summary>

1. Acesse <https://github.com/new>.
2. **Repository name:** `progweb-p1-nome-sobrenome`. **Public**.
3. **Não marque** "Add a README", nem `.gitignore`, nem licença. O repositório precisa nascer **vazio** (senão o push é rejeitado).
4. Clique em **Create repository** e rode:

```bash
git remote add origin https://github.com/SEU-USUARIO/progweb-p1-nome-sobrenome.git
git push -u origin main
```

No Windows, uma janela do navegador pede login na primeira vez (é o Git Credential Manager, que vem com o Git). No Linux sem `gh`, veja o plano B de token em [Problemas comuns](#problemas-comuns).
</details>

### ✅ Checkpoint B6

```bash
git remote -v
git status
```

- `git remote -v` mostra `origin https://github.com/SEU-USUARIO/progweb-p1-nome-sobrenome.git`.
- `git status` diz `Your branch is up to date with 'origin/main'`.
- No navegador, `https://github.com/SEU-USUARIO/progweb-p1-nome-sobrenome` abre **em uma janela anônima** (prova de que é público), mostra o README renderizado, a pasta `s1/` e **5 commits**.

---

## Desafio opcional (em casa) — Composição sobre herança

O contraponto de segunda: a conta **tem um** extrato. Crie **`s1/Extrato.js`**:

```js
// s1/Extrato.js — composição: a Conta TEM UM Extrato
export class Extrato {
  #lancamentos = [];

  registrar(tipo, valor) {
    this.#lancamentos.push({ tipo, valor, data: new Date() });
  }

  listar() {
    return [...this.#lancamentos]; // cópia: ninguém altera o original por fora
  }
}
```

Sua missão:

1. Em `Conta.js`, importe `Extrato` e crie o campo `#extrato = new Extrato();`.
2. Em `depositar` e `sacar`, chame `this.#extrato.registrar('depósito', valor)` e `this.#extrato.registrar('saque', valor)`.
3. Exponha `get extrato() { return this.#extrato.listar(); }`.
4. No `main.js`, imprima `contas[0].extrato` depois do `fecharMes`.

Perguntas para responder num comentário no topo do `Extrato.js`: por que isso é **composição** e não agregação? E por que `listar()` devolve uma cópia?

```bash
git add . && git commit -m "feat(s1): composição - Extrato" && git push
```

---

# Entrega

Na atividade **"S1 · Mãos à Obra"** do Google Classroom, cole o link do repositório (`https://github.com/SEU-USUARIO/progweb-p1-nome-sobrenome`) e clique em **Entregar**. Prazo: **quinta 24/09, 23h59**.

## Checklist final

**Ambiente**
- [ ] `node -v` mostra v22 ou superior
- [ ] `node -e "require('node:sqlite')"` roda sem erro
- [ ] `git config --global --list` mostra `user.name`, `user.email` e `init.defaultbranch=main`
- [ ] VS Code com ESLint, Prettier, GitLens e Thunder Client
- [ ] `gh auth status` mostra a sua conta (ou o push funcionou por outro método)

**Repositório**
- [ ] Nome no padrão `progweb-p1-nome-sobrenome` e **público** (abre em janela anônima)
- [ ] `README.md` e `.gitignore` na raiz
- [ ] Pasta `s1/` com `package.json` (`"type": "module"`), `Conta.js`, `ContaCorrente.js`, `ContaPoupanca.js` e `main.js`
- [ ] `node s1/main.js` imprime a saída do Checkpoint B5
- [ ] Pelo menos 5 commits, um por pilar, com mensagens descritivas
- [ ] **Nenhum** código ou modelagem do Projeto 1 (isso é na S2)

**Entrega**
- [ ] Link postado no Google Classroom

---

# Problemas comuns

### 1. Windows: `'node' não é reconhecido como um comando interno` (PATH)

1. **Feche todos os terminais e o VS Code** e abra de novo. Resolve 9 em cada 10 casos.
2. Se continuar: Iniciar → "Editar as variáveis de ambiente do sistema" → **Variáveis de Ambiente** → em *Path* (do usuário ou do sistema), confira se existe `C:\Program Files\nodejs\`. Se não, clique em **Novo** e adicione. Abra um terminal novo.
3. Último recurso: reinstale pelo `.msi` com a opção **Add to PATH** marcada.

O mesmo vale para `git` (`C:\Program Files\Git\cmd`) e `code`.

### 2. Windows: `npm : O arquivo ...\npm.ps1 não pode ser carregado porque a execução de scripts foi desabilitada`

É a política de execução do PowerShell. Rode uma vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 3. Linux: `nvm: command not found` depois de instalar

Feche e abra o terminal, ou rode `source ~/.bashrc`. Se usa zsh, `source ~/.zshrc`.

### 4. Linux: `node -v` mostra v12 ou v18

É o Node antigo do `apt`. Remova (`sudo apt remove -y nodejs`) e instale pelo nvm (Passo A2).

### 5. `code: command not found`

- Windows: reinstale marcando **Adicionar em PATH**, ou instale as extensões pelo mouse (`Ctrl + Shift + X`).
- Linux/macOS: no VS Code, `Ctrl + Shift + P` → **Shell Command: Install 'code' command in PATH**.

### 6. `git push` pede usuário e senha, e a senha não funciona

O GitHub não aceita senha de conta no Git desde 2021. Três saídas, da mais simples para a mais trabalhosa:

**a) GitHub CLI** (Passo A5): `gh auth login` e depois `gh auth setup-git`.

**b) Token de acesso pessoal (PAT — Personal Access Token):**
1. GitHub → foto do perfil → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. Validade até o fim do semestre (28/02/2027). *Repository access:* **All repositories**. *Permissions → Repository permissions →* **Contents: Read and write**.
3. Copie o token (ele só aparece uma vez).
4. No `git push`, o usuário é o seu login do GitHub e a **senha é o token**.
5. Para não digitar sempre: no Linux, `git config --global credential.helper store` (grava em texto puro em `~/.git-credentials`: só faça isso no seu computador pessoal). No Windows o Git Credential Manager já guarda.

**c) Chave SSH:**

```bash
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"   # Enter, Enter, Enter
cat ~/.ssh/id_ed25519.pub                           # copie a linha inteira
```

GitHub → **Settings** → **SSH and GPG keys** → **New SSH key** → cole. Teste com `ssh -T git@github.com` (deve responder `Hi SEU-USUARIO!`) e troque o remoto:

```bash
git remote set-url origin git@github.com:SEU-USUARIO/progweb-p1-nome-sobrenome.git
```

### 7. `git push` rejeitado: `! [rejected] main -> main (fetch first)` ou `non-fast-forward`

O repositório no GitHub foi criado **com README** e tem um commit que a sua máquina não tem. Traga-o e reenvie:

```bash
git pull origin main --rebase --allow-unrelated-histories
git push -u origin main
```

Se der conflito no `README.md`: abra o arquivo, fique com a **sua** versão (apague as marcas `<<<<<<<`, `=======`, `>>>>>>>`), e então `git add README.md && git rebase --continue && git push -u origin main`.

### 8. `error: src refspec main does not match any`

Ou você ainda não fez nenhum commit (`git log` vazio), ou o seu branch se chama `master`. Confira com `git branch`. Se for `master`: `git branch -M main` e repita o push.

### 9. `remote origin already exists`

```bash
git remote set-url origin https://github.com/SEU-USUARIO/progweb-p1-nome-sobrenome.git
```

### 10. `Author identity unknown` / `Please tell me who you are`

Faltou o Passo A3: rode os dois `git config --global user.…` e repita o commit.

### 11. Rede da UEPB: `npm install`, `winget` ou `git push` travam, dão timeout ou `ECONNRESET`

Em ordem de praticidade:

1. **Roteie a internet do celular** só para o download ou o push. É o que resolve mais rápido em sala.
2. Se a rede exigir **proxy** (pergunte o endereço e a porta ao suporte do câmpus), configure:

```bash
npm config set proxy http://ENDERECO:PORTA
npm config set https-proxy http://ENDERECO:PORTA
git config --global http.proxy http://ENDERECO:PORTA
```

   **Em casa, desfaça**, senão nada funciona fora da UEPB:

```bash
npm config delete proxy
npm config delete https-proxy
git config --global --unset http.proxy
```

3. **SSH bloqueado (porta 22)?** `ssh -T git@github.com` fica parado? Use o SSH do GitHub pela porta 443. Crie o arquivo `~/.ssh/config` com:

```text
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
```

4. Erro de certificado (`SSL certificate problem` / `self-signed certificate in certificate chain`): é a inspeção de tráfego da rede. **Não desligue a verificação SSL**; use a rede do celular.

### 12. `SyntaxError: Cannot use import statement outside a module`

Faltou o `"type": "module"` no `s1/package.json`. Dentro de `s1/`: `npm pkg set type=module`. Confira também se você está rodando `node main.js` **de dentro** da pasta `s1/`.

### 13. `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../Conta'`

Em ES Modules a extensão é obrigatória: `import { Conta } from './Conta.js';` (com `.js`). Confira também maiúsculas e minúsculas: no Linux, `conta.js` e `Conta.js` são arquivos diferentes.

### 14. `SyntaxError: Private field '#saldo' must be declared in an enclosing class`

Você usou `#saldo` fora da classe `Conta`, ou esqueceu de declarar `#saldo = 0;` no topo da classe. Subclasses também não enxergam `#saldo`: use `this.saldo` (o getter).

### 15. Thunder Client pede login ou limita recursos

Para a S3 a versão gratuita basta (requisições avulsas). Se na sua máquina ela não funcionar, a alternativa é a extensão **REST Client** (`humao.rest-client`), que usa arquivos `.http`. Avise na S3.

---

## Referências

- Node.js, downloads e calendário de versões: <https://nodejs.org> · <https://github.com/nodejs/Release>
- nvm: <https://github.com/nvm-sh/nvm>
- Pro Git (livro gratuito, em português): <https://git-scm.com/book/pt-br/v2>
- GitHub CLI: <https://cli.github.com/manual/>
- MDN, Classes: <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes>
- MDN, campos privados: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements>
- Conventional Commits (o padrão `feat:`, `chore:` das mensagens): <https://www.conventionalcommits.org/pt-br/>

**Próxima semana (S2):** segunda 28/09, SOLID e Boas Práticas; quarta 30/09, leitura crítica de código e a primeira modelagem de classes do seu Projeto 1. Venha com o domínio do seu CRUD escolhido.
Exibindo S1_Tutorial_Setup_POO.md…