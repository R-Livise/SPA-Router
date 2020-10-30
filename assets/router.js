class Router {
  constructor(routes, routeError) {
    this.routes = routes;
    this.routeError = routeError;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegs) {
    const machedRoute = this._matchUrlToRoute(urlSegs);

    const url = `${urlSegs.join('/')}`;
    history.pushState({}, 'this works', url);

    const routerOutElment = document.querySelectorAll('[data-route]')[0];

    routerOutElment.innerHTML = !machedRoute
      ? this.routeError
      : machedRoute.template;
  }

  _matchUrlToRoute(urlSegs) {
    const matchRouteee = this.routes.find(route => {
      const rutePathSegs = route.path.split('/').slice(1);

      if (rutePathSegs.length !== urlSegs.length) {
        return false;
      }

      return rutePathSegs.every((seg, i) => seg === urlSegs[i]);
    });

    return matchRouteee;
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/');
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    this.loadRoute(...pathSegs);
  }
}
