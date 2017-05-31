var jq = jQuery.noConflict();
var num_var = 0;
var num_rest = 0;
var input_var = document.getElementById("num_var");
var input_rest = document.getElementById("num_rest");

function defineVariables() {
    num_var = input_var.value;
    num_rest = input_rest.value;
}

function GenerateVarInputs(whith_z = false) {
    var documentoUL = document.createElement('ul');
    for (var i = 0; i < num_var; i++) {
        if (i > 0) 
            documentoUL.innerHTML += "<label class='label_center'> + </label>";
        var newList = '<li>';
        newList += "<div class='input-field center'><input type='text' class= 'input_dynamic' id='input_var" + i + "'/>";
        newList += "<label for='input_var" + i + "'> X" + (i + 1) + " </label></div></li>";
        if(i == (num_var-1) && whith_z)
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
        
        var show = document.getElementById("show");
        jQuery("#show").empty();
        defineVariables();
        show.innerHTML += "<strong>Variaveis da Função Z<strong>";
        div_z = document.createElement('div');
        div_z.id = 'div_z';
        div_z.appendChild(GenerateVarInputs(true));
        show.appendChild(div_z);

        div_rest = document.createElement('div');
        div_rest.id = 'div_rest';
        div_rest.appendChild(GenerateRestInputs());
        show.innerHTML += "<strong>Variaveis de Restrição<strong>";
        show.appendChild(div_rest);        
    // }
    // for (var i = 0; i < num_rest; i++) {
    //     var newField = document.createElement('li');
    //     newField.className = "funcaoZ_inputs";
    //     var FieldInput = "<input type='text' id='input_rest" + i + "'/>";
    //     FieldLabel = "<label> X" + (i+1) + " </label>";
    //     newField.innerHTML = FieldInput + FieldLabel + "</li>";
    //     document.getElementById("funcaoZ_fields").appendChild(newField);    
    // }
}

// function addRestricoes() {
//     if (input_var.is(":valid") && input_rest.is(":valid")) {
//     defineVariables();
//     for (var i = 0; i < num_var; i++) {
//         var newField = document.createElement('li');
//         newField.className = "funcaoZ_inputs";
//         var FieldInput = "<input type='text' id='input_var" + i + "'/>";
//         FieldLabel = "<label> X" + (i+1) + " </label>";
//         newField.innerHTML = FieldInput + FieldLabel + "</li>";
//         document.getElementById("funcaoZ_fields").appendChild(newField);    }
// }}

