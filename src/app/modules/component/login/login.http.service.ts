import { Injectable } from "@angular/core";
import { GraphqlService } from "src/app/common/services/graphql.service";
import { ServiceUrls } from "src/environments/environment";
import { LoggingResult, LoggingResultStatus } from "./login.dto";

@Injectable({
	providedIn: "root"
})
export class LoginHttpService {
	private readonly amsUrl: string = ServiceUrls.accountManagement;

	constructor(private graphql: GraphqlService) {}

	login(
		name: string,
		pass: string,
		callback: (result: LoggingResult) => void
	) {
		this.graphql.query(
			{
				url: this.amsUrl,
				query: `login(username: "${name}", pwd: "${pass}"){token, status}`
			},
			data => {
				const result =
					data && data.login
						? new LoggingResult(data.login)
						: new LoggingResult({
								status: LoggingResultStatus.FAIL,
								token: null,
								describe: null
						  });

				callback(result);
			}
		);
	}
}
