{{
	function parsePairs(pairs) {
    const result = {};
      pairs.forEach(pair => { result[pair.key] = pair.value; });
      return result;
    }
}}

Map = _ pairs:KeyValuePair|..,_| _ {
  return parsePairs(pairs);
}

KeyValuePair = key:Key _ "=" _ value:Value {
  return { 
  	"key": key,
    "value": value
  }
}

Key = Date / String / Literal

Value = Object / Array / KeyValuePair / Color / String / Date / Number / Literal

Array "array"
  = "{" _ items:Value|..,_| _ "}" { return items; }

Object = "{" _ pairs:KeyValuePair|..,_| _ "}" {
	return parsePairs(pairs);
}

String "string"
  = DoubleQuote chars:Char* DoubleQuote { return chars.join(""); }

Literal "literal"
  = alnum+ { return text(); }

Color "color"
  = "rgb { " digit|1..3| _ digit|1..3| _ digit|1..3| " }" { return text(); }

Date "date"
  = digit|1..4| "." digit|1..2| "." digit|1..2| { return text(); }

Number "number"
  = Float / Integer

Float "float"
  = Integer "." digit+ { return parseFloat(text(), 10); }

Integer "integer"
  = "-"? digit+ { return parseInt(text(), 10); }

Char
  = !(DoubleQuote / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

DoubleQuote
  = "\""

EscapeSequence
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b";   }
  / "f"  { return "\f";   }
  / "n"  { return "\n";   }
  / "r"  { return "\r";   }
  / "t"  { return "\t";   }
  / "v"  { return "\x0B"; }

digit "digit"
  = [0-9]

alnum "alnum"
  = [a-z] / [A-Z] / [0-9] / "." / "-" / "_"

_ "whitespace"
  = [ \t\n\r]*