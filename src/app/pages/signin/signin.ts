import { Component, inject, signal } from '@angular/core';
import { IconSvg } from '../../components/icon-svg/icon-svg';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISigninForm } from './signin.interface';
import { MessageModule } from 'primeng/message';
import { ErrorPriorityType } from '../../shared/error-priority-type';
import { errorMessages } from './data/signin.data';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signin',
  imports: [IconSvg, MessageModule, ReactiveFormsModule, InputTextModule, PasswordModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private fb = inject(FormBuilder);

  protected readonly errorPriority: ErrorPriorityType[] = ['required'];

  protected readonly errorMessages = errorMessages;

  formSubmitted = signal(false);

  signinForm: FormGroup<ISigninForm> = this.fb.group<ISigninForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  onSubmit(form: FormGroup<ISigninForm>) {
    this.formSubmitted.set(true);

    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    console.log(form.value);
  }

  getErrorMessage(fieldName: keyof ISigninForm): string {
    const controlErrors = this.signinForm.get(fieldName)?.errors;

    if (!controlErrors) return '';

    const errorType = this.errorPriority.find(type => controlErrors[type]);
    return errorType ? this.errorMessages[fieldName]?.[errorType] || '' : '';
  }

  isInvalid(controlName: string) {
    const control = this.signinForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

  forgotPassword(): void {
    console.log("Forgot Password");
  }
}
