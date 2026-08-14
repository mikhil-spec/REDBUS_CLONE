import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SmallSeatsComponent } from './small-seats.component';

describe('SmallSeatsComponent', () => {
  let component: SmallSeatsComponent;
  let fixture: ComponentFixture<SmallSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTooltipModule
      ],
      declarations: [SmallSeatsComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SmallSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});