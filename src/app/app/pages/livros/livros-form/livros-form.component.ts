import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from '../../../models/assunto.model';
import { Autor } from '../../../models/autor.model';
import { Livro } from '../../../models/livro.model';
import { AssuntoService } from '../../../services/assunto.service';
import { AutorService } from '../../../services/autor.service';
import { getAssuntoId, getAutorId } from '../../../services/entity-utils';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livros-form',
  templateUrl: './livros-form.component.html'
})
export class LivrosFormComponent implements OnInit {
  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(40)]],
    editora: ['', [Validators.required, Validators.maxLength(40)]],
    edicao: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    anoPublicacao: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    valor: ['', [Validators.required]],
    autoresIds: [[], [Validators.required]],
    assuntosIds: [[], [Validators.required]]
  });

  autores: Autor[] = [];
  assuntos: Assunto[] = [];
  id?: number;
  enviado = false;
  erro = '';
  salvando = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly livroService: LivroService,
    private readonly autorService: AutorService,
    private readonly assuntoService: AssuntoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? Number(idParam) : undefined;
    this.carregarAutores();
    this.carregarAssuntos();

    if (this.id !== undefined) {
      this.carregarLivro(this.id);
    }
  }

  carregarAutores(): void {
    this.autorService.listar().subscribe({
      next: (autores) => {
        this.autores = autores;
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar os autores.';
      }
    });
  }

  carregarAssuntos(): void {
    this.assuntoService.listar().subscribe({
      next: (assuntos) => {
        this.assuntos = assuntos;
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar os assuntos.';
      }
    });
  }

  carregarLivro(id: number): void {
    this.livroService.buscarPorId(id).subscribe({
      next: (livro) => {
        this.form.patchValue({
          titulo: livro.titulo,
          editora: livro.editora ?? '',
          edicao: livro.edicao !== undefined ? String(livro.edicao) : '',
          anoPublicacao: livro.anoPublicacao !== undefined ? String(livro.anoPublicacao) : '',
          valor: this.formatarMoeda(livro.valor),
          autoresIds: this.idsAutores(livro.autores),
          assuntosIds: this.idsAssuntos(livro.assuntos)
        });
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar o livro.';
      }
    });
  }

  idAutor(autor: Autor): number | undefined {
    return getAutorId(autor);
  }

  idAssunto(assunto: Assunto): number | undefined {
    return getAssuntoId(assunto);
  }

  autorSelecionado(autor: Autor): boolean {
    const id = this.idAutor(autor);
    return id !== undefined && this.normalizarIds(this.form.value.autoresIds).includes(id);
  }

  assuntoSelecionado(assunto: Assunto): boolean {
    const id = this.idAssunto(assunto);
    return id !== undefined && this.normalizarIds(this.form.value.assuntosIds).includes(id);
  }

  alternarAutor(autor: Autor, selecionado: boolean): void {
    const id = this.idAutor(autor);
    if (id === undefined) {
      return;
    }

    this.atualizarSelecao('autoresIds', id, selecionado);
  }

  alternarAssunto(assunto: Assunto, selecionado: boolean): void {
    const id = this.idAssunto(assunto);
    if (id === undefined) {
      return;
    }

    this.atualizarSelecao('assuntosIds', id, selecionado);
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || this.enviado);
  }

  mensagemCampo(campo: string): string {
    const control = this.form.get(campo);
    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return this.mensagemObrigatorio(campo);
    }

    if (control.errors['maxlength']) {
      return `O campo aceita no maximo ${control.errors['maxlength'].requiredLength} caracteres.`;
    }

    if (campo === 'anoPublicacao' && control.errors['pattern']) {
      return 'Informe um ano valido com 4 digitos.';
    }

    if (campo === 'edicao' && (control.errors['min'] || control.errors['pattern'])) {
      return 'Informe uma edicao valida com numero inteiro maior que zero.';
    }

    return 'Campo invalido.';
  }

  formatarValor(): void {
    const valor = this.parseMoeda(String(this.form.value.valor ?? ''));
    this.form.patchValue({
      valor: valor === undefined ? '' : this.formatarMoeda(valor)
    });
  }

  aplicarMascaraValor(event: Event): void {
    const input = event.target as HTMLInputElement;
    const somenteDigitos = input.value.replace(/\D/g, '');
    const valor = somenteDigitos === '' ? undefined : Number(somenteDigitos) / 100;
    const valorFormatado = valor === undefined ? '' : this.formatarMoeda(valor);

    this.form.patchValue({ valor: valorFormatado }, { emitEvent: false });
    input.value = valorFormatado;
  }

  salvar(): void {
    this.enviado = true;
    this.erro = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valor = this.parseMoeda(String(this.form.value.valor ?? ''));
    if (valor === undefined) {
      this.erro = 'Informe um valor valido para o livro.';
      return;
    }

    const anoPublicacao = String(this.form.value.anoPublicacao ?? '').trim();
    if (!/^\d{4}$/.test(anoPublicacao)) {
      this.erro = 'Informe um ano de publicacao valido com 4 digitos.';
      return;
    }

    const livro: Livro = {
      titulo: String(this.form.value.titulo ?? '').trim(),
      editora: String(this.form.value.editora ?? '').trim(),
      edicao: this.numeroOpcional(this.form.value.edicao),
      anoPublicacao,
      valor,
      autoresIds: this.normalizarIds(this.form.value.autoresIds),
      assuntosIds: this.normalizarIds(this.form.value.assuntosIds)
    };

    this.salvando = true;
    const request = this.id === undefined
      ? this.livroService.salvar(livro)
      : this.livroService.atualizar(this.id, livro);

    request.subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => {
        this.erro = 'Nao foi possivel salvar o livro.';
        this.salvando = false;
      }
    });
  }

  private mensagemObrigatorio(campo: string): string {
    const mensagens: { [key: string]: string } = {
      titulo: 'Informe o titulo do livro.',
      editora: 'Informe a editora do livro.',
      edicao: 'Informe a edicao do livro.',
      anoPublicacao: 'Informe o ano de publicacao.',
      valor: 'Informe o valor do livro.',
      autoresIds: 'Selecione pelo menos um autor.',
      assuntosIds: 'Selecione pelo menos um assunto.'
    };

    return mensagens[campo] ?? 'Campo obrigatorio.';
  }

  private idsAutores(autores: Autor[] | undefined): number[] {
    return autores
      ? autores.map((autor) => getAutorId(autor)).filter((id): id is number => id !== undefined)
      : [];
  }

  private idsAssuntos(assuntos: Assunto[] | undefined): number[] {
    return assuntos
      ? assuntos.map((assunto) => getAssuntoId(assunto)).filter((id): id is number => id !== undefined)
      : [];
  }

  private normalizarIds(valor: unknown): number[] {
    if (!Array.isArray(valor)) {
      return [];
    }

    return valor
      .map((item) => Number(item))
      .filter((item) => !Number.isNaN(item));
  }

  private atualizarSelecao(campo: 'autoresIds' | 'assuntosIds', id: number, selecionado: boolean): void {
    const idsAtuais = this.normalizarIds(this.form.value[campo]);
    const ids = selecionado
      ? Array.from(new Set([...idsAtuais, id]))
      : idsAtuais.filter((item) => item !== id);

    const control = this.form.get(campo);
    control?.setValue(ids);
    control?.markAsTouched();
    control?.updateValueAndValidity();
  }

  private numeroOpcional(valor: unknown): number | undefined {
    if (valor === null || valor === undefined || valor === '') {
      return undefined;
    }

    const numero = Number(valor);
    return Number.isNaN(numero) ? undefined : numero;
  }

  private parseMoeda(valor: string): number | undefined {
    const semSimbolo = valor.replace(/[R$\s.]/g, '').replace(',', '.');
    if (semSimbolo === '') {
      return undefined;
    }

    const numero = Number(semSimbolo);
    return Number.isNaN(numero) ? undefined : numero;
  }

  private formatarMoeda(valor: number | undefined): string {
    if (valor === undefined || valor === null) {
      return '';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(valor));
  }
}
