import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRndComponent } from './dialog-rnd.component';

describe('DialogRndComponent', () => {
  let component: DialogRndComponent;
  let fixture: ComponentFixture<DialogRndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
