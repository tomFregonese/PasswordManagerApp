import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialCreationComponent } from './credential-creation.component';

describe('CredentialCreationComponent', () => {
  let component: CredentialCreationComponent;
  let fixture: ComponentFixture<CredentialCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CredentialCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
