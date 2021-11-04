// Written by Itai Gu
Array.prototype.count = function(item = false) {
	if (!item) return this.length;
	let count = 0;
	for (let i = 0; i < this.length; i++)
		if (item == this[i]) count++
	return count;
}

function Huffman(string, codes) {
	let obj = {};
	Array.from(string).forEach(function(char, pos, self) {
		obj[char] = {
			count: self.count(char),
			code: codes[char],
			name: char
		}
	})
	return Object.values(obj);
}

function getSecretText(gibberishString, numbers, codes) {

	// Convert gibrish to codes.
	const tree = Huffman(gibberishString, codes);
  
	// Divide the quantity by 3.
	tree.map(item => item.count = item.count / 3);
  
	// Sort by the number from the quiz.
	let hiddenText = "";
	for (let i = 0; i < gibberishString.length / 3; i++) {
		tree.forEach(char => {
			if (numbers.startsWith(char.code) && char.count > 0)
			{
				hiddenText += char.name;
				numbers = numbers.substring(char.code.length);
				char.count--;
			}
		})
	}
  
	// Final text.
	console.log(hiddenText);
}


/* 
 I took the huffman codes from this site:
  # http://huffman.ooz.ie/?text=lo++olhottnisatnr+ioohtrsltoi+nh++arsat
  # http://huffman.ooz.ie/?text=ilos1s1m+vfpupemihyahlaal+mahaaearllmhnsmv+rhsf+gua5na+ptmiee++imphhi++sfor5feaaaa+5h+ngtamcaiippimvhr0gha0hil+raoeoteooahn+hh+cosm+mafneyyosfealr0ush1hcolmneehalhes
*/

// "rosh not tail"
getSecretText(
	"lo  olhottnisatnr ioohtrsltoi nh  arsat",
	"0101010111110010001101010010000111011111101",
	{
	  t: "00",
	  r: "010",
	  n: "0110",
	  s: "0111",
	  h: "1100",
	  l: "1101",
	  a: "1110",
	  i: "1111",
	  " ": "100",
	  o: "101"
	}
);

// "email happyroshhashanah510gmailcom i love huffman tree"
getSecretText(
	"ilos1s1m vfpupemihyahlaal mahaaearllmhnsmv rhsf gua5na ptmiee  imphhi  sfor5feaaaa 5h ngtamcaiippimvhr0gha0hil raoeoteooahn hh cosm mafneyyosfealr0ush1hcolmneehalhes",
	"1011111010001000101000011100110011100111111011110001000110110111000011011100110001000111010101101001101011010001110100010001011010110010111000001000000101001011111111011000011101001110111101111101001100000011111101111010111011",
	{
	  t: "1111110",
	  v: "1111111",
	  u: "101001",
	  r: "11110",
	  n: "11000",
	  p: "11001",
	  m: "1110",
	  f: "11011",
	  s: "0011",
	  h: "011",
	  l: "0101",
	  a: "100",
	  i: "0100",
	  " ": "000",
	  o: "0010",
	  e: "1011",
	  y: "111110",
	  g: "101000",
	  c: "101011",
	  "5": "101010",
	  "1": "110100",
	  "0": "110101"
	}
);
