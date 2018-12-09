import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './produto/produto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { MaterialCreatorComponent } from './material-creator/material-creator.component';
import { AcabamentoCreatorComponent } from './acabamento-creator/acabamento-creator.component';
import { CategoriaCreatorComponent } from './categoria-creator/categoria-creator.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProdutoDetailComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'material/add', component: MaterialCreatorComponent },
  { path: 'acabamento/add', component: AcabamentoCreatorComponent },
  { path: 'categoria/add', component: CategoriaCreatorComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item/add', component: ItemDetailComponent },
  { path: 'item/edit/:id', component: ItemDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
