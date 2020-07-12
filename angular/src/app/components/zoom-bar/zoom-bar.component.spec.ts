import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomBarComponent } from './zoom-bar.component';

describe('ZoomBarComponent', () => {
  let component: ZoomBarComponent;
  let fixture: ComponentFixture<ZoomBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
