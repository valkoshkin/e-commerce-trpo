import { CanActivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Injectable()
export class AuthorizedAccessOnlyGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService) {}

  canActivate(): boolean | UrlTree {
    return !!this.tokenStorage.getUser() || new UrlTree();
  }
}
