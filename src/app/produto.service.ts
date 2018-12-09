import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Produto } from './model/produto';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private produtoUrl = 'https://arqsi-2018.azurewebsites.net/api/produto/';  // URL to web api

  /** Log a ProdutoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`ProdutoService: ${message}`);
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.produtoUrl, produto, httpOptions)
      .pipe(
        catchError(this.handleError('addProduto', produto))
      );
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.produtoUrl + id)
      .pipe(
        tap(_ => this.log(`fetched produto id=${id}`)),
        catchError(this.handleError<Produto>(`getProduto id=${id}`))
      );
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.produtoUrl)
      .pipe(
        tap(_ => this.log('fetched produtos')),
        catchError(this.handleError<Produto[]>('getProdutos', []))
      );
  }

  updateProduto(produto: Produto): Observable<any> {
    let url: string = this.produtoUrl + produto.id;

    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => this.log(`updated produto id=${produto.id}`)),
      catchError(this.handleError<Produto>('updateProduto'))
    );
  }

  removeProduto(produto: Produto): Observable<Produto> {
    let url: string = this.produtoUrl + produto.id;

    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted produto id=${produto.id}`)),
      catchError(this.handleError<Produto>('deleteProduto'))
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
