import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Material } from './model/produto';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private materialUrl = 'https://arqsi-2018.azurewebsites.net/api/material/';  // URL to web api

  /** Log a ProdutoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`ProdutoService: ${message}`);
  }

  addMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.materialUrl, material, httpOptions)
      .pipe(
        tap(_ => this.log(`posted Material id=${material.id}`)),
        catchError(this.handleError<Material>(`postMaterial id=${material.id}`))
      );
  }

  getMaterial(id: number): Observable<Material> {
    return this.http.get<Material>(this.materialUrl + id)
      .pipe(
        tap(_ => this.log(`fetched Material id=${id}`)),
        catchError(this.handleError<Material>(`getMaterial id=${id}`))
      );
  }

  getMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialUrl)
      .pipe(
        tap(_ => this.log('fetched Materials')),
        catchError(this.handleError<Material[]>('getMaterials', []))
      );
  }

  updateMaterial(produto: Material): Observable<any> {
    let url: string = this.materialUrl + produto.id;

    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => this.log(`updated produto id=${produto.id}`)),
      catchError(this.handleError<Material>('updateMaterial'))
    );
  }

  removeMaterial(material: Material): Observable<Material> {
    let url: string = this.materialUrl + material.id;

    return this.http.delete<Material>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Material id=${material.id}`)),
      catchError(this.handleError<Material>('deleteMaterial'))
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
