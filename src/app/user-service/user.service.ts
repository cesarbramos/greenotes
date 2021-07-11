import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService
    ) { }

  

}
