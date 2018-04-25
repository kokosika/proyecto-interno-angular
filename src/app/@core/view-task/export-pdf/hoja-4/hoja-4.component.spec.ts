import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hoja4Component } from './hoja-4.component';

describe('Hoja4Component', () => {
  let component: Hoja4Component;
  let fixture: ComponentFixture<Hoja4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hoja4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hoja4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
