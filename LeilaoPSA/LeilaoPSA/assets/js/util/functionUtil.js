///Método utilizado para resolver as url's
function url(relativeUrl) {
    var apiUrl = "";

    //if the development dont have API compiled, set this value to "True"
    var dontHaveLocalHost = false;


    if (relativeUrl.trim().indexOf('/') == 0) {
        relativeUrl = relativeUrl.trim().replace("/", "");
    }

    apiUrl = "http://localhost:63205/" + relativeUrl;

    //if the connection is out, show error message
    if (!navigator.onLine) {
        console.log("Você está sem conexão, verifique os cabos de rede ou entre em contato com sua operadora");
        //quando retornado false o service não é consumido
        return false;
    }
    
    return apiUrl;
}


//Método utilizado para limpar o filtro da sessão 
function limparFiltroSessao() {
    var key = location.hash;
    sessionStorage.removeItem(key);
}

function validaCpfCnpj(documentoParam) {
    documentoParam = documentoParam = documentoParam.replace(/[^a-zA-Z0-9]/g, '');

    if (documentoParam.length <= 11) {
        return valida_cpf(documentoParam);
    }
    else {
        return valida_cnpj(documentoParam);
    }
}

function valida_cnpj(cnpj) {

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14)
        return false;
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    if (!digitos_iguais) {
        //numeros = cnpj.substring(0, 12);
        digitos = cnpj.substring(12);

        //Calculo do primeiro digito verificador
        soma = 0;
        soma += (2 * cnpj.charAt(11)) + (3 * cnpj.charAt(10)) + (4 * cnpj.charAt(9)) + (5 * cnpj.charAt(8));
        soma += (6 * cnpj.charAt(7)) + (7 * cnpj.charAt(6)) + (8 * cnpj.charAt(5)) + (9 * cnpj.charAt(4));
        soma += (2 * cnpj.charAt(3)) + (3 * cnpj.charAt(2)) + (4 * cnpj.charAt(1)) + (5 * cnpj.charAt(0));
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        //Calculo do segundo digito verificador
        soma = 0;
        soma += (2 * cnpj.charAt(12)) + (3 * cnpj.charAt(11)) + (4 * cnpj.charAt(10)) + (5 * cnpj.charAt(9)) + (6 * cnpj.charAt(8));
        soma += (7 * cnpj.charAt(7)) + (8 * cnpj.charAt(6)) + (9 * cnpj.charAt(5)) + (2 * cnpj.charAt(4));
        soma += (3 * cnpj.charAt(3)) + (4 * cnpj.charAt(2)) + (5 * cnpj.charAt(1)) + (6 * cnpj.charAt(0));
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return true;
}

function valida_cpf(cpf) {

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return true;
}