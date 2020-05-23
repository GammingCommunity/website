import { Component, OnInit, Injector } from '@angular/core';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
	private destroy: () => void;
	private accountId: number;

	constructor(private injector: Injector) {
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.accountId = data.accountId;
	}

	ngOnInit() {
	}


}
