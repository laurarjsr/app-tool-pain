import { EventEmitter, Injectable } from '@angular/core';
import { FaceApiService } from './face-api.service';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
//Creamos un callback que emita el evento el getLandmark()
cbAi: EventEmitter<any> = new EventEmitter<any>();
  constructor(private faceApiService: FaceApiService) { }

  //La siguiente función recibe como argumento el elemento del vídeo del HTML
  getLandMark = async (videoElement: any) => {
    const {globalFace} = this.faceApiService;
    const {videoWidth, videoHeight} = videoElement.nativeElement;
    const displaySize = {width: videoWidth, height: videoHeight};
    //Ancho y alto original del video --> console.log(displaySize);

    const detectionsFaces = await globalFace.detectAllFaces(videoElement.nativeElement)
      .withFaceLandmarks()
      .withFaceExpressions();


    // console.log(detectionsFaces);
    const landmark = detectionsFaces[0].landmarks || null;
    //Guardamos las expresiones, estamos accediendo a la cara 1 que es la posicion 0
    const expressions = detectionsFaces[0].expressions || null;
    //Guardamos las posiciones de los ojos
    const eyeLeft = landmark.getLeftEye();
    const eyeRight = landmark.getRightEye();
    //Objeto ojo, estamos tomando como referencia el primer punto y el último de cada ojo y es lo que guardamos en ese array eye
    const eyes = {
      left: [_.head(eyeLeft), _.last(eyeLeft)],
      right: [_.head(eyeRight), _.last(eyeRight)],
    };
    const resizedDetections = globalFace.resizeResults(detectionsFaces, displaySize);
    this.cbAi.emit({
      resizedDetections, //emitimos la redimension de los datos
      displaySize, //emitimos el displaySize para saber las dimensiones y poder hacer el escalado
      expressions, //devolvemos las expresiones para poder hacer uso de ellas
      //eyes, //devolvemos los puntos de los ojos 
      videoElement
    });

  };
}
