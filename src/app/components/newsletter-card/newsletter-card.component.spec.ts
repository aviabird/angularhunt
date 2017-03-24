import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterCardComponent } from './newsletter-card.component';

describe('NewsletterCardComponent', () => {
  let component: NewsletterCardComponent;
  let fixture: ComponentFixture<NewsletterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
