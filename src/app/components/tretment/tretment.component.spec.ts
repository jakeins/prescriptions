import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TretmentComponent } from './tretment.component';

describe('TretmentsComponent', () => {
  let component: TretmentComponent;
  let fixture: ComponentFixture<TretmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TretmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TretmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
