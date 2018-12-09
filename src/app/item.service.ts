import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Item } from './model/item';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private categoriaUrl = 'https://app-encomendas.herokuapp.com/item/';  // URL to web api

  /** Log a ProdutoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`CategoriaService: ${message}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.categoriaUrl + "create", item, httpOptions)
      .pipe(
        tap(_ => this.log(`posted Item id=${item}`)),
        catchError(this.handleError<Item>(`postItem id=${item}`))
      );
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(this.categoriaUrl + id)
      .pipe(
        tap(_ => this.log(`fetched Item id=${id}`)),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  getItemSons(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.categoriaUrl + "sons/" + id)
      .pipe(
        tap(_ => this.log(`fetched ItemSons id=${id}`)),
        catchError(this.handleError<Item[]>(`getItemSons id=${id}`))
      );
  }

  getiItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.categoriaUrl)
      .pipe(
        tap(_ => this.log('fetched Items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  updateItem(item: Item): Observable<Item> {
    let url: string = this.categoriaUrl + "edit/" + item._id;

    return this.http.put<Item>(url, item, httpOptions).pipe(
      tap(_ => this.log(`updated produto id=${item._id}`)),
      catchError(this.handleError<Item>('updateProduto'))
    );
  }
  removeItem(item: Item): Observable<Item> {
    let url: string = this.categoriaUrl + "delete/" + item._id;

    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${item._id}`)),
      catchError(this.handleError<Item>('deleteItem'))
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
