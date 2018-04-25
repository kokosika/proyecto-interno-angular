import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hoja1Component } from './hoja-1.component';

describe('Hoja1Component', () => {
  let component: Hoja1Component;
  let fixture: ComponentFixture<Hoja1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hoja1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hoja1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
