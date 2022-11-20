const copyInviteLink = async (code: string) => {
  const inviteLink = window.location.origin + '/invite/' + code;
  await navigator.clipboard.writeText(inviteLink);
};

export default copyInviteLink;
