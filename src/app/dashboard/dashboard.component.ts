import { Component, OnInit } from '@angular/core';
import { Produto, Categoria, Material, Acabamento } from '../model/produto';

import { ProdutoService } from '../produto.service';
import { CategoriaService } from '../categoria.service';
import { MaterialService } from '../material.service';
import { AcabamentoService } from '../acabamento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  materials: Material[] = [];
  acabamentos: Acabamento[] = [];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private materialService: MaterialService,
    private acabamentoService: AcabamentoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(produtos => { this.produtos = produtos });
    this.categoriaService.getCategorias().subscribe(categorias => { this.categorias = categorias });
    this.materialService.getMateriais().subscribe(materials => { this.materials = materials });
    this.acabamentoService.getAcabamentos().subscribe(acabamentos => { this.acabamentos = acabamentos });
  }

  removeAcabamento(acabamento: Acabamento) {
    this.acabamentoService.removeAcabamento(acabamento).subscribe(() => {
      this.acabamentoService.getAcabamentos().subscribe(acabamentos => this.acabamentos = acabamentos);
    });

  }

  removeCategoria(categoria: Categoria) {
    this.categoriaService.removeCategoria(categoria).subscribe(
      success => { },
      error => { console.log(error); },
      () => {
        this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);
      });
  }

  removeMaterial(material: Material) {
    this.materialService.removeMaterial(material).subscribe(() => {
      this.materialService.getMateriais().subscribe(materials => this.materials = materials);
    });
  }

}