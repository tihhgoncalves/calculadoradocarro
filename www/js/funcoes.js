function calcula_gasolinaxalcool(){

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


  var gasolina_media = somente_numero(window.localStorage.getItem('media_gasolina'));
  var gasolina_preco = somente_numero($('#gasolina').val());
  var etanol_media = somente_numero(window.localStorage.getItem('media_etanol'));
  var etanol_preco = somente_numero($('#etanol').val());

  var gasolina_custo = (gasolina_preco / gasolina_media);
  var etanol_custo = (etanol_preco / etanol_media);

  if(gasolina_custo < etanol_custo) {

    $('.popup-gasolinaxalcool-resultado .combustivel').text('Gasolina');
    var combustivel_maiscaro = etanol_custo;
    var combustivel_maisbarato = gasolina_custo;

  } else {

    $('.popup-gasolinaxalcool-resultado .combustivel').text('Etanol');
    var combustivel_maiscaro = gasolina_custo;
    var combustivel_maisbarato = etanol_custo;
  }


  $('.popup-gasolinaxalcool-resultado .cem-gasolina').text((gasolina_custo * 100).toFixed(2));
  $('.popup-gasolinaxalcool-resultado .cem-etanol').text((etanol_custo * 100).toFixed(2));
  $('.popup-gasolinaxalcool-resultado .economia').text( (100 - ((combustivel_maisbarato*100) / combustivel_maiscaro)).toFixed(1) );





  var dynamicPopup = app.popup.create({
    el: '.popup-gasolinaxalcool-resultado'
  });


  dynamicPopup.open();

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