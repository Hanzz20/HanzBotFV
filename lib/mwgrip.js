function generate(x, y, bombs, id) {
  let field = new Array(x);
  for(let i = 0; i < field.length; i++) {
    field[i] = new Array(y);
  }

  for(let i = 0; i < x; i++) {
    for(let j = 0; j < y; j++) {
      field[i][j] = 0;
    }
  }
  let x_bomb;
  let y_bomb;
  let bombs_arround = 0;
  let x_check = [-1, 0, 1, -1, 1, -1, 0, 1];
  let y_check = [-1, -1, -1, 0, 0, 1, 1, 1];
  let same = true;
  for(let bomb_count = 0; bomb_count < bombs; bomb_count++) {
    while(same) {
      x_bomb = Math.floor(Math.random() * x);
      y_bomb = Math.floor(Math.random() * y);
      same = false;
      field[x_bomb][y_bomb] = "x";
    }
    same = true;
  }
  for(let x_count = 0; x_count < x; x_count++) {
    for(let y_count = 0; y_count < y; y_count++) {
      if(field[x_count][y_count] != "x") {
        for(let i = 0; i < 8; i++) {
          if(x_count + x_check[i] >= 0 && x_count + x_check[i] < x) {
            if(y_count + y_check[i] >= 0 && y_count + y_check[i] < y) {
              if(field[x_count + x_check[i]][y_count + y_check[i]] == "x") {
                bombs_arround++;
              }
            }
          }
        }
        field[x_count][y_count] = bombs_arround;
        bombs_arround = 0;
      }
    }
  }
  return field;
}

function generate_empty(x, y) {
  let field = new Array(x);
  for(let i = 0; i < field.length; i++) {
    field[i] = new Array(y);
  }

  for(let i = 0; i < x; i++) {
    for(let j = 0; j < y; j++) {
      field[i][j] = "e";
    }
  }
  return field;
}

function translate(value) {
  return {
    0: "🆓",
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    x: "💣",
    e: "⏹",
    f: "#️⃣"
  }[value]
}

function generate_string(map) {
  let mine = map;
  let width = map.length;
  let height = map[0].length;
  let out = "";
  let message = "";
  for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
      out = out + translate(mine[i][j]);
    }
    message = message + out + "\n";
    out = "";
  }
  return message
}

function detect_zero(map, x, y) {
  let old_length = 0;
  x--;
  y--;
  let width = map.length;
  let height = map[0].length;
  let zero = [[x, y]];
  let coordinate = new Array(2);
  coordinate[0] = 0;
  coordinate[1] = 0;
  let x_check = [-1, 0, 1, -1, 1, -1, 0, 1];
  let y_check = [-1, -1, -1, 0, 0, 1, 1, 1];
  while(old_length != zero.length) {
    old_length = zero.length;
    for(let l = 0; l < old_length; l++) {
      for(let i = 0; i < 8; i++) {
        if(zero[l][0] + x_check[i] >= 0 && zero[l][0] + x_check[i] < width) {
          if(zero[l][1] + y_check[i] >= 0 && zero[l][1] + y_check[i] < height) {
            if(map[zero[l][0] + x_check[i]][zero[l][1] + y_check[i]] === 0) {
              coordinate[0] = zero[l][0]+x_check[i];
              coordinate[1] = zero[l][1]+y_check[i];
              let copy = [...coordinate];
              if(!search(zero, copy)) {
                zero.push(copy);
              }
            }
          }
        }
      }
    }
  }
  old_length = 0;
  while(old_length != zero.length) {
    old_length = zero.length;
    for(let l = 0; l < old_length; l++) {
      if(map[zero[l][0]][zero[l][1]] === 0) {
        for(let i = 0; i < 8; i++) {
          if(zero[l][0] + x_check[i] >= 0 && zero[l][0] + x_check[i] < width) {
            if(zero[l][1] + y_check[i] >= 0 && zero[l][1] + y_check[i] < height) {
              coordinate[0] = zero[l][0]+x_check[i];
              coordinate[1] = zero[l][1]+y_check[i];
              let copy = [...coordinate];
              if(!search(zero, copy)) {
                zero.push(copy);
              }
            }
          }
        }
      }
    }
  }
  return zero;
}

function search(arr1, arr2) {
  let result = false;
  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i][0] === arr2[0] && arr1[i][1] === arr2[1]) {
      result = true;
      break;
    } else{
      result = false;
    }
  }
  return result;
}


export default {
  generate,
  translate,
  generate_string,
  generate_empty,
  detect_zero
};
