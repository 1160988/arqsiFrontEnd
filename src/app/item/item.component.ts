import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { ProdutoService } from '../produto.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  produtos: Produto[];
  items: Item[];

  constructor(
    private produtoService: ProdutoService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
    this.itemService.getiItems().subscribe(items => this.items = items);
  }

  getProduto(id: number) {
    for (let i = 0; i < this.produtos.length; i++) {
      const produto = this.produtos[i];
      if (produto.id == id)
        return produto;
    }
  }

}
