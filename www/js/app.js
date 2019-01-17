var app = new Framework7();
var $$ = Dom7;

var app = new Framework7({
  root: '#app',
  name: 'Calculadora do Carro',
  id: 'br.com.taticadesucesso.calculadoradocarro',
  theme : 'md',
  routes: [
    {
      path: '/home/',
      url: 'index.html'
    },
    {
      path: '/about/',
      url: 'pages/about.html'
    },
    {
      path: '/gasolinaxalcool/',
      url: 'pages/calculadora-flex.html'
    },
    {
      path: '/parametros/',
      url: 'pages/parametros.html'
    },
    {
      path: '/doe/',
      url: 'pages/doe.html'
    }

  ]

  });

var view_main = app.views.create('.view-main');


$$(document).on('deviceready', function() {
  console.log("App iniciado.");

  if (!window.device) {
    window.device = { platform: 'Browser' };
  }

  handleExternalURLs();


  //sempre que clicarem em BACK, ir para a Home
  document.addEventListener("backbutton", function(){
    view_main.router.navigate('/home/');
  }, false);

});


var calcflex_hist_data;

$$(document).on('page:init', '.page[data-name="calculadora-flex"]', function (e) {

  //limpa botão e esconde resultado
  $('#btn_calcula_flex .ripple-wave').hide();
  $('#btn_calcula_flex .resultado').hide();

  //carrega histórico
  calculadora_flex_monta_hist();

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

  //preenche os campos com o valor que está no histórico
  $('#gasolina').val(window.localStorage.getItem('preco_gasolina'));
  $('#etanol').val(window.localStorage.getItem('preco_etanol'));

  //aplica evento de selecionar quando clica no campo
  $('#gasolina, #etanol').click(function(){
    $(this).select();
  })


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