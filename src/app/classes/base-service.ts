import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class BaseService{
  protected baseUrl = 'http://localhost:8080';

  constructor(protected httpClient: HttpClient) {


  }

}
