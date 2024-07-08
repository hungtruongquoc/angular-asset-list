import {Component, Injectable, OnInit} from '@angular/core';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  imports: [FontAwesomeModule]
})
export class LoginPageComponent implements OnInit{
  faCoffee = faCoffee;
  faUser = faUser;

  constructor(private http: HttpClient) {
  }

  public ngOnInit() {
    this.http.post("https://combuilding.beetrack.vn/api/v2/login", {username: "admin", password: "beetrack@2022"})
      .subscribe((data) => {
      console.log(data);
    })
  }
}
