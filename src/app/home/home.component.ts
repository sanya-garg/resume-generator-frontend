import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ResumeBuilderService } from '../services/resume-builder.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  linkURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  resumeForm = this.formBuilder.group({
    personalDetails: this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      linkedln: ['', [Validators.required, Validators.pattern(this.linkURL)]],
      github: ['', [Validators.required, Validators.pattern(this.linkURL)]],
      skills: ['']
    }),
    education: this.formBuilder.group({
      college: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z]+ ?([a-zA-Z]+){1}/)]],
      degree: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+ ?([a-zA-Z]+){1}/)]],
      marks: ['', [Validators.required]],
      collegeFrom: ['', [Validators.required]],
      collegeTo: ['', [Validators.required]],
    }),
    experience: this.formBuilder.group({
      organisation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+ ?([a-zA-Z]+){1}/)]],
      position: ['', [Validators.required]],
      companyFrom: ['', [Validators.required]],
      companyTo: [{ value: '', disabled: false }, [Validators.required]],
      presentDate: [false],
      description: ['', [Validators.required]],
    }),
    project: this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+ ?([a-zA-Z]+){1}/)]],
      link: ['', [Validators.pattern(this.linkURL)]],
      Pdescription: ['', [Validators.required]],
    }),
    hobbies: this.formBuilder.group({
      hdescription: ['', [Validators.required]],
    }),
  })
  blob: any;
  errorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private resumeService: ResumeBuilderService,private spinner: NgxSpinnerService) {

  }
  onSubmit() {
    this.errorMessage = false;
    console.log(this.resumeForm.value);
    this.spinner.show();
    this.resumeService.createPdf(this.resumeForm.value).subscribe(data => {
      console.log(data);
      if (data.message == 'Pdf generated successfully.') {
        this.resumeService.fetchPdf().subscribe(data => {
          this.spinner.hide();
          this.blob = new Blob([data], { type: 'application/pdf' });

          var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = "Resume.pdf";
          link.click();
        })
      }
      else {
        this.errorMessage = true;
      }
    })
  }
  onChangePresentDate() {
    if (this.resumeForm.value.experience?.presentDate) {
      this.resumeForm.controls.experience.controls.companyTo.disable();
    }
    else {
      this.resumeForm.controls.experience.controls.companyTo.enable();
    }
  }
}