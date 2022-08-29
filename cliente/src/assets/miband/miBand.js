const MiBand = require('miband');

var device, server, miband;

class miBand {
  constructor() {
    this.fechasPulsaciones = [];
  }

  async conectarPulsera(){ 
    device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [ MiBand.advertisementService ] }
        ],
        optionalServices: MiBand.optionalServices
      });
      
    server = await device.gatt.connect();
    console.log('Pulsera conectada');
    
    miband = new MiBand(server);
    await miband.init();
    
    // console.log('Notifications demo...');
    // await miband.showNotification('message');
    miband.on('heart_rate', (rate) => {
      console.log('Heart Rate:', rate)
    })
    await miband.hrmStart();
}

  desconectarPulsera() {
    try {
        this.fechasPulsaciones.hrmStop();
    } catch (e) {
      }
  }

}

pulseraMiband = new miBand();

