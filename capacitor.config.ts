import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pensionbeeus.app',
  appName: 'pensionbee_us_prototype',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
