const TABS = ['home', 'learn', 'care', 'saved'];
const HOME = { name: 'home' };

function createRouter(catalog) {
  const exists = (records, id) => records.some((record) => record.id === id);
  function valid(route) {
    if (!route || typeof route !== 'object') return false;
    if ([...TABS, 'firstAid', 'prepare', 'ask'].includes(route.name)) return route.id === undefined;
    if (route.name === 'guide') return exists(catalog.guides, route.id);
    if (route.name === 'facility') return exists(catalog.facilities, route.id);
    if (route.name === 'firstAidDetail') return exists(catalog.firstAid, route.id);
    return route.name === 'topic' && ['sleep', 'nutrition', 'mental', 'fitness'].includes(route.id);
  }
  function navigate(history, route) {
    if (!valid(route)) return history;
    const next = route.id === undefined ? { name: route.name } : { name: route.name, id: route.id };
    if (TABS.includes(next.name)) return next.name === 'home' ? [HOME] : [HOME, next];
    const previous = history.findIndex((item) => item.name === next.name && item.id === next.id);
    return previous >= 0 ? history.slice(0, previous + 1) : [...history, next];
  }
  const back = (history) => history.length > 1 ? history.slice(0, -1) : history;
  const activeTab = (route) => ({ guide: 'learn', topic: 'learn', facility: 'care', prepare: 'saved' }[route.name] || (TABS.includes(route.name) ? route.name : null));
  return { navigate, back, activeTab };
}

module.exports = { TABS, HOME, createRouter };
