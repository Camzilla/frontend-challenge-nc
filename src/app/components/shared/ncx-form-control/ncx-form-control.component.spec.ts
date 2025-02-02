import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcxFormControlComponent } from './ncx-form-control.component';

describe('NcxFormControlComponent', () => {
  let component: NcxFormControlComponent;
  let fixture: ComponentFixture<NcxFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcxFormControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NcxFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
