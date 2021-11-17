import { Observable } from "rxjs";
import { IId, ISingle } from "./shared";

export interface IRemoteRepository {
  Create(body: ISingle): Observable<IId>
  GetOne(id: number): Observable<IId | null>
  GetMany(): Observable<IId[]>
  Update(body: IId): Observable<IId>
  DeleteOne(id: number): Observable<any>
}
