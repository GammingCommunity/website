import swal from 'sweetalert';

export class SweetAlert{
	static display(options){
		return swal(options);
	}
}