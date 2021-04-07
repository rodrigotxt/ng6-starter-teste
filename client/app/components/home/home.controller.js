class HomeController {
	constructor() {
		this.name = 'home';
		this.logo = '/assets/head-default-logo.png';
		this.photo = '/assets/default-photo.png';
		this.titulo = 'Give your team autonomy while preserving the visual identity of your company';
		this.website = 'www.tradetools.co';
	}
	qEditor(event){
		let el = event.target;
		var options = {
			debug: 'info',
			modules: {
				toolbar: '#toolbar'
			},
			placeholder: 'Compose an epic...',
			readOnly: true,
			theme: 'snow'
		};
		let editor = new Quill(el, options);
		
	}
}

export default HomeController;
