import {Conta} from './Conta.js';

const conta = new Conta('0001', 'Ana Lima');
conta.depositar(100);
conta.sacar(30);

// forçar erro
const tentativas = [
    () => {conta.saldo = -5000;},
    () => conta.depositar(-50),
    () => conta.sacar(1000),
    () => {conta.titular = '';}
];

for (const t of tentativas) {
    try {
        t();
    } catch (error) {
        console.log('Bloqueado: ', error.message);
    }
}

console.log('Saldo continua:', conta.saldo);
console.log(conta); // repare: #saldo e #titular não aparecem