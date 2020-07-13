import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx"

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(){
    return this.http.get("https://tiendaonline-6a97f.firebaseio.com/usuarios/.json")
      .map((res: Response) => {
       console.log(res.json());
      return res.json();
});

  }
}
