; (function () {

    angular.module('App')
        .controller("leilaoGridCtrl", leilaoGridCtrl)

    leilaoGridCtrl.$inject = ['$scope', 'leilaoService', '$location', '$route'];

    function leilaoGridCtrl($scope, leilaoService, $location, $route) {
        var teste = "jgjg";
        inicializa($scope, $location, $route);
        //InicializaFuncoesEmissaoCTe($scope, cteService, ModalService, $route, $location, SweetAlert, $routeParams, toastr);
        //InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert);
        //ControlarInterface($scope, $routeParams);

        //InicializaPartialEmissaoCTe($scope, $controller, cteService, ModalService, $http, toastr, $filter, SweetAlert, $route);

    }

    function inicializa($scope, $location, $route) {

        $scope.goDetails = function () {
            $location.url('/leilao');
            //$location.url('/cte?codCTe=' + id);
        
        }
    }


    function InicializaModeloEmissaoCTe($scope, $routeParams, cteService, SweetAlert) {
        $scope.ChaveDocumento = ''

        if (window.AbaAnterior != undefined)
            $scope.tabEmissao = window.AbaAnterior;
        else
            $scope.tabEmissao = "dados";

        if (localStorage.getItem("TipoDocumentoEmissaoCTe"))
            $scope.ChaveDocumento = localStorage.getItem("TipoDocumentoEmissaoCTe");
        else
            SweetAlert.swal("Ocorreu um erro ao buscar o CT-e.", "Tipo do documento não foi informado", "error");

        window.AbaAnterior = undefined;
        $scope.Functions = {};
        $scope.StatusAcao = null;
        $scope.Visualizar = window.Visualizar;

        //Chave para determinar qual tipo de tomador quando for CTe
        if ($scope.ChaveDocumento != undefined && $scope.ChaveDocumento != '' && $scope.ChaveDocumento == 'CTe')
            $scope.ChaveTomador = 'toma3';

        // Se tiver veiculo cadastrado e o proprietario for preenchido, checkbox vai vir selecionado Default: false
        $scope.VeiculoNaoPertenceEmitente = false;

        // Visualizar ou Editar
        if ($routeParams.codCTe && $routeParams.codCTe > 0) {

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
        // Page infos
        $scope.infos = {
            icon: '/enota/front/assets/img/icones/icone-cte.png',
            desc: 'Emitir novo CTe'
        };

        $scope.part_Emitente = "assets/public/cte/Emitente/part_Emitente.html";
        $scope.part_InformacoesAdicionais = "assets/public/cte/InformacoesAdicionais/Part_InformacoesAdicionais.html";
        $scope.part_CteNormal = "assets/public/cte/CTeNormal/part_cteNormal.html";
        $scope.part_CteComplementado = "assets/public/cte/CTeComplementado/part_cteComplementado.html";
        $scope.part_CteAnulacao = "assets/public/cte/CTeAnulacao/part_cteAnulacao.html";
        $scope.part_Dados = "assets/public/cte/Dados/part_Dados.html";
        $scope.part_Tomador = "assets/public/cte/Tomador/part_Tomador.html";
        $scope.part_servicosImpostos = "assets/public/cte/ServicosImpostos/part_ServicosImpostos.html";
        $scope.part_CartaCorrecao = "assets/public/cte/CartaCorrecao/part_CartaCorrecao.html";
        $scope.part_PartesEnvolvidas = "assets/public/cte/PartesEnvolvidas/part_PartesEnvolvidas.html";

        EmitenteExtension($scope, cteService);
        DadosCTeOSExtension($scope, cteService, ModalService, SweetAlert, toastr, $filter);
        InformacoesAdicionaisExtension($scope, ModalService, toastr, SweetAlert);
        CteNormalExtension($scope, ModalService, toastr, SweetAlert, cteService, $filter);
        CteOutrosExtension($scope, ModalService, toastr);
        TomadorExtension($scope, ModalService, toastr, cteService, SweetAlert);
        ServicosImpostosExtension($scope, cteService, ModalService, SweetAlert, toastr, $filter);
        CancelamentoExtension($scope, cteService, toastr, SweetAlert, $route);
        CartaCorrecaoExtension($scope, cteService, toastr, SweetAlert, $route);
        GTVExtension($scope, cteService, toastr, $route, SweetAlert, $filter);
        PartesEnvolvidasExtension($scope, cteService, toastr, $route, SweetAlert, $filter);
    }

    function InicializaFuncoesEmissaoCTe($scope, cteService, ModalService, $route, $location, SweetAlert, $routeParams, toastr) {

        $scope.UrlBuscaClientesPJ = url('/api/Cliente/buscarClientes?tipoDocumento=1&searchBy=1', 'cadastro') + '&searchstr=';
        $scope.UrlBuscaClientesPF = url('/api/Cliente/buscarClientes?tipoDocumento=2&searchBy=1', 'cadastro') + '&searchstr=';

        $scope.PopularCampoEmail = function ($scope) {
            if ($scope.CTeSW.CTe.infCte != undefined && $scope.CTeSW.CTe.infCte.compl != undefined && $scope.CTeSW.CTe.infCte.compl.ObsCont != undefined) {
                for (var i = 0; i < $scope.CTeSW.CTe.infCte.compl.ObsCont.length; i++) {
                    if ($scope.CTeSW.CTe.infCte.compl.ObsCont[i]['@xCampo'] == 'emaildest1') {
                        $scope.CTeSW.CTe.infCte.toma.EmailAlternativo = $scope.CTeSW.CTe.infCte.compl.ObsCont[i].xTexto;
                        break;
                    }
                }
            }

            if ($scope.CTeSW.CTe.infCte != undefined && $scope.CTeSW.CTe.infCte.compl != undefined && $scope.CTeSW.CTe.infCte.compl.ObsCont != undefined) {
                for (var i = 0; i < $scope.CTeSW.CTe.infCte.compl.ObsCont.length; i++) {
                    if ($scope.CTeSW.CTe.infCte.compl.ObsCont[i]['@xCampo'] == 'anexo') {
                        $scope.CTeSW.CTe.infCte.toma.chkEnvioLink = $scope.CTeSW.CTe.infCte.compl.ObsCont[i].xTexto == '1' || $scope.CTeSW.CTe.infCte.compl.ObsCont[i].xTexto == '2' ? true : false;
                        if ($scope.CTeSW.CTe.infCte.compl.ObsCont[i].xTexto == '1') {
                            $scope.CTeSW.CTe.infCte.toma.chkEnvioAnexo = true;
                        }
                        else {
                            $scope.CTeSW.CTe.infCte.toma.chkEnvioAnexo = false;
                        }

                        break;
                    }
                }
            }
        }

        $scope.PreencherTipoInformacaoCteSubs = function ($scope) {
            if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub != undefined) {
                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.refCteAnu != undefined)
                    $scope.DadosCteSubstituicao.tpInformacao = null;
                else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNFe != undefined)
                    $scope.DadosCteSubstituicao.tpInformacao = 1;
                else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refCte != undefined)
                    $scope.DadosCteSubstituicao.tpInformacao = 2;
                else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF != undefined)
                    $scope.DadosCteSubstituicao.tpInformacao = 3;

                $scope.TipoInformacao_Change();
            }
        }

        $scope.TratarImpostoICMS = function ($scope) {
            if ($scope.CTeSW.CTe.infCte.imp != undefined && $scope.CTeSW.CTe.infCte.imp.ICMS != undefined) {
                var chave = '';
                for (x in $scope.CTeSW.CTe.infCte.imp.ICMS) {
                    chave = x;

                    if (chave == "ICMS90")
                        $scope.CTeSW.CTe.infCte.cst = "90"
                    else if (chave == "ICMSOutraUF")
                        $scope.CTeSW.CTe.infCte.cst = "90A"
                    else if (chave == "ICMSSN")
                        $scope.CTeSW.CTe.infCte.cst = "SN"
                    else
                        $scope.CTeSW.CTe.infCte.cst = $scope.CTeSW.CTe.infCte.imp.ICMS[chave].CST;
                }
            }
            else {
                if ($scope.CTeSW.CTe.infCte.imp == undefined)
                    $scope.CTeSW.CTe.infCte.imp = {};

                if ($scope.CTeSW.CTe.infCte.imp.ICMS == undefined) {
                    $scope.CTeSW.CTe.infCte.imp.ICMS = {}
                    $scope.CTeSW.CTe.infCte.imp.ICMS.ICMS00 = {}
                }

                $scope.CTeSW.CTe.infCte.cst = '00';
            }
        }

        $scope.TratarDatas = function ($scope) {
            if ($scope.ChaveDocumento != undefined) {
                if ($scope.CTeSW.CTe.infCte.infCteAnu != null && $scope.CTeSW.CTe.infCte.infCteAnu.dEmi) {
                    $scope.CTeSW.CTe.infCte.infCteAnu.dEmi = new Date($scope.CTeSW.CTe.infCte.infCteAnu.dEmi.replace('-', '/').replace('-', '/'));
                }

                if ($scope.DadosCteSubstituicao != undefined && $scope.DadosCteSubstituicao.tomaICMS != undefined && $scope.DadosCteSubstituicao.tomaICMS.refNF != null && $scope.DadosCteSubstituicao.tomaICMS.refNF.dEmi) {
                    $scope.DadosCteSubstituicao.tomaICMS.refNF.dEmi = new Date($scope.DadosCteSubstituicao.tomaICMS.refNF.dEmi.replace('-', '/').replace('-', '/'));
                }

                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc != undefined) {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF != undefined) {
                            for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF.length; i++) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].dEmi) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].dEmi = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].dEmi.replace('-', '/').replace('-', '/'));
                                }

                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].dPrev) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].dPrev = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].dPrev.replace('-', '/').replace('-', '/'));
                                }
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe != undefined) {
                            for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe.length; i++) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].dPrev) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].dPrev = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].dPrev.replace('-', '/').replace('-', '/'));
                                }
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros != undefined) {
                            for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros.length; i++) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dEmi) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dEmi = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dEmi.replace('-', '/').replace('-', '/'));
                                }

                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dPrev) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dPrev = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dPrev.replace('-', '/').replace('-', '/'));
                                }
                            }
                        }
                    }

                    if ($scope.CTeSW.CTe.infCte.ide.modal == "01") {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ != undefined) {
                            for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ.length; i++) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ[i].dEmi != undefined)
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ[i].dEmi = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ[i].dEmi.replace('-', '/').replace('-', '/'));
                            }
                        }
                    }

                    if ($scope.CTeSW.CTe.infCte.ide.modal == "02") {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.dPrevAereo != undefined) {
                            $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.dPrevAereo = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.dPrevAereo.replace('-', '/').replace('-', '/'));
                        }
                    }

                    if ($scope.CTeSW.CTe.infCte.ide.modal == "05") {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto != undefined) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto.dIni != undefined)
                                $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto.dIni = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto.dIni.replace('-', '/').replace('-', '/'));

                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto.dFim != undefined)
                                $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto.dFim = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto.dFim.replace('-', '/').replace('-', '/'));
                        }
                    }

                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.cobr != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup != undefined) {
                        for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup.length; i++) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup[i].dVenc) {
                                $scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup[i].dVenc = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup[i].dVenc.replace('-', '/').replace('-', '/'));
                            }
                        }
                    }

                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt != undefined) {
                        for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt.length; i++) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt != undefined) {
                                for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt.length; j++) {
                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap != undefined) {
                                        for (var l = 0; l < $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap.length; l++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap[l].dEmi != undefined)
                                                $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap[l].dEmi = new Date($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap[l].dEmi.replace('-', '/').replace('-', '/'));
                                        }
                                    }

                                }

                            }
                        }
                    }
                }

                if ($scope.CTeSW.CTe.infCte.compl != undefined) {
                    if ($scope.CTeSW.CTe.infCte.compl.Entrega != undefined) {
                        if ($scope.CTeSW.CTe.infCte.compl.Entrega.comData != undefined && $scope.CTeSW.CTe.infCte.compl.Entrega.comData.dProg != undefined)
                            $scope.CTeSW.CTe.infCte.compl.Entrega.comData.dProg = new Date($scope.CTeSW.CTe.infCte.compl.Entrega.comData.dProg.replace('-', '/').replace('-', '/'));

                        if ($scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo != undefined) {
                            if ($scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo.dIni != undefined)
                                $scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo.dIni = new Date($scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo.dIni.replace('-', '/').replace('-', '/'));

                            if ($scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo.dFim != undefined)
                                $scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo.dFim = new Date($scope.CTeSW.CTe.infCte.compl.Entrega.noPeriodo.dFim.replace('-', '/').replace('-', '/'));
                        }

                        if ($scope.CTeSW.CTe.infCte.compl.Entrega.comHora != undefined && $scope.CTeSW.CTe.infCte.compl.Entrega.comHora.hProg != undefined)
                            $scope.CTeSW.CTe.infCte.compl.Entrega.comHora.hProg = new Date($scope.DateTimeNowFormatada() + ' ' + $scope.CTeSW.CTe.infCte.compl.Entrega.comHora.hProg);

                        if ($scope.CTeSW.CTe.infCte.compl.Entrega.noInter != undefined) {
                            if ($scope.CTeSW.CTe.infCte.compl.Entrega.noInter.hIni != undefined) {
                                $scope.CTeSW.CTe.infCte.compl.Entrega.noInter.hIni = new Date($scope.DateTimeNowFormatada() + ' ' + $scope.CTeSW.CTe.infCte.compl.Entrega.noInter.hIni);
                            }

                            if ($scope.CTeSW.CTe.infCte.compl.Entrega.noInter.hFim != undefined) {
                                $scope.CTeSW.CTe.infCte.compl.Entrega.noInter.hFim = new Date($scope.DateTimeNowFormatada() + ' ' + $scope.CTeSW.CTe.infCte.compl.Entrega.noInter.hFim);
                            }
                        }
                    }
                }
            }
        }

        $scope.TratarTipoCTes = function ($scope) {
            if ($scope.ChaveDocumento == "CTe") {
                if ($scope.CTeSW.CTe.infCte.compl != undefined && $scope.CTeSW.CTe.infCte.compl.Entrega != undefined) {
                    for (var x in $scope.CTeSW.CTe.infCte.compl.Entrega) {
                        if (x == 'semData' || x == 'comData' || x == 'noPeriodo') {
                            $scope.ChaveDtEntrega = x;
                            $scope.DadosComplementaresAux.tpData = $scope.ChaveDtEntrega;
                            $scope.tpData_Change()
                        }

                        if (x == 'semHora' || x == 'comHora' || x == 'noInter') {
                            $scope.ChaveHrEntrega = x;
                            $scope.DadosComplementaresAux.tpHora = $scope.ChaveHrEntrega;
                            $scope.tpHora_Change()
                        }
                    }
                }

                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo != undefined) {
                                $scope.DadosRodoviarioCte = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal;
                                $scope.DadosRodoviarioCte.RNTRC = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.RNTRC;
                            }
                            else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo != undefined) {
                                $scope.DadosAereoCte = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo;
                            }
                            else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav != undefined) {
                                $scope.DadosAquaviarioCte = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav;
                            }
                            else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov != undefined) {
                                $scope.DadosFerroviarioCte = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov;
                            }
                            else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto != undefined) {
                                $scope.DadosDutoviarioCte = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.duto;
                            }
                            else if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.multimodal != undefined) {
                                $scope.DadosMultimodalCte = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.multimodal;
                            }
                        }

                    }
                }

                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub != undefined) {
                    $scope.DadosCteSubstituicao = $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub;
                }

                if ($scope.CTeSW.CTe.infCte.ide.toma3 != undefined) {
                    $scope.ChaveTomador = "toma3";
                    $scope.tabPartesEnvolvidas = 'remetente'
                } else {
                    $scope.ChaveTomador = "toma4";
                    $scope.tabPartesEnvolvidas = 'outros'
                }

                if ($scope.CTeSW.CTe.infCte.ide.indGlobalizado == undefined) {
                    $scope.CTeSW.CTe.infCte.ide.indGlobalizado = '0'
                }

                if ($scope.CTeSW.CTe.infCte.ide.retira == '1') {
                    $scope.CTeSW.CTe.infCte.ide.retira = true
                }
                else if ($scope.CTeSW.CTe.infCte.ide.retira == undefined || $scope.CTeSW.CTe.infCte.ide.retira == '0') {
                    $scope.CTeSW.CTe.infCte.ide.retira = false
                }

            } else {
                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodoOS != undefined) {
                        $scope.DadosRodoviario = $scope.CTeSW.CTe.infCte.infCTeNorm.infModal;
                    }

                    if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub != undefined) {
                        $scope.DadosCteSubstituicao = $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub;
                    }

                    if ($scope.DadosRodoviario != undefined && $scope.DadosRodoviario.rodoOS != undefined && $scope.DadosRodoviario.rodoOS && $scope.DadosRodoviario.rodoOS.veic != undefined && $scope.DadosRodoviario.rodoOS.veic.prop != undefined) {
                        $scope.VeiculoNaoPertenceEmitente = true;
                    }
                }
            }
        }

        $scope.DefinirAcaoFormulario = function ($scope) {
            $scope.showGTV = false;
            switch ($scope.CTeSW.Status.CodCTeStatus) {
                case 1: // DIGITAÇÃO
                    if ($scope.StatusAcao == 2) {
                        $scope.AcaoFormulario = 1; // VISUALIZAR
                    }
                    else if ($scope.StatusAcao == 3) {
                        $scope.AcaoFormulario = 2; // ATUALIZAR
                    }
                    else {
                        $scope.AcaoFormulario = 0; // INCLUIR
                    }
                    break;
                case 2: // VALIDADA
                case 3: // ASSINADA
                    if ($scope.StatusAcao == 2) {
                        $scope.AcaoFormulario = 4; // CTE VALIDADA
                    }
                    else {
                        $scope.AcaoFormulario = 2; // ATUALIZAR
                    }
                    break;
                case 4: // PROCESSAMENTO
                    $scope.AcaoFormulario = 5; // CTE TRANSMITIDA
                    break;
                case 5: // AUTORIZADA
                    if ($scope.CTeSW.CTe.infCte.ide.tpServ == '7') {
                        $scope.showGTV = true
                    }
                    $scope.AcaoFormulario = 6; // CTE AUTORIZADA
                    break;
                case 6: // DENEGADA
                case 7: // CANCELADA
                    $scope.AcaoFormulario = 7; // CTE CANCELADA
                    break;
                case 8: // REJEITADA
                    if ($scope.StatusAcao == 2) {
                        $scope.AcaoFormulario = 8; // CTE REJEITADA
                    }
                    else {
                        $scope.AcaoFormulario = 2; // ATUALIZAR
                    }
                    break;
                case 9: // PROBLEMA
                    $scope.AcaoFormulario = 9; // CTE PROBLEMA
                    break;
                case 10: // PENDENTE DE CANCELAMENTO
                    $scope.AcaoFormulario = 10; // CTE PROBLEMA
                    break;
                case 11: // PENDENTE DE CTE
                    $scope.AcaoFormulario = 11; // CTE PROBLEMA
                    break;
            }
        }

        $scope.ExecuteCallback = function () {
            //percorre todas as funçoes e executa elas dinamicamente
            for (var fnc in $scope.Functions) {
                $scope.Functions[fnc]();
            }
        };

        //insere funcoes dentro do calback executado no buscar ou no criar do service do nfe
        $scope.callback = function (func, nameFunc) {
            for (var nameFncAux in $scope.Functions) {

                if (nameFncAux == nameFunc) {
                    alert("Nome da função já utilizada [" + nameFunc + "]. Altere-a para funcionar");
                    return false;
                }
            }

            $scope.Functions[nameFunc] = func;
        };

        $scope.TratarArrays = function ($scope) {
            if ($scope.CTeSW.CTe.infCte != undefined) {
                if ($scope.CTeSW.CTe.infCte.ide != undefined) {
                    if ($scope.CTeSW.CTe.infCte.ide.infPercurso != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.ide.infPercurso))
                            $scope.CTeSW.CTe.infCte.ide.infPercurso = [$scope.CTeSW.CTe.infCte.ide.infPercurso];
                    }
                }

                if ($scope.CTeSW.CTe.infCte.compl != undefined) {
                    if ($scope.CTeSW.CTe.infCte.compl.ObsCont != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.compl.ObsCont))
                            $scope.CTeSW.CTe.infCte.compl.ObsCont = [$scope.CTeSW.CTe.infCte.compl.ObsCont];
                    }
                }

                if ($scope.CTeSW.CTe.infCte.compl != undefined) {
                    if ($scope.CTeSW.CTe.infCte.compl.ObsFisco != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.compl.ObsFisco))
                            $scope.CTeSW.CTe.infCte.compl.ObsFisco = [$scope.CTeSW.CTe.infCte.compl.ObsFisco];
                    }
                }

                if ($scope.CTeSW.CTe.infCte.autXML != undefined) {
                    if (!$.isArray($scope.CTeSW.CTe.infCte.autXML))
                        $scope.CTeSW.CTe.infCte.autXML = [$scope.CTeSW.CTe.infCte.autXML];
                }

                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef))
                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef];
                    }
                }

                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef))
                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDocRef];
                    }
                }

                if ($scope.CTeSW.CTe.infCte.vPrest != undefined) {
                    if ($scope.CTeSW.CTe.infCte.vPrest.Comp != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.vPrest.Comp))
                            $scope.CTeSW.CTe.infCte.vPrest.Comp = [$scope.CTeSW.CTe.infCte.vPrest.Comp];
                    }
                }

                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.seg != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.seg))
                            $scope.CTeSW.CTe.infCte.infCTeNorm.seg = [$scope.CTeSW.CTe.infCte.infCTeNorm.seg];
                    }

                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCarga != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCarga.infQ != undefined) {
                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infCarga.infQ))
                            $scope.CTeSW.CTe.infCte.infCTeNorm.infCarga.infQ = [$scope.CTeSW.CTe.infCte.infCTeNorm.infCarga.infQ];
                    }
                }

                if ($scope.ChaveDocumento == 'CTe') {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc != undefined) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF != undefined) {
                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF)) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF];
                                }

                                for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF.length; i++) {
                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga != undefined) {
                                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga)) {
                                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga];
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga != undefined) {
                                        for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga.length; j++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga[j].lacUnidCarga != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga[j].lacUnidCarga)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga[j].lacUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidCarga[j].lacUnidCarga];
                                                }
                                            }
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp != undefined) {
                                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp)) {
                                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp];
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp != undefined) {
                                        for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp.length; j++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[j].lacUnidTransp != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[j].lacUnidTransp)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[j].lacUnidTransp = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[j].lacUnidTransp];
                                                }
                                            }

                                            for (var k = 0; k < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp.length; k++) {
                                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga != undefined) {
                                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga)) {
                                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga];
                                                    }

                                                    for (var l = 0; l < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga.length; l++) {
                                                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga != undefined) {
                                                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga)) {
                                                                $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNF[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga];
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe != undefined) {
                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe)) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe];
                                }

                                for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe.length; i++) {
                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga != undefined) {
                                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga)) {
                                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga];
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga != undefined) {
                                        for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga.length; j++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga[j].lacUnidCarga != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga[j].lacUnidCarga)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga[j].lacUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidCarga[j].lacUnidCarga];
                                                }
                                            }
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp != undefined) {
                                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp)) {
                                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp];
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp != undefined) {
                                        for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp.length; j++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[j].lacUnidTransp != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[j].lacUnidTransp)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[j].lacUnidTransp = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[j].lacUnidTransp];
                                                }
                                            }

                                            for (var k = 0; k < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp.length; k++) {
                                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga != undefined) {
                                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga)) {
                                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga];
                                                    }

                                                    for (var l = 0; l < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga.length; l++) {
                                                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga != undefined) {
                                                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga)) {
                                                                $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infNFe[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga];
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros != undefined) {
                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros)) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros];
                                }

                                for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros.length; i++) {
                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga != undefined) {
                                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga)) {
                                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga];
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga != undefined) {
                                        for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga.length; j++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga[j].lacUnidCarga != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga[j].lacUnidCarga)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga[j].lacUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidCarga[j].lacUnidCarga];
                                                }
                                            }
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp != undefined) {
                                        if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp)) {
                                            $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp];
                                        }
                                    }

                                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp != undefined) {
                                        for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp.length; j++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[j].lacUnidTransp != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[j].lacUnidTransp)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[j].lacUnidTransp = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[j].lacUnidTransp];
                                                }
                                            }

                                            for (var k = 0; k < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp.length; k++) {
                                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga != undefined) {
                                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga)) {
                                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga];
                                                    }

                                                    for (var l = 0; l < $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga.length; l++) {
                                                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga != undefined) {
                                                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga)) {
                                                                $scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga = [$scope.CTeSW.CTe.infCte.infCTeNorm.infDoc.infOutros[i].infUnidTransp[k].infUnidCarga[l].lacUnidCarga];
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ != undefined) {
                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ)) {
                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodo.occ];
                                }
                            }

                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo != undefined) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.natCarga != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.natCarga.cInfManu != undefined) {
                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.natCarga.cInfManu)) {
                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.natCarga.cInfManu = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.natCarga.cInfManu];
                                    }
                                }

                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.peri != undefined) {
                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.peri)) {
                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.peri = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aereo.peri];
                                    }
                                }
                            }

                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav != undefined) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.balsa != undefined) {
                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.balsa)) {
                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.balsa = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.balsa];
                                    }
                                }

                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont != undefined) {
                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont)) {
                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont];

                                        for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont.length; i++) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].lacre != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].lacre)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].lacre = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].lacre];
                                                }
                                            }

                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc != undefined) {
                                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNF != undefined) {
                                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNF)) {
                                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNF = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNF];
                                                    }
                                                }

                                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNFe != undefined) {
                                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNFe)) {
                                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNFe = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.aquav.detCont[i].infDoc.infNFe];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov != undefined) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov.trafMut != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov.trafMut.ferroEnv != undefined) {
                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov.trafMut.ferroEnv)) {
                                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov.trafMut.ferroEnv = [$scope.CTeSW.CTe.infCte.infCTeNorm.infModal.ferrov.trafMut.ferroEnv];
                                    }
                                }
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.veicNovos != undefined) {
                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.veicNovos)) {
                                $scope.CTeSW.CTe.infCte.infCTeNorm.veicNovos = [$scope.CTeSW.CTe.infCte.infCTeNorm.veicNovos];
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.cobr != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup != undefined) {
                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup)) {
                                $scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup = [$scope.CTeSW.CTe.infCte.infCTeNorm.cobr.dup];
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infServVinc != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infServVinc.infCTeMultimodal != undefined) {
                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.infServVinc.infCTeMultimodal)) {
                                $scope.CTeSW.CTe.infCte.infCTeNorm.infServVinc.infCTeMultimodal = [$scope.CTeSW.CTe.infCte.infCTeNorm.infServVinc.infCTeMultimodal];
                            }
                        }

                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt != undefined) {
                            if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt)) {
                                $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt = [$scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt];
                            }

                            for (var i = 0; i < $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt.length; i++) {
                                if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt != undefined) {
                                    if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt)) {
                                        $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt = [$scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt];
                                    }

                                    for (var j = 0; j < $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt.length; j++) {
                                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j] != null) {
                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap = [$scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap];
                                                }
                                            }

                                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntEle != undefined) {
                                                if (!$.isArray($scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntEle)) {
                                                    $scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntEle = [$scope.CTeSW.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntEle];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $scope.PreencherTipoDocumento = function ($scope) {
            // CPF = 2
            // CNPJ = 1

            //Proprietario
            if ($scope.CTeSW.CTe.infCte != undefined) {
                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal != undefined) {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodoOS != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodoOS.veic != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodoOS.veic.prop) {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodoOS.veic.prop.CPF != undefined)
                                $scope.DadosRodoviario.propItemElementName = "2";
                            else
                                $scope.DadosRodoviario.propItemElementName = "1";
                        }
                    }

                    if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS != undefined && $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF != undefined) {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF.CPF != undefined)
                            $scope.DadosCteSubstituicao.TomaSubstItemElementName = "2";
                        else
                            $scope.DadosCteSubstituicao.TomaSubstItemElementName = "1";
                    }
                }

                if ($scope.CTeSW.CTe.infCte.toma != undefined) {
                    if ($scope.CTeSW.CTe.infCte.toma.CPF != undefined)
                        $scope.Tomador.ItemElementName = "2";
                    else
                        $scope.Tomador.ItemElementName = "1";
                }

                if ($scope.CTeSW.CTe.infCte.dest != undefined) {
                    if ($scope.CTeSW.CTe.infCte.dest.CPF != undefined)
                        $scope.Destinatario.ItemElementName = "2";
                    else
                        $scope.Destinatario.ItemElementName = "1";
                }

                if ($scope.CTeSW.CTe.infCte.exped != undefined) {
                    if ($scope.CTeSW.CTe.infCte.exped.CPF != undefined)
                        $scope.Expedidor.ItemElementName = "2";
                    else
                        $scope.Expedidor.ItemElementName = "1";
                }

                if ($scope.CTeSW.CTe.infCte.rem != undefined) {
                    if ($scope.CTeSW.CTe.infCte.rem.CPF != undefined)
                        $scope.Remetente.ItemElementName = "2";
                    else
                        $scope.Remetente.ItemElementName = "1";
                }

                if ($scope.CTeSW.CTe.infCte.receb != undefined) {
                    if ($scope.CTeSW.CTe.infCte.receb.CPF != undefined)
                        $scope.Recebedor.ItemElementName = "2";
                    else
                        $scope.Recebedor.ItemElementName = "1";
                }

                if ($scope.CTeSW.CTe.infCte.ide.toma4 != undefined) {
                    if ($scope.CTeSW.CTe.infCte.ide.toma4 != undefined)
                        $scope.Outros.ItemElementName = "2";
                    else
                        $scope.Outros.ItemElementName = "1";
                }
            }
        }

        $scope.btnEditar_Click = function (event) {
            window.AbaAnterior = $scope.tabEmissao;

            window.Visualizar = false;
            $route.reload();
        }

        $scope.btnVoltar_Click = function (event) {
            $location.url('/gerenciarcte');
        }

        //Insere no ObsCont se vai ser enviado o XML do documento e se será salvo o email alternativo do tomador
        $scope.AlterarDadosTomador = function (auxCTe) {
            if (auxCTe.CTe.infCte) {
                var existeEmailToma = false;
                var existeEnviarEmail = false;
                var opcaoEmail = '';

                if (auxCTe.CTe.infCte.toma != undefined) {
                    if (auxCTe.CTe.infCte.toma.chkEnvioLink != undefined && auxCTe.CTe.infCte.toma.chkEnvioLink == true) {
                        if (auxCTe.CTe.infCte.toma.chkEnvioAnexo != undefined && auxCTe.CTe.infCte.toma.chkEnvioAnexo == true) {
                            opcaoEmail = '1'; // para receber o email com o arquivo XML
                        }
                        else {
                            opcaoEmail = '2'; // para receber o email com o link para download
                        }

                        if (auxCTe.CTe.infCte.compl != undefined && auxCTe.CTe.infCte.compl.ObsCont != undefined && auxCTe.CTe.infCte.compl.ObsCont.length > 0) {
                            for (var i = 0; i < auxCTe.CTe.infCte.compl.ObsCont.length; i++) {
                                if (auxCTe.CTe.infCte.compl.ObsCont[i]['@xCampo'] == 'anexo') {
                                    existeEnviarEmail = true;
                                    auxCTe.CTe.infCte.compl.ObsCont[i].xTexto = opcaoEmail;
                                    break;
                                }
                            }
                        }

                        if (!existeEnviarEmail) {
                            if (auxCTe.CTe.infCte.compl == undefined) {
                                auxCTe.CTe.infCte.compl = {};
                            }

                            if (auxCTe.CTe.infCte.compl.ObsCont == undefined) {
                                auxCTe.CTe.infCte.compl.ObsCont = []
                            }

                            var objGrid = {
                                xTexto: opcaoEmail
                            }

                            objGrid['@xCampo'] = 'anexo';
                            auxCTe.CTe.infCte.compl.ObsCont.push(objGrid);
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.compl != undefined && auxCTe.CTe.infCte.compl.ObsCont != undefined && auxCTe.CTe.infCte.compl.ObsCont.length > 0) {
                            var indexAnexo = -1;
                            for (var i = 0; i < auxCTe.CTe.infCte.compl.ObsCont.length; i++) {
                                if (auxCTe.CTe.infCte.compl.ObsCont[i]['@xCampo'] == 'anexo') {
                                    indexAnexo = i;
                                    break;
                                }
                            }

                            if (indexAnexo >= 0) {
                                auxCTe.CTe.infCte.compl.ObsCont.splice(indexAnexo, 1)
                            }
                        }
                    }

                    if (auxCTe.CTe.infCte.toma.EmailAlternativo != undefined && auxCTe.CTe.infCte.toma.EmailAlternativo != null && auxCTe.CTe.infCte.toma.EmailAlternativo != '') {
                        if (auxCTe.CTe.infCte.compl.ObsCont.length > 0) {
                            for (var i = 0; i < auxCTe.CTe.infCte.compl.ObsCont.length; i++) {
                                if (auxCTe.CTe.infCte.compl.ObsCont[i]['@xCampo'] == 'emaildest1') {
                                    auxCTe.CTe.infCte.compl.ObsCont[i].xTexto = auxCTe.CTe.infCte.toma.EmailAlternativo;
                                    existeEmailToma = true;
                                    break;
                                }
                            }
                        }

                        if (!existeEmailToma) {
                            if (auxCTe.CTe.infCte.compl == undefined) {
                                auxCTe.CTe.infCte.compl = {};
                            }

                            if (auxCTe.CTe.infCte.compl.ObsCont == undefined) {
                                auxCTe.CTe.infCte.compl.ObsCont = []
                            }

                            var objGrid = {
                                xTexto: auxCTe.CTe.infCte.toma.EmailAlternativo
                            }

                            objGrid['@xCampo'] = 'emaildest1';
                            auxCTe.CTe.infCte.compl.ObsCont.push(objGrid);
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.compl != undefined && auxCTe.CTe.infCte.compl.ObsCont != undefined && auxCTe.CTe.infCte.compl.ObsCont.length > 0) {
                            var indexAnexo = -1;
                            for (var i = 0; i < auxCTe.CTe.infCte.compl.ObsCont.length; i++) {
                                if (auxCTe.CTe.infCte.compl.ObsCont[i]['@xCampo'] == 'emaildest1') {
                                    indexAnexo = i;
                                    break;
                                }
                            }

                            if (indexAnexo >= 0) {
                                auxCTe.CTe.infCte.compl.ObsCont.splice(indexAnexo, 1)
                            }
                        }
                    }
                }
            }
        }

        // Trata as datas para o formato AAAA-MM-DD
        $scope.TratarDatasBackend = function (auxCTe) {
            if (auxCTe.CTe.infCte.infCteAnu != null && auxCTe.CTe.infCte.infCteAnu.dEmi != undefined) {
                auxCTe.CTe.infCte.infCteAnu.dEmi = formatarData(auxCTe.CTe.infCte.infCteAnu.dEmi);
            }

            if (auxCTe.CTe.infCte.infCTeNorm != null && auxCTe.CTe.infCte.infCTeNorm.infCteSub != null && auxCTe.CTe.infCte.infCTeNorm.infCteSub.tomaICMS != null && auxCTe.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF != null && auxCTe.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF.dEmi) {
                auxCTe.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF.dEmi = formatarData(auxCTe.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF.dEmi);
            }

            if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                if (auxCTe.CTe.infCte.infCTeNorm.infDoc != undefined) {
                    if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF != undefined) {
                        for (var i = 0; i < auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF.length; i++) {
                            auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF[i].dEmi = formatarData(auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF[i].dEmi);

                            if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF[i].dPrev != undefined)
                                auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF[i].dPrev = formatarData(auxCTe.CTe.infCte.infCTeNorm.infDoc.infNF[i].dPrev);
                        }
                    }

                    if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infNFe != undefined) {
                        for (var i = 0; i < auxCTe.CTe.infCte.infCTeNorm.infDoc.infNFe.length; i++) {
                            if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infNFe[i].dPrev != undefined)
                                auxCTe.CTe.infCte.infCTeNorm.infDoc.infNFe[i].dPrev = formatarData(auxCTe.CTe.infCte.infCTeNorm.infDoc.infNFe[i].dPrev);
                        }
                    }

                    if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros != undefined) {
                        for (var i = 0; i < auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros.length; i++) {
                            if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dEmi != undefined)
                                auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dEmi = formatarData(auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dEmi);

                            if (auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dPrev != undefined)
                                auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dPrev = formatarData(auxCTe.CTe.infCte.infCTeNorm.infDoc.infOutros[i].dPrev);
                        }
                    }
                }

                if (auxCTe.CTe.infCte.ide.modal == "01") {
                    if (auxCTe.CTe.infCte.infCTeNorm.infModal != undefined && auxCTe.CTe.infCte.infCTeNorm.infModal.rodo != undefined && auxCTe.CTe.infCte.infCTeNorm.infModal.rodo.occ != undefined) {
                        for (var i = 0; i < auxCTe.CTe.infCte.infCTeNorm.infModal.rodo.occ.length; i++) {
                            if (auxCTe.CTe.infCte.infCTeNorm.infModal.rodo.occ[i].dEmi != undefined)
                                auxCTe.CTe.infCte.infCTeNorm.infModal.rodo.occ[i].dEmi = formatarData(auxCTe.CTe.infCte.infCTeNorm.infModal.rodo.occ[i].dEmi);
                        }
                    }
                }
                else if (auxCTe.CTe.infCte.ide.modal == "02") {
                    if (auxCTe.CTe.infCte.infCTeNorm.infModal != undefined && auxCTe.CTe.infCte.infCTeNorm.infModal.aereo != undefined && auxCTe.CTe.infCte.infCTeNorm.infModal.aereo.dPrevAereo != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal.aereo.dPrevAereo = formatarData(auxCTe.CTe.infCte.infCTeNorm.infModal.aereo.dPrevAereo);

                    }
                }
                else if (auxCTe.CTe.infCte.ide.modal == "05") {
                    if (auxCTe.CTe.infCte.infCTeNorm.infModal != undefined && auxCTe.CTe.infCte.infCTeNorm.infModal.duto != undefined) {
                        if (auxCTe.CTe.infCte.infCTeNorm.infModal.duto.dIni != undefined) {
                            auxCTe.CTe.infCte.infCTeNorm.infModal.duto.dIni = formatarData(auxCTe.CTe.infCte.infCTeNorm.infModal.duto.dIni);
                        }

                        if (auxCTe.CTe.infCte.infCTeNorm.infModal.duto.dFim != undefined) {
                            auxCTe.CTe.infCte.infCTeNorm.infModal.duto.dFim = formatarData(auxCTe.CTe.infCte.infCTeNorm.infModal.duto.dFim);
                        }
                    }
                }

                if (auxCTe.CTe.infCte.infCTeNorm.cobr != undefined && auxCTe.CTe.infCte.infCTeNorm.cobr.dup != undefined) {
                    for (var i = 0; i < auxCTe.CTe.infCte.infCTeNorm.cobr.dup.length; i++) {
                        if (auxCTe.CTe.infCte.infCTeNorm.cobr.dup[i].dVenc != undefined)
                            auxCTe.CTe.infCte.infCTeNorm.cobr.dup[i].dVenc = formatarData(auxCTe.CTe.infCte.infCTeNorm.cobr.dup[i].dVenc);
                    }
                }

                if (auxCTe.CTe.infCte.compl != undefined && auxCTe.CTe.infCte.compl.Entrega != undefined) {
                    if (auxCTe.CTe.infCte.compl.Entrega.comData != undefined && auxCTe.CTe.infCte.compl.Entrega.comData.dProg != undefined) {
                        auxCTe.CTe.infCte.compl.Entrega.comData.dProg = formatarData(auxCTe.CTe.infCte.compl.Entrega.comData.dProg);
                    }

                    if (auxCTe.CTe.infCte.compl.Entrega.comHora != undefined && auxCTe.CTe.infCte.compl.Entrega.comHora.hProg != undefined) {
                        auxCTe.CTe.infCte.compl.Entrega.comHora.hProg = formatarHorario(auxCTe.CTe.infCte.compl.Entrega.comHora.hProg);
                    }

                    if (auxCTe.CTe.infCte.compl.Entrega.noPeriodo != undefined) {
                        if (auxCTe.CTe.infCte.compl.Entrega.noPeriodo.dIni != undefined)
                            auxCTe.CTe.infCte.compl.Entrega.noPeriodo.dIni = formatarData(auxCTe.CTe.infCte.compl.Entrega.noPeriodo.dIni);

                        if (auxCTe.CTe.infCte.compl.Entrega.noPeriodo.dFim != undefined)
                            auxCTe.CTe.infCte.compl.Entrega.noPeriodo.dFim = formatarData(auxCTe.CTe.infCte.compl.Entrega.noPeriodo.dFim);
                    }

                    if (auxCTe.CTe.infCte.compl.Entrega.noInter != undefined) {
                        if (auxCTe.CTe.infCte.compl.Entrega.noInter.hIni != undefined)
                            auxCTe.CTe.infCte.compl.Entrega.noInter.hIni = formatarHorario(auxCTe.CTe.infCte.compl.Entrega.noInter.hIni);

                        if (auxCTe.CTe.infCte.compl.Entrega.noInter.hFim != undefined)
                            auxCTe.CTe.infCte.compl.Entrega.noInter.hFim = formatarHorario(auxCTe.CTe.infCte.compl.Entrega.noInter.hFim);
                    }

                }

                if (auxCTe.CTe.infCte.infCTeNorm.docAnt != undefined && auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt != undefined) {
                    for (var i = 0; i < auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt.length; i++) {
                        if (auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt != undefined) {
                            for (var j = 0; j < auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt.length; j++) {
                                if (auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap != undefined) {
                                    for (var l = 0; l < auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap.length; l++) {
                                        if (auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap[l].dEmi != undefined)
                                            auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap[l].dEmi = formatarData(auxCTe.CTe.infCte.infCTeNorm.docAnt.emiDocAnt[i].idDocAnt[j].idDocAntPap[l].dEmi);
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }

        //Preenche o objeto do modal
        $scope.AlterarObjetoModal = function (auxCTe) {
            if (auxCTe.CTe.infCte.ide.modal != undefined) {
                //Modal Rodoviário
                if (auxCTe.CTe.infCte.ide.modal == '01') {
                    if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            rodo: {}
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.infCTeNorm == undefined)
                            auxCTe.CTe.infCte.infCTeNorm = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            rodo: {}
                        }
                    }

                    if ($scope.DadosRodoviarioCte != undefined) {
                        if ($scope.DadosRodoviarioCte.rodo == undefined)
                            auxCTe.CTe.infCte.infCTeNorm.infModal.rodo = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal.rodo = $scope.DadosRodoviarioCte.rodo;
                        auxCTe.CTe.infCte.infCTeNorm.infModal.rodo.RNTRC = $scope.DadosRodoviarioCte.RNTRC;
                    }

                }
                //Modal Aéreo
                else if (auxCTe.CTe.infCte.ide.modal == '02') {
                    if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            aereo: {}
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.infCTeNorm == undefined)
                            auxCTe.CTe.infCte.infCTeNorm = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            aereo: {}
                        }
                    }

                    if ($scope.DadosAereoCte != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal.aereo = $scope.DadosAereoCte;
                    }
                }
                //Modal Aquaviário
                else if (auxCTe.CTe.infCte.ide.modal == '03') {
                    if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            aquav: {}
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.infCTeNorm == undefined)
                            auxCTe.CTe.infCte.infCTeNorm = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            aquav: {}
                        }
                    }

                    if ($scope.DadosAquaviarioCte != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal.aquav = $scope.DadosAquaviarioCte;
                    }
                }
                //Modal Ferroviário
                else if (auxCTe.CTe.infCte.ide.modal == '04') {
                    if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            ferrov: {}
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.infCTeNorm == undefined)
                            auxCTe.CTe.infCte.infCTeNorm = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            ferrov: {}
                        }
                    }

                    if ($scope.DadosFerroviarioCte != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal.ferrov = $scope.DadosFerroviarioCte;
                    }
                }
                else if (auxCTe.CTe.infCte.ide.modal == '05') {
                    if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            duto: {}
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.infCTeNorm == undefined)
                            auxCTe.CTe.infCte.infCTeNorm = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            duto: {}
                        }
                    }
                    if ($scope.DadosDutoviarioCte != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal.duto = $scope.DadosDutoviarioCte;
                    }
                }
                else if (auxCTe.CTe.infCte.ide.modal == '06') {
                    if (auxCTe.CTe.infCte.infCTeNorm != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            multimodal: {}
                        }
                    }
                    else {
                        if (auxCTe.CTe.infCte.infCTeNorm == undefined)
                            auxCTe.CTe.infCte.infCTeNorm = {}

                        auxCTe.CTe.infCte.infCTeNorm.infModal = {
                            multimodal: {}
                        }
                    }
                    if ($scope.DadosMultimodalCte != undefined) {
                        auxCTe.CTe.infCte.infCTeNorm.infModal.multimodal = $scope.DadosMultimodalCte;
                    }
                }
            }
        }

        // Preenche o xMun
        $scope.AlterarCamposTextoCombo = function (auxCTe) {
            if (auxCTe.CTe.infCte.emit != undefined && auxCTe.CTe.infCte.emit.enderEmit != undefined && $scope.CTeSW.CTe.infCte.emit.enderEmit.cMun != undefined && auxCTe.CTe.infCte.emit.enderEmit.xMun == undefined || auxCTe.CTe.infCte.emit.enderEmit.xMun == undefined == null || auxCTe.CTe.infCte.emit.enderEmit.xMun == '') {
                for (var i = 0 in $scope.Emitente.Municipio) {
                    if ($scope.Emitente.Municipio[i].CodigoSefaz.toUpperCase() == $scope.CTeSW.CTe.infCte.emit.enderEmit.cMun.toUpperCase()) {
                        auxCTe.CTe.infCte.emit.enderEmit.xMun = $scope.Emitente.Municipio[i].Nome;
                        break;
                    }
                }
            }

            if (auxCTe.CTe.infCte != undefined && auxCTe.CTe.infCte.ide != undefined && $scope.CTeSW.CTe.infCte.ide.cMunEnv != undefined && auxCTe.CTe.infCte.ide.xMunEnv == undefined || auxCTe.CTe.infCte.ide.xMunEnv == undefined == null || auxCTe.CTe.infCte.ide.xMunEnv == '') {
                for (var i = 0 in $scope.DadosMunicioEnvio.Municipio) {
                    if ($scope.DadosMunicioEnvio.Municipio[i].CodigoSefaz.toUpperCase() == $scope.CTeSW.CTe.infCte.ide.cMunEnv.toUpperCase()) {
                        auxCTe.CTe.infCte.ide.xMunEnv = $scope.DadosMunicioEnvio.Municipio[i].Nome;
                        break;
                    }
                }
            }

            if (auxCTe.CTe.infCte != undefined && auxCTe.CTe.infCte.ide != undefined && $scope.CTeSW.CTe.infCte.ide.cMunIni != undefined && auxCTe.CTe.infCte.ide.xMunIni == undefined || auxCTe.CTe.infCte.ide.xMunIni == undefined == null || auxCTe.CTe.infCte.ide.xMunIni == '') {
                for (var i = 0 in $scope.DadosMunicipioInicio.Municipio) {
                    if ($scope.DadosMunicipioInicio.Municipio[i].CodigoSefaz.toUpperCase() == $scope.CTeSW.CTe.infCte.ide.cMunIni.toUpperCase()) {
                        auxCTe.CTe.infCte.ide.xMunIni = $scope.DadosMunicipioInicio.Municipio[i].Nome;
                        break;
                    }
                }
            }

            if (auxCTe.CTe.infCte != undefined && auxCTe.CTe.infCte.ide != undefined && $scope.CTeSW.CTe.infCte.ide.cMunFim != undefined && auxCTe.CTe.infCte.ide.xMunFim == undefined || auxCTe.CTe.infCte.ide.xMunFim == undefined == null || auxCTe.CTe.infCte.ide.xMunFim == '') {
                for (var i = 0 in $scope.DadosMunicipioFim.Municipio) {
                    if ($scope.DadosMunicipioFim.Municipio[i].CodigoSefaz.toUpperCase() == $scope.CTeSW.CTe.infCte.ide.cMunFim.toUpperCase()) {
                        auxCTe.CTe.infCte.ide.xMunFim = $scope.DadosMunicipioFim.Municipio[i].Nome;
                        break;
                    }
                }
            }

        }

        $scope.TratarObjetoSubstituicao = function (auxCTe) {
            if ($scope.DadosCteSubstituicao != undefined && $scope.CTeSW.CTe.infCte != undefined) {
                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                    $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub = {
                        tomaICMS: { refNF: {} }
                    }
                }
                else {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm == undefined)
                        $scope.CTeSW.CTe.infCte.infCTeNorm = {}

                    $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub = {
                        tomaICMS: { refNF: {} }
                    }
                }

                $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub = $scope.DadosCteSubstituicao;

                switch ($scope.DadosCteSubstituicao.tpInformacao) {
                    case 1:
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refCte
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.refCteAnu
                        break;
                    case 2:
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNFe
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNF
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.refCteAnu
                        break;
                    case 3:
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refNFe
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS.refCte
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.refCteAnu
                        break;
                    default:
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub.tomaICMS

                }

            }
            else {
                if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined)
                    delete $scope.CTeSW.CTe.infCte.infCTeNorm.infCteSub;
            }
        }

        $scope.btnSalvar_Click = function (event) {
            var auxCTe = angular.copy($scope.CTeSW);
            if ($scope.ChaveDocumento == 'CTeOS') {
                if (auxCTe.CTe.infCte.toma != undefined && auxCTe.CTe.infCte.toma.CNPJ) {
                    auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.toma.CNPJ;
                }
                else if (auxCTe.CTe.infCte.toma.CPF) {
                    auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.toma.CPF;
                }
                else {
                    auxCTe.CnpjCpfDestinatario = "";
                }

                if (auxCTe.CTe.infCte.toma.enderToma != undefined)
                    auxCTe.UF = auxCTe.CTe.infCte.toma.enderToma.UF;

                if (($scope.CTeSW.CTe.infCte.ide.tpCTe == '0' || $scope.CTeSW.CTe.infCte.ide.tpCTe == '3') && $scope.CTeSW.CTe.infCte.ide.tpServ != '7') {
                    if ($scope.DadosRodoviario.rodoOS != undefined && $scope.CTeSW.CTe.infCte != undefined) {
                        if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined) {
                            $scope.CTeSW.CTe.infCte.infCTeNorm.infModal = {
                                rodoOS: {}
                            }
                        }
                        else {
                            if ($scope.CTeSW.CTe.infCte.infCTeNorm == undefined)
                                $scope.CTeSW.CTe.infCte.infCTeNorm = {}

                            $scope.CTeSW.CTe.infCte.infCTeNorm.infModal = {
                                rodoOS: {}
                            }
                        }

                        if ($scope.DadosRodoviario != undefined && $scope.DadosRodoviario.rodoOS != undefined) {
                            if ($scope.DadosRodoviario.rodoOS.NroRegEstadual == undefined || $scope.DadosRodoviario.rodoOS.NroRegEstadual == null)
                                delete $scope.DadosRodoviario.rodoOS.NroRegEstadual
                            else if ($scope.DadosRodoviario.rodoOS.TAF == undefined || $scope.DadosRodoviario.rodoOS.TAF == null)
                                delete $scope.DadosRodoviario.rodoOS.TAF

                            if ($scope.DadosRodoviario.rodoOS.veic != undefined || $scope.DadosRodoviario.rodoOS.veic != null) {
                                if ($scope.DadosRodoviario.rodoOS.veic.prop != undefined || $scope.DadosRodoviario.rodoOS.veic.prop != null) {
                                    if ($scope.DadosRodoviario.rodoOS.veic.prop.NroRegEstadual == undefined || $scope.DadosRodoviario.rodoOS.veic.prop.NroRegEstadual == null)
                                        delete $scope.DadosRodoviario.rodoOS.veic.prop.NroRegEstadual
                                    else if ($scope.DadosRodoviario.rodoOS.veic.prop.TAF == undefined || $scope.DadosRodoviario.rodoOS.veic.prop.TAF == null)
                                        delete $scope.DadosRodoviario.rodoOS.veic.prop.TAF
                                }
                            }
                        }

                        $scope.CTeSW.CTe.infCte.infCTeNorm.infModal.rodoOS = $scope.DadosRodoviario.rodoOS;
                    }
                }
                else {
                    if ($scope.CTeSW.CTe.infCte.infCTeNorm != undefined)
                        delete $scope.CTeSW.CTe.infCte.infCTeNorm.infModal;
                }

                $scope.AlterarDadosTomador(auxCTe);

                auxCTe.Modelo = "67"
                auxCTe.CTe.infCte.ide.modal = "01"; // Modal Rodoviario
            }
            else {
                if (auxCTe.CTe.infCte.ide[$scope.ChaveTomador] != undefined && auxCTe.CTe.infCte.ide[$scope.ChaveTomador].toma != undefined) {
                    var toma = auxCTe.CTe.infCte.ide[$scope.ChaveTomador].toma;
                    if (toma == '0') {

                        if (auxCTe.CTe.infCte.rem.enderReme != undefined)
                            auxCTe.UF = auxCTe.CTe.infCte.rem.enderReme.UF;

                        if (auxCTe.CTe.infCte.rem != undefined && auxCTe.CTe.infCte.rem.CNPJ) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.rem.CNPJ;
                        }
                        else if (auxCTe.CTe.infCte.rem != undefined && auxCTe.CTe.infCte.rem.CPF) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.rem.CPF;
                        }
                    }
                    else if (toma == '1') {
                        if (auxCTe.CTe.infCte.exped.enderExped != undefined)
                            auxCTe.UF = auxCTe.CTe.infCte.exped.enderExped.UF;

                        if (auxCTe.CTe.infCte.exped != undefined && auxCTe.CTe.infCte.exped.CNPJ) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.exped.CNPJ;
                        }
                        else if (auxCTe.CTe.infCte.exped != undefined && auxCTe.CTe.infCte.exped.CPF) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.exped.CPF;
                        }
                    }
                    else if (toma == '2') {
                        if (auxCTe.CTe.infCte.receb.enderReceb != undefined)
                            auxCTe.UF = auxCTe.CTe.infCte.receb.enderReceb.UF;

                        if (auxCTe.CTe.infCte.receb != undefined && auxCTe.CTe.infCte.receb.CNPJ) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.receb.CNPJ;
                        }
                        else if (auxCTe.CTe.infCte.receb != undefined && auxCTe.CTe.infCte.receb.CPF) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.receb.CPF;
                        }
                    }
                    else if (toma == '3') {
                        if (auxCTe.CTe.infCte.dest.enderDest != undefined)
                            auxCTe.UF = auxCTe.CTe.infCte.dest.enderDest.UF;

                        if (auxCTe.CTe.infCte.dest != undefined && auxCTe.CTe.infCte.dest.CNPJ) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.dest.CNPJ;
                        }
                        else if (auxCTe.CTe.infCte.dest != undefined && auxCTe.CTe.infCte.dest.CPF) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.dest.CPF;
                        }
                    }
                    else if (toma == '4') {
                        if (auxCTe.CTe.infCte.ide.toma4.enderToma != undefined)
                            auxCTe.UF = auxCTe.CTe.infCte.ide.toma4.enderToma.UF;

                        if (auxCTe.CTe.infCte.ide.toma4 != undefined && auxCTe.CTe.infCte.ide.toma4.CNPJ) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.ide.toma4.CNPJ;
                        }
                        else if (auxCTe.CTe.infCte.ide.toma4 != undefined && auxCTe.CTe.infCte.ide.toma4.CPF) {
                            auxCTe.CnpjCpfDestinatario = auxCTe.CTe.infCte.ide.toma4.CPF;
                        }
                    }
                }

                $scope.AlterarObjetoModal(auxCTe);

                if (auxCTe.CTe.infCte.ide.indGlobalizado == undefined || auxCTe.CTe.infCte.ide.indGlobalizado == null || auxCTe.CTe.infCte.ide.indGlobalizado == 0) {
                    delete auxCTe.CTe.infCte.ide.indGlobalizado
                }

                if (auxCTe.CTe.infCte.ide.retira == undefined || auxCTe.CTe.infCte.ide.retira == null || (!auxCTe.CTe.infCte.ide.retira)) {
                    auxCTe.CTe.infCte.ide.retira = '0'
                }
                else if (auxCTe.CTe.infCte.ide.retira) {
                    auxCTe.CTe.infCte.ide.retira = '1'
                }

                auxCTe.Modelo = "57"
            }

            $scope.TipoInformacao_Change();
            $scope.TratarObjetoSubstituicao(auxCTe);
            $scope.TratarDatasBackend(auxCTe);

            if (auxCTe.CTe.infCte.ide.serie == null) {
                toastr.warning("Insira a Série da CTe.", "Ops, algo faltando!");
                return;
            }

            if (auxCTe.CTe.infCte.ide.nCT == null) {
                toastr.warning("Insira o Número do CTe.", "Ops, algo faltando!");
                return;
            }

            auxCTe.Serie = auxCTe.CTe.infCte.ide.serie;
            auxCTe.Numero = auxCTe.CTe.infCte.ide.nCT;
            auxCTe.TipoEmissao = auxCTe.CTe.infCte.ide.tpEmis;
            auxCTe.TipoAmbiente = auxCTe.CTe.infCte.ide.tpAmb;
            auxCTe.TipoCte = $scope.ChaveDocumento;

            //Formatação de informacoes adicionais. Sem quebra de linha na hora de salvar
            $scope.FomataQuebraDeLinhaBackend(auxCTe);

            //Formata cnpj/cpf autorizados
            if (auxCTe.CTe.infCte.autXML != undefined) {
                for (var i = 0; i < auxCTe.CTe.infCte.autXML.length; i++) {
                    if (auxCTe.CTe.infCte.autXML[i].CNPJ != undefined) {
                        auxCTe.CTe.infCte.autXML[i].CNPJ = auxCTe.CTe.infCte.autXML[i].CNPJ.replace(/[^0-9]/g, "");
                    } else if (auxCTe.CTe.infCte.autXML[i].CPF != undefined) {
                        auxCTe.CTe.infCte.autXML[i].CPF = auxCTe.CTe.infCte.autXML[i].CPF.replace(/[^0-9]/g, "");
                    }
                }
            }

            $scope.AlterarCamposTextoCombo(auxCTe);

            if (auxCTe.CTe.infCte.ide.UFIni == null)
                delete auxCTe.CTe.infCte.ide.UFIni

            if (auxCTe.CTe.infCte.ide.UFFim == null)
                delete auxCTe.CTe.infCte.ide.UFFim

            $('#divloading').show();
            cteService.Salvar($scope, auxCTe, $scope.ChaveDocumento).then(function (responseSucess) {
                window.AbaAnterior = $scope.tabEmissao;
                window.Visualizar = true;
                if ($routeParams.codCTe && $routeParams.codCTe > 0)
                    $route.reload();
                else {
                    $location.path('/cte').search({ codCTe: responseSucess.data.codCTe, tipo: $scope.ChaveDocumento });
                    //$location.path('/cte').search('codCTe', responseSucess.data.codCTe);
                    $route.reload();
                }
                $('#divloading').hide();
            }).catch(function (error) {
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao salvar o CT-e.", error.data.Message, "error");
            });
        }

        $scope.btnValidar_Click = function (event) {
            window.AbaAnterior = $scope.tabEmissao;
            $('#divloading').show();
            cteService.Validar($scope.CTeSW.codCTe, $scope.ChaveDocumento).then(function (responseSucess) {
                window.Visualizar = true;
                $route.reload();
                $('#divloading').hide();
            }).catch(function (error) {
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao validar o CT-e.", error.data.Message, "error");
            });
        }

        // Copia chave de acessso no click
        $scope.copiaChaveAcesso = function () {
            // Seleciona o input escondido
            var chave = document.querySelector('.hdn-chave-acesso');

            chave.focus();
            chave.select();

            document.execCommand("copy");

            $scope.copiaMsg = "Copiado!";
        }

        $scope.btnTransmitir_Click = function (event) {
            $('#divloading').show();
            cteService.Transmitir($scope.CTeSW.codCTe, $scope.ChaveDocumento).then(function (responseSucess) {
                if (responseSucess.data[0] == "100") {
                    SweetAlert.swal({
                        title: "Autorizada",
                        text: "Conhecimento de Transporte autorizado com sucesso.",
                        type: "success",
                        confirmButtonText: "Fechar",
                        closeOnConfirm: true
                    },
                        function () {
                            window.Visualizar = true;
                            $route.reload();
                        });
                }
                else {
                    SweetAlert.swal({
                        title: "Rejeitada",
                        text: responseSucess.data[1],
                        type: "error",
                        confirmButtonText: "Fechar",
                        closeOnConfirm: true
                    },
                        function () {
                            window.Visualizar = true;
                            $route.reload();
                        });
                }
                $('#divloading').hide();
            }).catch(function (error) {
                window.Visualizar = true;
                $route.reload();
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao transmitir o CT-e.", error.data.Message, "error");
            });
        }

        //Encerrar
        $scope.btnEncerrar_Click = function (event) {
            ModalService.openModal("assets/public/cte/Encerramento/part_Encerramento.html", $scope, "Encerrar CT-e", "medium", true, false);
        }

        //Cancelar mdfe com justificativa
        $scope.btnCancelar_Click = function (event) {
            ModalService.openModal("assets/public/cte/Cancelamento/part_Cancelamento.html", $scope, "Cancelar CT-e", "medium", true, false);
        }

        // Pré-Visualizar Dacte
        $scope.btnPreVisualizarDacte_Click = function (event) {
            $('#divloading').show();
            cteService.PreVisualizarDacte($scope.CTeSW.codCTe, $scope.ChaveDocumento).then(function (responseSucess) {
                var blob = criarBlobToWindowPDF(responseSucess.data[0]); //criarBlobToWindowPDF - Funcao generica para abertura de PDF no browser. Arquivo library.js no (EnotaFront)
                if (window.navigator && window.navigator.msSaveOrOpenBlob) { // fluxo do Internet Explorer
                    window.navigator.msSaveOrOpenBlob(blob, responseSucess.data[1]);
                } else {
                    var fileURL = URL.createObjectURL(blob);
                    window.open(fileURL);
                }

                $('#divloading').hide();
            }).catch(function (error) {
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao pré visualizar Dacte.", error.data.Message, "error");
            });
        }

        //Imprimir Dacte
        $scope.btnImprimirDacte_Click = function (event) {
            $('#divloading').show();
            cteService.DownloadDacte($scope.CTeSW.codCTe, $scope.ChaveDocumento).then(function (responseSucess) {
                var dado = base64ToArrayBuffer(responseSucess.data[0]);
                download(dado, responseSucess.data[1], "application/pdf");
                $('#divloading').hide();
                toastr.success("Arquivo gerado com sucesso.");
            }).catch(function (error) {
                $('#divloading').hide();
                SweetAlert.swal("Ocorreu um erro ao exportar o CT-e.", error.data.Message, "error");
            });
        }

        //Envia Carta de Correcao
        $scope.btnCarta = function (event) {
            ModalService.openModal("assets/public/cte/CartaCorrecao/part_CartaCorrecao.html", $scope, "Carta de Correção", "medium", true, false);
        }

        //Envia GTV
        $scope.btnGtv = function (event) {
            ModalService.openModal("assets/public/cte/GTV/part_GTV.html", $scope, "GTV", "large", true, false);

            $scope.GTV = {
                nDoc: "",
                id: "",
                serie: "",
                subserie: "",
                dEmi: "",
                nDV: "",
                qCarga: "",
                placa: "",
                UF: "",
                RNTRC: "",
                infEspecie: [],
                rem: {
                    ItemElementNameRem: "1",
                    CNPJ: "",
                    CPF: "",
                    IE: "",
                    UF: "",
                    xNome: ""
                },
                dest: {
                    ItemElementNamedest: "1",
                    CNPJ: "",
                    CPF: "",
                    IE: "",
                    UF: "",
                    xNome: ""
                }
            }
        }

        $scope.FomataQuebraDeLinhaBackend = function (auxCTe) {
            if (auxCTe.CTe.infCte.compl != null) {
                if (auxCTe.CTe.infCte.compl != undefined && auxCTe.CTe.infCte.compl.xObs != null && auxCTe.CTe.infCte.compl.xObs != '') {
                    auxCTe.CTe.infCte.compl.xObs = auxCTe.CTe.infCte.compl.xObs.replace(/\n/g, "\\n");
                }
            }

            if (auxCTe.CTe.infCte.imp != null) {
                if (auxCTe.CTe.infCte.imp.infAdFisco != undefined && auxCTe.CTe.infCte.imp.infAdFisco != null && auxCTe.CTe.infCte.imp.infAdFisco != '') {
                    auxCTe.CTe.infCte.imp.infAdFisco = auxCTe.CTe.infCte.imp.infAdFisco.replace(/\n/g, "\\n");
                }
            }
        }

        $scope.FomataQuebraDeLinhaFront = function ($scope) {
            //Formatação de informacoes adicionais. Sem quebra de linha na hora de salvar
            if ($scope.CTeSW.CTe.infCte.compl != null) {
                if ($scope.CTeSW.CTe.infCte.compl != null && $scope.CTeSW.CTe.infCte.compl.xObs != undefined && $scope.CTeSW.CTe.infCte.compl.xObs != '') {
                    $scope.CTeSW.CTe.infCte.compl.xObs = $scope.CTeSW.CTe.infCte.compl.xObs.replace(/\\n/g, "\n");
                }
            }

            if ($scope.CTeSW.CTe.infCte.imp != null) {
                if ($scope.CTeSW.CTe.infCte.imp.infAdFisco != undefined && $scope.CTeSW.CTe.infCte.imp.infAdFisco != null && $scope.CTeSW.CTe.infCte.imp.infAdFisco != '') {
                    $scope.CTeSW.CTe.infCte.imp.infAdFisco = $scope.CTeSW.CTe.infCte.imp.infAdFisco.replace(/\\n/g, "\n");
                }
            }
        }

        $scope.checkRegraNegDadosId_11 = function (tpCTe, tpEmis) {
            if (!IsNullOrWhitespace(tpCTe) && !IsNullOrWhitespace(tpCTe) && tpCTe == "2" && tpEmis == "1") {
                $scope.regraNegDadosDisableTpEmis = true;
                $scope.regraNegDadosId_11ToolTipTpEmis = true;
            }
        }

        $scope.DateTimeNowFormatada = function () {
            var date = new Date();
            var year = date.getFullYear();

            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;

            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;

            return dataFinal = year + '/' + month + '/' + day
        }

        $scope.DisableInputsTomadores = function (divId, bloquear) {
            //bloquear = bool
            $('#' + divId).find('a, input, button, select, textarea').each(function (index) {
                if (typeof $(this).attr("data-unblockable") == 'undefined' && (this.type == "checkbox" == undefined || this.type != "checkbox")) {
                    $(this).attr('disabled', bloquear);
                    if ($scope.CTeSW.TipoAmbiente == 2) {
                        if (this.id == "NomeDestinatario" || this.id == "NomeExpedidor" || this.id == "NomeOutros" || this.id == "NomeRecebedor" || this.id == "NomeRemetente")
                            $(this).attr('disabled', true);
                    }
                }
            });
        }
    }
})();