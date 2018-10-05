import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { JogoComponent } from './jogo/jogo.component';
import { Lvl2Component } from './lvl2/lvl2.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ComandosService } from './comandos.service';
import { MapaComponent } from './mapa/mapa.component';
import { GamedataService } from './gamedata.service';


@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    Lvl2Component,
    FrontpageComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
		ComandosService,
		GamedataService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
