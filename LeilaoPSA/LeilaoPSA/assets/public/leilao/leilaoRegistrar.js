; (function () {

    angular.module('App')
        .controller("leilaoRegistrarCtrl", leilaoRegistrarCtrl)

    leilaoRegistrarCtrl.$inject = ['$scope', 'leilaoService', '$location', '$route'];

    function leilaoRegistrarCtrl($scope, leilaoService, $location, $route) {
        InicializaModeloEmissaoCTe($scope, leilaoService, $location, $route);
        InicializaFuncoesEmissaoCTe($scope, leilaoService, $location, $route);
        //InicializaFuncoesEmissaoCTe($scope, cteService, ModalService, $route, $location, SweetAlert, $routeParams, toastr);
        //InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert);
        //InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route);

    }

    function InicializaModeloEmissaoCTe($scope, leilaoService, $location, $route) {
        $scope.DadosAuxiliarRegistrar = {
            CheckBoxDocumento: [{ tipo: 'CPF' }, {tipo:'CNPJ'}],
            LabelDocumento : "CPF"
        };
        $scope.ModelRegistrarConta = {};
        $scope.ModelRegistrarConta.TipoDocumento = $scope.DadosAuxiliarRegistrar.CheckBoxDocumento[0].tipo;
    }

    function InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route) {
        $scope.part_Dados = "assets/public/cte/Dados/part_Dados.html";

        EmitenteExtension($scope, cteService);
        DadosCTeOSExtension($scope, cteService, ModalService, SweetAlert, toastr, $filter);
    }

    function InicializaFuncoesEmissaoCTe($scope, leilaoService, $location, $route) {

        $scope.VerificaTipoDocumento = function () {
            if ($scope.ModelRegistrarConta != undefined && $scope.ModelRegistrarConta.TipoDocumento != undefined) {
                if ($scope.ModelRegistrarConta.TipoDocumento == 'CPF') {
                    $scope.DadosAuxiliarRegistrar.LabelDocumento = "CPF";
                } else {
                    $scope.DadosAuxiliarRegistrar.LabelDocumento = "CNPJ";
                }
            }
        }        

        $scope.RegistrarUsuario = function () {
            //TODO:
        }
    }
})();