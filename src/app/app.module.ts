import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { MaterialCreatorComponent } from './material-creator/material-creator.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProdutoService } from './produto.service';
import { CategoriaService } from './categoria.service';
import { MaterialService } from './material.service';
import { AcabamentoService } from './acabamento.service';
import { DimensoesService } from './dimensoes.service';
import { ItemService } from './item.service';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AcabamentoCreatorComponent } from './acabamento-creator/acabamento-creator.component';
import { CategoriaCreatorComponent } from './categoria-creator/categoria-creator.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    ProdutoDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MaterialCreatorComponent,
    AcabamentoCreatorComponent,
    CategoriaCreatorComponent,
    ItemDetailComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    ProdutoService,
    CategoriaService,
    MaterialService,
    AcabamentoService,
    DimensoesService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
