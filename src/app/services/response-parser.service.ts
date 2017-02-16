import { Injectable } from '@angular/core';
import { User } from '../models'; 
@Injectable()
export class ResponseParserService {

  getUserObj(response: any): User {
    let raw_user = response.user
    let attr = {
      id: raw_user.id,
      email: raw_user.email
    }
    let user = new User(attr);
    return user
  }
}
