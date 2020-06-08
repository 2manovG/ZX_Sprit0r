var field = [], drawX, drawY, drawSz, x, y, w, h, sz;

function setup()
{
	drawX = drawY = 16;
	drawSz = 64;
	
	x = y = 0;
	w = h = 64;
	sz = 2;
	
	for (let i = 0; i < w; i++)
	{
		field.push([]);
		for (let j = 0; j < h; j++) field[i].push(0);
	}
}
function update()
{
	if (mouse[0])
	{
		let i = Math.floor((mouseX-drawX)/drawSz), j = Math.floor((mouseY-drawY)/drawSz);
		if (i >= 0 && j >= 0 && i < 8 && j < 8) field[x+i][y+j] = 1;
	}
	else if (mouse[2])
	{
		let i = Math.floor((mouseX-drawX)/drawSz), j = Math.floor((mouseY-drawY)/drawSz);
		if (i >= 0 && j >= 0 && i < 8 && j < 8) field[x+i][y+j] = 0;
	}
	
	if (keyPressed("A") && x>0) x-=8;
	if (keyPressed("W") && y>0) y-=8;
	if (keyPressed("D") && x<w-8) x+=8;
	if (keyPressed("S") && y<h-8) y+=8;
	
	for (let i = 0; i < keys.length; i++)pkeys[i] = keys[i];
	for (let i = 0; i < mouse.length; i++)pmouse[i] = mouse[i];

    //text
    let outstr = "defb ";

	for (let i = 0; i < 8; i++)
	{
		let val = 0;
		for (let j = 0; j < 8; j++) val = 2*val + field[x+j][y+i];
        
        outstr += val;
        if (i < 7) outstr += ", ";
    }
    if (ptext.innerHTML != outstr)
        ptext.innerHTML = outstr;
}
function draw()
{
	update();
	
	hdc.beginPath();
    hdc.clearRect(0, 0, width, height);
	
	hdc.strokeStyle = '#888';
	hdc.font = '36px Arial';
	hdc.textAlign = 'left';
	hdc.textBaseline = 'middle';
	
	for (let i = 0; i < 8; i++)
		for (let j = 0; j < 8; j++)
		{
			if (field[x+i][y+j]) hdc.fillRect(drawX + drawSz*i, drawY + drawSz*j, drawSz, drawSz);
			hdc.rect(drawX + drawSz*i, drawY + drawSz*j, drawSz, drawSz);
		}
	hdc.stroke();
	
	for (let i = 0; i < 8; i++)
	{
		let val = 0;
		for (let j = 0; j < 8; j++) val = 2*val + field[x+j][y+i];
		
		hdc.fillText("= "+val,drawX+drawSz*8 + 8,drawY+drawSz*(i+0.5));
	}
	
	hdc.beginPath();
	hdc.strokeStyle = '#f00';
	hdc.rect(width - w*sz - drawX + sz*x, drawY + sz*y, 8*sz, 8*sz);
	hdc.stroke();
	
	for (let i = 0; i < w; i++)
		for (let j = 0; j < h; j++)
			if (field[i][j]) hdc.fillRect(width - w*sz - drawX + sz*i, drawY + sz*j, sz, sz);
}
