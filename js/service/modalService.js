'use strict';

/**
 * @ngdoc service
 * @name routerApp.module
 * @author gmm
 * @description modal 
 * # module
 * Service in the adminApp.
 */
angular.module('routerApp')
    .service('modalServ', ['$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {


        var service = {
            open: function(modalOptions) {
                var body = $document.find('body').eq(0);
                var angularDomEl = angular.element('<div class="modal-window">\
                										<div modal my-ctrl=' + modalOptions.controller + ' \
                										 template-url=' + modalOptions.templateUrl + '></div>\
                										</div>');
                var modalScope = (modalOptions.scope || $rootScope).$new();
                var modalDomEl = $compile(angularDomEl)(modalScope);
                body.append(modalDomEl);
            },
            dismiss: function(){
            	$document.find('.modal-window').remove();
            }
        };

        return service;
    }]);
