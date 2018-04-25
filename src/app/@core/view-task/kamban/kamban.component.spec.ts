import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KambanComponent } from './kamban.component';

describe('KambanComponent', () => {
  let component: KambanComponent;
  let fixture: ComponentFixture<KambanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KambanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KambanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
