var PubSub = (function() {
    var topics = {};

    return {
        subscribe: function(topic, listener) {
            if(!topics[topic]) topics[topic] = [];

            topics[topic].push(listener);
        },

        publish: function(topic, data) {
            if(!topics[topic] || !topics[topic].length) return;

            var items = topics[topic];
            items.forEach(function(listener) {
                listener(data || {});
            });
        }
    }
})()

PubSub.subscribe('foo', function(data) {
    console.log(data)
})

/** with XHR **/
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.randomuser.me/?nat=US&results=1')
xhr.send()
xhr.onload = function() {
    PubSub.publish('foo', JSON.parse(xhr.response))
}

/** with Fetch **/
fetch('https://api.randomuser.me/?nat=US&results=1').then(function(response) {
  response.json().then(function(data) {
      PubSub.publish('foo', data)
  })
})