import { FormControl } from "@angular/forms";

export interface ISigninForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;    
}

export interface ISignin {
    email: string | null;
    password: string | null;
}