'use strict';

export function BottlePassResource($resource, appConfig) {
  'ngInject';
  return $resource( appConfig.bottlepassServer +  '/:controller/:id', {
    id: '@_id'
  }, {
    getProfile: {
      method: 'GET',
      params: {
        controller: 'users'
      }
    },
    getLeaderboard: {
      method: 'GET',
      params: {
        controller: 'top'
      },
      isArray: true
    }
  });
}
