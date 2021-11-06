const schema = 'https://';

const domains = {
  'tori.loc': 'loc',
  'dev.tori.one': 'dev',
  'sd.tori.one': 'sd',
  'stage.tori.one': 'stg',
  'demo.toriapps.com': 'dem',
  'preprod.torisystems.com': 'pre',
  'decima.tori.nz': 'dcm',
};

const domainsRegexp = {
  'stg': /stage-\d{1}.tori.one/,
  'prod': /\S+.toriapps.com/
};

const MESSAGE_TAB_CHANGED = 'message_tab_changed';
const MESSAGE_INIT_BACKGROUND = 'message_init_background';
