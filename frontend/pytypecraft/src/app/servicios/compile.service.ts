import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompileService {
  private url = 'http://';

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public sendCode(code: string, ip: string): Observable<any> {
    let body = new Object({
      codigo: code,
    });
    return this.http.post(this.url + ip + ':3000/compile', body);
  }

  public sendCodeFase2(code: string, ip: string): Observable<any> {
    let body = new Object({
      codigo: code,
    });
    return this.http.post(this.url + ip + ':3000/compile2', body);
  }
}
