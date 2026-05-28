import { Assunto } from '../models/assunto.model';
import { Autor } from '../models/autor.model';
import { Livro } from '../models/livro.model';


export function getAssuntoId(assunto: Assunto): number | undefined {
  return assunto.id;
}

export function getAssuntoDescricao(assunto: Assunto): string {
  return assunto.descricao;
}

export function getAutorNome(autor: Autor): string {
  return autor.nome;
}

export function getAutorId(autor: Autor): number | undefined {
  return autor.id;
}

export function getLivroId(livro: Livro): number | undefined {
  return livro.id;
}



