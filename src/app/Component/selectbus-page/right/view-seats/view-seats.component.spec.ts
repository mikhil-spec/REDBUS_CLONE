import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewSeatsComponent } from './view-seats.component';

describe('ViewSeatsComponent', () => {
  let component: ViewSeatsComponent;
  let fixture: ComponentFixture<ViewSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDividerModule,
        MatTooltipModule
      ],
      declarations: [ViewSeatsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ViewSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});