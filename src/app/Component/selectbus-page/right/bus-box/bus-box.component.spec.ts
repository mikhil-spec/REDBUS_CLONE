import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BusBoxComponent } from './bus-box.component';

describe('BusBoxComponent', () => {
  let component: BusBoxComponent;
  let fixture: ComponentFixture<BusBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTooltipModule,
        MatIconModule
      ],
      declarations: [BusBoxComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});