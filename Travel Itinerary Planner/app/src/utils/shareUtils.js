export const generateShareLink = (itineraryId) => {
  return `${window.location.origin}/view/${itineraryId}`;
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert('Link copied to clipboard!');
};
