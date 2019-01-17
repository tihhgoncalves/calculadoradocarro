function calcula_flex(){

  if($('#gasolina').val() <= 0){
    app.dialog.alert('Você precisa preencher o preço da Gasolina antes de calcular.', 'Ops!', function(){
      $('#gasolina').focus();
    });
    return;
  }

  if($('#etanol').val() <= 0){
    app.dialog.alert('Você precisa preencher o preço do Etanol antes de calcular.', 'Ops!', function(){
      $('#etanol').focus();
    });
    return;
  }

  window.localStorage.setItem('preco_gasolina', $('#gasolina').val());
  window.localStorage.setItem('preco_etanol', $('#etanol').val());


  var agora = new Date;

  var economia;
  var resultado;

  var gasolina_media = somente_numero(window.localStorage.getItem('media_gasolina'));
  var gasolina_preco = somente_numero($('#gasolina').val());
  var etanol_media = somente_numero(window.localStorage.getItem('media_etanol'));
  var etanol_preco = somente_numero($('#etanol').val());

  var gasolina_custo = (gasolina_preco / gasolina_media);
  var etanol_custo = (etanol_preco / etanol_media);

  if(gasolina_custo < etanol_custo) {

    resultado = 'Gasolina';
    var combustivel_maiscaro = etanol_custo;
    var combustivel_maisbarato = gasolina_custo;

  } else {

    resultado = 'Etanol';
    var combustivel_maiscaro = gasolina_custo;
    var combustivel_maisbarato = etanol_custo;
  }

  $('.resultado .combustivel').text(resultado);
  economia = (100 - ((combustivel_maisbarato*100) / combustivel_maiscaro)).toFixed(1);

  $('.resultado .cem-gasolina').text((gasolina_custo * 100).toFixed(2));
  $('.resultado .cem-etanol').text((etanol_custo * 100).toFixed(2));
  $('.resultado .economia').text( economia );



  //salva histórico
  var dt = {
    data: agora.getDate() + '/' + mes_nome[agora.getMonth()] + '/' + agora.getYear(),
    hora: agora.getHours() + ':' + agora.getMinutes(),
    valor_gasolina: gasolina_preco,
    valor_etanol: etanol_preco,
    resultado: resultado,
    resultado_economia: economia
  };

  calcflex_hist_data.unshift(dt);

  window.localStorage.setItem('calculadora-flex-hist', json_encode(calcflex_hist_data));

  $('.resultado').show('blind', function(){

    //já atualiza histórico
    calculadora_flex_monta_hist();

  });



}

function calculadora_flex_monta_hist(){

  //limpa histórico
  $('.historico table tbody tr').remove();

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
}
function salvar_parametros(){

  if($('#media_gasolina').val() <= 0){
    app.dialog.alert('Antes de salvar, preencha quantos km/lt de Gasolina seu carro faz.', 'Ops!', function(){
      $('#media_gasolina').focus();
    });
    return;
  }

  if($('#media_etanol').val() <= 0){
    app.dialog.alert('Antes de salvar, preencha quantos km/lt de Etanol seu carro faz.', 'Ops!', function(){
      $('#media_etanol').focus();
    });
    return;
  }

  window.localStorage.setItem('media_gasolina', $('#media_gasolina').val());
  window.localStorage.setItem('media_etanol', $('#media_etanol').val());

  app.dialog.alert('Parâmetros salvos com sucesso!', 'Tudo certo!', function(){
    view_main.router.navigate('/home/');
  });

}

function somente_numero(text, virgula){

  if(virgula == false)
    return text.replace(/[^\d]+/g,'');

  return text.replace(/[^\d,]+/g,'').replace(',', '.');
}

function json_encode(ar){
  var res = JSON.stringify({data: ar});
  return res;
}

function json_decode(json){
  var res = JSON.parse(json);
  return res.data;
}



function handleExternalURLs() {

  $(document).on('click', 'a[href^="http"]', function (e) {
    var url = $(this).attr('href');
    navigator.app.loadUrl(url, { openExternal: true });
    e.preventDefault();
  });

}

