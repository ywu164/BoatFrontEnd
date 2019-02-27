import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Boat } from "../models/boat";;
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class BoatService {

  constructor(private _http: HttpClient) { }
  private URL: string = 'https://aspangularassn1.azurewebsites.net';
  
  getBoat(): Observable<Boat[]>  {
    const url = `${this.URL}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this._http.get<Boat[]>(url, { headers: headers })
      .pipe(
        map((data: Boat[]) => data),
        catchError(this.handleError('getBoats', []))
      );
  }

  getBoatById(id: number): Observable<Boat> {
    const url = `${this.URL}/${id}`;

    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.get<Boat>(url, { headers : headers})
      .pipe(
        map((data: Boat) => data), 
        catchError(this.handleError<Boat>('getBoatById'))
      );
  }

  createBoat(_boat: Boat): Observable<Boat> {
    const url = `${this.URL}`;
    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.post<Boat>(url, _boat, {headers: headers})
      .pipe(
        map((data: Boat) => data),
        catchError(this.handleError<Boat>('createBoat'))
      );
  }

  updateBoat(id, _boat): Observable<Boat> {
    const url = `${this.URL}/${id}`;

    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);

    return this._http.put(url, _boat, {headers: headers})
      .pipe(
      map((data: Boat) => data),
        catchError(this.handleError<Boat>('updateBoat'))
      );
  }

  deleteBoat(id: number): Observable<Boat> {
    const url = `${this.URL}/${id}`;

    let authToken = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', authToken);
   
    return this._http.delete<Boat>(url, {headers: headers})
      .pipe(
        map((data: Boat)=>data),
        catchError(this.handleError<Boat>('deleteBoat'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}  
