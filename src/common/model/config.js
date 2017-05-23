export const config = {
    externalUrl : ((process.env.TARGET === 'CLIENT') ? '' : require('../../../../app/server/config').externalUrl)
};