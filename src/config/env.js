export const ENV = {
  apiBaseUrl:
    window.location.href.indexOf('localhost:9900') !== -1
      ? 'http://localhost:8000/api/v1'
      : 'https://datn-be.herokuapp.com/api/v1',
};
