import Swal from 'sweetalert2';

export class SwtAlert{
	static display(options){
		if(!options.hasOwnProperty('reverseButtons')){
			options['reverseButtons'] = true;
		};
		if(!options.hasOwnProperty('showCancelButton')){
			options['showCancelButton'] = true;
		};
		if(!options.hasOwnProperty('focusConfirm')){
			options['focusConfirm'] = false;
		};
		return Swal.fire(options);
	}
}