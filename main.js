let num, range

do{
    num = parseFloat(prompt("Ingresa un numero del que quieras conocer su tabla"))
    range = parseFloat(prompt("Elige hasta que multiplo quieres conocer"))
}while(isNaN(num) || isNaN(range))

for(i=1; i <= range; i++){
    console.log(num +"X"+ i +"="+ (num*i))
}