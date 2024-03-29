import tracker from '../utils/tracker';

export function injectXHR() {
  let XMLHttpRequest = window.XMLHttpRequest;
  let oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, async) {
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.logData = { method, url, async };
    }
    return oldOpen.apply(this, arguments);
  };
  let oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      let startTime = Date.now(); // 在发送之前记录一下开始的时间
      let handler = type => event => {
        let duration = Date.now() - startTime;
        let status = this.status;
        let statusText = this.statusText;
        let log = {
          kind: 'stability',
          type: 'xhr',
          eventType: type, // load error abort
          pathname: this.logData.url, // 请求路径
          status: status + '-' + statusText, // 状态码
          duration, // 持续时间
          response: this.response ? JSON.stringify(this.response) : '', // 响应体
          params: body || '',
        };
        tracker.send(log);
      };
      this.addEventListener('load', handler('load'), false);
      this.addEventListener('error', handler('error'), false);
      this.addEventListener('abort', handler('abort'), false);
    }
    return oldSend.apply(this, arguments);
  };
}
