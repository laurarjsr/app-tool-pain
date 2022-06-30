import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FaceApiService } from '../face-api.service';
import { VideoPlayerService } from '../video-player.service';

@Component({
  selector: 'app-emotions-player',
  templateUrl: './emotions-player.component.html',
  styleUrls: ['./emotions-player.component.css']
})
export class EmotionsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement: ElementRef;
  @Input() stream: any;
  @Input() width: number | undefined;
  @Input() height: number | undefined;

  listEvents: Array<any> = [];
  modelsReady: boolean;

  //Canvas superpuesto al video HTML:
  overCanvas: any;

  constructor(private render: Renderer2, private elementRef: ElementRef, private faceApiService: FaceApiService, private videoPlayerService: VideoPlayerService) { }

  ngOnInit(): void {
    this.listenerEvents();
  }

  ngOnDestroy(): void {
    //Nos desubcribimos de todos los eventos, recorremos el array de eventos listEvents
    this.listEvents.forEach(event => event.unsubscribe());
  }

//Función que escucha los eventos
listenerEvents = () => {
  //Creamos un subscribe para que se subscriba al evento de que ya se cargaron los modelos. En Angular es recomendable que te desubscribas de los elementos al momento en el que se destruye el componente para que la aplicación no se vuelva pesada
  const observer1$ = this.faceApiService.cbModels.subscribe(res => {
    //Modelos listos
    this.modelsReady = true;
    this.checkFace();
  });

  //Nos subscribimos al evento de callback 
  const observer2$ = this.videoPlayerService.cbAi
    .subscribe(({ resizedDetections, displaySize, expressions, eyes }) => {
      resizedDetections = resizedDetections[0] || null;
      // No podemos dibujar encima del video HTML por ello, se necesita un canvas (creado en el método listenerPlay)
      if (resizedDetections) {
        this.drawFace(resizedDetections, displaySize, eyes);
      }
    });

  this.listEvents = [observer1$, observer2$];
};

//Método para dibujar la cara
drawFace = (resizedDetections, displaySize, eyes) => {
  const { globalFace } = this.faceApiService;
  //Agarramos el contexto del canvas y lo limpiamos
  this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
  //Visualizamos las emociones en el canvas:
   globalFace.draw.drawFaceExpressions(this.overCanvas, resizedDetections);
   globalFace.draw.drawFaceLandmarks(this.overCanvas, resizedDetections);

  const scale = this.width / displaySize.width;
  //console.log(scale);

  //const elementFilterEye = document.querySelector('.filter-eye');
  //this.render.setStyle(elementFilterEye, 'left', `${eyes.left[0].x * scale}px`);
  //this.render.setStyle(elementFilterEye, 'top', `${eyes.left[0].y * scale}px`);
};

//La siguiente función realiza las caras
checkFace = () => {
  //Se ejecuta cada 100ms, cada 100ms llamará al servicio videoPlayerService y a la función getLandMark
  setInterval(async () => {
    await this.videoPlayerService.getLandMark(this.videoElement);
  }, 100);
};

loadedMetaData(): void {
  //Cuando tenga la información realizará el play, no hace falta que el componente video en video-player.component.html tenga la etiqueta autoplay:
  this.videoElement.nativeElement.play();
}

  //Función cuando comienza a ejecutarse
  listenerPlay(): void {
    //Creamos aquí el canvas para poder dibujar encima del video HTML. La libreria faceapi nos proporciona un método para ello
    const { globalFace } = this.faceApiService;
    //Creamos el canvas y lo guardamos en overCanvas
    this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    this.render.setProperty(this.overCanvas, 'id', 'new-canvas-over');
    //Le ponemos al canvas el mismo tamaño que el elemento de vídeo
    this.render.setStyle(this.overCanvas, 'width', `${this.width}px`);
    this.render.setStyle(this.overCanvas, 'height', `${this.height}px`);
    //Agregamos un hijo, es decir, queremos agregar un hijo al elemento del video
    this.render.appendChild(this.elementRef.nativeElement, this.overCanvas);
  }
}
