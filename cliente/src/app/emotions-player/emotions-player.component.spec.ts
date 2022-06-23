import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionsPlayerComponent } from './emotions-player.component';

describe('EmotionsPlayerComponent', () => {
  let component: EmotionsPlayerComponent;
  let fixture: ComponentFixture<EmotionsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionsPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
