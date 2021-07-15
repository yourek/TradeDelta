import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KucoinComponent } from './kucoin.component';

describe('KucoinComponent', () => {
  let component: KucoinComponent;
  let fixture: ComponentFixture<KucoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KucoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KucoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
