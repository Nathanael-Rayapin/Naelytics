import { FormControl } from "@angular/forms";

export interface ISignupForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
}

export interface ISignup {
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
}