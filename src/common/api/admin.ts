import { BackendUri, AdminSessionKey } from '@/common/settings';

export interface InviteCodeProps {
  comment: string;
  is_activate: boolean;
  register_count_limit: number;
  register_time_start: Date;
  register_time_end: Date;
  is_register_time_end_valid: boolean;
  register_cool_down: number;
}

export interface InviteCode extends InviteCodeProps {
  code: string;
  invite_count: number; // Only valid in CodeList api
  is_valid: boolean;
  invalid_reason: string;
}

export interface Invitee {
  registered_at: Date;
  username: string;
  invited_by_code: string; // Code
}

const SessionCheck = async (): Promise<boolean> => {
  const endpoint = BackendUri + '/admin/check';
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    headers: {
      Authorization: session,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });
  return res.ok;
};

const CodeCount = async (): Promise<number> => {
  const endpoint = BackendUri + '/admin/code/count';
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    headers: {
      Authorization: session,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res.count;
};

const CodeList = async (): Promise<InviteCode[]> => {
  const endpoint = BackendUri + '/admin/code/list';
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    headers: {
      Authorization: session,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res;
};

const CodeCreate = async (props: InviteCodeProps): Promise<InviteCode> => {
  const endpoint = BackendUri + '/admin/code/create';
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: session,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res;
};

const CodeEdit = async (code: string, props: InviteCodeProps): Promise<InviteCode> => {
  const endpoint = BackendUri + '/admin/code/edit/' + code;
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: session,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res;
};

const InviteeCount = async (): Promise<number> => {
  const endpoint = BackendUri + '/admin/invitee/count';
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    headers: {
      Authorization: session,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res.count;
};

const InviteeList = async (code?: string): Promise<Invitee[]> => {
  let endpoint = BackendUri + '/admin/invitee/list';
  if (code) {
    endpoint += '/' + code;
  }
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    headers: {
      Authorization: session,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res;
};

const Logout = async (): Promise<boolean> => {
  const endpoint = BackendUri + '/admin/logout';
  const session = localStorage.getItem(AdminSessionKey);
  if (session === null) {
    throw new Error('No session set');
  }

  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: session,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        throw new Error(res.error);
      });
    }
  });

  return res.ok;
};

const AdminAPI = {
  SessionCheck,
  CodeCount,
  CodeList,
  CodeCreate,
  CodeEdit,
  InviteeCount,
  InviteeList,
  Logout,
};

export default AdminAPI;
