var jq = jQuery.noConflict();
var num_var = 0;
var num_rest = 0;

function defineVariables() {
    num_var = input_var.val();
    num_rest = input_rest.val();
}

function GenerateVarInputs(whith_z = false) {
    var documentoUL = document.createElement('ul');
    for (var i = 0; i < num_var; i++) {
        if (i > 0)
            documentoUL.innerHTML += "<label class='label_center'> + </label>";
        var newList = '<li>';
        newList += "<div class='input-field center'><input type='text' class= 'input_dynamic' id='input_var" + i + "'/>";
        newList += "<label for='input_var" + i + "'> X" + (i + 1) + " </label></div></li>";
        if (i == (num_var - 1) && whith_z)
            newList += "<label class='label_center'> = Z <br></label>";
        newList += '';
        documentoUL.innerHTML += newList;
    }
    return documentoUL;
}

function GenerateRestInputs() {
    var documentoUL = document.createElement('div');
    for (var i = 0; i < num_rest; i++) {
        var newList = document.createElement('div');
        newList.id = "ListF" + i;
        newList.className = "horizontal-align";
        newList.innerHTML = GenerateVarInputs().outerHTML;
        newList.innerHTML += "<label class='label_center'>  <=  </label>";
        var input_div = "<div class='input-field center'>";
        input_div += "<input type='text' class= 'input_dynamic center' id='input_rest" + i + "'/>"
        input_div += "<label for='input_rest" + i + "'> F" + (i + 1) + " </label></div>";
        newList.innerHTML += input_div + "</div>";
        documentoUL.appendChild(newList);
    }
    return documentoUL;
}

function addFields() {
    // document.getElementById("funcaoZ_fields").appendChild(newList);    
    // if (input_var.is(":valid") && input_rest.is(":valid")) {
    input_var = $("#num_var");
    input_rest = $("#num_rest");
    if (input_var.val() && input_rest.val()) {
        clear_show();
        clear();
        var show = $("#show");;
        show.toggle();
        show.empty();
        defineVariables();
        show.prepend("<strong>Variaveis da Função Z<strong>");
        div_z = document.createElement('div');
        div_z.id = 'div_z';
        div_z.appendChild(GenerateVarInputs(true));
        show.append(div_z);

        div_rest = document.createElement('div');
        div_rest.id = 'div_rest';
        div_rest.appendChild(GenerateRestInputs());
        show.append("<strong>Variaveis de Restrição<strong>");
        show.append(div_rest);
        $("#btn_calc").show();
    }
    else {
        alert("Necessário informar o número de variáveis e restrições");
    }

}