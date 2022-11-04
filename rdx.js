// dummy entropy encoder and decoder, used for testing and demonstration
/*	exports a function which, depending on the array passed, if it is
	empty, return the entropy encoder function, otherwise return the
	decoder function which decodes the data in the array passed */
module.exports=(v,
	w=256,	// radix, optionally caller modifiable
	x=0,	// read pointer
)=>1+v[0]?(j,k=0,q=1)=>{	// array isn't empty, return entropy decoder
	// j is maximum value expected by dictionary decoder
	for(--j;j;j=j/w|0)
// read compressed data from the array passed to us during initialization
		k+=v[x++]*q,q*=w;
	return ++k;	// dictionary decoder accepts one-based value
}:(j,k)=>{	// encoder, 1 <= k <= j
	if(k>j||!k)throw"Invalid value to encode."
	--k;	// passed value is one-based, we work with zero-based values
	for(--j;j;j=j/w|0)
// store compressed data into the array passed to us during initialization
		v.push(k%w),k=k/w|0;
};
