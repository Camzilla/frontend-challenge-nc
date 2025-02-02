import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcxCountdownComponent } from './ncx-countdown.component';

describe('NcxCountdownComponent', () => {
  let component: NcxCountdownComponent;
  let fixture: ComponentFixture<NcxCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcxCountdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NcxCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
