import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPrivacyPagePage } from './data-privacy-page.page';

describe('DataPrivacyPagePage', () => {
  let component: DataPrivacyPagePage;
  let fixture: ComponentFixture<DataPrivacyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPrivacyPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPrivacyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
