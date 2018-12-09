import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabamentoCreatorComponent } from './acabamento-creator.component';

describe('AcabamentoCreatorComponent', () => {
  let component: AcabamentoCreatorComponent;
  let fixture: ComponentFixture<AcabamentoCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcabamentoCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabamentoCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
