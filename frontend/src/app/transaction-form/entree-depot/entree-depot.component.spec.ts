import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreeDepotComponent } from './entree-depot.component';

describe('EntreeDepotComponent', () => {
  let component: EntreeDepotComponent;
  let fixture: ComponentFixture<EntreeDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreeDepotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
