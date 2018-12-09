import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Categoria } from './model/produto';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private categoriaUrl = 'https://arqsi-2018.azurewebsites.net/api/categoria/';  // URL to web api

  /** Log a ProdutoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`CategoriaService: ${message}`);
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriaUrl, categoria, httpOptions)
      .pipe(
        tap(_ => this.log(`posted Material id=${categoria.id}`)),
        catchError(this.handleError<Categoria>(`postMaterial id=${categoria.id}`))
      );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.categoriaUrl + id)
      .pipe(
        tap(_ => this.log(`fetched categoria id=${id}`)),
        catchError(this.handleError<Categoria>(`getProduto id=${id}`))
      );
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaUrl)
      .pipe(
        tap(_ => this.log('fetched produtos')),
        catchError(this.handleError<Categoria[]>('getProdutos', []))
      );
  }

  updateCategoria(categoria: Categoria): Observable<any> {
    let url: string = this.categoriaUrl + categoria.id;

    return this.http.put(url, categoria, httpOptions).pipe(
      tap(_ => this.log(`updated produto id=${categoria.id}`)),
      catchError(this.handleError<Categoria>('updateProduto'))
    );
  }

  removeCategoria(material: Categoria): Observable<Categoria> {
    let url: string = this.categoriaUrl + material.id;

    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Categoria id=${material.id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
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
