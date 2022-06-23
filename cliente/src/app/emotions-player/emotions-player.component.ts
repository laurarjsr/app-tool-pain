import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-emotions-player',
  templateUrl: './emotions-player.component.html',
  styleUrls: ['./emotions-player.component.css']
})
export class EmotionsPlayerComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  @Input() stream: any;
  @Input() width: number;
  @Input() height: number;
  constructor() { }

  ngOnInit(): void {
  }
  loadedMetaData(): void {

  }

  listenerPlay(): void {

  }
}
