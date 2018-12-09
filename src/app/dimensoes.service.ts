import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Dimensoes } from './model/produto';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DimensoesService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private url = 'https://arqsi-2018.azurewebsites.net/api/dimensoes/';  // URL to web api

  /** Log a ProdutoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`CategoriaService: ${message}`);
  }

  addCategoria(categoria: Dimensoes): Observable<Dimensoes> {
    return this.http.post<Dimensoes>(this.url, categoria, httpOptions)
      .pipe(
        tap(_ => this.log(`posted dimensoes id=${categoria.id}`)),
        catchError(this.handleError<Dimensoes>(`postDimensoes id=${categoria.id}`))
      );
  }

  getCategoria(id: number): Observable<Dimensoes> {
    return this.http.get<Dimensoes>(this.url + id)
      .pipe(
        tap(_ => this.log(`fetched dimensoes id=${id}`)),
        catchError(this.handleError<Dimensoes>(`getDimensoes id=${id}`))
      );
  }

  getCategorias(): Observable<Dimensoes[]> {
    return this.http.get<Dimensoes[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched dimensoes')),
        catchError(this.handleError<Dimensoes[]>('getDimensoes', []))
      );
  }

  updateCategoria(categoria: Dimensoes): Observable<any> {
    let url: string = this.url + categoria.id;

    return this.http.put(url, categoria, httpOptions).pipe(
      tap(_ => this.log(`updated dimensoes id=${categoria.id}`)),
      catchError(this.handleError<Dimensoes>('updateDimensoes'))
    );
  }

  removeCategoria(object: Dimensoes): Observable<Dimensoes> {
    let url: string = this.url + object.id;

    return this.http.delete<Dimensoes>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Dimensoes id=${object.id}`)),
      catchError(this.handleError<Dimensoes>('deleteDimensoes'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
