const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './leaderboards.routes';

class _Player {
  steamid: string = '';
  mmr: number = 0;
  ranking: number = 0;
  name: string = '';
  $promise = undefined;
}
export class LeaderboardsController {
  leaderboard: Array<_Player> = [];
  /*@ngInject*/
  constructor(BottlePass) {
    this.leaderboard = BottlePass.getLeaderboard();
  }
}

export default angular.module('oaaApp.leaderboards', [
  'oaaApp.auth',
  ngRoute])
    .config(routing)
    .component('leaderboards', {
      template: require('./leaderboards.html'),
      controller: LeaderboardsController
    })
    .directive('leaderboardRenderCompleteDirective', function() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                element.parent().parent().parent().addClass('loaded');
            }
        };
    })
    .name;
