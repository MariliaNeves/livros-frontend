import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assunto } from '../models/assunto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
  private readonly apiUrl = `${environment.apiUrl}/assuntos`;

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.apiUrl}/${id}`);
  }

  salvar(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }

  atualizar(id: number, assunto: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.apiUrl}/${id}`, assunto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
