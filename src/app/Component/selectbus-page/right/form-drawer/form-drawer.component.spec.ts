import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormDrawerComponent } from './form-drawer.component';

describe('FormDrawerComponent', () => {
  let component: FormDrawerComponent;
  let fixture: ComponentFixture<FormDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [FormDrawerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(FormDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});