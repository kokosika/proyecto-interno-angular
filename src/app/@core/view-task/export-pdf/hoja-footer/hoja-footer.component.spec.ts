import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaFooterComponent } from './hoja-footer.component';

describe('HojaFooterComponent', () => {
  let component: HojaFooterComponent;
  let fixture: ComponentFixture<HojaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
