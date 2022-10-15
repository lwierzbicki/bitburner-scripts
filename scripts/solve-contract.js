/** @param {NS} ns **/
export async function main(ns) {
	solveContract(ns, ns.args[0], ns.args[1], 0);
}

// function to solve contracts 
export function solveContract(ns, host, filename, logLevel=0) {
	var type = ns.codingcontract.getContractType(filename, host);
	var desc = ns.codingcontract.getDescription(filename, host);
	var data = ns.codingcontract.getData(filename, host);
	ns.tprint(host + " " + filename);
	ns.tprint(type);
	if (logLevel >= 1) {
		ns.tprint(desc);
		ns.tprint(data);
	}
	var answer;
	switch (type) {
		case "Minimum Path Sum in a Triangle":
			answer = minPathSumInTriangle(ns, data);
			break;
		case "Find Largest Prime Factor":
			answer = largestPrimeFactor(ns, data);
			break;
		case "Unique Paths in a Grid I":
			answer = uniquePathInGrid1(ns, data);
			break;
		case "Unique Paths in a Grid II":
			answer = uniquePathInGrid2(ns, data);
			break;
		case "Spiralize Matrix":
			answer = spiralizeMatrix(ns, data);
			break;
		case "Total Ways to Sum":
			answer = totalWayToSum(ns, data);
			break;
		case "Algorithmic Stock Trader I":
			answer = algorithmicStockTrader1(ns, data);
			break;
		case "Algorithmic Stock Trader II":
			answer = algorithmicStockTrader2(ns, data);
			break;
		case "Algorithmic Stock Trader III":
			answer = algorithmicStockTrader3(ns, data);
			break;
		case "Algorithmic Stock Trader IV":
			answer = algorithmicStockTrader4(ns, data);
			break;
		case "Array Jumping Game":
			answer = arrayJumpingGame(ns, data);
			break;
		case "Subarray with Maximum Sum":
			answer = subarrayWithMaxSum(ns, data);
			break;
		case "Generate IP Addresses":
			answer = generateIpAddresses(ns, data);
			break;
		case "Merge Overlapping Intervals":
			answer = mergeOverlappingIntervals(ns, data);
			break;
		case "Find All Valid Math Expressions":
			answer = findAllValidMathExpr(ns, data);
			break;
		case "Sanitize Parentheses in Expression":
			answer = sanitizeParentheses(ns, data);
			break;
		case "Proper 2-Coloring of a Graph":
			answer = coloringGraph(ns,data);
			break;
		case "Encryption I: Caesar Cipher":
			answer = caesarOne(ns,data);
			break;
		case "Encryption II: Vigenère Cipher":
			answer = vigenere(ns,data);
			break;
		case "Compression I: RLE Compression":
			answer = rleOne(ns,data);
			break;
		case "Compression II: LZ Decompression":
			answer = lzTwo(ns,data);
			break;
		case "Compression III: LZ Compression":
			answer = lzThree(ns,data);
			break;
		case "HammingCodes: Encoded Binary to Integer":
			answer = hammingCodes(ns,data);
			break;
		case "HammingCodes: Integer to Encoded Binary":
			answer = hammingEncode(ns,data);
			break;
		case "Array Jumping Game II":
			answer = arrayJump(ns,data);
			break;
		case "Shortest Path in a Grid":
			answer = shortestPath(ns,data);
			break;
		case "Total Ways to Sum II":
			answer = totalWays(ns,data);
			break;
		default:
			ns.tprint("unknown type: " + type);
			return;
	}
	if (answer && !(answer instanceof String) && Object.keys(answer).length > 20) {
		//ns.tprint("answer size too large to print: "+Object.keys(answer).length);
	} else {
		//ns.tprint(answer);
	}
	var opts = {};
	opts.returnReward = true;
	var reward = ns.codingcontract.attempt(answer, filename, host, opts);
	if (reward) {
		ns.tprint(reward);
	} else {
		ns.tprint("failed!");
	}
}

/** @param {NS} ns **/
function totalWays(ns,data){
	const n = data[0];
      const s = data[1];
      const ways = [1];
      ways.length = n + 1;
      ways.fill(0, 1);
      for (let i = 0; i < s.length; i++) {
        for (let j = s[i]; j <= n; j++) {
          ways[j] += ways[j - s[i]];
        }
      }
      return ways[n];
}

