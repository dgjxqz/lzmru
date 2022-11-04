#!/usr/bin/awk BEGIN{if(!ARGV[3]){system("jsc "ARGV[1]" -- "ARGV[1]);exit}RS="^$";j="xxd -p|tr -d '\n'|jsc "ARGV[1]" -- "ARGV[2]" "ARGV[3];j|getline k;if(close(j))print k>"/dev/stderr";else print k|"fold|xxd -prc80"}
// needs sh,awk,xxd,tr,fold (busybox) and jsc (libjavascriptcoregtk-4.0-bin)
let[v,w]=arguments;
if(!w)printErr(`${v} dictionary entropy < rawfile > zipfile # to compress
${v} entropy dictionary < zipfile > rawfile # to uncompress`),quit();
const j=[],k=readline().match(/../g)?.map(q=>parseInt(q,16))||[];// hex to array
module={},v=load(v),w=load(w);	// we do not know which one is which yet
v([]).length>1?		// only entropy encoder requires 2 arguments
	w(v(k))(j):	// uncompress, pass read data to entropy decoder
	v(w(j))(new Uint8Array(k));	// compress, pass read data to dictionary encoder
print(j.map(q=>q.toString(16).padStart(2,0)).join``);		// array to hex
