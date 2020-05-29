import { Component, OnInit, Injector } from '@angular/core';
import { FeedbackHttpService } from './feedback.http.service';
import { Feedback, FeedbackServiceResponseTypes } from './feedback.dto';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FeedbackLanguage } from './feedback.language';
import { ClientCommonComponent } from '../client.common-component';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({
					width: '0px',
					height: '0px'
				}),
				animate('100ms ease', style({
					width: '400px',
					height: '300px'
				}))
			]),
			transition(':leave', [
				animate('100ms ease', style({
					width: '0px',
					height: '0px'
				}))
			])
		])
	],
})
export class FeedbackComponent extends ClientCommonComponent implements OnInit {
	private destroy: () => void;
	private feedback: Feedback = new Feedback();

	constructor(
		protected injector: Injector,
		private feedbackHttpService: FeedbackHttpService
	) {
		super(injector);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.feedback.accountId = data.accountId;
		FeedbackLanguage.define(this.translateService);
	}

	ngOnInit() {
	}

	sendFeedback() {
		if (this.feedback.content) {
			this.feedbackHttpService.sendFeedback(this.feedback).subscribe(result => {
				if (result.status === FeedbackServiceResponseTypes.SUCCESSFUL) {
					this.destroy();
				} else {
					this.alertService.show(result.describe);
				}
			});
		}
	}
}
