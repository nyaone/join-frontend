import { BackendUri } from '@/common/settings';

const Request = async (username: string): Promise<string> => {
  const endpoint = BackendUri + '/login/request/' + username;
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
  return res.messaging_link;
};

const Confirm = async (
  token: string,
): Promise<{
  session: string;
  username: string;
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
  };
};

const LoginAPI = {
  Request,
  Confirm,
};

export default LoginAPI;
