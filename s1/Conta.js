export class Conta {
    #saldo = 0; //campo privado
    #titular;
    
    constructor(numero, titular) {
        if (new.target === Conta) {
        throw new Error('Conta é abstrata: crie ContaCorrente ou ContaPoupanca');
        }
        this.numero = numero;
        this.titular = titular;
    }
    // getter
    get saldo() {
        return this.#saldo;
    }

    get titular() {
        return this.#titular;
    }

    //setter: escrita liberada com guardrails
    set titular(nome) {
        if (typeof nome !== 'string' || nome.trim().length < 3){
            throw new Error('Titular inválido.');
        }

        this.#titular = nome.trim();
    }

    depositar(valor) {
        if (!(valor > 0)) throw new Error('Depósito deve ser positivo.');
        this.#saldo += valor;
    }

    // (novo) quanto dá para sacar agora? As subclasses podem redefinir.
    saldoDisponivel() {
        return this.#saldo;
    }

    sacar(valor) {
        if (!(valor > 0)) throw new Error('Saque deve ser positivo');
        if (valor > this.saldoDisponivel()) throw new Error('Saldo insuficiente'); // ← mudou
        this.#saldo -= valor;
    }

    // "método abstrato": cada tipo de conta TEM de dizer quanto cobra
    tarifaMensal() {
        throw new Error('tarifaMensal() precisa ser implementado na subclasse');
    }

    // sobrescrevendo um método que veio de Object.prototype
    toString() {
        return `${this.constructor.name} ${this.numero} · ${this.titular} · R$ ${this.saldo.toFixed(2)}`;
    }

}