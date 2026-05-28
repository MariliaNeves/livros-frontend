import { Livro } from './livro.model';

export interface RelatorioLivrosPorAutor {
  autorId?: number;
  autor?: string;
  nomeAutor?: string;
  livroId?: number;
  titulo?: string;
  editora?: string;
  edicao?: number;
  anoPublicacao?: string;
  valor?: number;
  assuntos?: string;
  livros?: Livro[];
  titulos?: string[];
  totalLivros?: number;
}
