import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatorioLivrosPorAutor } from '../models/relatorio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private readonly apiUrl = `${environment.apiUrl}/relatorios/livros-por-autor`;

  constructor(private readonly http: HttpClient) {}

  livrosPorAutor(): Observable<RelatorioLivrosPorAutor[]> {
    return this.http.get<RelatorioLivrosPorAutor[]>(this.apiUrl);
  }
}
