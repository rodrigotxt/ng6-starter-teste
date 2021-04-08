class HomeController {
	constructor($http, $scope) {
		"ngInject";
		this.$http = $http;
		this.$scope = $scope;
		$scope.name = 'home';
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
	getImg(item){
		// console.log(this.$scope.galeria.type, item);
		return this.$scope.galeria.types[this.$scope.galeria.type].format(item);
	}
	getTypeGaleria(){
		if(!this.$scope.galeria.type) return;
		return this.$scope.galeria.types[this.$scope.galeria.type];
	}
	getGaleria(type, params = null){
		let self = this;
		self.$scope.galeria.type = type;
		let typeParams = self.$scope.galeria.types[type];
		let url = typeParams.url;
		let options = null;

		if(typeParams.api_key){
			// let headers = new Headers({'Content-Type': 'application/json'});
			options = {headers: {
				'Authorization': typeParams.api_key,
				'Accept': 'application/json',
			}};
		}

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
		// return axios.get('https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json');
		//?query=nature&per_page=5
		// return;
	}
	setImage(item, type){
		let url = this.getImg(item);
		if(type == 'icon') this.$scope.logo = url;
		if(type == 'photo') this.$scope.photo = url;
		this.$scope.galeria.open = false;
		this.$scope.galeria.result = [];
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
