const make2dArray = (columns, rows) => {
  const newArray = new Array(columns);
  for(var x = 0; x < columns; x++) {
    newArray[x] = new Array(rows);
  }

  return newArray;
};