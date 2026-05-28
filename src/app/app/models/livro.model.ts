import { Assunto } from './assunto.model';
import { Autor } from './autor.model';

export interface Livro {
  id?: number;
  titulo: string;
  editora?: string;
  edicao?: number;
  anoPublicacao?: string;
  valor?: number;
  autoresIds?: number[];
  assuntosIds?: number[];
  autores?: Autor[];
  assuntos?: Assunto[];
}
