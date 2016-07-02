function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    if (interval > 1) {
      return interval + " years ago";
    } else {
      return "1 year ago";
    }
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    if (interval > 1) {
      return interval + " months ago";
    } else {
      return "1 month ago";
    }
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    if (interval > 1) {
      return interval + " days ago";
    } else {
      return "1 day ago";
    }
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if (interval > 1) {
      return interval + " hours ago";
    } else {
      return "1 hour ago";
    }
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if (interval > 1) {
      return interval + " minutes ago";
    } else {
      return "1 minute ago";
    }
  }
  return "Moments ago";
}

module.exports = timeSince;
