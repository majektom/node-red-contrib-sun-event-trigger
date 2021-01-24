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
});
