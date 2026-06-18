import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import {inject, Injectable} from '@angular/core';
import { ISignup } from "../pages/signup/signup.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private BASE_URL = environment.apiUrl;

    private http = inject(HttpClient);

    signup(user: ISignup): Observable<void> {
        return this.http.post<void>(`${this.BASE_URL}/auth/signup`, user);
    }
}