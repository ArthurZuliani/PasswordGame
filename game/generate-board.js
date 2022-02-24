// Number to ordinal https://gist.github.com/jlbruno/1535691/db35b4f3af3dcbb42babc01541410f291a8e8fac

var convertNumberToOrdinal = (n) => {
  let res = "";
  if (n === 0) return (res = String(n));

  switch (n % 10) {
    case 1:
      if (n === 11) return (res = `${n}th`);
      res = `${n}st`;
      break;
    case 2:
      if (n === 12) return (res = `${n}th`);
      res = `${n}nd`;
      break;
    case 3:
      if (n === 13) return (res = `${n}th`);
      res = `${n}rd`;
      break;
    default:
      res = `${n}th`;
      break;
  }
  return res;
};

function start() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // poderia ser feito um for de 1 a 10 tbm
  let buttons_array = [1, 2, 3, 4]; // poderia ser feito um for de 1 a 4  tbm

  let board_el = document.getElementById("board");

  array.forEach((i) => {
    // criando a linha
    let row = document.createElement("div");
    row.className = "row";
    row.id = `row${i}`; // Atribuindo o id a linha

    let column1 = document.createElement("div");
    column1.className = "col-md-4"; // Criando a primeira coluna com a classe correta
    // Adding the buttons to the first columns in row i
    buttons_array.forEach((j) => {
      let id = `r${i}c${j}`;
      let button = document.createElement("button");
      button.className = "button";
      button.id = id;
      button.onclick = () => changeColor(id); // Very tricky
      column1.appendChild(button);
    });

    // Criando a segunda coluna com o texto das tentativas
    let column2 = document.createElement("div");
    column2.className = "col-md-1";
    let h1 = document.createElement("h1");
    let textNode = document.createTextNode(convertNumberToOrdinal(i));
    h1.appendChild(textNode);
    column2.appendChild(h1);
    // Criando a terceira coluna com as respostas
    let column3 = document.createElement("div");
    column3.className = "col-md-4";
    // Adding the answer
    buttons_array.forEach((j) => {
      let answer = document.createElement("div");
      answer.className = "answer";
      answer.id = `ar${i}c${j}`;
      column3.appendChild(answer);
    });
    // criando a quarta coluna e o botão de enviar a resposta
    let column4 = document.createElement("div");
    column4.className = "col-md-3";
    let button_submit = document.createElement("button");
    button_submit.className = "submit";
    button_submit.id = `buttonRow${i}`;
    button_submit.onclick = () => checkAnswer();
    button_submit.innerHTML = "Submit answer";
    column4.appendChild(button_submit);

    // Adicionando cada div criada (colunas) na div da linha
    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);

    // Adicionando a linha no board
    board_el.appendChild(row);
  });
}

start();
