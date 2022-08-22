export const buttons = {
  start: '/start',
  help: '/help',
  subscribe: '/subscribe',
  description: '/description',
  location: 'Send Location',
};

export const sendMsg = {
  onStartMsg: `Welcome, I'm subscriber bot. If you need help type /help`,
  onHelpMsg: `Following bot commands`,
  onTimeMsg: `Your time is saved please wait...`,
  onSubscribeMsg: `If you want subscribe please send me a location`,
  onDescribeMsg: `Hello I am weather bot and I can give you daily forecast on time`,
  onLocationMsg: `Great, Now input a time (Format: HH:MM)`,
  onWrongMsg: `Wrong command please type /start and follow instructions`,
};

export const receivedMsg = {
  description: '/description',
  subscribe: '/subscribe',
  regExp: /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
};
