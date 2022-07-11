import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emociones'
})
export class EmocionesPipe implements PipeTransform {

  transform(value: any):any {
    switch (value){
      case 'neutral': return 'Neutral';
      case 'happy': return 'Feliz';
      case 'sad': return 'Triste';
      case 'angry': return 'Enfadado';
      case 'fearful': return 'Asqueado';
      case 'disgusted': return 'Disgustado';
      case 'surprised': return 'Sorprendido';
    }
  }

}
