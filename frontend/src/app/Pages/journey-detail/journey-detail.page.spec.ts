import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyDetailPage } from './journey-detail.page';

describe('JourneyDetailPage', () => {
  let component: JourneyDetailPage;
  let fixture: ComponentFixture<JourneyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
