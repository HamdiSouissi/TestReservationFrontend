import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusService {

  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/buses`);
  }
}