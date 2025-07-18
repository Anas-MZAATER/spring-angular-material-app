import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template } from './template';

describe('Template', () => {
  let component: Template;
  let fixture: ComponentFixture<Template>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Template]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
