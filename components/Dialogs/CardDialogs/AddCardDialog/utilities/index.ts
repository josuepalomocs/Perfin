export const cardNicknameIsValid = (nickname: string) => {
  const regularExpression = /^.{1,}/;
  return nickname.match(regularExpression) ? true : false;
};
