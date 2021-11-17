import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';

import { IId } from "../models/shared";
import { IRemoteRepository } from "../models/remote-repository.interface";


export abstract class EntityCrudService<T extends IId> implements IRemoteRepository {
  private endpointUrl = 'http://localhost:3000';
  private entityUrl = this.endpointUrl + '/' + this.entityName;

  private getIdUrl(id: number): string {
    return this.entityUrl + '/' + id;
  }

  constructor(
    private entityName: string,
    private http: HttpClient
  ) {
  }

  Create(body: T): Observable<T> {
    return this.http.post<T>(this.entityUrl, body);
  }

  GetOne(id: number): Observable<T | null> {
    return this.http.get<T | null>(this.getIdUrl(id));
  }

  GetMany(): Observable<T[]> {
    return this.http.get<T[]>(this.entityUrl + 's');
  }

  Update(body: T): Observable<T> {
    return this.http.put<T>(this.getIdUrl(body.id), body);
  }

  DeleteOne(id: number): Observable<any> {
    return this.http.delete(this.getIdUrl(id));
  }
}
