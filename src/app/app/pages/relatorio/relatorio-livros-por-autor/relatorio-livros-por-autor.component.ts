import { Component, OnInit } from '@angular/core';
import { Livro } from '../../../models/livro.model';
import { RelatorioLivrosPorAutor } from '../../../models/relatorio.model';
import { RelatorioService } from '../../../services/relatorio.service';

@Component({
  selector: 'app-relatorio-livros-por-autor',
  templateUrl: './relatorio-livros-por-autor.component.html'
})
export class RelatorioLivrosPorAutorComponent implements OnInit {
  itens: RelatorioLivrosPorAutor[] = [];
  carregando = false;
  erro = '';

  constructor(private readonly relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.carregarRelatorio();
  }

  carregarRelatorio(): void {
    this.carregando = true;
    this.erro = '';

    this.relatorioService.livrosPorAutor().subscribe({
      next: (itens) => {
        this.itens = this.agruparPorAutor(itens);
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar o relatorio.';
        this.carregando = false;
      }
    });
  }

  nomeAutor(item: RelatorioLivrosPorAutor): string {
    return item.autor ?? item.nomeAutor ?? '-';
  }

  titulos(item: RelatorioLivrosPorAutor): string[] {
    if (item.titulos && item.titulos.length > 0) {
      return item.titulos;
    }

    if (item.livros && item.livros.length > 0) {
      return item.livros.map((livro: Livro) => livro.titulo);
    }

    return item.titulo ? [item.titulo] : [];
  }

  total(item: RelatorioLivrosPorAutor): number {
    return item.totalLivros ?? this.titulos(item).length;
  }

  private agruparPorAutor(itens: RelatorioLivrosPorAutor[]): RelatorioLivrosPorAutor[] {
    const autores = new Map<string, RelatorioLivrosPorAutor>();

    itens.forEach((item) => {
      const chave = this.chaveAutor(item);
      const existente = autores.get(chave);
      const titulos = [...(existente?.titulos ?? [])];

      this.titulos(item).forEach((titulo) => {
        if (!titulos.includes(titulo)) {
          titulos.push(titulo);
        }
      });

      autores.set(chave, {
        ...existente,
        autorId: existente?.autorId ?? item.autorId,
        autor: existente?.autor ?? item.autor,
        nomeAutor: existente?.nomeAutor ?? item.nomeAutor,
        titulos,
        totalLivros: titulos.length
      });
    });

    return Array.from(autores.values());
  }

  private chaveAutor(item: RelatorioLivrosPorAutor): string {
    return item.autorId !== undefined
      ? `id:${item.autorId}`
      : `nome:${this.nomeAutor(item)}`;
  }
}
