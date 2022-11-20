import { BackendUri } from '@/common/settings';

const HealthCheck = async (): Promise<boolean> => {
  const endpoint = BackendUri + '/healthcheck';
  const res = await fetch(endpoint).then((res) => res.json());
  if (res.error) {
    throw res.error;
  } else {
    return res.ok;
  }
};

const Instance = async (): Promise<string> => {
  const endpoint = BackendUri + '/instance';
  const res = await fetch(endpoint).then((res) => res.json());
  if (res.error) {
    throw res.error;
  } else {
    return res.link;
  }
};

const PublicAPI = {
  HealthCheck,
  Instance,
};

export default PublicAPI;
