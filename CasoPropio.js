const refTime = Date.now();
const register = [];

const paso1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      eventName: "Paso 1: Validar Requisitos",
      eventType: "Macrotarea (100ms)",
      scheduledTime: refTime + 100,
      realTime: Date.now(),
    });
  }, 100);
});

const paso2 = Promise.resolve().then(() => ({
  eventName: "Paso 2: Procesar Metadatos",
  eventType: "Microtarea (0ms)",
  scheduledTime: refTime + 0,
  realTime: Date.now(),
}));

const paso3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      eventName: "Paso 3: Compilar Recursos",
      eventType: "Macrotarea (0ms)",
      scheduledTime: refTime + 0,
      realTime: Date.now(),
    });
  }, 0);
});

const paso4 = Promise.resolve().then(() => ({
  eventName: "Paso 4: Generar Firma Digital",
  eventType: "Microtarea (0ms)",
  scheduledTime: refTime + 0,
  realTime: Date.now(),
}));

const paso5 = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      eventName: "Paso 5: Finalizar Pipeline",
      eventType: "Macrotarea (50ms)",
      scheduledTime: refTime + 50,
      realTime: Date.now(),
    });
  }, 50);
});


async function runCasoLimite() {
  //console.log("--- Inicio del Pipeline de Tareas Numeradas ---");

  // Se registran en el arreglo en el orden exacto en que el Event Loop las resuelve
  await Promise.all([
    paso1.then((e) => register.push(e)),
    paso2.then((e) => register.push(e)),
    paso3.then((e) => register.push(e)),
    paso4.then((e) => register.push(e)),
    paso5.then((e) => register.push(e)),
  ]);

  console.log("\n--- Bitácora Final del Caso Límite ---");
  console.log(register);

  processResults(register);
}

function processResults(register) {
  // Latencia promedio con reduce
  const totalLatency = register.reduce((accum, current) => {
    return accum + (current.realTime - current.scheduledTime);
  }, 0);
  const averageLatency = totalLatency / register.length;
  console.log(`\nLatencia promedio: ${averageLatency.toFixed(2)} ms`);

  // Tareas con desvío mayor a 10ms mediante filter y map
  const deviatedEventIds = register
    .filter((event) => event.realTime - event.scheduledTime > 10)
    .map((event) => event.eventName);
  console.log("\nEventos con desvio mayor a 10 ms:", deviatedEventIds);

  // Primer evento fuera de orden secuencial con find
  let maxScheduledSoFar = -Infinity;
  const outOfOrderEvent = register.find((event) => {
    if (event.scheduledTime < maxScheduledSoFar) {
      return true;
    }
    maxScheduledSoFar = Math.max(maxScheduledSoFar, event.scheduledTime);
    return false;
  });
  console.log("\nPrimer evento fuera de orden:", outOfOrderEvent);
}

runCasoLimite();