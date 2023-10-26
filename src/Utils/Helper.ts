export function IsAuth(): boolean {
	return (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== '')
}

export function formatarData(data: string): string {
	const dia = String(new Date(data).getDate()).padStart(2, '0');
	const mes = String(new Date(data).getMonth() + 1).padStart(2, '0'); 
	const ano = new Date(data).getFullYear();
  
	return `${parseInt(dia) + 1}/${mes}/${ano}`;
  }

export function dataValidade(data: string): string {
	let mes = String(new Date(data).getMonth() + 2).padStart(2, '0'); 
	let ano = new Date(data).getFullYear();
	if (mes === '13') {
		mes = '1'
		ano++ 
	}
  
	return `${mes}/${ano}`;
  }
export function dataInput(data: string): string {
	let mes = String(new Date(data).getMonth() + 2).padStart(2, '0');
	let ano = new Date(data).getFullYear();
	if (mes === '13') {
		mes = '1'
		ano++ 
	}
	return `${ano}/${mes}`;
  }

export  function validarCPF(cpf: string): boolean {
	cpf = cpf.replace(/\D/g, '');
  
	if (cpf.length !== 11) {
      return false;
	}
  
	if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
	}
  
	let soma = 0;
	for (let i = 0; i < 9; i++) {
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	}
	let primeiroDigito = 11 - (soma % 11);
  
	if (primeiroDigito === 10 || primeiroDigito === 11) {
		primeiroDigito = 0;
	}
  
	if (primeiroDigito !== parseInt(cpf.charAt(9))) {
		return false;
	}
  
	soma = 0;
	for (let i = 0; i < 10; i++) {
		soma += parseInt(cpf.charAt(i)) * (11 - i);
	}
	let segundoDigito = 11 - (soma % 11);
  
	if (segundoDigito === 10 || segundoDigito === 11) {
		segundoDigito = 0;
	}
  
	if (segundoDigito !== parseInt(cpf.charAt(10))) {
		return false;
	}
  
	return true;
  }