function shortestPath(ns,array) {
	const dist = array.map(arr => new Array(arr.length).fill(Infinity));
	const prev = array.map(arr => new Array(arr.length).fill(undefined));
	const path = array.map(arr => new Array(arr.length).fill(undefined));
	const queue = [];
	array.forEach((arr, i) => arr.forEach((a, j) => {
		if (a === 0) queue.push([i, j]);
	}));

	dist[0][0] = 0;
	const height = array.length;
	const length = array[height - 1].length;
	const target = [height - 1, length - 1];
	while (queue.length > 0) {
		let u;
		let d = Infinity;
		let idx;
		queue.forEach(([i, j], k) => {
			if (dist[i][j] < d) {
				u = [i, j];
				d = dist[i][j];
				idx = k;
			}
		});
		if (JSON.stringify(u) === JSON.stringify(target)) {
			let str = '';
			let [a, b] = target;
			if (prev[a][b] || (a === 0 && b === 0)) {
				while (prev[a][b]) {
					str = path[a][b] + str;
					[a, b] = prev[a][b];
				}
			}
			return str;
		}
		queue.splice(idx, 1);
		if (u === undefined) continue;
		const [a, b] = u;
		for (const [s, i, j] of [['D', a + 1, b], ['U', a - 1, b], ['R', a, b + 1], ['L', a, b - 1]]) {
			if (i < 0 || i >= height || j < 0 || j >= length) continue; // Index over edge
			if (array[i][j] === 1) continue; // We've hit a wall;
			if (!queue.some(([k, l]) => k === i && l === j)) continue; // Vertex not in queue
			const alt = dist[a][b] + 1;
			if (alt < dist[i][j]) {
				dist[i][j] = alt;
				prev[i][j] = u;
				path[i][j] = s;
			}
		}
	}
	return '';
}

function rleOne(ns,data){
	const encoding = [];
	let count, previous, i;
	for (count = 1, previous = data[0], i = 1; i < data.length; i++) {
		if (data[i] !== previous || count === 9) {
			encoding.push(count, previous);
			count = 1;
			previous = data[i];
		} else count++;
	}
	encoding.push(count, previous);
	return encoding.join('');
}

function arrayJump(ns,data){
	  const n = data.length;
    let reach = 0;
      let jumps = 0;
      let lastJump = -1;
      while (reach < n - 1) {
        let jumpedFrom = -1;
        for (let i = reach; i > lastJump; i--) {
          if (i + data[i] > reach) {
            reach = i + data[i];
            jumpedFrom = i;
          }
        }
        if (jumpedFrom === -1) {
          jumps = 0;
          break;
        }
        lastJump = jumpedFrom;
        jumps++;
      }
      return jumps;
}

function hammingEncode(ns,n) {
	const array = Array.from(n.toString(2));
	const encodedArray = [];
	let i = 0;
	while (array.length > 0) {
		if ((i & (i - 1)) !== 0) encodedArray[i] = array.shift();
		i++;
	}
	const p = Math.ceil(Math.log2(encodedArray.length));
	for (i = 0; i < p; i++) encodedArray[2 ** i] = (encodedArray.filter((b, k) => b === '1' &&
		(k.toString(2).padStart(p, '0'))[p - i - 1] === '1').length % 2).toString();
	encodedArray[0] = (encodedArray.filter(b => b === '1').length % 2).toString();
	return encodedArray.join('');
}

function hammingCodes(ns,data){
	return HammingDecode(data);
}

function lzThree(ns,data){
	return comprLZEncode(data);
}

function lzTwo(ns,data){
	return comprLZDecode(data);
}

function caesarOne(ns,data){
    // data = [plaintext, shift value]
    // build char array, shifting via map and join to final results
    const cipher = [...data[0]]
      .map((a) => (a === " " ? a : String.fromCharCode(((a.charCodeAt(0) - 65 - data[1] + 26) % 26) + 65)))
      .join("");
    return cipher;
}

function vigenere(ns,data){
      // data = [plaintext, keyword]
      // build char array, shifting via map and corresponding keyword letter and join to final results
      const cipher = [...data[0]]
        .map((a, i) => {
          return a === " "
            ? a
            : String.fromCharCode(((a.charCodeAt(0) - 2 * 65 + data[1].charCodeAt(i % data[1].length)) % 26) + 65);
        })
        .join("");
      return cipher;
}

