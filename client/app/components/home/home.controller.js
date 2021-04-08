class HomeController {
	constructor($http, $scope) {
		"ngInject";
		this.$http = $http;
		this.$scope = $scope;
		this.name = 'home';
		$scope.logo = '/assets/head-default-logo.png';
		$scope.photo = '/assets/default-photo.png';
		$scope.titulo = 'Give your team autonomy while preserving the visual identity of your company';
		$scope.website = 'www.tradetools.co';
		$scope.galeria = {
			open: false,
			type: '',
			types: {
				icon: {
					name: 'svgPorn',
					link: 'https://svgporn.com/',
					url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json',
					format: (result) =>  result.hasOwnProperty('files') ? 'https://cdn.svgporn.com/logos/' + result['files'][0] : false
				},
				photo: {
					name: 'Pexels',
					link: 'https://pexels.com',
					api_key: '563492ad6f917000010000016f8dffcb3ad54c2ea7bb76c0610c4611',
					url: 'https://api.pexels.com/v1/search?size=small&orientation=landscape&query=laptop',
					format: (result) => result['src'] ? result['src']['medium'] : false
				}
			},
			result: []
		};
	}
	// busca a url no array e formata de acordo com o 'type'
	getImg(item){
		return this.$scope.galeria.types[this.$scope.galeria.type].format(item);
	}
	// retorna o 'type' da galeria ativa
	getTypeGaleria(){
		if(!this.$scope.galeria.type) return;
		return this.$scope.galeria.types[this.$scope.galeria.type];
	}
	// busca imagens no API conforme o type
	getGaleria(type, params = null){
		let self = this;
		self.$scope.galeria.type = type;
		let typeParams = self.$scope.galeria.types[type];
		let url = typeParams.url;
		let options = null;

		// se nos parametros possuir api_key entao adiciona Authorization no Header
		if(typeParams.api_key){
			options = {headers: {
				'Authorization': typeParams.api_key,
				'Accept': 'application/json',
			}};
		}

		// faz requisicao para API externa
		this.$http.get(url, options)
		.then(
			(response) =>{
				let result;
				if(type == 'photo') result = response.data.photos.slice(0,25);
				if(type == 'icon') result = response.data.slice(0,40);
				self.$scope.galeria.result = result;
				self.$scope.galeria.open = true;
			},
			(error) => {
				console.log(error);
			});
	}
	// define a imagem no bloco de Edicao
	setImage(item, type){
		let url = this.getImg(item);
		if(type == 'icon') this.$scope.logo = url;
		if(type == 'photo') this.$scope.photo = url;
		this.$scope.galeria.open = false;
		this.$scope.galeria.result = [];
	}
	// desabilita quill se perder o Foco
	onBlurEditor(editor, source){
		editor.disable();
		editor.off();
	}
	// habilitar o quill ao dar foco no elemento
	onFocusEditor(editor, source){
		editor.enable();
		editor.focus();
	}
}

export default HomeController;
