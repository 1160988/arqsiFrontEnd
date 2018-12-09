import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCreatorComponent } from './material-creator.component';

describe('MaterialCreatorComponent', () => {
  let component: MaterialCreatorComponent;
  let fixture: ComponentFixture<MaterialCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
