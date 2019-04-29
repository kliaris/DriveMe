import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDirectionsPage } from './map-directions.page';

describe('MapDirectionsPage', () => {
  let component: MapDirectionsPage;
  let fixture: ComponentFixture<MapDirectionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDirectionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDirectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
