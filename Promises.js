const refTime = Date.now();

function eventOne() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventOne",
        eventType: "aviso largo",
        scheduledTime: refTime + 500,
        realTime: Date.now(),
      });
    }, 500);
  });
}

function eventTwo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventTwo",
        eventType: "aviso largo",
        scheduledTime: refTime + 530,
        realTime: Date.now(),
      });
    }, 530);
  });
}

function eventThree() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventThree",
        eventType: "aviso largo",
        scheduledTime: refTime + 700,
        realTime: Date.now(),
      });
    }, 700);
  });
}

function eventFour() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventFour",
        eventType: "aviso corto",
        scheduledTime: refTime + 1000,
        realTime: Date.now(),
      });
    }, 1000);
  });
}

function eventFive() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventFive",
        eventType: "aviso corto",
        scheduledTime: refTime + 850,
        realTime: Date.now(),
      });
    }, 850);
  });
}

function eventSix() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventSix",
        eventType: "aviso corto",
        scheduledTime: refTime + 1200,
        realTime: Date.now(),
      });
    }, 1200);
  });
}

function eventSeven() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventSeven",
        eventType: "aviso largo",
        scheduledTime: refTime + 600,
        realTime: Date.now(),
      });
    }, 600);
  });
}

function eventEight() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eventName: "eventEight",
        eventType: "aviso corto",
        scheduledTime: refTime + 150,
        realTime: Date.now(),
      });
    }, 150);
  });
}

//Promesas encadenadas: cada una dispara la sisguiente espera

const register = [];

eventOne()
  .then((e1) => {
    register.push(e1);
    return eventTwo();
  })
  .then((e2) => {
    register.push(e2);
    return eventThree();
  })
  .then((e3) => {
    register.push(e3);
    return eventFour();
  })
  .then((e4) => {
    register.push(e4);
    return eventFive();
  })
  .then((e5) => {
    register.push(e5);
    return eventSix();
  })
  .then((e6) => {
    register.push(e6);
    return eventSeven();
  })
  .then((e7) => {
    register.push(e7);
    return eventEight();
  })
  .then((e8) => {
    register.push(e8);

    console.log("\n --- Bitacora final ---");
    console.log(register);

    // Latencia promedio con reduce
    const totalLatency = register.reduce((accum, current) => {
      return accum + (current.realTime - current.scheduledTime);
    }, 0);
    const averageLatency = totalLatency / register.length;
    console.log(`\nLatencia promedio: ${averageLatency} ms`);

    // Eventos con desvío mayor a 100ms mediante filter y map
    const deviatedEventIds = register
      .filter((event) => event.realTime - event.scheduledTime > 100)
      .map((event) => event.eventName);
    console.log(`\n--- Eventos con desvio mayor a 100 ms ---`);
    console.log(deviatedEventIds);

    // Primer evento que llegó fuera de orden con find
    let maxScheduledSoFar = -Infinity;
    const outOfOrderEvent = register.find((event) => {
      if (event.scheduledTime < maxScheduledSoFar) {
        return true;
      }
      maxScheduledSoFar = Math.max(maxScheduledSoFar, event.scheduledTime);
      return false;
    });
    console.log(`\n--- Primer evento que llegó fuera de orden ---`);
    console.log(outOfOrderEvent);
  })
  .catch((error) => {
    console.error("Error durante la ejecución de promesas:", error);
  });