import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface module {
  id: string;
  idHTML: number; //count
  type: string; //category
  position: object; // {x,y,width,height}
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModulVerarbeitungService {

  constructor(private http: HttpClient) {}

  moduleDelete(object: module){

    const option = {
      method : 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    return this.http.post('/delete',module,option);
  }

}
