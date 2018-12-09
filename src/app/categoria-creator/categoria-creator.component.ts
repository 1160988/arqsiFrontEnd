import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Categoria } from '../model/produto';

import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-creator',
  templateUrl: './categoria-creator.component.html',
  styleUrls: ['./categoria-creator.component.css']
})
export class CategoriaCreatorComponent implements OnInit {

  categorias: Categoria[];
  categoria: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private location: Location) { }

  ngOnInit() {
    this.categoria = new Categoria;

    this.categoriaService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  onClick() {
    this.categoriaService.addCategoria(this.categoria)
      .subscribe(() => {
        this.goBack();
      });
  }

  goBack() {
    this.location.back();
  }

}
