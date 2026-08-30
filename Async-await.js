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

async function runEvents() {
  const register = [];

  try {
    register.push(await eventOne());
    register.push(await eventTwo());
    register.push(await eventThree());
    register.push(await eventFour());
    register.push(await eventFive());
    register.push(await eventSix());
    register.push(await eventSeven());
    register.push(await eventEight());

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

  } catch (error) {
    console.error("Error durante la ejecución de los eventos:", error);
  }
}

runEvents();