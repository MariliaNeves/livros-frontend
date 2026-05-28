import { Component, OnInit } from '@angular/core';
import { Livro } from '../../../models/livro.model';
import { getLivroId } from '../../../services/entity-utils';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html'
})
export class LivrosListComponent implements OnInit {
  livros: Livro[] = [];
  carregando = false;
  erro = '';

  constructor(private readonly livroService: LivroService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.carregando = true;
    this.erro = '';

    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os livros.';
        this.carregando = false;
      }
    });
  }

  idLivro(livro: Livro): number | undefined {
    return getLivroId(livro);
  }

  autores(livro: Livro): string {
    return livro.autores && livro.autores.length > 0
      ? livro.autores.map((autor) => autor.nome).join(', ')
      : '-';
  }

  assuntos(livro: Livro): string {
    return livro.assuntos && livro.assuntos.length > 0
      ? livro.assuntos.map((assunto) => assunto.descricao).join(', ')
      : '-';
  }

  valor(valor: number | undefined): string {
    if (valor === undefined || valor === null) {
      return '-';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(valor));
  }

  excluir(livro: Livro): void {
    const id = this.idLivro(livro);
    if (id === undefined || !confirm(`Excluir o livro "${livro.titulo}"?`)) {
      return;
    }

    this.livroService.excluir(id).subscribe({
      next: () => this.carregarLivros(),
      error: () => {
        this.erro = 'Não foi possível excluir o livro.';
      }
    });
  }
}
