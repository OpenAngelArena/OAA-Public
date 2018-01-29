'use strict';


export default function routes($routeProvider) {
    'ngInject';
    $routeProvider
      .when('/login', {
        name: 'Login',
        referrer: '/',
        template: '',
        controller: function($window) {
          $window.location.href = '/auth/steam';
        }
      })
      .when('/logout', {
        name: 'logout',
        referrer: '/',
        template: '',
        controller: function($location, $route, Auth) {
          var referrer = $route.current.params.referrer ||
                          $route.current.referrer ||
                          '/';
          Auth.logout();
          $location.path(referrer);
        }
      });
}
