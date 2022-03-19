import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/interfaces";
import {Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string)
    if (new Date() > expDate) {
      this.logOut()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
     .pipe(
       tap(this.setToken)
     )
  }

  logOut() {
    this.setToken(null)
  }

  isAuth(): boolean {
    return !!this.token
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);

      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
