import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  // <-- Correct the property name to styleUrls
  imports: [FormsModule]  // <-- Remove the duplicate imports declaration
})
export class LoginComponent {

  // Define the loginObj with username and password properties
  loginObj = {
    username: '',
    password: ''
  };

  // Inject the Router for navigation
  router = inject(Router);

  // Login function to validate credentials and navigate
  onLogin() {
    if (this.loginObj.username === 'admin' && this.loginObj.password === '112233') {
      this.router.navigateByUrl('dashboard');  // Navigate to dashboard on success
    } else {
      alert('Credentials are wrong');  // Show an alert if credentials are incorrect
    }
  }
}
