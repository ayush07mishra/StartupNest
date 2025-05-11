document.addEventListener('DOMContentLoaded', function () {
    function fetchDataAndUpdateChart() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('techChart').getContext('2d');

                if (window.techChart instanceof Chart) {
                    window.techChart.destroy();
                }

                window.techChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(data),
                        datasets: [{
                            label: 'Estimated Number of Users (in Millions)',
                            data: Object.values(data),
                            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#8e44ad', '#e74c3c', '#3498db', '#2ecc71', '#f39c12'],
                            borderColor: '#333',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return value + 'M'; // Show values in Millions
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Initial fetch
    fetchDataAndUpdateChart();
});
