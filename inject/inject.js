const sunCalc = require('suncalc');

function calculateDelay() {
  const offsetMs = this.offset * 1000;
  let forDay = Date.now();
  let delay = 0;
  for ( ; delay <= 0; forDay += 24 * 60 * 60) {
    const time = new Date(sunCalc.getTimes(forDay, this.latitude, this.longitude)[this.event]);
    delay = time.getTime() - Date.now() + offsetMs;
  }
  return delay;
}

function timeoutHandler() {
  this.send({payload: {sunEvent: this.event, offset: this.offset}});
  this.timeout = setTimeout(timeoutHandler.bind(this), calculateDelay.apply(this));
}

module.exports = function(RED) {
  function InjectNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.name = config.name;
    node.latitude = config.latitude;
    node.longitude = config.longitude;
    node.event = config.event;
    node.offset = config.offset || 0;
    node.timeout = setTimeout(timeoutHandler.bind(node), calculateDelay.apply(node));
    node.on('input', function(msg, send, done) {
      const offset = Math.round(-calculateDelay.apply(node) / 1000) - node.offset;
      msg.payload = {sunEvent: node.event, offset: offset};
      if (send) {
        send(msg);
      } else {
        node.send(msg);
      }
      if (done) {
        done();
      }
    });
    node.on('close', function() {
      clearTimeout(node.timeout);
    });
  }
  RED.nodes.registerType('sun-event-inject', InjectNode);

  RED.httpAdmin.post('/sun-event-inject/:id', RED.auth.needsPermission('inject.write'),
      function(req, res) {
        const node = RED.nodes.getNode(req.params.id);
        if (node != null) {
          try {
            node.receive();
            res.sendStatus(200);
          } catch (err) {
            res.sendStatus(500);
            node.error(RED._('inject.failed', {error: err.toString()}));
          }
        } else {
          res.sendStatus(404);
        }
      },
  );
};
