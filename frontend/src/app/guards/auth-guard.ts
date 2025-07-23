import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Authentification} from "../services/authentification";
import {Injectable} from "@angular/core";


//si on indique {providedIn:'root'} que le service est disponible dans le racine
//c'est pas l'appel de déclare le service authGuards dans les providers dans app-module
@Injectable({providedIn:'root'})
export class authGuards {
    //// injecter le service Authentification via le constructor
    //// pour Apporter/bring les variables depuis lui et le renvoyer : data binding
    constructor(private authService:Authentification,
                private router : Router) {  }

    canActivate(route:ActivatedRouteSnapshot ,state: RouterStateSnapshot):MaybeAsync<GuardResult> {
      if(this.authService.authenticated){return true;}
      else{
        this.router.navigateByUrl("/login")
        return false;
      }
    }
}

//=========================add this for function methode========================
// export const authGuard: CanActivateFn = (route, state) => {
//   return inject(authGuards).canActivate(route);
// };
