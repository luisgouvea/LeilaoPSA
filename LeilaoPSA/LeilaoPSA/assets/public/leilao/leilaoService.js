angular.module('App')
    .service('leilaoService', leilaoService);

leilaoService.$inject = ['$http', '$filter'];

function leilaoService($http, $filter) {
        
    // Exportar MDFes
    this.ExportarCtes = function (lstCtes) {
        return $http.post(url('/api/Cte/ExportarLista', 'cte'), lstCtes);
    }

    // Download Dacte
    this.DownloadDacte = function (id, tipoCTe) {
        return $http.get(url('/api/Cte/DownloadDacte' + "?codCTe=" + id + "&tipoCte=" + tipoCTe, 'cte'));
    }

    // Buscar Informações de Veiculo 
    this.BuscarVeiculo = function (modelo) {
        return $http.post(url('/api/Veiculo/Buscar', 'cadastro'), modelo);
    }

    // Buscar CEP
    this.buscarCep = function (cep) {
        return $http.get('https://viacep.com.br/ws/' + cep + '/json/');
    }

    //Variável utilizada para acessar os métodos dos serviços
    //dentro deles mesmos
    var self = this;
}
