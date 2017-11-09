; (function () {

    angular.module('App')
        .controller("leilaoDetailsCtrl", leilaoDetailsCtrl)

    leilaoDetailsCtrl.$inject = ['$scope', 'leilaoService', '$location', '$route'];

    function leilaoDetailsCtrl($scope, leilaoService, $location, $route) {
        $scope.tabEmissao = 'dados';
        InicializaFuncoesEmissaoCTe($scope, leilaoService, $location, $route);
        //InicializaFuncoesEmissaoCTe($scope, cteService, ModalService, $route, $location, SweetAlert, $routeParams, toastr);
        //InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert);
        //InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route);

    }

    function InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert) {

        // Visualizar ou Editar
        if ($routeParams.codLeilao && $routeParams.codLeilao > 0) {

            if (window.Visualizar == undefined || window.Visualizar == true) {
                // VISUALIZAR
                $scope.StatusAcao = 2;
            }
            else {
                // EDITAR
                $scope.StatusAcao = 3;
            }

            $('#divloading').show();
            // Busca a CTe
            cteService.Buscar($scope, $routeParams.codCTe, $scope.ChaveDocumento).then(function (responseSucess) {
                if (responseSucess.data == null)
                    $scope.CTeSW = {};
                else {
                    $scope.CTeSW = responseSucess.data;
                    $scope.CTeSW.CTe = JSON.parse($scope.CTeSW.CTe)[$scope.ChaveDocumento];

                    $scope.checkRegraNegDadosId_11($scope.CTeSW.CTe.infCte.ide.tpCTe, $scope.CTeSW.CTe.infCte.ide.tpEmis);
                    $scope.TratarArrays($scope);
                    $scope.TratarDatas($scope);
                    $scope.TratarTipoCTes($scope);

                    $scope.TratarImpostoICMS($scope);
                    $scope.DefinirAcaoFormulario($scope);
                    $scope.PreencherTipoDocumento($scope);
                    $scope.PreencherTipoInformacaoCteSubs($scope);
                    $scope.PopularCampoEmail($scope);
                    $scope.FomataQuebraDeLinhaFront($scope);


                    //$scope.paisChangeTomador_Change();
                    if (window.Visualizar != undefined && window.Visualizar == true)
                        DisableInputs($scope);
                }

                $('#divloading').hide();

                setTimeout(function () {
                    $scope.ExecuteCallback();
                }, 1000);


            }).catch(function (error) {

                $('#divloading').hide();
                if (error.data == undefined) {
                    SweetAlert.swal("Ocorreu um erro ao buscar o CT-e.", error.message, "error");
                } else {
                    SweetAlert.swal("Ocorreu um erro ao buscar o CT-e.", error.data.Message, "error");
                }
            });
        }
        // Nota nova
        else {
            $scope.StatusAcao = 1; // NOVO
            $scope.tabPartesEnvolvidas = 'remetente';
            $('#divloading').show();
            cteService.Criar($scope.ChaveDocumento).then(function (responseSucess) {
                $scope.CTeSW = responseSucess.data;

                $scope.CTeSW.CTe = JSON.parse($scope.CTeSW.CTe)[$scope.ChaveDocumento];
                if ($scope.CTeSW.CTe.infCte.emit != undefined && $scope.CTeSW.CTe.infCte.emit.enderEmit != undefined) {
                    $scope.CTeSW.CTe.infCte.ide.UFEnv = $scope.CTeSW.CTe.infCte.emit.enderEmit.UF;
                    $scope.CTeSW.CTe.infCte.ide.cMunEnv = $scope.CTeSW.CTe.infCte.emit.enderEmit.cMun;
                    $scope.CTeSW.CTe.infCte.ide.xMunEnv = $scope.CTeSW.CTe.infCte.emit.enderEmit.xMun;
                }

                $scope.DefinirAcaoFormulario($scope);

                //$scope.TratarArrays($scope);

                $('#divloading').hide();

                setTimeout(function () {
                    $scope.ExecuteCallback();
                }, 1000);


            }).catch(function (error) {
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao criar o CT-e.", error.data.Message, "error");
            });
        }
    }

    function InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route) {
        $scope.part_Dados = "assets/public/cte/Dados/part_Dados.html";

        EmitenteExtension($scope, cteService);
        DadosCTeOSExtension($scope, cteService, ModalService, SweetAlert, toastr, $filter);
    }

    function InicializaFuncoesEmissaoCTe($scope, leilaoService, $location, $route) {

        //Change controllers
        $scope.goDetails = function () {
            $location.url('/leilao');
            //$location.url('/cte?codCTe=' + id);
        }

        $scope.CarregarLogin = function () {
            $location.url('/leilaoLogin');
        }

        $scope.CarregarRegistrarConta = function () {
            $location.url('/leilaoRegistrar');
        }
        //Change controllers
    }
})();