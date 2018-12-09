import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Acabamento } from '../model/produto';

import { AcabamentoService } from '../acabamento.service';

@Component({
  selector: 'app-acabamento-creator',
  templateUrl: './acabamento-creator.component.html',
  styleUrls: ['./acabamento-creator.component.css']
})
export class AcabamentoCreatorComponent implements OnInit {

  acabamentos: Acabamento[];
  acabamento: Acabamento;

  constructor(
    private acabamentoService: AcabamentoService,
    private location: Location) { }

  ngOnInit() {
    this.acabamento = new Acabamento;

    this.acabamentoService.getAcabamentos()
      .subscribe(acabamentos => this.acabamentos = acabamentos);
  }

  onClick() {
    this.acabamentoService.addMaterial(this.acabamento)
      .subscribe(() => {
        this.goBack();
      });
  }

  goBack() {
    this.location.back();
  }

}
