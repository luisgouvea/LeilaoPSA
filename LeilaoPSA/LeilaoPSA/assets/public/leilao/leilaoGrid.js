; (function () {

    angular.module('App')
        .controller("leilaoGridCtrl", leilaoGridCtrl)

    leilaoGridCtrl.$inject = ['$scope', 'leilaoService', '$location', '$route'];

    function leilaoGridCtrl($scope, leilaoService, $location, $route) {
        InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert);
        InicializaFuncoesEmissaoCTe($scope, leilaoService, $location, $route);
        $scope.ListarGrid($scope);
        //InicializaFuncoesEmissaoCTe($scope, cteService, ModalService, $route, $location, SweetAlert, $routeParams, toastr);
        //InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert);
        //InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route);

    }
    
    function InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert) {
        
        // Grid 
        $scope.grid = {
            rows: []
        };
    }

    function InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route) {
        $scope.part_Dados = "assets/public/cte/Dados/part_Dados.html";
        
        EmitenteExtension($scope, cteService);
        DadosCTeOSExtension($scope, cteService, ModalService, SweetAlert, toastr, $filter);
    }

    function InicializaFuncoesEmissaoCTe($scope, leilaoService, $location, $route) {

        //Change controllers
        $scope.DetailsLeilao = function (id) {
            //$location.url('/leilao');
            $location.url('/leilao?id_leilao=' + id);
        }

        $scope.CarregarLogin = function () {
            $location.url('/leilaoLogin');
        }

        $scope.CarregarRegistrarConta = function () {
            $location.url('/leilaoRegistrar');
        }
        //Change controllers


        $scope.AutenticarUsuario = function () {
            leilaoService.Autenticar($scope.DadosAuxiliaresUsuario).then(function (responseSucess) {
                alert(teste);
                var teste = responseSucess.data;
                alert(teste);
            }).catch(function (error) {
                alert("Ocorreu um erro na autenticação");
            });
        }

        $scope.ListarGrid = function () {
            $('#divloading').show();
            leilaoService.Listar($scope.grid).then(function (responseSucess) {

                $scope.grid = responseSucess.data;

                $('.loader-spinner').hide();

                //Trata retorno caso não tenha nenhum item cadastrado
                if ($scope.grid.rows.length < 1)
                    $('.no-records-found').show();
                else
                    $('.no-records-found').hide();
                $('#divloading').hide();
            }).catch(function (error) {
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao listar os CT-es.", error.data.Message, "error");
            });
        };
    }
})();