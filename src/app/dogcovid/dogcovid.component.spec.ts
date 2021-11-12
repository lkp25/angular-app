import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogcovidComponent } from './dogcovid.component';

describe('DogcovidComponent', () => {
  let component: DogcovidComponent;
  let fixture: ComponentFixture<DogcovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogcovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogcovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
