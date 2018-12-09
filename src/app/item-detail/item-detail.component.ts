import { Component, OnInit } from '@angular/core';
import { Item, ItemDim } from '../model/item';
import { Produto, Material, Acabamento, Dimensoes } from '../model/produto';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutoService } from '../produto.service';
import { AcabamentoService } from '../acabamento.service';
import { MaterialService } from '../material.service';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  produtos: Produto[];
  produtosAgregados: Item[];

  material: Material[];
  acabamentos: Acabamento[];

  item: Item;
  produto: Produto;

  update: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cons: MessageService,
    private produtoService: ProdutoService,
    private itemService: ItemService
  ) { }

  async ngOnInit() {


    this.item = new Item;
    this.item.dimensoes = new ItemDim;
    this.item.listaItens = [];
    this.item.idAcabamentoList = [];
    this.item.quantidade = 1;

    this.produto = new Produto();
    this.material = [new Material()];
    this.acabamentos = [];

    this.produto.material = this.material[0];
    this.produtoService.getProdutos().subscribe(res => { this.produtos = res });

    if (this.route.snapshot.paramMap.has('id')) {
      this.update = true;
      this.itemService.getItem(this.route.snapshot.paramMap.get('id')).subscribe(
        item => this.item = item,
        error => { },
        () => {
          this.changeProduto(this.item.idProduto);
        }
      );
    }
  }

  changeProduto(id: number) {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id == id) {
        this.produto = this.produtos[i];

        this.item.idProduto = this.produto.id;
        this.item.idMaterial = this.produto.material.id;
        this.item.idCategoria = this.produto.categoria.id;

        this.material = [this.produto.material];

        this.acabamentos = this.produto.acabamentos;
        this.fillDim();
        this.refreshAgregados();
        return;
      }
    }
  }

  fillDim() {
    this.item.dimensoes.altura = +this.produto.dimensoes.dimAltura.split("-")[0];
    this.item.dimensoes.largura = +this.produto.dimensoes.dimLargura.split("-")[0];
    this.item.dimensoes.profundidade = +this.produto.dimensoes.dimProfundidade.split("-")[0];

    this.checkDim();
  }

  checkDim() {
    let alturaS: string[] = this.produto.dimensoes.dimAltura.split("-");
    let larguraS: string[] = this.produto.dimensoes.dimLargura.split("-");
    let profundidadeS: string[] = this.produto.dimensoes.dimProfundidade.split("-");

    let altura: number[] = this.initDim(alturaS);
    let largura: number[] = this.initDim(larguraS);
    let profundidade: number[] = this.initDim(profundidadeS);

    this.item.dimensoes.altura = this.validarDim(this.item.dimensoes.altura, altura);
    this.item.dimensoes.largura = this.validarDim(this.item.dimensoes.largura, largura);
    this.item.dimensoes.profundidade = this.validarDim(this.item.dimensoes.profundidade, profundidade);
  }

  refreshAgregados() {
    this.produtosAgregados = [];
    for (let i = 0; i < this.produto.produtosFilho.length; i++) {
      this.itemService.getItemSons(this.produto.produtosFilho[i]).subscribe(
        items => {
          for (let i = 0; i < items.length; i++) {
            this.produtosAgregados.push(items[i]);
          }
        },
        error => { if (error.satus != 404) { console.log(error) } }
      );
    }
  }

  saveItem() {
    if (this.update) {
      this.itemService.updateItem(this.item).subscribe(
        item => this.item = item,
        error => { },
        () => {
          this.router.navigate(['/item']);
        }
      );
    } else {
      this.itemService.addItem(this.item).subscribe(
        item => this.item = item,
        error => { },
        () => {
          this.router.navigate(['/item']);
        }
      );
    }
  }

  removeItem() {
    this.itemService.removeItem(this.item).subscribe(
      success => { },
      error => { },
      () => { this.router.navigate(['/item']) }
    );
  }

  /* UTILITY */

  initDim(str: string[]): number[] {
    let num: number[];
    if (str.length == 2) {
      num = [+str[0], +str[1]];
    } else {
      num = [+str[0], +str[0]];
    }
    return num;
  }

  validarDim(dim: number, nums: number[]): number {
    if (dim < nums[0]) {
      dim = nums[0];
    } else if (dim > nums[1]) {
      dim = nums[1];
    }
    return dim;
  }

  itemToString(item: Item) {
    let message = "";
    let acabamento = "";
    let prod: Produto = this.produto;

    for (let i = 0; i < prod.acabamentos.length; i++) {
      const ab = prod.acabamentos[i];

      for (let j = 0; j < item.idAcabamentoList.length; j++) {
        const id = item.idAcabamentoList[j];
        if (ab.id == id) {
          acabamento += ab.descricao + ", ";
          break;
        }
      }
    }

    message += prod.nome + " (" + prod.categoria.descricao + ") " + prod.material.descricao + " [" + acabamento.substring(0, acabamento.length - 2) + "]" + " --> " + item.quantidade;
    return message;
  }

}
