import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  stateId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = 'http://localhost:4000';
  private authStatus = new BehaviorSubject<boolean>(false);
  private userStateId: number | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStatus.next(true);
      this.userStateId = this.getStateIdFromToken(token)
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials);
  }

  setToken(token: string, stateId: any) {
    localStorage.setItem('token', token);
    console.log(token)
    this.userStateId = stateId;
    this.authStatus.next(true);
  }

  getStateIdFromToken(token: string): number {
    const decoded: DecodedToken = jwtDecode(token);
    console.log(decoded)
    return decoded.stateId;
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getStateId(): number | null {
    return this.userStateId;
  }

  logout() {
    localStorage.removeItem('token');
    this.userStateId = null;
    this.authStatus.next(false);
  }
}
