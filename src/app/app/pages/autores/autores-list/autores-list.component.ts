import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../models/autor.model';
import { AutorService } from '../../../services/autor.service';
import { getAutorId } from '../../../services/entity-utils';

@Component({
  selector: 'app-autores-list',
  templateUrl: './autores-list.component.html'
})
export class AutoresListComponent implements OnInit {
  autores: Autor[] = [];
  carregando = false;
  erro = '';

  constructor(private readonly autorService: AutorService) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores(): void {
    this.carregando = true;
    this.erro = '';

    this.autorService.listar().subscribe({
      next: (autores) => {
        this.autores = autores;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os autores.';
        this.carregando = false;
      }
    });
  }

  idAutor(autor: Autor): number | undefined {
    return getAutorId(autor);
  }

  excluir(autor: Autor): void {
    const id = this.idAutor(autor);
    if (id === undefined || !confirm(`Excluir o autor "${autor.nome}"?`)) {
      return;
    }

    this.autorService.excluir(id).subscribe({
      next: () => this.carregarAutores(),
      error: () => {
        this.erro = 'Não foi possível excluir o autor.';
      }
    });
  }
}