function coloringGraph(ns, data){
	// Set up array to hold colors
	const coloring = Array(data[0]).fill(undefined);
	// Keep looping on undefined vertices if graph is disconnected
	while (coloring.some(e => e === undefined)) {
		// Color a vertex in the graph
		const initialVertex = coloring.findIndex(e => e === undefined);
		coloring[initialVertex] = 0;
		const frontier = [initialVertex];
		// Propagate the coloring throughout the component containing v greedily
		while (frontier.length > 0) {
			const v = frontier.pop();
			for (const u of neighbourhood(data, v)) {
				if (coloring[u] === undefined) {
					coloring[u] = coloring[v] ^ 1; // Set the color of u to the opposite of the color of v
					frontier.push(u); // Check u next
				}
				// Assert that u and v do not have the same color if they are already colored
				else if (coloring[u] === coloring[v]) return '[]';
			}
		}
	}
	return coloring;
}

function neighbourhood(data, vertex) {
	const adjLeft = data[1].filter(([a, _]) => a === vertex).map(([_, b]) => b);
	const adjRight = data[1].filter(([_, b]) => b === vertex).map(([a, _]) => a);
	return adjLeft.concat(adjRight);
}

function sanitizeParentheses(ns, data) {
	var context = {"maxLeftLength":0}
	var exprs = findSanitized(ns, data, 0, context);
	exprs = exprs.filter(e=>e.length>=context["maxLeftLength"]).sort();
	for (var i=0;i<exprs.length-1;i++) {
		while (exprs[i]==exprs[i+1]) {
			exprs.splice(i+1, 1);
		}
	}
	return exprs;
}

function findSanitized(ns, s, pos, context) {
	// ns.tprint(s, " ", pos, " ", context["maxLeftLength"], " ", validateParentheses(s));
	if (s.length < context["maxLeftLength"]) {
		return [];
	}

	if (pos == s.length) {
		if (validateParentheses(s)) {
			if (s.length > context["maxLeftLength"]) {
				context["maxLeftLength"] = s.length;
			}
			return [s];
		} else {
			return [];
		}
	}

	var results = [];
	var c = s[pos];
	if (c == "(" || c == ")") {
		results = results.concat(
			findSanitized(ns, s, pos+1, context),
			findSanitized(ns, s.slice(0, pos)+s.slice(pos+1), pos, context)
		);
	} else {
		results = results.concat(
			findSanitized(ns, s, pos+1, context)
		);
	}
	return results;
}

function validateParentheses(s) {
	var n = 0;
	for (var i=0;i<s.length;i++) {
		if (s[i] == "(") {
			n++;
		}
		if (s[i] == ")") {
			n--;
		}
		if (n<0) {
			return false;
		}
	}
	return n == 0;
}

/** @param {NS} ns **/
function findAllValidMathExpr(ns, data) {
	var s = data[0];
	var n = data[1];
	return findExpr(s, n, "");
}

function findExpr(s, n, expr) {	
	if (s.length == 0) {
		if (eval(expr) == n) {
			return [expr]
		} else {
			return []
		}
	}

	var results = [];
	if (s.startsWith("0")) {
		var sliced = s.slice(1);
		if (expr.length == 0) {
			return findExpr(sliced, n, expr+"0");
		}
		results = results.concat(
			findExpr(sliced, n, expr+"+0"),
			findExpr(sliced, n, expr+"-0"),
			findExpr(sliced, n, expr+"*0"),
		);
		return results;
	}

	var maxLength = s.length;
	var ops = [];
	if (expr.length == 0) {
		ops = ["", "-"];
	} else {
		ops = ["-", "+", "*"];
	}
	for (var op of ops) {
		for (var i=1;i<=maxLength;i++) {
			results = results.concat(
				findExpr(s.slice(i), n, expr+op+s.slice(0, i))
			);
		}
	}
	return results;
}

/** @param {NS} ns **/
function mergeOverlappingIntervals(ns, data) {
	var intervals = data.slice();
	for (var i=0; i<intervals.length;i++) {
		for (var j=i+1;j<intervals.length;) {
			var merged = mergeInterval(intervals[i], intervals[j]);
			if (merged !== null) {
				intervals[i] = merged;
				intervals.splice(j, 1);
				j=i+1;
			} else {
				j++
			}
		}
	}
	intervals.sort((a,b)=>a[0]-b[0]);
	return intervals;
}

