import { EventEmitter, Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  public globalFace: any;

  private modelsForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
  ];

  cbModels: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.globalFace = faceapi;
    this.loadModels();
  }

  public loadModels = () => {
    Promise.all(this.modelsForLoad).then(() => {
      console.log('Modelos OK');
      //Callback que avisa al resto de componentes que están esperando que los modelos están listos
      this.cbModels.emit(true);
    });
  };
}
