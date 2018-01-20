'use strict';

import main from './main.component';
import {MainController} from './main.component';

describe('Component: MainComponent', function() {

  beforeEach(angular.mock.module(main));
  beforeEach(angular.mock.module('socketMock'));

  var scope;
  var mainComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    socket) {
      $httpBackend = _$httpBackend_;

      scope = $rootScope.$new();
      mainComponent = $componentController('main', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));
});
