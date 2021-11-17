import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TretmentsComponent } from './tretments.component';

describe('TretmentsComponent', () => {
  let component: TretmentsComponent;
  let fixture: ComponentFixture<TretmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TretmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TretmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
