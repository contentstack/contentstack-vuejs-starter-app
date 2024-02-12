import { Config, Region, LivePreview, Stack } from 'contentstack';
const {
  VUE_APP_CONTENTSTACK_API_KEY,
  VUE_APP_CONTENTSTACK_DELIVERY_TOKEN,
  VUE_APP_CONTENTSTACK_ENVIRONMENT,
  VUE_APP_CONTENTSTACK_BRANCH,
  VUE_APP_CONTENTSTACK_REGION,
  VUE_APP_CONTENTSTACK_PREVIEW_TOKEN,
  VUE_APP_CONTENTSTACK_PREVIEW_HOST,
  VUE_APP_CONTENTSTACK_APP_HOST,
  VUE_APP_CONTENTSTACK_LIVE_PREVIEW,
} = process.env;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!VUE_APP_CONTENTSTACK_API_KEY &&
    !!VUE_APP_CONTENTSTACK_DELIVERY_TOKEN &&
    !!VUE_APP_CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!VUE_APP_CONTENTSTACK_LIVE_PREVIEW &&
    !!VUE_APP_CONTENTSTACK_PREVIEW_TOKEN &&
    !!VUE_APP_CONTENTSTACK_PREVIEW_HOST &&
    !!VUE_APP_CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = () => {
  let region = 'US' as keyof typeof Region;
  if (!!VUE_APP_CONTENTSTACK_REGION && VUE_APP_CONTENTSTACK_REGION !== 'us') {
    region = VUE_APP_CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      '-',
      '_'
    ) as keyof typeof Region;
  }
  return Region[region];
};
// set LivePreview config
const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error(
      'Your LP config is set to true. Please make you have set all required LP config in .env'
    );
  return {
    preview_token: VUE_APP_CONTENTSTACK_PREVIEW_TOKEN as string,
    enable: VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true',
    host: VUE_APP_CONTENTSTACK_PREVIEW_HOST as string,
  } as LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error('Please set you .env file before running starter app');
  const stackConfig: Config = {
    api_key: VUE_APP_CONTENTSTACK_API_KEY as string,
    delivery_token: VUE_APP_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: VUE_APP_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: VUE_APP_CONTENTSTACK_BRANCH || 'main',
  };
  if (VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace('api', 'cdn');
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === 'US') {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
