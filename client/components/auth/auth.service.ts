'use strict';

import * as _ from 'lodash';

// @flow
class _User {
  _id: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  ranking: number = 0;
  $promise = undefined;
}

class _BottlePass {
  steamid: string = '';
  matchesStarted: string = '';
  matchesFinished: string = '';
  currentMatch: string = '';
  rankedMMR: number = 0;
  unrankedMMR: number = 0;
  customBottle: string = '';
  matches: Array<string> = [];
  lastUpdated: number = 0;
  $promise = undefined;
}

export function AuthService($location, $http, $cookies, $q, appConfig, Util, User, BottlePass) {
  'ngInject';
  var safeCb = Util.safeCb;
  var currentUser: _User = new _User();
  var bottlePass: _BottlePass = new BottlePass();
  var userRoles = appConfig.userRoles || [];
  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user
   * @param {String} role - role to check against
   */
  var hasRole = function(userRole, role) {
    return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
  };

  if ($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  var Auth = {

    /**
     * Delete access token and user info
     */
    logout() {
      $cookies.remove('token');
      currentUser = new _User();
      bottlePass = new _BottlePass();
    },

    /**
     * Gets all available info on a user
     *
     * @param  {Function} [callback] - function(user)
     * @return {Promise}
     */
    getCurrentUser(callback?: Function) {
      var value = _.get(currentUser, '$promise')
        ? currentUser.$promise
        : currentUser;

      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Gets all available info on a user
     *
     * @return {Object}
     */
    getCurrentUserSync() {
      return currentUser;
    },

    /**
     * Gets all Bottlepass info on a user
     *
     * @param  {Function} [callback] - function(user)
     * @return {Promise}
     */
    setCurrentBottlePass(callback?: Function) {
      Auth.getCurrentUser(undefined)
        .then(user => {
          let email = _.get(user, 'email');
          bottlePass = BottlePass.getProfile({id: email});

          safeCb(callback)(bottlePass);
          return bottlePass;
        });
    },

    /**
     * Gets all Bottlepass info on a user
     *
     * @param  {Function} [callback] - function(user)
     * @return {Promise}
     */
    getCurrentBottlePass(callback?: Function) {
      var value = _.get(bottlePass, '$promise')
        ? bottlePass.$promise
        : bottlePass;

      return $q.when(value)
        .then(profile => {
          safeCb(callback)(profile);
          return profile;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Gets all Bottlepass info on a user
     *
     * @return {Object}
     */
    getCurrentBottlePassSync() {
      return bottlePass;
    },

    /**
     * Check if a user is logged in
     *
     * @param  {Function} [callback] - function(is)
     * @return {Promise}
     */
    isLoggedIn(callback?: Function) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          let is = _.get(user, 'role');

          safeCb(callback)(is);
          return is;
        });
    },

    /**
     * Check if a user is logged in
     *
     * @return {Bool}
     */
    isLoggedInSync() {
      return !!_.get(currentUser, 'role');
    },

     /**
      * Check if a user has a specified role or higher
      *
      * @param  {String}     role     - the role to check against
      * @param  {Function} [callback] - function(has)
      * @return {Promise}
      */
    hasRole(role, callback?: Function) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          let has = hasRole(_.get(user, 'role'), role);

          safeCb(callback)(has);
          return has;
        });
    },

    /**
      * Check if a user has a specified role or higher
      *
      * @param  {String} role - the role to check against
      * @return {Bool}
      */
    hasRoleSync(role) {
      return hasRole(_.get(currentUser, 'role'), role);
    },

     /**
      * Check if a user is an admin
      *   (synchronous|asynchronous)
      *
      * @param  {Function|*} callback - optional, function(is)
      * @return {Bool|Promise}
      */
    isAdmin(...args) {
      return Auth.hasRole(Reflect.apply([].concat, ['admin'], args));
    },

     /**
      * Check if a user is an admin
      *
      * @return {Bool}
      */
    isAdminSync() {
      // eslint-disable-next-line no-sync
      return Auth.hasRoleSync('admin');
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return $cookies.get('token');
    }
  };

  return Auth;
}
