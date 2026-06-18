import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { IconSvg } from '../../components/icon-svg/icon-svg';
import { ErrorPriorityType } from '../../shared/error-priority-type';
import { RouterLink } from '@angular/router';
import { errorMessages } from './data/signup.data';
import { ISignupForm } from './signup.interface';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    IconSvg,
    MessageModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private fb = inject(FormBuilder);

  protected readonly errorPriority: ErrorPriorityType[] = ['required', 'invalidEmail', 'mismatchPassword'];

  protected readonly errorMessages = errorMessages;

  formSubmitted = signal(false);

  signupForm: FormGroup<ISignupForm> = this.fb.group<ISignupForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });

  onSubmit(form: FormGroup<ISignupForm>) {
    this.formSubmitted.set(true);

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log(form.value);
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
