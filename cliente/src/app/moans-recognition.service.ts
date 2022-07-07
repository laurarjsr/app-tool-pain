//Este servicio es el encargado de detectar lo que dice el paciente durante la sesión de rehabilitación
import { Injectable, NgZone } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable({
  providedIn: 'root'
})
export class MoansRecognitionService {

  constructor(private zone: NgZone) { }

  //Utilizaremos la propia API del navegador webKitSpeechRecognition
  record(language: string): Observable<string> {
    return Observable.create((observer: { next: (arg0: any) => any; error: (arg0: any) => any; complete: () => any; }) => {
      const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (e: { results: { item: (arg0: number) => { (): any; new(): any; item: { (arg0: number): { (): any; new(): any; transcript: any; }; new(): any; }; }; length: number; }; }) => this.zone.run(() => observer.next(e.results.item(e.results.length - 1).item(0).transcript));
      recognition.onerror = (e: any) => observer.error(e);
      recognition.onend = () => observer.complete();
      recognition.lang = language;
      recognition.start();
    });
  }
}
