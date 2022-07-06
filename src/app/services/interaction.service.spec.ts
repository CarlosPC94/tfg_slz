
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { InteractionService } from './interaction.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('InteractionService', () => {
  let service: InteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastController, LoadingController]
    }).compileComponents();
    service = TestBed.inject(InteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Modal Accept', () => {
    expect(service).toBeTruthy();
  });

  it('Modal Dismiss', () => {
    expect(service).toBeTruthy();
  });
});
