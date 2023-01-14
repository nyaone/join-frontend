import { BackendUri } from '@/common/settings';

const Request = async (): Promise<string> => {
  const endpoint = BackendUri + '/login/request';
  const res = await fetch(endpoint, {
    method: 'POST',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });
  return res.url;
};

const Confirm = async (
  token: string,
): Promise<{
  session: string;
  username: string;
  name: string;
  avatar: string;
}> => {
  const endpoint = BackendUri + '/login/confirm/' + token;
  const res = await fetch(endpoint, {
    method: 'POST',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return {
    session: res.session,
    username: res.username,
    name: res.name,
    avatar: res.avatar,
  };
};

const LoginAPI = {
  Request,
  Confirm,
};

export default LoginAPI;
