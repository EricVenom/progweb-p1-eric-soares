// ============================================================
// ALUNO: Eric Soares
// S2_library-bad.js — Mãos à Obra da Semana 2 (Parte A)
// Este código FUNCIONA (rode: node S2_library-bad.js). E é ruim de propósito.
// Sua tarefa, em dupla: NÃO refatore. Apenas leia e marque os cheiros.
//   Use // SMELL: <nome>        para cada code smell (nomes do slide 16)
//   Use // VIOLA: <S|O|L|I|D>   para cada princípio SOLID violado (slide 4)
// ============================================================

// SMELL: God Class (gerencia livros, usuários, empréstimos, e-mails e relatórios)[cite: 16]
// VIOLA: S (múltiplos motivos para mudar: regras de negócio, persistência em memória, notificação e relatórios)[cite: 4, 7]
class Library {
  constructor() {
    this.bks = [];
    this.us = [];
    this.lns = [];
  }

  // SMELL: Long Function (método muito longo concentrando várias regras de negócio)[cite: 16]
  // SMELL: Switch sobre tipo (cadeia de if/else if decidindo comportamento pelo parâmetro 'action')[cite: 16]
  // SMELL: Primitive Obsession (uso de strings literais como 'add', 'lend', 'return', 'overdue' para controlar fluxo)[cite: 16]
  // VIOLA: O (para adicionar uma nova ação, como 'renew', é preciso reabrir e modificar este método)[cite: 4, 8]
  doStuff(book, userId, action) {
    if (action === 'add') {
      this.bks.push(book);
      console.log('Added: ' + book.t);
    } else if (action === 'lend') {
      // SMELL: Duplicate Code (laço de busca de usuário repetido no bloco 'overdue')[cite: 16]
      var u = null;
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].id === userId) { u = this.us[i]; }
      }
      // SMELL: Duplicate Code (laço de busca de livro pelo título repetido no bloco 'return')[cite: 16]
      var b = null;
      for (var j = 0; j < this.bks.length; j++) {
        if (this.bks[j].t === book.t) { b = this.bks[j]; }
      }
      // SMELL: Feature Envy (Library acessando e manipulando diretamente os atributos internos de book, como b.cp)[cite: 16]
      if (u != null && b != null && b.cp > 0) {
        b.cp = b.cp - 1;
        // SMELL: Magic Numbers (uso do número 1 para representar o status ativo do empréstimo)[cite: 16]
        // SMELL: Primitive Obsession (empréstimo representado como objeto literal solto com códigos numéricos em vez de classe/objeto de domínio)[cite: 16]
        this.lns.push({ uid: userId, bt: book.t, d: new Date(), st: 1 });
        // SMELL: Comentário-desodorante (comentário necessário apenas para explicar os números mágicos 1, 2 e 3)[cite: 16]
        // 1 = active, 2 = returned, 3 = overdue
        // SMELL: Duplicate Code (chamada direta ao fetch de envio de e-mail repetida no bloco 'overdue')[cite: 16]
        // VIOLA: D (dependência direta e acoplada à implementação concreta de fetch/API externa em vez de uma abstração injetada)[cite: 4, 11]
        // VIOLA: S (mistura regra de empréstimo com infraestrutura de envio de e-mail)[cite: 4, 7]
        fetch('http://email.api/send', {
          method: 'POST',
          body: JSON.stringify({ to: u.em, msg: 'Você pegou ' + book.t })
        }).then(r => { /* nada */ }).catch(e => {});
      }
    } else if (action === 'return') {
      for (var k = 0; k < this.lns.length; k++) {
        // SMELL: Magic Numbers (uso de 1 para verificar status ativo)[cite: 16]
        if (this.lns[k].uid === userId && this.lns[k].bt === book.t && this.lns[k].st === 1) {
          // SMELL: Magic Numbers (uso de 2 para definir status devolvido)[cite: 16]
          this.lns[k].st = 2;
          // SMELL: Duplicate Code (busca linear pelo livro repetida)[cite: 16]
          // SMELL: Feature Envy (manipulação direta do estoque bks[m].cp fora da entidade Book)[cite: 16]
          for (var m = 0; m < this.bks.length; m++) {
            if (this.bks[m].t === book.t) { this.bks[m].cp = this.bks[m].cp + 1; }
          }
        }
      }
    } else if (action === 'overdue') {
      for (var n = 0; n < this.lns.length; n++) {
        // SMELL: Magic Numbers (fórmula hardcoded 1000 * 60 * 60 * 24 para milissegundos em um dia)[cite: 16]
        var diff = (new Date() - this.lns[n].d) / (1000 * 60 * 60 * 24);
        // SMELL: Magic Numbers (uso de 1 para status ativo e 7 para prazo limite de dias)[cite: 16]
        if (this.lns[n].st === 1 && diff > 7) {
          // SMELL: Magic Numbers (uso de 3 para status atrasado)[cite: 16]
          this.lns[n].st = 3;
          // SMELL: Duplicate Code (busca linear de usuário repetida do bloco 'lend')[cite: 16]
          var usr = null;
          for (var p = 0; p < this.us.length; p++) {
            if (this.us[p].id === this.lns[n].uid) { usr = this.us[p]; }
          }
          if (usr) {
            // SMELL: Duplicate Code (chamada fetch de e-mail duplicada)[cite: 16]
            // VIOLA: D (acoplamento direto com a API HTTP de e-mail)[cite: 4, 11]
            fetch('http://email.api/send', {
              method: 'POST',
              body: JSON.stringify({ to: usr.em, msg: 'Atrasado: ' + this.lns[n].bt })
            });
          }
        }
      }
    }
  }

  // SMELL: Long Parameter List (8 parâmetros posicionais na assinatura da função)[cite: 16]
  // SMELL: Data Clumps (addr, cty, st, zp sempre andam juntos formando um endereço)[cite: 16]
  // VIOLA: S (cadastro e armazenamento de usuário deveriam estar em um UserService / UserRepository)[cite: 4, 7]
  registerUser(n, e, ph, addr, cty, st, zp, isAdm) {
    this.us.push({ id: this.us.length + 1, n: n, em: e, ph: ph, addr: addr, cty: cty, st: st, zp: zp, isAdm: isAdm });
  }

  // SMELL: Switch sobre tipo (cadeia de if/else if verificando o tipo de relatório)[cite: 16]
  // SMELL: Magic Numbers (códigos 1, 2 e 3 para identificar o tipo de relatório)[cite: 16]
  // SMELL: Primitive Obsession (uso de inteiros primitivos para representar tipos de relatório)[cite: 16]
  // VIOLA: O (adicionar um novo tipo de relatório exige modificar o método existente)[cite: 4, 8]
  // VIOLA: S (formatação e saída de relatórios no console misturadas na classe de domínio)[cite: 4, 7]
  report(type) {
    if (type === 1) {
      console.log('Total de livros: ' + this.bks.length);
    } else if (type === 2) {
      console.log('Total de usuários: ' + this.us.length);
    } else if (type === 3) {
      console.log('Total de empréstimos: ' + this.lns.length);
    }
  }
}

// Uso:
const lib = new Library();
lib.registerUser('Ana', 'ana@uepb.edu.br', '83999990000', 'Rua X, 10', 'Patos', 'PB', '58700-000', false);
lib.doStuff({ t: 'Clean Code', cp: 3 }, null, 'add');
lib.doStuff({ t: 'Clean Code' }, 1, 'lend');
lib.report(1);