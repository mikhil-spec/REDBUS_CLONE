import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BottomTabComponent } from './bottom-tab.component';

describe('BottomTabComponent', () => {
  let component: BottomTabComponent;
  let fixture: ComponentFixture<BottomTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomTabComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BottomTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});