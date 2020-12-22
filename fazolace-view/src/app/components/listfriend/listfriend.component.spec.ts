import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfriendComponent } from './listfriend.component';

describe('ListfriendComponent', () => {
  let component: ListfriendComponent;
  let fixture: ComponentFixture<ListfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
