import { map, Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileRestService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
  * Gets filter questions for filter rendering.
  */
  getProfile(id: number): Observable<any[]> {
    // const request = this.http.get<any[]>('/api/profiles')
    const profiles = [
      {
        "id": 1,
        "login": "drhouse@gmail.com",
        "profiles": [
          {
            "name": "myself",
            "permittedTreatments": [
              {
                "treatmentId": 1,
                "canWatch": true,
                "canTake": false,
                "canEdit": true
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "login": "rogerthat@yahoo.com",
        "profiles": [
          {
            "name": "myself",
            "permittedTreatments": [
              {
                "treatmentId": 1,
                "canWatch": true,
                "canTake": true,
                "canEdit": false
              }
            ]
          },
          {
            "name": "Spike (dog)",
            "permittedTreatments": []
          }
        ]
      }
    ];

    of(profiles)
      .pipe(
        map((data) => {
          if (!data) {
            return [];
          }
          return data;
        })
      );
    return of(profiles);
  }
}
