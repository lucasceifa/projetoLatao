export function formatarData(data: Date): string {
	const dia = String(data.getDate()).padStart(2, '0');
	const mes = String(data.getMonth() + 1).padStart(2, '0'); 
	const ano = data.getFullYear();
  
	return `${dia}/${mes}/${ano}`;
  }

export function dataValidade(data: Date): string {
	const mes = String(data.getMonth() + 1).padStart(2, '0'); 
	const ano = data.getFullYear();
  
	return `${mes}/${ano}`;
  }
export function dataInput(data: Date): string {
	let mes = String(data.getMonth() + 2).padStart(2, '0');
	let ano = data.getFullYear();
	if (mes === '13') {
		mes = '1'
		ano++ 
	}
	return `${ano}/${mes}`;
  }