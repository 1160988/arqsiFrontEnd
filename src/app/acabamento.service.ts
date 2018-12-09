import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Acabamento } from './model/produto';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AcabamentoService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private acabamentoUrl = 'https://arqsi-2018.azurewebsites.net/api/acabamento/';  // URL to web api

  /** Log a ProdutoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`ProdutoService: ${message}`);
  }

  addMaterial(acabamento: Acabamento): Observable<Acabamento> {
    return this.http.post<Acabamento>(this.acabamentoUrl, acabamento, httpOptions)
      .pipe(
        tap(_ => this.log(`posted Acabamento id=${acabamento.id}`)),
        catchError(this.handleError<Acabamento>(`postAcabamento id=${acabamento.id}`))
      );
  }

  getAcabamento(id: number): Observable<Acabamento> {
    return this.http.get<Acabamento>(this.acabamentoUrl + id)
      .pipe(
        tap(_ => this.log(`fetched Material id=${id}`)),
        catchError(this.handleError<Acabamento>(`getMaterial id=${id}`))
      );
  }

  refreshAcabamento(id_material: number): Observable<Acabamento[]> {
    return this.http.post<Acabamento[]>(this.acabamentoUrl + "MaterialAcabamento/" + id_material, null, httpOptions)
      .pipe(
        tap(_ => this.log(`refreshed Acabamentos id=${id_material}`)),
      );
  }

  getAcabamentos(): Observable<Acabamento[]> {
    return this.http.get<Acabamento[]>(this.acabamentoUrl)
      .pipe(
        tap(_ => this.log('fetched Materials')),
        catchError(this.handleError<Acabamento[]>('getMaterials', []))
      );
  }

  updateAcabamento(produto: Acabamento): Observable<any> {
    let url: string = this.acabamentoUrl + produto.id;

    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => this.log(`updated produto id=${produto.id}`)),
      catchError(this.handleError<Acabamento>('updateMaterial'))
    );
  }

  removeAcabamento(acabamento: Acabamento): Observable<Acabamento> {
    let url: string = this.acabamentoUrl + acabamento.id;

    return this.http.delete<Acabamento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Acabamento id=${acabamento.id}`))
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
