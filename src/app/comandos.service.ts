import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class ComandosService
{
  constructor() { }
	
	comandoAtual: BehaviorSubject<Comando> = new BehaviorSubject(null);
	listaComandos: Comando[] = [];
	lookAt: number = 2;
	x: number = 0;
	y: number = 0;
	//dx: number = 0;
	//dy: number = 0;
	
	pushCmd(dir: string)
	{
		let cmd: Comando = this.processaCmd(dir);
		this.listaComandos.push(cmd);
		//console.log('Comando: ',cmd);
	}
	
	clear()
	{
		this.listaComandos = [];
	}
	
	reset(posicaoInicial: Posicao)
	{
		this.x = posicaoInicial.x;
		this.y = posicaoInicial.y;
		this.lookAt = posicaoInicial.dir;
	}
	
	processaCmd(dir: string): Comando
	{
		let saida: Comando = new Comando();
		switch (dir)
		{
			case 'avancar':
				saida.label = 'Avançar';
				saida.dir = this.lookAt;
				let vetor = this.getVetor(saida.dir);
				saida.dx = vetor.x;
				saida.dy = vetor.y;
			break;
			case 'direita':
				saida.label = 'Virar para direita';
				saida.dir = this.changeDirection(1);
				saida.dx = 0;
				saida.dy = 0;
			break;
			case 'esquerda':
				saida.label = 'Virar para esquerda';
				saida.dir = this.changeDirection(-1);
				saida.dx = 0;
				saida.dy = 0;
			break;
		}
		
		return saida;
	}
	
	changeDirection(xdir: number): number
	{
		this.lookAt += xdir;
		if (this.lookAt > 4) this.lookAt -= 4;
		else if (this.lookAt < 1) this.lookAt += 4;
		
		return this.lookAt;
	}
	
	getVetor(dir: number): Posicao
	{
		let dx: number = 0;
		let dy: number = 0;
		
		switch(dir)
		{
			case 1: dx = 0; dy = 1; break;
			case 2: dx = 1; dy = 0; break;
			case 3: dx = 0; dy = -1; break;
			case 4: dx = -1; dy = 0; break;
		}
		
		return {x: dx, y: dy, dir: dir};
	}
}

export class Comando
{
	label: string;
	dir: number;
	dx: number = 0;
	dy: number = 0;
}

export class Posicao
{
	x: number;
	y: number;
	dir?: number;
}