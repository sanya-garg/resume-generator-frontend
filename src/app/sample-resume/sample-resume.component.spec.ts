import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleResumeComponent } from './sample-resume.component';

describe('SampleResumeComponent', () => {
  let component: SampleResumeComponent;
  let fixture: ComponentFixture<SampleResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