function mergeInterval(a, b) {
	if (a[1] < b[0] || a[0] > b[1]) {
		return null;
	}
	return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

/** @param {NS} ns **/
function generateIpAddresses(ns, data) {
      const ret = [];
      for (let a = 1; a <= 3; ++a) {
        for (let b = 1; b <= 3; ++b) {
          for (let c = 1; c <= 3; ++c) {
            for (let d = 1; d <= 3; ++d) {
              if (a + b + c + d === data.length) {
                const A = parseInt(data.substring(0, a), 10);
                const B = parseInt(data.substring(a, a + b), 10);
                const C = parseInt(data.substring(a + b, a + b + c), 10);
                const D = parseInt(data.substring(a + b + c, a + b + c + d), 10);
                if (A <= 255 && B <= 255 && C <= 255 && D <= 255) {
                  const ip = [A.toString(), ".", B.toString(), ".", C.toString(), ".", D.toString()].join("");
                  if (ip.length === data.length + 3) {
                    ret.push(ip);
                  }
                }
              }
            }
          }
        }
      }

      return ret.toString();
}

/** @param {NS} ns **/
function uniquePathInGrid2(ns, data) {
	var maxY=data.length;
	var maxX=data[0].length;
	var c = Array(maxY);
	for (var y=0;y<maxY;y++) {
		var row = data[y];
		c[y]=Array(maxX);
		for (var x=0;x<row.length;x++ ) {
			var s=0;
			if (row[x] == 0) {
				if (x==0 && y==0) {
					s=1;
				}
				if (y>0) {
					s+=c[y-1][x];
				}
				if (x>0) {
					s+=c[y][x-1];
				}
			}
			c[y][x] = s;
		}
	}
	return c[maxY-1][maxX-1];
}

function countPathInGrid(data, x, y) {
	var obstacle = data[y][x];
	if (obstacle == 1) {
		return 0;
	}
	if (x == data[y].length - 1 && y == data.length) {
		return 1;
	}
	var count = 0;
	if (x < data[y].length - 1) {
		count += countPathInGrid(data, x+1, y);
	}
	if (y < data.length - 1) {
		count += countPathInGrid(data, x, y+1);
	}
}

/** @param {NS} ns **/
function subarrayWithMaxSum(ns, data) {
	return findMaxSubArraySum(data);
}

function findMaxSubArraySum(arr) {
	if (arr.length == 0) {
		return 0;
	}
	if (arr.length == 1) {
		return arr[0];
	}
	var sum = findMaxSubArraySum(arr.slice(1));
	var s = 0;
	for (var i = 0; i < arr.length; i++) {
		s += arr[i];
		if (s > sum) {
			sum = s;
		}
	}
	return sum;
}

/** @param {NS} ns **/
function arrayJumpingGame(ns, data) {
	return findJump(data, 0);
}

function findJump(data, pos) {
	var maxJump = data[pos];
	if (pos + maxJump >= data.length - 1) {
		return 1;
	}
	for (var i=1;i<=maxJump;i++) {
		if (findJump(data, pos + i) == 1) {
			return 1;
		}
	}
	return 0;
} 
/** @param {NS} ns **/
function algorithmicStockTrader1(ns, data) {
	if (data.length == 0) {
		return 0;
	}
	var chances = findProfitChances(data);
	var mergedChances = mergeChances(chances);
	var profit = Math.max(...(mergedChances.map(cs=>Math.max(...(cs.map(c=>c[1]-c[0]))))));
	return profit;
}

/** @param {NS} ns **/
function algorithmicStockTrader2(ns, data) {
	if (data.length == 0) {
		return 0;
	}
	var chances = findProfitChances(data);
	var profit = chances.map(c=>c[1]-c[0]).reduce((a,b)=>a+b,0);
	return profit;
}

/** @param {NS} ns **/
function algorithmicStockTrader3(ns, data) {
	if (data.length == 0) {
		return 0;
	}
	var chances = findProfitChances(data);
	// var mergedChances = mergeChances(chances);
	// var mp = mergedChances.map(cs=>cs.map(c=>c[1]-c[0]));
	return maxProfit(chances, 2);
}

/** @param {NS} ns **/
function algorithmicStockTrader4(ns, data) {
	if (data[1].length == 0) {
		return 0;
	}
	var chances = findProfitChances(data[1]);
	// var mergedChances = mergeChances(chances);
	// var mp = mergedChances.map(cs=>cs.map(c=>c[1]-c[0]));
	return maxProfit(chances, data[0]);
}

function maxProfit(chances, k) {
	if (k == 0 || chances.length == 0) {
		return 0;
	}
	var c0 = chances[0];
	if (chances.length == 1) {
		return c0[1] - c0[0];
	}
	var profit = maxProfit(chances.slice(1), k);
	for (var i = 0; i < chances.length; i++) {
		var p = chances[i][1] - chances[0][0] + maxProfit(chances.slice(i+1), k - 1);
		if (p > profit) {
			profit = p;
		}
	}
	return profit;
}

function findProfitChances(data) {
	var start = data[0];
	var end = start;
	var chances = [];
	for (var i = 1; i < data.length; i++) {
		var now = data[i];
		if (end < now) {
			end = now;
		}
		if (end > now) {
			if (end > start) {
				chances.push([start, end]);
			}
			start = now;
			end = start;
		}
	}
	if (end > start) {
		chances.push([start, end]);
	}
	return chances;
}

function mergeChances(chances) {
	var n = chances.length;
	var mc = [];
	var cs = chances.slice();
	mc.push(cs);
	while (cs.length > 1) {
		var ncs = [];
		for (var i = 0; i < cs.length - 1; i++) {
			ncs.push([cs[i][0],cs[i+1][1]]);
		}
		mc.push(ncs);
		cs = ncs;
	}
	mc.reverse();
	return mc;
}

/** @param {NS} ns **/
function minPathSumInTriangle(ns, data) {
	var length = data.length;
	if (length == 1) {
		return data[0][0];
	}
	var r = data[length - 1].slice();
	for (var i = length - 2; i >= 0; i--) {
		var row = data[i];
		var nr = [];
		for (var j = 0; j < i + 1; j++) {
			nr.push(Math.min(r[j] + row[j], r[j + 1] + row[j]));
		}
		r = nr;
	}
	return r[0];
}

/** @param {NS} ns **/
function largestPrimeFactor(ns, data) {
	var factor = 0;
	var k = data;
	var rk = Math.sqrt(k);
	for (var i = 2; i < rk;) {
		if (k % i == 0) {
			factor = i;
			k /= i;
			rk = Math.sqrt(k);
		} else {
			i++;
		}
	}
	if (k > factor) {
		factor = k;
	}
	return factor;
}

function uniquePathInGrid1(ns, data) {
	var a = data[0];
	var b = data[1];
	if (a > b) {
		a = data[1];
		b = data[0];
	}
	a=a-1;
	b=b-1;
	var n = a + b;

	var c = 1;
	for (var i = 1; i <= a; i++) {
		c = c * n / i;
		n--;
	}
	return c;
}

function spiralizeMatrix(ns, data) {
	var s = 0;
	var m = [];
	for (var i = 0; i < data.length; i++) {
		m.push(data[i].slice());
	}
	var a = [];
	while (m.length > 0 && m[0].length > 0) {
		switch (s) {
			case 0:
				a = a.concat(m[0]);
				m = m.slice(1);
				s = 1;
				break;
			case 1:
				for (var i = 0; i < m.length; i++) {
					a.push(m[i].pop());
				}
				s = 2;
				break;
			case 2:
				a = a.concat(m.pop().reverse());
				s = 3;
				break;
			case 3:
				for (var i = m.length - 1; i >=0 ; i--) {
					a.push(m[i][0]);
					m[i] = m[i].slice(1);
				}
				s = 0;
				break;
		}
	}
	return a;
}

function totalWayToSum(ns, data) {
	var cache = {};
	var n = data;
	return twts(n, n, cache) - 1;
}

function twts(limit, n, cache) {
	if (n < 1) {
		return 1;
	}
	if (limit == 1) {
		return 1;
	}
	if (n < limit) {
		return twts(n, n, cache);
	}
	if (n in cache) {
		var c=cache[n];
		if (limit in c) {
			return c[limit];
		}
	}
	var s = 0;
	for (var i = 1; i <= limit; i++) {
		s+=twts(i, n-i, cache);
	}
	if (!(n in cache)) {
		cache[n] = {};
	}
	cache[n][limit] = s;
	return s;
}

export function comprLZEncode(plain) {
  // for state[i][j]:
  //      if i is 0, we're adding a literal of length j
  //      else, we're adding a backreference of offset i and length j
  let cur_state = Array.from(Array(10), () => Array(10).fill(null));
  let new_state = Array.from(Array(10), () => Array(10));

  function set(state, i, j, str) {
    const current = state[i][j];
    if (current == null || str.length < current.length) {
      state[i][j] = str;
    } else if (str.length === current.length && Math.random() < 0.5) {
      // if two strings are the same length, pick randomly so that
      // we generate more possible inputs to Compression II
      state[i][j] = str;
    }
  }

  // initial state is a literal of length 1
  cur_state[0][1] = "";

  for (let i = 1; i < plain.length; ++i) {
    for (const row of new_state) {
      row.fill(null);
    }
    const c = plain[i];

    // handle literals
    for (let length = 1; length <= 9; ++length) {
      const string = cur_state[0][length];
      if (string == null) {
        continue;
      }

      if (length < 9) {
        // extend current literal
        set(new_state, 0, length + 1, string);
      } else {
        // start new literal
        set(new_state, 0, 1, string + "9" + plain.substring(i - 9, i) + "0");
      }

      for (let offset = 1; offset <= Math.min(9, i); ++offset) {
        if (plain[i - offset] === c) {
          // start new backreference
          set(new_state, offset, 1, string + String(length) + plain.substring(i - length, i));
        }
      }
    }

    // handle backreferences
    for (let offset = 1; offset <= 9; ++offset) {
      for (let length = 1; length <= 9; ++length) {
        const string = cur_state[offset][length];
        if (string == null) {
          continue;
        }

        if (plain[i - offset] === c) {
          if (length < 9) {
            // extend current backreference
            set(new_state, offset, length + 1, string);
          } else {
            // start new backreference
            set(new_state, offset, 1, string + "9" + String(offset) + "0");
          }
        }

        // start new literal
        set(new_state, 0, 1, string + String(length) + String(offset));

        // end current backreference and start new backreference
        for (let new_offset = 1; new_offset <= Math.min(9, i); ++new_offset) {
          if (plain[i - new_offset] === c) {
            set(new_state, new_offset, 1, string + String(length) + String(offset) + "0");
          }
        }
      }
    }

    const tmp_state = new_state;
    new_state = cur_state;
    cur_state = tmp_state;
  }

  let result = null;

  for (let len = 1; len <= 9; ++len) {
    let string = cur_state[0][len];
    if (string == null) {
      continue;
    }

    string += String(len) + plain.substring(plain.length - len, plain.length);
    if (result == null || string.length < result.length) {
      result = string;
    } else if (string.length == result.length && Math.random() < 0.5) {
      result = string;
    }
  }

  for (let offset = 1; offset <= 9; ++offset) {
    for (let len = 1; len <= 9; ++len) {
      let string = cur_state[offset][len];
      if (string == null) {
        continue;
      }

      string += String(len) + "" + String(offset);
      if (result == null || string.length < result.length) {
        result = string;
      } else if (string.length == result.length && Math.random() < 0.5) {
        result = string;
      }
    }
  }

  return result ?? "";
}

function comprLZDecode(compr){
  let plain = "";

  for (let i = 0; i < compr.length; ) {
    const literal_length = compr.charCodeAt(i) - 0x30;

    if (literal_length < 0 || literal_length > 9 || i + 1 + literal_length > compr.length) {
      return null;
    }

    plain += compr.substring(i + 1, i + 1 + literal_length);
    i += 1 + literal_length;

    if (i >= compr.length) {
      break;
    }
    const backref_length = compr.charCodeAt(i) - 0x30;

    if (backref_length < 0 || backref_length > 9) {
      return null;
    } else if (backref_length === 0) {
      ++i;
    } else {
      if (i + 1 >= compr.length) {
        return null;
      }

      const backref_offset = compr.charCodeAt(i + 1) - 0x30;
      if ((backref_length > 0 && (backref_offset < 1 || backref_offset > 9)) || backref_offset > plain.length) {
        return null;
      }

      for (let j = 0; j < backref_length; ++j) {
        plain += plain[plain.length - backref_offset];
      }

      i += 2;
    }
  }

  return plain;
}

function HammingDecode(data) {
  let err = 0;
  const bits = [];
  /* TODO why not just work with an array of digits from the start? */
  for (const i in data.split("")) {
    const bit = parseInt(data[i]);
    bits[i] = bit;

    if (bit) {
      err ^= +i;
    }
  }

  /* If err != 0 then it spells out the index of the bit that was flipped */
  if (err) {
    /* Flip to correct */
    bits[err] = bits[err] ? 0 : 1;
  }

  /* Now we have to read the message, bit 0 is unused (it's the overall parity bit
   * which we don't care about). Each bit at an index that is a power of 2 is
   * a parity bit and not part of the actual message. */

  let ans = "";

  for (let i = 1; i < bits.length; i++) {
    /* i is not a power of two so it's not a parity bit */
    if ((i & (i - 1)) != 0) {
      ans += bits[i];
    }
  }

  /* TODO to avoid ambiguity about endianness why not let the player return the extracted (and corrected)
   * data bits, rather than guessing at how to convert it to a decimal string? */
  return parseInt(ans, 2);
}