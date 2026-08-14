import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MyTripComponent } from './my-trip.component';

describe('MyTripComponent', () => {
  let component: MyTripComponent;
  let fixture: ComponentFixture<MyTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [MyTripComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MyTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});