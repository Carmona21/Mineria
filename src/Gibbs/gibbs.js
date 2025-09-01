function runGibbs() {
  let n = parseInt(document.getElementById("samples").value);
  let data = [];
  for (let i = 0; i < n; i++) {
    data.push(Math.random()); // por ahora uniforme
  }
  plotResults(data);
}

function plotResults(data) {
  let ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        label: 'Muestras',
        data: data,
      }]
    },
    options: { scales: { x: { display: false } } }
  });
}
