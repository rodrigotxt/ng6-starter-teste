class HomeController {
	constructor() {
		this.name = 'home';
		this.logo = '/assets/head-default-logo.png';
		this.photo = '/assets/default-photo.png';
		this.titulo = 'Give your team autonomy while preserving the visual identity of your company';
		this.website = 'www.tradetools.co';
	}
	onBlurEditor(editor, source){
		editor.disable();
		editor.off();
	}
	onFocusEditor(editor, source){
		editor.enable();
		editor.focus();
	}
}

export default HomeController;
