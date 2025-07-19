import {CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Authentification} from "../services/authentification";

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable()
export class authGuards {
  //// injecter le service Authentification via le constructor
  //// pour Apporter/bring les variables depuis lui et le renvoyer : data binding
  constructor(private authService:Authentification,
              private router : Router) {
  }
  canActivate(ActivatedRouteSnapshot : RouterStateSnapshot):MaybeAsync<GuardResult> {
    if(this.authService.authenticated){return true;}
    else{
      this.router.navigateByUrl("/login")
      return false;
    }
  }}
