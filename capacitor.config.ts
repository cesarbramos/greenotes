import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cr.greenotes',
  appName: 'GreeNotes',
  webDir: 'dist/GreeNotes',
  bundledWebRuntime: false,
  plugins: {
    "CapacitorFirebaseAuth": {
      "providers": ["google.com", "phone"],
      "languageCode": "en",
      "nativeAuth": true,
      "properties": {
        "google": { }
      },   
      "permissions": {
           "google": ["profile", "https://www.googleapis.com/auth/drive"]
       }
    }
  }
};

export default config;
