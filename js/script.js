function calcularSalarioLiquido() {
    // Obtém os valores do usuário
    const salarioBruto = parseFloat(document.getElementById('salarioBruto').value) || 0;
    const valeTransporte = parseFloat(document.getElementById('valeTransporte').value) || 0;
    const planoSaude = parseFloat(document.getElementById('planoSaude').value) || 0;
    const planoOdonto = parseFloat(document.getElementById('planoOdonto').value) || 0;
    const pensao = parseFloat(document.getElementById('pensao').value) || 0;
    const outros = parseFloat(document.getElementById('outros').value) || 0;

    // Validação dos campos
    if (salarioBruto <= 0) {
        alert('Por favor, insira um valor válido para o Salário Bruto.');
        return;
    }
    if (valeTransporte < 0 || planoSaude < 0 || planoOdonto < 0 || pensao < 0 || outros < 0) {
        alert('Por favor, insira valores não negativos para os descontos.');
        return;
    }

    // Calcula o INSS
    let inss = 0;
    let aliquotaINSS = '';
    const baseCalculoINSS = salarioBruto;

    if (baseCalculoINSS <= 1412.00) {
        inss = baseCalculoINSS * 0.075;
        aliquotaINSS = '7,5%';
    } else if (baseCalculoINSS <= 2666.68) {
        inss = (1412.00 * 0.075) + ((baseCalculoINSS - 1412.00) * 0.09);
        aliquotaINSS = '9%';
    } else if (baseCalculoINSS <= 3856.94) {
        inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((baseCalculoINSS - 2666.68) * 0.12);
        aliquotaINSS = '12%';
    } else if (baseCalculoINSS <= 7507.49) {
        inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((3856.94 - 2666.68) * 0.12) + ((baseCalculoINSS - 3856.94) * 0.14);
        aliquotaINSS = '14%';
    } else {
        inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((3856.94 - 2666.68) * 0.12) + ((7507.49 - 3856.94) * 0.14);
        aliquotaINSS = '14% (teto)';
    }

    // Calcula o IRRF
    let irrf = 0;
    let aliquotaIR = '';
    const baseCalculoIRRF = salarioBruto - inss;

    if (baseCalculoIRRF <= 2112.00) {
        irrf = 0;
        aliquotaIR = 'Isento';
    } else if (baseCalculoIRRF <= 3751.04) {
        irrf = (baseCalculoIRRF * 0.075) - 158.40;
        aliquotaIR = '7,5%';
    } else if (baseCalculoIRRF <= 4664.67) {
        irrf = (baseCalculoIRRF * 0.15) - 370.40;
        aliquotaIR = '15%';
    } else if (baseCalculoIRRF <= 5596.00) {
        irrf = (baseCalculoIRRF * 0.225) - 651.73;
        aliquotaIR = '22,5%';
    } else {
        irrf = (baseCalculoIRRF * 0.275) - 884.96;
        aliquotaIR = '27,5%';
    }

    // Calcula o FGTS
    const fgts = salarioBruto * 0.08;
    const aliquotaFgts = '8%';

    // Calcula os outros descontos
    const descontosGerais = valeTransporte + planoSaude + planoOdonto + pensao + outros;

    // Calcula o total de descontos
    const totalDescontos = descontosGerais + inss + irrf;

    // Calcula o salário líquido
    const salarioLiquido = salarioBruto - totalDescontos;

    // Exibe os resultados
    document.getElementById('resultado').textContent = `A receber: ${salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById('totalDescontos').textContent = totalDescontos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('ir').textContent = irrf.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('inss').textContent = inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('fgts').textContent = fgts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('descontosGerais').textContent = descontosGerais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('salBruto').textContent = salarioBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Atualiza as alíquotas
    document.getElementById('aliqIr').textContent = aliquotaIR;
    document.getElementById('aliqInss').textContent = aliquotaINSS;
    document.getElementById('aliqFgts').textContent = aliquotaFgts;
}
