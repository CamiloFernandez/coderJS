alert("En esta calculadora podrás ver cuanto dinero generas con los intereses de Mercado Pago o Ualá, solo ingresa los valores solicitados.")

let capital, interes, tiempo;

const calcularAnual = () => Math.round(capital*Math.pow((1+interes/100),tiempo))
const calcularMensual = () => Math.round(capital*Math.pow((1+interes/100),tiempo/12)-capital)
const calcularDiario = () => Math.round(capital*Math.pow((1+interes/100),tiempo/365)-capital)

do{
    capital = parseInt(prompt("Ingrese el capital inicial"));
    interes = parseInt(prompt("Ingrese el interés (sin el símbolo %)"));
    tiempo = parseInt(prompt("Ingrese la cantidad de tiempo en años estimada"));

    if(isNaN(capital) ||(capital<=0) || isNaN(interes) ||(interes<=0) || isNaN(tiempo) || (tiempo<=0)){
        alert("Por favor ingrese números válidos.")
    }
}while(isNaN(capital) ||(capital<=0) || isNaN(interes) ||(interes<=0) || isNaN(tiempo) || (tiempo<=0))

console.log("El total aproximado generado en el tiempo dado es: " +"$" + calcularAnual());
console.log("El total aproximado generado mensualmente es: " +"$" + calcularMensual());
console.log("El total aproximado generado diariamente es: " +"$" + calcularDiario());