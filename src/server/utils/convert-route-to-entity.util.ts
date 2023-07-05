const mapping: Record<string, string> = {
  'csv-data': 'csv_data',
  'data-administrators': 'data_administrator',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
