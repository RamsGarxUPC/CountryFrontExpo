import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Country } from '../models/country';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url1 = `${base_url}/countries`;

  private listaCambio=new Subject<Country[]>()

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Country[]>(this.url1);
  }
  insert(i: Country) {
    return this.http.post(this.url1, i);
  }

  setList(listaNueva: Country[]) {
    this.listaCambio.next(listaNueva);
   }

   getList() {
    return this.listaCambio.asObservable();
   }

}
