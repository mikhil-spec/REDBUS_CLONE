import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SortingBarComponent } from './sorting-bar.component';

describe('SortingBarComponent', () => {
  let component: SortingBarComponent;
  let fixture: ComponentFixture<SortingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDividerModule
      ],
      declarations: [SortingBarComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SortingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});