import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BusBookingFormComponent } from './bus-booking-form.component';

describe('BusBookingFormComponent', () => {
  let component: BusBookingFormComponent;
  let fixture: ComponentFixture<BusBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        MatIconModule
      ],
      declarations: [BusBookingFormComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BusBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});