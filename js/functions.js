var jq = jQuery.noConflict();
var loops = 1;
var arr_var_z = [];
var arr_arr_var_rests = [];
var STOPBYLOOP = 1001;
var arr_arr_fs = [];

function calcular() {
    setVariables();
    montaTabela();
    while (loops < 1000 && CondicaoParada())
        calculo();
    solucao();
}

function setVariables() {
    set_var_z_variables();
    set_rest_variables();
}

function set_var_z_variables() {
    arr_var_z = [];
    var teste = document.querySelectorAll("div[id=div_z] > ul > li > div > input");
    teste.forEach(function (as) {
        arr_var_z.push(parseInt(as.value));
    });
    if (document.getElementById("selector").checked)
        arr_var_z = arr_var_z.map(function (arr) { return arr * -1; });
}

function set_rest_variables() {
    var teste = document.querySelectorAll("div[id=div_rest] > div > div");
    teste.forEach(function (divs) {
        var selector_string = "div[id=" + divs.id + "] > ul > li > div > input";
        var vars = document.querySelectorAll(selector_string);
        arr = [];
        vars.forEach(function (as) {
            arr.push(parseInt(as.value));
        });
        arr_arr_var_rests.push(arr);

        selector_string = "div[id=" + divs.id + "] > div > input";
        var inputf = document.querySelector(selector_string);

        arr_arr_fs.push(parseInt(inputf.value));
    });
}

function montaTabela() {
    matrix = [[]];
    matrix[0][0] = 'Linha';
    
    for (var i = 1; i <= arr_var_z.length; i++)
        matrix[0].push('x' + i);
    for (var i = 1; i <= arr_arr_fs.length; i++)
        matrix[0].push('f' + i);

    matrix[0][matrix[0].length] = 'b';
    var countCol = 1;



    for (var i = 1; i <= arr_arr_fs.length; i++) {
        matrix.push(['f' + i]);
        countCol = 1;
        var basicVars = arr_arr_var_rests[i - 1];
        for (var j = 0; j < arr_var_z.length; j++) {
            if (basicVars[j])
                matrix[i][countCol++] = Number(basicVars[j]);
            else
                matrix[i][countCol++] = 0;
        }

        for (var j = 0; j < arr_arr_fs.length; j++) {
            matrix[i][countCol] = Number((matrix[i][0] == matrix[0][countCol] ? 1 : 0));
            countCol++;
        }

        matrix[i][countCol] = arr_arr_fs[i - 1];
    }
    matrix.push(['Z']);

    countCol = 1;
    for (var i = 0; i < arr_var_z.length; i++) {
        if (arr_var_z[i])
            matrix[matrix.length - 1][countCol++] = Number(-1 * arr_var_z[i]);
        else
            matrix[matrix.length - 1][countCol++] = 0;
    }

    for (var j = 0; j < arr_arr_fs.length; j++)
        matrix[matrix.length - 1][countCol++] = 0;
    matrix[matrix.length - 1][countCol] = 0;

    printTable('Tabela Inicial');
}
function printTable(title) {
    var results = document.getElementById('tables');
    var htmlTitle = '<h3 class="text-center">' + title + '</h3>';
    var table = '<table class="ui teal table">';
    var header = '<thead><tr>';
    for (var col = 0; col < matrix[0].length; col++)
        header += "<th>" + matrix[0][col] + "</th>";
    table += header + '</tr></thead>';
    var body = '<tbody>';
    for (var row = 1; row < matrix.length; row++) {
        var tr = '<tr>';
        for (var col = 0; col < matrix[row].length; col++)
            tr += '<td>' + matrix[row][col] + '</td>';

        body += tr + '</tr>';
    }

    table += body + '</tbody>';
    results.innerHTML += htmlTitle + table + '</table><hr />';
}

function calculo() {
    var zrow = matrix.length - 1;
    var columnAmount = matrix[zrow].length - 2;
    var rowAmount = matrix.length - 2;
    var entra = 0;
    var minEntraValor = Number.MAX_VALUE;

    for (var i = 1; i <= columnAmount; i++)
        if (matrix[zrow][i] < minEntraValor) {
            entra = i;
            minEntraValor = matrix[zrow][i];
        }

    var sai = 0;
    var iminSaiValor = Number.MAX_VALUE;

    for (var i = 1; i <= rowAmount; i++) {
        var bValue = matrix[i][matrix[0].length - 1];
        var colValue = matrix[i][entra];

        if (colValue <= 0)
            continue;

        var result = bValue / colValue;
        if (result < iminSaiValor) {
            sai = i;
            iminSaiValor = result;
        }
    }

    if (sai == 0) {
        loops = STOPBYLOOP;
        return;
    }

    console.log("Entra na base: " + matrix[0][entra]);
    console.log("Sai da base:" + matrix[sai][0]);

    matrix[sai][0] = matrix[0][entra];

    var pivo = matrix[sai][entra];

    for (var i = 1; i < matrix[0].length; i++)
        matrix[sai][i] = matrix[sai][i] / pivo;
    
    for (var row = 1; row < matrix.length; row++) {
        if (row == sai || matrix[row][entra] == 0)
            continue;

        var fator = -1 * matrix[row][entra];

        for (var column = 1; column < matrix[row].length; column++)
            matrix[row][column] = (matrix[sai][column] * fator) + matrix[row][column];
    }
    // printTable('Iteração ' + loops++);
}

function solucao()
{
  var outputDiv = document.getElementById('post-optimization');
  var header = '<h4 class="text-center">Questões pós otimização</h4>';
  var paragrafos = '';
  for(var i = 1; i < (matrix[0].length - 1); i++)
  {
    var solucao = (matrix[0][i][0] == 'x' ? 'Produção de ' : 'Folga da restrição ') + matrix[0][i];
    var val = 0;
    for(var rowIndex = 1; rowIndex < (matrix.length - 1); rowIndex++)
      if(matrix[0][i] == matrix[rowIndex][0])
        val = matrix[rowIndex][matrix[0].length - 1];
    paragrafos += '<div class="item">' + solucao + ' = ' + val + '</div>';
  }
  outputDiv.innerHTML = "<div class='ui list'>"+ header + paragrafos+ "</div>";
}

function CondicaoParada() {
    //pega a linha de z
    var zrow = matrix.length - 1;

    //colunas verificáveis
    var columnAmount = matrix[zrow].length - 1;

    //verifica se há valor negativo
    for (var i = 1; i < columnAmount; i++)
        if (matrix[zrow][i] < 0)
            return true; //ainda há valores negativos

    return false; //parar o simplex
}

