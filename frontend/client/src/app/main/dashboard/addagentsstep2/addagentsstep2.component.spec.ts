import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Addagentsstep2Component } from './addagentsstep2.component';

describe('Addagentsstep2Component', () => {
  let component: Addagentsstep2Component;
  let fixture: ComponentFixture<Addagentsstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Addagentsstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Addagentsstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
