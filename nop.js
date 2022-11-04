// dummy dictionary encoder decoder, used for testing and demonstration
/*	exports a function which, depending on whether the entropy function
	passed to it is an encoder or decoder,
	returns the dictionary encoder or decoder function */
		// entropy decoder requires one argument only
module.exports=q=>q.length<2?(j,k=0)=>{
	for(;k=q(256);)	// 1 <= decoded value <= 256, end of stream if falsy
		if(k>256)throw"Invalid value decoded";else
		// store data into passed array
		j.push(k-1);
			// k-1 to make it zero-based
}:j=>j.forEach(k=>q(256,k+1));
// j is raw data to be compressed
			// k+1 to pass one-based values to entropy encoder
