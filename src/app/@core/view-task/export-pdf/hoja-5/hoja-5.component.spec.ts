import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hoja5Component } from './hoja-5.component';

describe('Hoja5Component', () => {
  let component: Hoja5Component;
  let fixture: ComponentFixture<Hoja5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hoja5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hoja5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
