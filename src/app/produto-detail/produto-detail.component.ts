import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';

import { Produto, Categoria, Dimensoes, Material, Acabamento } from '../model/produto';
import { ActivatedRoute } from '@angular/router';

import { ProdutoService } from '../produto.service';
import { CategoriaService } from '../categoria.service';
import { MaterialService } from '../material.service';
import { AcabamentoService } from '../acabamento.service';
import { DimensoesService } from '../dimensoes.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.css']
})

export class ProdutoDetailComponent implements OnInit {

  @Input() produto: Produto;
  private categorias: Categoria[];
  private materials: Material[];
  private produtos: Produto[];

  private flag: boolean;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private materialService: MaterialService,
    private categoriaService: CategoriaService,
    private acabamentoService: AcabamentoService,
    private dimensoesService: DimensoesService,
    private location: Location) { }

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe(produtos => this.produtos = produtos);
    this.materialService.getMateriais().subscribe(materials => this.materials = materials);
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);

    this.getProduto();
  }

  getProduto() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != -1) {
      this.produtoService.getProduto(id).subscribe(
        res => { this.produto = res; },
        () => { this.updateAcabamentos(); });
    } else {
      this.produto = new Produto;
      this.produto.id = null;
      this.produto.nome = "";

      this.produto.dimensoesId = -1;
      this.produto.materialId = -1;
      this.produto.categoriaId = -1;
      this.produto.acabamentoId = -1;

      this.produto.material = new Material();
      this.produto.material.acabamentos = [];

      this.produto.categoria = new Categoria();
      this.produto.dimensoes = new Dimensoes();

      this.produto.dimensoes.id = -1;
      this.produto.dimensoes.dimAltura = "";
      this.produto.dimensoes.dimLargura = "";
      this.produto.dimensoes.dimProfundidade = "";

      this.produto.acabamentos = [];
      this.produto.restricoes = [];
      this.produto.produtosFilho = [];
    }
  }

  goBack(): void {
    this.location.back();
  }

  onCategoriaChanges() {
    this.produto.categoriaId = this.produto.categoria.id;
  }

  onMaterialChanges() {
    this.produto.materialId = this.produto.material.id;
    this.materialService.getMaterial(this.produto.material.id).subscribe(
      material => { this.produto.material = material; },
      error => { },
      () => {
        this.updateAcabamentos();
      });
  }


  updateAcabamentos() {
    this.acabamentoService.refreshAcabamento(this.produto.material.id).subscribe(
      res => { this.produto.acabamentos = res; });
  }

  updateDimensoes() {
    this.produto.dimensoes.dimAltura = this.validarDimensao(this.produto.dimensoes.dimAltura);
    this.produto.dimensoes.dimLargura = this.validarDimensao(this.produto.dimensoes.dimLargura);
    this.produto.dimensoes.dimProfundidade = this.validarDimensao(this.produto.dimensoes.dimProfundidade);

    if (this.produto.dimensoes.dimAltura.length == 0 || this.produto.dimensoes.dimLargura.length == 0 || this.produto.dimensoes.dimProfundidade.length == 0) {
      return;
    }

    this.dimensoesService.addCategoria(this.produto.dimensoes).subscribe(
      dimensoes => { this.produto.dimensoes = dimensoes; this.produto.dimensoesId = dimensoes.id });

  }

  validarDimensao(dimensao: string) {
    let discreta = "^[0-9]+$";
    let continua = "^[0-9]+-[0-9]+$";
    if (dimensao.match(discreta) || dimensao.match(continua)) {
      return dimensao;
    } else {
      return ""
    }
  }

  clearProdutoSelection() {
    this.produto.produtosFilho = [];
  }

  saveChanges() {

    if (this.produto.dimensoesId != -1 && this.produto.categoriaId != -1 && this.produto.materialId != -1 && this.produto.nome.length != 0 && this.produto.id == null) {
      this.produto.id = -1;
    }

    if (this.produto.id == undefined) {
      return;
    }

    if (this.produto.id == -1) {
      this.produto.id = null;
      this.produtoService.addProduto(this.produto).subscribe(
        produto => { this.produto = produto },
        error => { },
        () => {
          this.produtoService.getProduto(this.produto.id).subscribe(res => this.produto = res);
        });
    } else {
      this.produtoService.updateProduto(this.produto).subscribe(
        success => { },
        error => { },
        () => {
          this.produtoService.getProduto(this.produto.id).subscribe(res => this.produto = res);
        });
    }
  }

  isSelected(id: number){
    return this.produto.produtosFilho.includes(id);
  }
}
