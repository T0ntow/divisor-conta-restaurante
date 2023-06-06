import { Component } from '@angular/core';

interface Cliente {
  nome: string;
  produtos: Produto[];
  taxaServico: string;
  gasto: number;
}

interface Produto {
  nome: string;
  valor: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'divisor-conta';

  clienteNome = '';
  produtoNome = '';
  produtoValor = 0;
  taxaServico = 'nao';

  listaCliente: Cliente[] = [];
  listaProduto: Produto[] = [];

  gastoCliente = 0;
  consumidoresSelecionados: string[] = [];

  adicionarCliente() {
    if (!this.clienteNome) return;

    const novoCliente: Cliente = {
      nome: this.clienteNome,
      produtos: [],
      taxaServico: this.taxaServico,
      gasto: 0,
    };
    this.listaCliente.push(novoCliente);
    this.clienteNome = '';

    console.log(this.listaCliente);
  }

  adicionarProduto() {
    if (!this.produtoNome || this.produtoValor === 0) return;

    const novoProduto: Produto = {
      nome: this.produtoNome,
      valor: this.produtoValor,
    };

    if (this.listaCliente.length > 0) {
      this.consumidoresSelecionados.forEach(consumidor => {
        const cliente = this.listaCliente.find(cliente => cliente.nome === consumidor);
        if (cliente) {
          cliente.produtos.push(novoProduto);
        }
      });

      this.listaProduto.push(novoProduto);
    } else {
      alert('Insira um cliente para continuar');
    }

    this.produtoNome = '';
    this.produtoValor = 0;
  }

  calcularGastoClientes() {
    this.listaCliente.forEach(cliente => {
      let gastosPorProduto: { [produto: string]: number } = {};
  
      cliente.produtos.forEach(produto => {
        if (!gastosPorProduto[produto.nome]) {
          gastosPorProduto[produto.nome] = 0;
        }
        gastosPorProduto[produto.nome] += produto.valor;
      });
  
      Object.keys(gastosPorProduto).forEach(nomeProduto => {
        const valorProduto = gastosPorProduto[nomeProduto];
        const quantidadePessoas = this.listaCliente.filter(c => c.produtos.some(p => p.nome === nomeProduto)).length;
        const gastoDividido = valorProduto / quantidadePessoas;
  
        cliente.gasto += gastoDividido;
      });
  
      if (cliente.taxaServico === 'sim') {
        const taxaServico = cliente.gasto * 0.1;
        cliente.gasto += taxaServico;
      }
    });
  }
  
  getConsumidoresProduto(produto: Produto): string {
    const consumidores: string[] = [];

    this.listaCliente.forEach(cliente => {
      if (cliente.produtos.some(prod => prod.nome === produto.nome)) {
        consumidores.push(cliente.nome);
      }
    });

    return consumidores.join(', ');
  }

}
