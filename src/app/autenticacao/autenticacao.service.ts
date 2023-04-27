import { environment } from './../../environments/environment';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = environment.apiUrl

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService {

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
    ) {}

  private url: string = `${API}/user/login`;

  public autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    debugger
    return this.httpClient.post(this.url,
      {
        userName: usuario,
        password: senha,
      },
      { observe: 'response' }
    ).pipe(
      tap((res) => {
        const authToken = res.headers.get('x-access-token') ?? '';
        this.usuarioService.salvaToken(authToken);
      })
    )
  }
}
