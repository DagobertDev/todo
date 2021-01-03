import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({ templateUrl: 'registration.component.html' })
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get form() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;

    var email: string = this.form.email.value;
    var password: string = this.form.password.value;

    this.authenticationService.register(email, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.authenticationService.login(email, password)
            .pipe(first())
            .subscribe({
              next: () => {
                this.router.navigate([this.returnUrl]);
              },
              error: _ => {
                this.loading = false;
              }
            });
        },
        error: _ => {
          this.loading = false;
        }
      });
  }
}
