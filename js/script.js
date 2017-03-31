var tableHolder = document.getElementById('table'),
  currentCell = [0, 0],
  endCell = [];

var grid = createGrid(20);

function createGrid(rows) {
  var gridView = document.createElement('table'),
    arr = [];
  tableHolder.appendChild(gridView);

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
    gridView.insertRow(i);

    for (var j = 0; j < rows; j++) {
      gridView.firstChild.childNodes[i].insertCell(j);
      arr[i][j] = Math.round(Math.random());

      if (arr[i][j] == 0) {
        tableHolder.firstChild.firstChild.childNodes[i].childNodes[j].classList.remove('was-live');
        tableHolder.firstChild.firstChild.childNodes[i].childNodes[j].classList.add('live');
      } else {
        tableHolder.firstChild.firstChild.childNodes[i].childNodes[j].classList.remove('live');
        tableHolder.firstChild.firstChild.childNodes[i].childNodes[j].classList.add('was-live');
      }
    }

    // Set grid[0][0] as white cell.
    tableHolder.firstChild.firstChild.childNodes[0].childNodes[0].classList.remove('was-live');
    tableHolder.firstChild.firstChild.childNodes[0].childNodes[0].classList.add('live');
  }

  tableHolder.firstChild.firstChild.childNodes[0].childNodes[0].classList.add('current');
  return arr;
}

function search() {
  var graph = new Graph(grid, { diagonal: true }),
    start = graph.grid[ currentCell[0] ][ currentCell[1] ],
    end = graph.grid[ endCell[0] ][ endCell[1] ];
  // console.log({start, end});
  var result = astar.search(graph, start, end);
  // console.log(result);

  for (var i = 1; i <= result.length; i++) {
    let currentNode = result[i-1];
    // console.log({currentNode});
    tableHolder.firstChild.firstChild.childNodes[currentNode.x].childNodes[currentNode.y].classList.add('current');

    if (i !== result.length) {
      let nextNode = result[i];
      // console.log({nextNode});
      tableHolder.firstChild.firstChild.childNodes[nextNode.x].childNodes[nextNode.y].classList.remove('current');
    }
  }

  tableHolder.firstChild.firstChild.childNodes[currentCell[0]].childNodes[currentCell[1]].classList.remove('current');
  currentCell = [result[result.length - 1].x, result[result.length - 1].y];
  tableHolder.firstChild.firstChild.childNodes[currentCell[0]].childNodes[currentCell[1]].classList.add('current');

  setTimeout(animate(result), 500);
}

function animate(result) {
  for (var j = 0; j < result.length - 1; j++) {
    let removeNode = result[j];
    setTimeout(function() {
      tableHolder.firstChild.firstChild.childNodes[removeNode.x].childNodes[removeNode.y].classList.remove('current');
    }, 1500);
  }
}

tableHolder.addEventListener('click', function(e) {
  e.target.classList.add('current');
  endCell = [];
  endCell.push(e.path[1].rowIndex);
  endCell.push(e.target.cellIndex);

  search();
});
