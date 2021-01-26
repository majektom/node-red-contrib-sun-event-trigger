const helper = require('node-red-node-test-helper');
const sunEventInject = require('./inject.js');

helper.init(require.resolve('node-red'));

describe('sun-event-inject Node', function() {
  beforeEach(function(done) {
    helper.startServer(done);
  });

  afterEach(function(done) {
    helper.unload();
    helper.stopServer(done);
  });

  it('should be loaded', function() {
    return new Promise(function(resolve, reject) {
      const nameValue = 'Name';
      const latitudeValue = '45.234754';
      const longitudeValue = '17.456278';
      const eventValue = 'sunsetStart';
      const offsetValue = '-600';
      const flow = [
        {
          id: 'sun-event-inject1',
          type: 'sun-event-inject',
          name: nameValue,
          latitude: latitudeValue,
          longitude: longitudeValue,
          event: eventValue,
          offset: offsetValue,
        },
      ];
      helper
          .load([sunEventInject], flow, function() {
            const sunEventInjectNode = helper.getNode('sun-event-inject1');
            sunEventInjectNode.should.have.property('name', nameValue);
            sunEventInjectNode.should.have.property('latitude', latitudeValue);
            sunEventInjectNode.should.have.property('longitude', longitudeValue);
            sunEventInjectNode.should.have.property('event', eventValue);
            sunEventInjectNode.should.have.property('offset', offsetValue);
            sunEventInjectNode.should.have.property('injectEventTimesAfterStartup', false);
          })
          .then(
              function() {
                resolve();
              },
              function(reason) {
                reject(reason);
              },
          );
    });
  });

  it('should inject message after startup', function() {
    return new Promise(function(resolve, reject) {
      const nameValue = 'Name';
      const latitudeValue = '45.234754';
      const longitudeValue = '17.456278';
      const eventValue = 'sunsetStart';
      const offsetValue = '-600';
      const flow = [
        {
          id: 'sun-event-inject1',
          type: 'sun-event-inject',
          name: nameValue,
          latitude: latitudeValue,
          longitude: longitudeValue,
          event: eventValue,
          offset: offsetValue,
          injectEventTimesAfterStartup: true,
          wires: [['helper1']],
        },
        {id: 'helper1', type: 'helper'},
      ];
      helper
          .load([sunEventInject], flow, function() {
            const helperNode1 = helper.getNode('helper1');
            helperNode1.on('input', function(msg) {
              msg.should.have.property('payload');
              msg.payload.should.have.property('sunrise');
              msg.payload.should.have.property('sunriseEnd');
              msg.payload.should.have.property('goldenHourEnd');
              msg.payload.should.have.property('solarNoon');
              msg.payload.should.have.property('goldenHour');
              msg.payload.should.have.property('sunsetStart');
              msg.payload.should.have.property('sunset');
              msg.payload.should.have.property('dusk');
              msg.payload.should.have.property('nauticalDusk');
              msg.payload.should.have.property('nadir');
              msg.payload.should.have.property('nightEnd');
              msg.payload.should.have.property('nauticalDawn');
              msg.payload.should.have.property('dawn');
              resolve();
            });
          })
          .catch(
              function(reason) {
                reject(reason);
              },
          );
    });
  });
});
