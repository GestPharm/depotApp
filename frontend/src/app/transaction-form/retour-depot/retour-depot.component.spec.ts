import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourDepotComponent } from './retour-depot.component';

describe('RetourDepotComponent', () => {
  let component: RetourDepotComponent;
  let fixture: ComponentFixture<RetourDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourDepotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetourDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
