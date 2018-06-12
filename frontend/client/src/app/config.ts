import { HttpHeaders } from "@angular/common/http";

let httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': `bearer ${localStorage.getItem('token')}` });

export const Config = Object.freeze({
    // API_BASE: "http://localhost:3000/api",
//    API_BASE: "https://skillgains-v2.herokuapp.com/api",
   API_BASE: "https://fb.skillgains.com/api",
    HEADERS: { headers: httpHeaders },
    refresh: function () {
        httpHeaders = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': `bearer ${localStorage.getItem('token')}` });
    }
});