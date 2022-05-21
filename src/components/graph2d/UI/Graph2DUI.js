import { useEffect } from 'react';


function Graph2DUI(props){
	let data = {num: 0}
	const {stdFuncs, callbacks} = props;

	useEffect(()=>{
		let addFuncBut = document.createElement('button');
		addFuncBut.innerHTML = 'Новая функция';
		addFuncBut.addEventListener('click', ()=>{
			callbacks.addFunction(data.num);
			newUserFunction();
			// funcs.dataset.num = data.num;
			data.num++;
		});
		document.getElementById('buts2d').appendChild(addFuncBut);
	})

	function newUserFunction(){
		// User Funcs inputs
		let funcInputs = document.createElement('div');

		// 'delete' button
		let dbutton = document.createElement('button');
		dbutton.innerHTML = 'Удалить';
		dbutton.addEventListener('click', () => {
			callbacks.delFunction(funcInputs.dataset.num);
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
			callbacks.printZeroes(data.num, a.value, b.value);
		});

		b.addEventListener('blur', function(){
			if(!a.value || !b.value) return;
			callbacks.printZeroes(data.num, a.value, b.value);
		});

		color.addEventListener('blur', function(){
            	callbacks.changeFunction(null, data.num, this.value, width.value, name.value||input.value);
		    }
		);
		width.addEventListener('blur', function(){
				callbacks.changeFunction(null, data.num, color.value, this.value, name.value||input.value);
			}
		);
		name.addEventListener('blur', function(){
				callbacks.changeFunction(null, data.num, color.value, width.value, this.value||input.value);
			}
		);
		
		let input = document.createElement('input');
		input.setAttribute('placeholder', 'f(x)');
		input.addEventListener('keyup', function(){
			let f;
			try {
				eval(`f = function (x) { return ${this.value};}`);
				callbacks.changeFunction(f, data.num, color.value, width.value, name.value||this.value);
			}
			catch(e){
				console.log(e);
			};
		});
		input.setAttribute('class', 'function');

		funcInputs.dataset.num = data.num;
		funcInputs.setAttribute('class','userInputs');
		funcInputs.appendChild(color);
		funcInputs.appendChild(width);
		funcInputs.appendChild(a);
		funcInputs.appendChild(b);
		funcInputs.appendChild(name);
		funcInputs.appendChild(input);
		funcInputs.appendChild(dbutton);

		let funcs = document.getElementById('funcs2d');
		funcs.appendChild(funcInputs);
	};

	return(
		<div id='ui2d'>
			<div id='buts2d'></div>
			<div id='funcs2d'></div>
		</div>
	);
};

export default Graph2DUI;