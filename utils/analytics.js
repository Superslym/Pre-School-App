// simple analytics stub - replace with real service later
export default {
  logEvent: (name, params = {}) => {
    // in a real app you'd forward this to Expo Analytics, Firebase, etc.
    console.log(`analytics event: ${name}`, params);
  },
};
