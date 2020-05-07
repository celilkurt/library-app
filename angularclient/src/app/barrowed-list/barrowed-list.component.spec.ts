import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrowedListComponent } from './barrowed-list.component';

describe('BarrowedListComponent', () => {
  let component: BarrowedListComponent;
  let fixture: ComponentFixture<BarrowedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrowedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrowedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
