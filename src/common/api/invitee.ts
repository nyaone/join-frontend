import { BackendUri } from '@/common/settings';

const CodeCheck = async (code: string): Promise<boolean> => {
  const endpoint = BackendUri + '/invitee/code/check/' + code;
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

  return res.valid;
};

const UsernameCheck = async (username: string): Promise<boolean> => {
  const endpoint = BackendUri + '/invitee/username/check/' + username;
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

  return res.valid;
};

const Register = async (
  code: string,
  username: string,
  password: string,
): Promise<{
  instance: string;
  username: string;
}> => {
  const endpoint = BackendUri + '/invitee/register';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      invite_code: code,
      username,
      password,
    }),
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
    instance: res.instance,
    username: res.username,
  };
};

const InviteeAPI = {
  CodeCheck,
  UsernameCheck,
  Register,
};

export default InviteeAPI;
