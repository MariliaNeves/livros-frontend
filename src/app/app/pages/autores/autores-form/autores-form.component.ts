import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../../../models/autor.model';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autores-form',
  templateUrl: './autores-form.component.html'
})
export class AutoresFormComponent implements OnInit {
  form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(40)]]
  });

  id?: number;
  enviado = false;
  erro = '';
  salvando = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly autorService: AutorService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? Number(idParam) : undefined;

    if (this.id !== undefined) {
      this.autorService.buscarPorId(this.id).subscribe({
        next: (autor) => this.form.patchValue({ nome: autor.nome }),
        error: () => {
          this.erro = 'Nao foi possivel carregar o autor.';
        }
      });
    }
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
      return 'Informe o nome do autor.';
    }

    if (control.errors['maxlength']) {
      return `O nome aceita no maximo ${control.errors['maxlength'].requiredLength} caracteres.`;
    }

    return 'Campo invalido.';
  }

  salvar(): void {
    this.enviado = true;
    this.erro = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const autor: Autor = {
      nome: String(this.form.value.nome).trim()
    };

    this.salvando = true;
    const request = this.id === undefined
      ? this.autorService.salvar(autor)
      : this.autorService.atualizar(this.id, autor);

    request.subscribe({
      next: () => this.router.navigate(['/autores']),
      error: () => {
        this.erro = 'Nao foi possivel salvar o autor.';
        this.salvando = false;
      }
    });
  }
}
