import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FeedbackServiceResponse, Feedback } from './feedback.dto';
import { ServiceUrls } from 'src/environments/environment';

@Injectable({
	providedIn: "root"
})
export class FeedbackHttpService {
	readonly feedbackUrl: string;

	constructor(private http: HttpClient) {
		this.feedbackUrl = ServiceUrls.feedback;
	}

	sendFeedback(feedback: Feedback) {
		return this.http.post<FeedbackServiceResponse>(this.feedbackUrl + '/send', feedback);
	}
}
