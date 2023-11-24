const mul = (a, b) => a*b;

const student = {
    name: 'yash',
    age: 21,
    greet(){
        console.log("My name is " + this.name);
    }
}
console.log(mul(5, 6));
student.greet()