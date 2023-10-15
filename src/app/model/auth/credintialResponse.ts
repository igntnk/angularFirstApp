import { Authority } from "./authority";

export class CredentialResponce{
  authenticated: boolean;
  name: string;
  authorities: Authority[]

  static convertToObj(obj: any): CredentialResponce{
    if(obj.errorStatus != undefined){
      let resp = new CredentialResponce();
      resp.authenticated = false;
      return resp;
    }
    else{
      let resp = new CredentialResponce();
      resp.name = obj.name;
      resp.authenticated = obj.authenticated;
      resp.authorities = obj.authorities;
      return resp;
    }
  }
}
