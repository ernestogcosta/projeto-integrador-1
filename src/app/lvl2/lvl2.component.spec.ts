import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lvl2Component } from './lvl2.component';

describe('Lvl2Component', () => {
  let component: Lvl2Component;
  let fixture: ComponentFixture<Lvl2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lvl2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lvl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
