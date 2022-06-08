import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  url = 'http://localhost:4000/api/sesiones/';
  constructor(private http: HttpClient) { }

  getSesiones(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarSesion(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarSesion(sesion: Sesion): Observable<any>{
    return this.http.post(this.url, sesion);
  }

  obtenerSesion(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  /*editarSesion(id: string, sesion: Sesion): Observable<any> {
    return this.http.put(this.url + id, sesion);
  }*/
}
