import { Assunto } from '../models/assunto.model';


export function getAssuntoId(assunto: Assunto): number | undefined {
  return assunto.id;
}

export function getAssuntoDescricao(assunto: Assunto): string {
  return assunto.descricao;
}
