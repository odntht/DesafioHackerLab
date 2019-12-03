const MAIN_URL = "https://dadosabertos.camara.leg.br/api/v2/";
const URL_FOTO = "https://www.camara.leg.br/internet/deputado/bandep/";
var listaDeDeputados;
var itensPorPagina = 6;
var listaDeNomes = [];

$(document).ready(function(){
  $.get(MAIN_URL + "deputados?ordem=ASC&ordenarPor=nome", function(data, status){

    listaDeDeputados = data.dados;

    listaDeDeputados.forEach(salvarNomes);

    console.log(listaDeNomes)

    $('input.autocomplete').autocomplete({
      data: listaDeNomes
    });

    // console.log(listaDeNomes);

    var totalDept = listaDeDeputados.length;
    var qtdPaginas = Math.ceil(totalDept / itensPorPagina);

    // console.log(itensPagAtual);
    var arrayQtdPaginas = [];
    var paginacao = '';  //DAR UM NOME MELHOR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (var i = 1; i <= qtdPaginas; i++) {
      paginacao += `<li class="waves-effect" id=${i} onclick="irParaPagina(${i})">
      <a href="#!">${i}</a>
      </li>`;

    }

    $("#paginacao").append(`
      <ul class="pagination">
      <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
      `
      + paginacao +
      `
      <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
      </ul>`);

      irParaPagina(1);

    });


  });

  function irParaPagina(paginaSelecionada){
    // console.log(qtdPaginas); //86
    var pagAtual = paginaSelecionada;
    var primeiroItemPagAtual = (pagAtual - 1) * itensPorPagina;
    var itensPagAtual = listaDeDeputados.slice(primeiroItemPagAtual, primeiroItemPagAtual+itensPorPagina);
    listarDeputados(itensPagAtual);

    $("#paginacao li").removeClass('active');
    $(`#${paginaSelecionada}`).addClass('active');
  }


  function listarDeputados(lista){
    $("#resultados").html('');

    lista.forEach(function (item) {
      var idDept = item.id;
      var idLegis = item.idLegislatura;
      var nmDept = item.nome;
      var partido = item.siglaPartido;
      var uf = item.siglaUf;
      var uriPartido = item.uriPartido;
      var foto = item.urlFoto;

      var cardDept = `<div class="col s12 m6" id="id${idDept}">
      <div class="card blue-grey darken-1">
      <div class="card-content white-text">
      <div class="row valign-wrapper">
      <img class="col s12 m6 circle responsive-img" src="${URL_FOTO+idDept}.jpg" alt="Foto do Deputado(a) ${nmDept}">
      <p class="card-title col s12 m6 center-align">Deputado(a) <br> ${nmDept}</p>
      </div>
      <div class="row">
      <p class="col s12 m5 center-align">Partido: ${partido}</p>
      <p class="col s12 m3 center-align">UF: ${uf}</p>
      <p class="col s12 m4 center-align">Legislatura: ${idLegis}</p>
      </div>
      <!-- <a class="center-align" href="${uriPartido}">Mais sobre o partido ${partido}</a> --!>
      </div>
      </div>
      </div>
      `;
      $("#resultados").append(cardDept);
    } );
  };

  function salvarNomes(item, index){
    listaDeNomes[item.nome] = item.urlFoto;
  }

  $("#busca ul").click(function(){
    console.log(this);
  })
