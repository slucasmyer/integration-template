import { Client } from '@microsoft/microsoft-graph-client';
import { MSFTGraphToken } from './msftGraphToken';

export const msftGraphClient = () => {
  return Client.init({
    authProvider: async (done) => {
      const token = await MSFTGraphToken();
      done(null, token);
    },
  });
};