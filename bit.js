module.exports=(
// array to read from when decoding or to write to when encoding
	bff,
// operation mode, default to compress if passed with an empty array
	dec=1+bff[0],
// pointer to current array element
	ptr=0,
// current element has x bits shifted
	pos=0,
// single read or write, does not cross byte boundary
	fn0=(j,k)=>dec?bff[ptr]>>>pos&(1<<j)-1:bff[ptr]^=k<<pos&255,
// update pointer if reach byte boundary
	fn1=(j,k,q=fn0(j,k))=>((pos+=j-8)<0?pos+=8:ptr++,q),
// recursively read or write until all bytes are done
	fn2=(j,k,q=8-pos)=>j>q?fn1(q,k)|(fn2(j-q,k>>>q)<<q):fn1(j,k),
// calculate bits needed
	fn3=(j,k)=>fn2(32-Math.clz32(j),k),
// end of stream stuffing and detection, FAIL if max value for last data is 1
	fn4=(j,k)=>dec?ptr+1<bff.length||fn0(8)-1?fn3(j):k:fn3(j,k^1)-fn0(1,1),
// expects (max) for read and (max,val) for write where 1 <= val <= max
)=>dec?q=>fn4(q)+1:fn0(1,1)&&((j,k)=>fn4(j,k-1));
