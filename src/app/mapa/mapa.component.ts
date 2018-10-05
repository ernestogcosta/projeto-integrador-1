import { Component, OnInit, Input } from '@angular/core';
import { ComandosService, Posicao } from '../comandos.service';
import { GamedataService } from '../gamedata.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit
{
  constructor(
		public comandosService: ComandosService,
		public gameData: GamedataService
	)
	{
		this.gameData.posicao.subscribe(posicao =>
		{
			this.pontoMovel = posicao;
			this.calculaRota(this.gameData.rota);
			//console.log(posicao);
		});
		
		this.gridW = Array.apply(null, {length: this.cols}).map(Number.call, Number);
		this.gridH = Array.apply(null, {length: this.rows}).map(Number.call, Number);
		
		this.center = {x: (this.cols/2), y: (this.rows/2)};
	}
	
	@Input() posicaoIni: Posicao = {x: 0, y: 0, dir: 2}; // Posição inicial do mapa
	@Input() posicaoFim: Posicao = {x: 0, y: 0, dir: 2}; // Posição final (alvo)
	
	pontoMovel: Posicao = {x: 0, y: 0, dir: 2}; // Posição do jogador no momento
	linhas: Linha[] = []; // Linhas da rota percorrida pelo jogador
	
	cols: number = 20; // Número de colunas no mapa
	rows: number = 8; // Número de linhas no mapa
	gap: number = 27; // Distância (pixels) entre as colunas
	
	gridH: number[] = []; // Array do grid na Horizontal
	gridW: number[] = []; // Array do grid na Vertical
	
	center: Posicao = {x: (this.cols/2), y: (this.rows/2)}; // Centro do mapa
	
  ngOnInit()
	{
		this.pontoMovel.x = this.posicaoIni.x;
		this.pontoMovel.y = this.posicaoIni.y;
		this.pontoMovel.dir = this.posicaoIni.dir;
	}
	
	calculaRota(rota: Posicao[])
	{
		this.linhas = [];
		//console.log('Rota: ',rota);
		
		let pontoOld: Posicao = null;
		for (let ponto of rota)
		{
			if (pontoOld == null)
			{
				pontoOld = ponto;
				continue;
			}
			let linha: Linha = new Linha();
			linha.x1 = pontoOld.x;
			linha.y1 = pontoOld.y;
			linha.x2 = ponto.x;
			linha.y2 = ponto.y;
			pontoOld = ponto;
			
			this.linhas.push(linha);
		}
		
		//console.log('Linhas: ',this.linhas);
	}
}

export class Linha
{
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}