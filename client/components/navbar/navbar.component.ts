'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'link': '/'
  },
  {
    'title': 'Tournament',
    'link': '/tournament'
  },
  {
    'title': 'Leaderboards',
    'link': '/leaderboards'
  }];
  $location;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  getBottlePass: Function;
  isCollapsed = true;

  constructor($location, Auth) {
    'ngInject';
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    Auth.setCurrentBottlePass();
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.getBottlePass = Auth.getCurrentBottlePassSync;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
