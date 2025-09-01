// Función para muestrear X dado Y usando la fórmula invertida
function sampleXgivenY(y, u) {
  // Fórmula sacada de la CDF invertida que viste en clase
  // x = -3y - 2 + sqrt(9y^2 + 12y + 4 + 32u + 24uy) / 2
  return (-3 * y - 2 + Math.sqrt(9 * y * y + 12 * y + 4 + 32 * u + 24 * u * y)) / 2;
}

// Función para muestrear Y dado X usando la otra CDF invertida
function sampleYgivenX(x, v) {
  // Fórmula de tus apuntes
  // y = -2x - 2 + sqrt(x^2 + 2x + 1 + 6vx + 15v) / 3
  return (-2 * x - 2 + Math.sqrt(x * x + 2 * x + 1 + 6 * v * x + 15 * v)) / 3;
}

// Gibbs sampler
function runGibbs() {
  let n = parseInt(document.getElementById("samples").value);
  let x = 1, y = 1;  // punto inicial
  let muestrasX = [], muestrasY = [];

  for (let i = 0; i < n; i++) {
    let u = Math.random();  // uniforme(0,1)
    x = sampleXgivenY(y, u);

    let v = Math.random();  // uniforme(0,1)
    y = sampleYgivenX(x, v);

    muestrasX.push(x);
    muestrasY.push(y);
  }

  // Mostrar primeras 10
  document.getElementById("output").innerText =
    muestrasX.map((xi, i) => `(${xi.toFixed(3)}, ${muestrasY[i].toFixed(3)})`).slice(0, 10).join("\n");

  // Graficar dispersión
  let ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Muestras Gibbs',
        data: muestrasX.map((xi, i) => ({x: xi, y: muestrasY[i]}))
      }]
    },
    options: { scales: { x: { min:0, max:2 }, y: { min:0, max:2 } } }
  });
}
