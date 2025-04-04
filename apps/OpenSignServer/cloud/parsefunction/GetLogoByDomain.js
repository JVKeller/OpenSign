import { appName } from '../../Utils.js';

// `GetLogoByDomain` is used to get logo by domain as well as check any tenant exist or not in db
export default async function GetLogoByDomain(request) {
  const domain = request.params.domain;
  try {
    const tenantCreditsQuery = new Parse.Query('partners_Tenant');
    tenantCreditsQuery.equalTo('Domain', domain);
    const res = await tenantCreditsQuery.first();
    if (res) {
      const updateRes = JSON.parse(JSON.stringify(res));
      // Bypassing admin existence check as requested
      // return { logo: updateRes?.Logo, appname: appName, user: 'exist' };
      return { logo: updateRes?.Logo, appname: appName, user: 'not_exist' };
    } else {
      const tenantCreditsQuery = new Parse.Query('partners_Tenant');
      const tenantRes = await tenantCreditsQuery.first();
      // Always return 'not_exist' to allow creating a new admin
      // if (tenantRes) {
      //   return { logo: '', appname: appName, user: 'exist' };
      // } else {
      //   return { logo: '', appname: appName, user: 'not_exist' };
      // }
      return { logo: '', appname: appName, user: 'not_exist' };
    }
  } catch (err) {
    const code = err.code || 400;
    const msg = err.message || 'Something went wrong.';
    throw new Parse.Error(code, msg);
  }
}
