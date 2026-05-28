import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from '../../../models/assunto.model';
import { AssuntoService } from '../../../services/assunto.service';

@Component({
  selector: 'app-assuntos-form',
  templateUrl: './assuntos-form.component.html'
})
export class AssuntosFormComponent implements OnInit {
  form = this.fb.group({
    descricao: ['', [Validators.required, Validators.maxLength(20)]]
  });

  id?: number;
  enviado = false;
  erro = '';
  salvando = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly assuntoService: AssuntoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? Number(idParam) : undefined;

    if (this.id !== undefined) {
      this.assuntoService.buscarPorId(this.id).subscribe({
        next: (assunto) => this.form.patchValue({ descricao: assunto.descricao }),
        error: () => {
          this.erro = 'Nao foi possivel carregar o assunto.';
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
      return 'Informe a descricao do assunto.';
    }

    if (control.errors['maxlength']) {
      return `A descricao aceita no maximo ${control.errors['maxlength'].requiredLength} caracteres.`;
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

    const assunto: Assunto = {
      descricao: String(this.form.value.descricao).trim()
    };

    this.salvando = true;
    const request = this.id === undefined
      ? this.assuntoService.salvar(assunto)
      : this.assuntoService.atualizar(this.id, assunto);

    request.subscribe({
      next: () => this.router.navigate(['/assuntos']),
      error: () => {
        this.erro = 'Nao foi possivel salvar o assunto.';
        this.salvando = false;
      }
    });
  }
}
