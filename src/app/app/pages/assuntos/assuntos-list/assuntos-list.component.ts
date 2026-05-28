import { Component, OnInit } from '@angular/core';
import { Assunto } from '../../../models/assunto.model';
import { AssuntoService } from '../../../services/assunto.service';
import { getAssuntoId } from 'src/app/app/services/entity-utils';


@Component({
  selector: 'app-assuntos-list',
  templateUrl: './assuntos-list.component.html'
})
export class AssuntosListComponent implements OnInit {
  assuntos: Assunto[] = [];
  carregando = false;
  erro = '';

  constructor(private readonly assuntoService: AssuntoService) {}

  ngOnInit(): void {
    this.carregarAssuntos();
  }

  carregarAssuntos(): void {
    this.carregando = true;
    this.erro = '';

    this.assuntoService.listar().subscribe({
      next: (assuntos) => {
        this.assuntos = assuntos;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os assuntos.';
        this.carregando = false;
      }
    });
  }

  idAssunto(assunto: Assunto): number | undefined {
    return getAssuntoId(assunto);
  }

  excluir(assunto: Assunto): void {
    const id = this.idAssunto(assunto);
    if (id === undefined || !confirm(`Excluir o assunto "${assunto.descricao}"?`)) {
      return;
    }

    this.assuntoService.excluir(id).subscribe({
      next: () => this.carregarAssuntos(),
      error: () => {
        this.erro = 'Não foi possível excluir o assunto.';
      }
    });
  }
}
