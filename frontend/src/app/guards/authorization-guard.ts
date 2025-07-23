import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {Authentification} from "../services/authentification";

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// @Injectable({providedIn:'root'})
@Injectable()
export class authorizationGuards {
  //// injecter le service Authentification via le constructor
  //// pour Apporter/bring les variables depuis lui et le renvoyer : data binding
  constructor(private authService:Authentification,
              private router : Router) {
  }
  canActivate(route:ActivatedRouteSnapshot , state:RouterStateSnapshot):MaybeAsync<GuardResult> {
    let authorize=false;
    let authorizedRoles : string[] = route.data['roles'] as string[];
    let roles : string[]=this.authService.roles as string[];
    // console.log(roles);
    for(let i=0;i<roles.length;i++){
      if (authorizedRoles.includes(roles[i])){
        authorize = true;
      }
    }
    return authorize;
  }

}
