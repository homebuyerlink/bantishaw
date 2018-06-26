import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInspectorComponent } from './edit-inspector.component';

describe('EditInspectorComponent', () => {
  let component: EditInspectorComponent;
  let fixture: ComponentFixture<EditInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInspectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
