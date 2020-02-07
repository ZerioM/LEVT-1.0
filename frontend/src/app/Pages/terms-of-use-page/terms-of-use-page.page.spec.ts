import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUsePagePage } from './terms-of-use-page.page';

describe('TermsOfUsePagePage', () => {
  let component: TermsOfUsePagePage;
  let fixture: ComponentFixture<TermsOfUsePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfUsePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfUsePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
