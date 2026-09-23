export class Conta {
    constructor(numero, titular) {
        this.numero = numero;
        this.titular = titular;
        this.saldo = 0;
    }

    depositar(valor) {
        this.saldo += valor;
    }

    sacar(valor) {
        this.saldo -= valor;
    }
}