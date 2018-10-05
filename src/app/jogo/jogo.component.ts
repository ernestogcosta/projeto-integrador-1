import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComandosService, Posicao, Comando } from '../comandos.service';
import { GamedataService } from '../gamedata.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
/* 
 dir (direção)
 1 = norte
 2 = leste
 3 = sul
 4 = oeste
 */
export class JogoComponent implements OnInit, OnDestroy
{
	/*
  i = 0; //i é pro nº de itens na lista
  j = 0; //j é pra ler qual comando
  loops = [];
  btns = [];
  avancar = 1; //os numeros aqui definem qual comando a função 'rodarPrograma' vai fazer.
  virDireita = 3;
  virEsquerda = 2;
  dir = 2; //dureção em que o personagem está olhando
  x = 0;   //coordenada X
  y = 0;   //coordenada Y
  itemCount: number = 0;
	// */
	level: Level;
	finalSubs: Subscription;

  constructor(
		public comandosService: ComandosService,
		public gameData: GamedataService,
		private route: ActivatedRoute
	)
	{
		this.route.data.subscribe(data =>
		{
			let levelN: number = data.level;
			if (!levelN) levelN = 1;
			
			this.level = this.getLevel(levelN);
			this.gameData.final.next(false);
			this.clear();
		});
		
		this.finalSubs = this.gameData.final.subscribe(final =>
		{
			if (final === true)
			{
				let pos: Posicao = this.gameData.getCurrentPosition();
				//console.log('Posição final: ',pos);
				this.checkPosition(pos);
			}
		});
		
		//dummy
		/*
		this.addAdv();
		this.addEsquerda();
		this.addAdv();
		this.addDireita();
		this.addAdv();
		this.addDireita();
		this.addAdv();
		this.addAdv();
		this.addEsquerda();
		this.addAdv();
		this.addEsquerda();
		this.addAdv();
		// */
	}

  ngOnInit()
	{
		this.gameData.init({x: 0, y: 0, dir: 2});
    //this.itemCount = this.loops.length;
  }
	ngOnDestroy()
	{
		this.finalSubs.unsubscribe();
	}
  addAdv() {
		this.comandosService.pushCmd('avancar');
    //this.loops.push('Avançar');
    //this.itemCount = this.loops.length;
    //this.btns.push(this.avancar);
  }
  addEsquerda() {
		this.comandosService.pushCmd('esquerda');
    //this.loops.push('Virar para esquerda');
    //this.itemCount = this.loops.length;
    //this.btns.push(this.virEsquerda);
  }
  addDireita() {
		this.comandosService.pushCmd('direita');
    //this.loops.push('Virar para direita');
    //this.itemCount = this.loops.length;
    //this.btns.push(this.virDireita);
  }
  clear(){
		/*
    this.x = 0;
    this.y = 0;
    this.dir = 2;
    this.btns.length = 0;
    this.loops.length = 0;
		// */
		this.comandosService.clear();
		this.comandosService.reset(this.level.posicaoIni);
		this.gameData.setComandos(this.comandosService.listaComandos);
		this.gameData.reset();
  }
  checkPosition(pos: Posicao)
	{
    //if(this.x == 3 && this.y == 0){
    if(pos.x == this.level.posicaoFim.x && pos.y == this.level.posicaoFim.y)
		{
      console.log("Chegou no objetivo");
      window.alert("Chegou no objetivo");
    }
    else
		{
      console.log("Errou objetivo");
      window.alert("Errou objetivo");
    }
  }
	
	removeComando(cmd: Comando)
	{
		let p: number = this.comandosService.listaComandos.indexOf(cmd);
		
		this.comandosService.listaComandos.splice(p,1);
	}
	
  rodarPrograma()
	{
		this.gameData.setComandos(this.comandosService.listaComandos);
		this.gameData.play();
		/*
    console.log("rodando");
    for(this.i=0; this.i < this.btns.length; this.i++){
      console.log("rodando4");
      this.j=this.btns[this.i];
      console.log("rodando2", this.j);
      switch(this.j){
        case 1:
          console.log("rodando");
          switch(this.dir){
            case 1:
              this.y++;
              console.log("x = " + this.x);
              console.log("y = " + this.y);
              console.log("dir = " + this.dir);
            break;
            case 2:
              this.x++;
              console.log("x = " + this.x);
              console.log("y = " + this.y);
             console.log("dir = " + this.dir);
            break;
            case 3:
              this.y--;
              console.log("x = " + this.x);
              console.log("y = " + this.y);
             console.log("dir = " + this.dir);
            break;
            case 4:
              this.x--;
              console.log("x = " + this.x);
              console.log("y = " + this.y);
             console.log("dir = " + this.dir);
            break;
            default:
            break;
          }
        break;
        case 2:
          switch(this.dir){
            case 1:
              this.dir = 4;
            break;
            case 2:
              this.dir = 1;
            break;
            case 3:
              this.dir = 2;
            break;
            case 4:
              this.dir = 3;
            break;
          }
          console.log("dir = " + this.dir);
        break;
        case 3:
        switch(this.dir){
            case 1:
              this.dir = 2;
            break;
            case 2:
              this.dir = 3;
            break;
            case 3:
              this.dir = 4;
            break;
            case 4:
              this.dir = 1;
            break;
          }
          console.log("dir = " + this.dir);
        break;
        default:
        break;
      }
    }
    console.log("x = " + this.x);
    console.log("y = " + this.y);
    console.log("dir = " + this.dir);
    this.checkPosition();
		// */
  }
	
	getLevel(n: number):Level
	{
		let level: Level = new Level();
		level.id = n
		
		switch(n)
		{
			case 2:
				level.label = 'Segundo desafio';
				level.posicaoIni = {x:0,y:0,dir: 2};
				level.posicaoFim = {x:4,y:2,dir: 2};
			break;
			case 1:
			default:
				level.label = 'Primeiro desafio';
				level.posicaoIni = {x:0,y:0,dir: 2};
				level.posicaoFim = {x:3,y:0,dir: 2};
			break;
		}
		
		return level;
	}
}

export class Level
{
	id: number = 1;
	label: string = 'Primeiro desafio';
	posicaoIni: Posicao = {x: 0, y: 0, dir: 2};
	posicaoFim: Posicao = {x: 0, y: 0, dir: 2};
}