document.addEventListener('DOMContentLoaded', () => {
  const PLAYERS = ['one', 'two']

  const N = 4
  const N2 = N * N

  const grid = document.getElementById("grid")
  let player_id = 0
  let player = PLAYERS[player_id]
  // set proper width
  grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`

  function populate_grid() {
    for (let i = 0; i < N2; i++) {
      let cell = document.createElement('div')
      cell.className = 'cell'
      cell.addEventListener('click', (event) => clicked(event, i))
      grid.appendChild(cell)
    }
  }
  populate_grid()

  function reset() {
    for (let i = 0; i < grid.children.length; i++) {
      for (player of PLAYERS) {
        grid.children[i].classList.remove(player)
      }
    }
  }

  document.getElementById('reset').addEventListener('click', reset)

  // compute a list like [
  //  [0, 1, 2], [3, 4, 5], [6, 7, 8]
  //  [0, 3, 6], [1, 4, 7], [2, 5, 8]
  //  [0, 4, 8], [2, 4, 6]
  // ]
  // but in dimension N
  function compute_winning_combinations() {
    let winning_combinations = []
    for (let i = 0; i < N; i++) {
      let row = []
      let column = []
      for (let j = 0; j < N; j++) {
        row.push(i * N + j)
        column.push(j * N + i)
      }
      winning_combinations.push(row)
      winning_combinations.push(column)
    }
    let diagonal1 = []
    let diagonal2 = []
    for (let i = 0; i < N; i++) {
      diagonal1.push(i * (N + 1))
      diagonal2.push((i + 1) * (N - 1))
    }
    winning_combinations.push(diagonal1)
    winning_combinations.push(diagonal2)
    return winning_combinations
  }

  const winning_combinations = compute_winning_combinations()

  // returns a bool: true if the player has all the tiles in the combination
  // win being a N-size array of indexes
  // i.e. if he has not one of the tiles, return false
  // otherwise return true
  function owns_all(player, combination) {
    for (const i of combination) {
      if (!grid.children[i].classList.contains(player)) {
        return false
      }
    }
    return true
  }

  function detect_win(player) {
    for (const combination of winning_combinations) {
      if (owns_all(player, combination)) {
        console.log(`player ${player} has won`)
        document.getElementById('winner').textContent = `Player ${player} has won !`
        return true
      }
    }
    return false
  }

  // let color
  function clicked(event, index) {
    console.log(`clicked on tile # ${index}`)
    let element = event.target
    if ((element.classList.contains(PLAYERS[0])) ||
      (element.classList.contains(PLAYERS[1]))) {
      console.log("already played")
      return
    }
    element.classList.add(PLAYERS[player_id])
    if (detect_win(PLAYERS[player_id])) {
      reset()
    } else {
      player_id = (player_id + 1) % 2
      document.getElementById('winner').textContent = `Player ${PLAYERS[player_id]}`
    }
  }
})
