import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class GraphqlService {
	constructor(private http: HttpClient) {}

	query(url: string, query: string, header = null): Observable<any> {
		const data = JSON.stringify({
			operationName: null,
			variables: {},
			query: `{${query}}`
		});
		let headers = new HttpHeaders(header);
		headers = headers.append("content-type", "application/json");

		return this.http.post(url, data, { headers: headers });
	}
}
