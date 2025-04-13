import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduitModalComponent } from './add-produit-modal.component';

describe('AddProduitModalComponent', () => {
  let component: AddProduitModalComponent;
  let fixture: ComponentFixture<AddProduitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProduitModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProduitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
