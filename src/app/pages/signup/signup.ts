import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { IconSvg } from '../../components/icon-svg/icon-svg';
import { ErrorPriorityType } from '../../shared/error-priority-type';
import { Router, RouterLink } from '@angular/router';
import { errorMessages } from './data/signup.data';
import { ISignup, ISignupForm } from './signup.interface';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { STRONG_PASSWORD_REGEX } from '../../shared/constants';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    IconSvg,
    MessageModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  protected readonly errorPriority: ErrorPriorityType[] = ['required', 'invalidEmail', 'mismatchPassword'];

  protected readonly errorMessages = errorMessages;

  formSubmitted = signal(false);
  isPending = signal(false);

  public STRONG_PASSWORD_REGEX = STRONG_PASSWORD_REGEX;

  signupForm: FormGroup<ISignupForm> = this.fb.group<ISignupForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });

  onSubmit(form: FormGroup<ISignupForm>) {
    this.formSubmitted.set(true);

    if (form.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isPending.set(true);
    this.authService.signup(form.value as ISignup).subscribe({
      next: () => {
        this.toastService.success("Compte Naelytics créé avec succès");
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        this.toastService.error("Une erreur est survenue lors de la création du compte: " + error.message);
        this.isPending.set(false);
      },
      complete: () => {
        this.formSubmitted.set(false);
        this.isPending.set(false);
        this.signupForm.reset();
      }
    });
  }

  getErrorMessage(fieldName: keyof ISignupForm): string {
    const controlErrors = this.signupForm.get(fieldName)?.errors;

    if (!controlErrors) return '';

    const errorType = this.errorPriority.find(type => controlErrors[type]);
    return errorType ? this.errorMessages[fieldName]?.[errorType] || '' : '';
  }

  isInvalid(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

  checkMatchingPassword(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      this.signupForm.get('confirmPassword')?.setErrors({ mismatchPassword: true });
    }
  }

  forgotPassword(): void {
    console.log("Forgot Password");
  }
}
