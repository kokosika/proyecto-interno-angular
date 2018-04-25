import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hoja6Component } from './hoja-6.component';

describe('Hoja6Component', () => {
  let component: Hoja6Component;
  let fixture: ComponentFixture<Hoja6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hoja6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hoja6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
