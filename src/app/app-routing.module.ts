import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';
//import { Lvl2Component } from './lvl2/lvl2.component';
import { FrontpageComponent } from './frontpage/frontpage.component';


const routes: Routes = [
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
  { path: 'level1', component: JogoComponent, data: {level: 1} },
  { path: 'level2', component: JogoComponent, data: {level: 2} },
  { path: 'frontpage', component: FrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
