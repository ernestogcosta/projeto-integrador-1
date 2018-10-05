import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Posicao, Comando } from './comandos.service';

@Injectable()
export class GamedataService
{
  constructor()
	{
	}
	
	posicao: BehaviorSubject<Posicao> = new BehaviorSubject({x: 0, y: 0, dir: 2});
	rota: Posicao[] = [];
	final: BehaviorSubject<boolean> = new BehaviorSubject(false);
	
	private comandos: Comando[] = [];
	private pilha: Comando[] = [];
	
	private posicaoIni: Posicao = new Posicao();
	private posicaoAtual: Posicao = new Posicao();
	
	private time: number = 500;
	
	setComandos(comandos: Comando[])
	{
		this.comandos = comandos;
	}
	
	init(posicao: Posicao)
	{
		this.posicaoIni.x = posicao.x;
		this.posicaoIni.y = posicao.y;
		this.posicaoIni.dir = posicao.dir;
	}
	
	play()
	{
		this.reset();
		setTimeout(()=>
		{
			this.next();
		},
		this.time);
		
		this.final.next(false);
	}
	reset()
	{
		this.posicaoAtual = {x: this.posicaoIni.x, y: this.posicaoIni.y, dir: this.posicaoIni.dir};
		this.rota = [];
		let pos: Posicao = this.getCurrentPosition()
		this.pilha.push(...this.comandos);
		this.rota.push(pos);
		this.posicao.next(pos);
	}
	next()
	{
		if (this.pilha.length == 0)
		{
			this.final.next(true);
			return;
		}
		
		let cmd: Comando = this.pilha.shift();
		
		this.posicaoAtual.dir = cmd.dir;
		this.posicaoAtual.x += cmd.dx;
		this.posicaoAtual.y += cmd.dy;
		
		let pos: Posicao = this.getCurrentPosition()
		if ((Math.abs(cmd.dx) + Math.abs(cmd.dy)) > 0)	this.rota.push(pos);
		this.posicao.next(pos);
		
		setTimeout(()=>
		{
			this.next();
		},
		this.time);
	}
	
	getCurrentPosition():Posicao
	{
		let saida: Posicao = new Posicao();
		
		saida.x = this.posicaoAtual.x;
		saida.y = this.posicaoAtual.y;
		saida.dir = this.posicaoAtual.dir;
		
		return saida;
	}
}
