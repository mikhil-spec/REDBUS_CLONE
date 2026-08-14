import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectbusPageComponent } from './selectbus-page.component';

describe('SelectbusPageComponent', () => {
  let component: SelectbusPageComponent;
  let fixture: ComponentFixture<SelectbusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectbusPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SelectbusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});