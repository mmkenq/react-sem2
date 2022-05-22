import { useRef, useEffect } from 'react';


function Canvas2DUI(props){
	const {num, stdFuncs, userFuncs, callbacks} = props;
	let ui = useRef(null);
	let funcNum = 0;

	console.log(stdFuncs)

	function addFunction(fNum){
		// default params
        userFuncs[fNum] = {
            f: () => 1,
            name: `function no. ${fNum}`,
            color: 'aqua',
            width: 2,
            isActive: true,
            zeroes: {have: false, a: null, b: null},
        };
        callbacks.render();
	};

	function changeFunction(f, fNum, color, width, name, zeroes){
        userFuncs[fNum].color = color || '#df8cff';
        userFuncs[fNum].width = width || 2;
        userFuncs[fNum].name = name;
        userFuncs[fNum].zeroes = zeroes || {have: false};
        if(f){
            userFuncs[fNum].f = f;
            userFuncs[fNum].isActive = true;
        };
        callbacks.render();
	};

    // TODO: actually remove funcs from array
    // and reuse empty slots
	function delFunction(fNum){
		userFuncs[fNum].isActive = false;
		userFuncs[fNum].zeroes.have = false;
        callbacks.render();
	};

	useEffect(()=>{
		ui.current = {
			parent: document.getElementsByClassName('ui2d')[num],
			buts: document.getElementsByClassName('buts2d')[num],
			funcs: document.getElementsByClassName('funcs2d')[num],
		};

		// AddFunction button
		let addFuncBut = document.createElement('button');
		addFuncBut.innerHTML = 'Новая функция';
		addFuncBut.addEventListener('click', ()=>{
			addFunction(funcNum);
			let funcInputs = document.createElement('div');
			funcInputs.dataset.num = funcNum;
			funcInputs.setAttribute('class','userInputs');

			// 'delete' button
			let dbutton = document.createElement('button');
			dbutton.innerHTML = 'Удалить';
			dbutton.addEventListener('click', () => {
				delFunction(funcInputs.dataset.num);
				funcInputs.remove();
			});

			let color = document.createElement('input');
			color.setAttribute('placeholder', 'color (default: #df8cff)');

			let width = document.createElement('input');
			width.setAttribute('placeholder', 'width (default: 2)');

			let name = document.createElement('input');
			name.setAttribute('placeholder', 'name (default: f(x))');

			let a = document.createElement('input');
			a.setAttribute('placeholder', 'Нули ф-ии (a): ');
			let b = document.createElement('input');
			b.setAttribute('placeholder', 'Нули ф-ии (b): ');

			a.addEventListener('blur', function(){
				if(!a.value || !b.value) return;
				changeFunction(null, funcInputs.dataset.num, color.value, width.value, name.value||input.value, {have:true, a: Number(a.value), b: Number(b.value)});
			});

			b.addEventListener('blur', function(){
				if(!a.value || !b.value) return;
				changeFunction(null, funcInputs.dataset.num, color.value, width.value, name.value||input.value, {have:true, a: Number(a.value), b: Number(b.value)});
			});

			color.addEventListener('blur', function(){
	            	changeFunction(null, funcInputs.dataset.num, this.value, width.value, name.value||input.value, userFuncs[funcInputs.dataset.num].zeroes);
			    }
			);
			width.addEventListener('blur', function(){
					changeFunction(null, funcInputs.dataset.num, color.value, this.value, name.value||input.value, userFuncs[funcInputs.dataset.num].zeroes);
				}
			);
			name.addEventListener('blur', function(){
					changeFunction(null, funcInputs.dataset.num, color.value, width.value, this.value||input.value, userFuncs[funcInputs.dataset.num].zeroes);
				}
			);


			let input = document.createElement('input');
			input.setAttribute('placeholder', 'f(x)');
			input.addEventListener('keyup', function(){
				let f;
				try {
					eval(`f = function (x) { return ${this.value};}`);
					changeFunction(f, funcInputs.dataset.num, color.value, width.value, name.value||this.value, (!a.value || !b.value)? null : {have:true, a: Number(a.value), b: Number(b.value)});
				}
				catch(e){
					console.log(e);
				};
			});

			funcInputs.appendChild(color);
			funcInputs.appendChild(width);
			funcInputs.appendChild(name);
			funcInputs.appendChild(a);
			funcInputs.appendChild(b);
			funcInputs.appendChild(input);
			funcInputs.appendChild(dbutton);
			ui.current.funcs.appendChild(funcInputs);
			funcNum++;
		});
		ui.current.buts.appendChild(addFuncBut);


		// Clear button
		let clearBut = document.createElement('button');
		clearBut.innerHTML = 'clear';
		clearBut.addEventListener('click', () => callbacks.render(true));
		ui.current.buts.appendChild(clearBut);

		// Standart Funcs buttons
		for (let i = 0; i < stdFuncs.length; i++){
			let but = document.createElement('button');
			but.innerHTML = stdFuncs[i].name;
			but.addEventListener('click', function(){
				// TODO: add feature to change defalt params
				// stdFuncs[i].color = ;
				// stdFuncs[i].width = ;
				stdFuncs[i].isActive = true;
				callbacks.render();
			});
			ui.current.buts.appendChild(but);
		};
	});

	return(
		<div className='ui2d'>
			<div className='buts2d'></div>
			<div className='funcs2d'></div>
		</div>
	);
};

export default Canvas2DUI;