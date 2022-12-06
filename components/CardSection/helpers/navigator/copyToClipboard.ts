const copyToClipboard = (data: string) => {
  return navigator.clipboard.writeText(data);
};

export default copyToClipboard;
