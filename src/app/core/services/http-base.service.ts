import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONTEXT_SERVICE } from '@constants';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


/**
 * Base service for fetch http services
 *
 * @author bcueva
 * @version 1.0
 */
export abstract class HttpBaseService {

  protected http: HttpClient;
  protected httpOptions: {
    headers: HttpHeaders
  };
  context: string;
  controller: string;

  constructor(http: HttpClient, controller: string) {
    this.http = http;
    this.controller = controller;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.context = CONTEXT_SERVICE;
  }

  get baseUrl(): string {
    return `${environment.apiUrl}${CONTEXT_SERVICE}${this.controller}`;
  }

  /**
   * Fetch with GET mehod
   *
   * @param path Partial path url service
   * @returns
   */
  get(path: string): Observable<any> {
    this.log(`call GET url: ${path}`);
    return this.http.get(`${this.baseUrl}${path}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`fetched url: ${path}`)),
        catchError(this.handleError('method GET'))
      );
  }

  /**
   * Fetch with POST method
   *
   * @param path Partial path url service
   * @param body Body
   * @returns
   */
  post(path: string, body?: Object): Observable<any> {
    this.log(`call POST url: ${path}`);
    return this.http.post(`${this.baseUrl}${path}`, body, this.httpOptions)
    .pipe(
      tap(() => this.log(`fetched url: ${path}`)),
      catchError(this.handleError('method POST'))
    )
  }

  /**
   * Fetch with DELETE method
   *
   * @param path Partial path url service
   * @returns
   */
  delete(path: string): Observable<any> {
    this.log(`call DELETE url: ${path}`);
    return this.http.delete(`${this.baseUrl}${path}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`fetched url: ${path}`)),
        catchError(this.handleError('method DELETE'))
      );
  }

  /**
   * Fatch with PUT method
   *
   * @param path Partial path url service
   * @param body Body
   * @returns
   */
  put(path: string, body: Object): Observable<any> {
    this.log(`call PUT url:${path}`);
    return this.http.put(`${this.baseUrl}${path}`, body, this.httpOptions)
    .pipe(
      tap(() => this.log(`fetched url: ${path}`)),
      catchError(this.handleError('method PUT'))
    );
  }

  /**
   * Log
   * @param message Message
   */
  protected log(message: string): void {
    console.log(`${this.constructor.name} : ${message}`);
  }

  /**
   * Handle error
   *
   * @param operation
   * @returns
   */
  protected handleError<T>(operation?: string): (error: Error) => Observable<T> {
    return (error: Error) => {
      this.log(`${operation} failed: ${error}`);
      return throwError(error);
    }
  }
}
