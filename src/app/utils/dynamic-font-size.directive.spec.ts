import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { DynamicFontSizeDirective } from './dynamic-font-size.directive'

@Component({
  template: '<h2 dynamicFontSize>Test</h2>',
  standalone: true,
  imports: [DynamicFontSizeDirective],
})
export class MockComponent {}

describe('DynamicFontSizeDirective', () => {
  let directive: DynamicFontSizeDirective
  let fixture: ComponentFixture<MockComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(MockComponent)
    fixture.detectChanges()

    directive = fixture.debugElement
      .query(By.directive(DynamicFontSizeDirective))
      .injector.get(DynamicFontSizeDirective)
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })
})
