module.exports=(etp,
	dic=Array(256).fill().map((j,k)=>[255-k]),	// initial dictionary
	mru=q=>dic.length-q,	// 0 -> maximum value, 1 -> most recently used
	upd=q=>{dic.push(dic[q]);dic[q]=[...dic[mru(2)],dic[q][0]]},
)=>etp.length>1?raw=>{	// entropy encoder takes 2 arguments when compressing
	const rvs={};	// speedup match searching
	dic.forEach((j,k)=>rvs[j]=k);
	for(let fnd,ptr=0;ptr<raw.length;){
		for(let j,k=ptr;
			k<raw.length&&1+(j=rvs[raw.slice(ptr,++k)]);
		)fnd=j;
		etp(mru(0),mru(fnd));
		ptr+=dic[fnd].length;
		upd(fnd);
		rvs[dic[fnd]]=fnd;
		rvs[dic[mru(1)]]=mru(1);
	}
}:(j,k=0)=>{for(;k=etp(mru(0));upd(k))j.push(...dic[k=mru(k)])}; // decompress
