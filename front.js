document.getElementById('playerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const score1 = 0;
    const score2 = 0;
    
    if (player1 && player2) {
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        localStorage.setItem('score1',score1);
        localStorage.setItem('score2',score2);
        window.location.href = 'play.html'; // Redirect to the game page
    }
});
