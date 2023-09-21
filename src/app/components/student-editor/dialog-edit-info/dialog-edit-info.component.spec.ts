import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditInfoComponent } from './dialog-edit-info.component';

describe('DialogEditInfoComponent', () => {
  let component: DialogEditInfoComponent;
  let fixture: ComponentFixture<DialogEditInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditInfoComponent]
    });
    fixture = TestBed.createComponent(DialogEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
