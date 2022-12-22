import { InviteCode, InviteCodeProps } from '@/common/api/admin';

export const DefaultCodeProps: InviteCodeProps = {
  comment: '',
  is_activate: true,
  register_count_limit: 0,
  register_time_start: new Date(),
  register_time_end: new Date(),
  is_register_time_end_valid: false,
  register_cool_down: 0,
};

export const DefaultCode: InviteCode = {
  code: '',
  invite_count: 0,
  is_valid: true,
  invalid_reason: '',
  ...DefaultCodeProps,
};
