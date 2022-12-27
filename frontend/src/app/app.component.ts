import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-commerce App';

  isAuthorized: boolean = false;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.isAuthorized = !!this.tokenStorage.getUser();
  }

  logout(): void {
    this.tokenStorage.logout();
    window.location.assign('/');
  }
}
