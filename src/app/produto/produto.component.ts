import { Component, OnInit } from '@angular/core';

import { Produto } from '../model/produto';
import { ProdutoService } from '../produto.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {

  produtos: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      produtos => { this.produtos = produtos });
  }

  removeProduto(produto: Produto) {
    this.produtoService.removeProduto(produto)
      .subscribe(() => {
        this.getProdutos();
      });
  }
}
