import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectActivityComponent } from './create-project-activity.component';

describe('CreateProjectActivityComponent', () => {
  let component: CreateProjectActivityComponent;
  let fixture: ComponentFixture<CreateProjectActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
