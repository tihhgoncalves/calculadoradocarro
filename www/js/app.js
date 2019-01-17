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
      url: 'pages/calcula-flex.html'
    },
    {
      path: '/parametros/',
      url: 'pages/parametros.html'
    }

  ]

  });

var view_main = app.views.create('.view-main');


$$(document).on('deviceready', function() {
  console.log("App iniciado.");
  window.open = cordova.InAppBrowser.open;

});


var calcflex_hist_data;
$$(document).on('page:init', '.page[data-name="calculadora-flex"]', function (e) {

  //limpa botão e esconde resultado
  $('#btn_calcula_flex .ripple-wave').hide();
  $('#btn_calcula_flex .resultado').hide();

  //carrega histórico
  calcflex_hist_data = window.localStorage.getItem('calculadora-flex-hist');

  if(window.localStorage.hasOwnProperty('calculadora-flex-hist')) {

    calcflex_hist_data = json_decode(calcflex_hist_data);

  } else {
    calcflex_hist_data = [];
  }

  if(calcflex_hist_data.length > 0){

    calcflex_hist_data.forEach(function(item){

      var html;
      html += '<tr>';
      html += '<td class="label-cell">' + item.data + '<br>' + item.hora + '</td>';
      html += '<td>Gasolina: R$ ' + item.valor_gasolina + '<br>Etanol: R$ ' + item.valor_etanol + '</td>';
      html += '<td><strong>' + item.resultado + '</strong><br>Economia de ' + item.resultado_economia + '%</td>';
      html += '</tr>';

      $('.historico table tbody').append(html);

    });

  }

  /*
   <tr>
   <td class="label-cell">12/01/19<br>12:00</td>
   <td>Gasolina: R$2,38<br>Etanol: R$1,23</td>
   <td><strong>Gasolina</strong><br>(economia de 5%)</td>
   </tr>


   */



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