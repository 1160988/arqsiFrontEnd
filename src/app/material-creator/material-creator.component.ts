import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Acabamento, Material } from '../model/produto';

import { MaterialService } from '../material.service';
import { AcabamentoService } from '../acabamento.service';

@Component({
  selector: 'app-material-creator',
  templateUrl: './material-creator.component.html',
  styleUrls: ['./material-creator.component.css']
})
export class MaterialCreatorComponent implements OnInit {

  acabamentos: Acabamento[];
  material: Material;

  constructor(
    private acabamentoService: AcabamentoService,
    private materialService: MaterialService,
    private location: Location) { }

  ngOnInit() {
    this.material = new Material;

    this.acabamentoService.getAcabamentos()
      .subscribe(acabamentos => this.acabamentos = acabamentos);
  }

  async onClick() {
    this.materialService.addMaterial(this.material)
      .subscribe(() => {
        this.goBack();
      });
  }

  goBack() {
    this.location.back();
  }
}
