const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './tournament.routes';

export class TournamentController {
  /*@ngInject*/
  constructor() {

  }
}

export default angular.module('oaaApp.tournament', [
  ngRoute])
    .config(routing)
    .component('tournament', {
      template: require('./tournament.html'),
      controller: TournamentController
    })
    .name;
