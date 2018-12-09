import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCreatorComponent } from './categoria-creator.component';

describe('CategoriaCreatorComponent', () => {
  let component: CategoriaCreatorComponent;
  let fixture: ComponentFixture<CategoriaCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
