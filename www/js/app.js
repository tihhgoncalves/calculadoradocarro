var app = new Framework7();
var $$ = Dom7;

var app = new Framework7({
  root: '#app',
  name: 'Calculadora do Carro',
  id: 'br.com.taticadesucesso.calcuçladora',
  routes: [
    {
      path: '/home/',
      url: 'index.html',
    },
    {
      path: '/about/',
      url: 'about.html',
    },
    {
      path: '/gasolinaxalcool/',
      url: 'gasolinaxalcool.html',
    },
    {
      path: '/parametros/',
      url: 'parametros.html',
    }

  ]

  });

var view_main = app.views.create('.view-main');


$$(document).on('deviceready', function() {
  console.log("App iniciado.");

});


$$(document).on('page:init', '.page[data-name="gasolinaxalcool"]', function (e) {

  //verifica se já foi registrado as médias
  if( (window.localStorage.getItem('media_gasolina') <= 0) || (window.localStorage.getItem('media_etanol') <= 0)){

    app.dialog.alert('Antes de você utilizar essa calculadora, precisa preencher as médias que seu veículo faz.', 'Uma coisinha antes...', function(){
      view_main.router.navigate('/parametros/');
    });



  }

  $('input.money').each(function(){

    $(this).maskMoney({
      prefix:'R$ ',
      allowNegative: false,
      allowZero:false,
      thousands:'.',
      decimal:','
    });

  });

  $('#gasolina').val(window.localStorage.getItem('preco_gasolina'));
  $('#etanol').val(window.localStorage.getItem('preco_etanol'));

});



$$(document).on('page:init', '.page[data-name="parametros"]', function (e) {

  $('input.km').maskMoney({
    suffix:' km/lt',
    allowNegative: false,
    allowZero:false,
    thousands:'.',
    decimal:','
  });


  $('#media_gasolina').val(window.localStorage.getItem('media_gasolina'));
  $('#media_etanol').val(window.localStorage.getItem('media_etanol'));

});