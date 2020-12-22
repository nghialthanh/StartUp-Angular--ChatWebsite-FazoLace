import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private _auth: LoginService, private _router: Router) { }


  canActivate(): boolean {
    if (this._auth.logginAdmin()) {
      return true
    }
    else {
      this._router.navigate(['login'])
      return false
    }
  }
}
